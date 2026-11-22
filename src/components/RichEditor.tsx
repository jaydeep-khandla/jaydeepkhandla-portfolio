'use client';
import { useEffect, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TableKit } from '@tiptap/extension-table';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { TextStyleKit } from '@tiptap/extension-text-style';
import SubscriptExtension from '@tiptap/extension-subscript';
import SuperscriptExtension from '@tiptap/extension-superscript';
import { Bold, Italic, Underline, Strikethrough, Subscript, Superscript, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, IndentIncrease, IndentDecrease, Quote, Code, SquareCode, Minus, CornerDownLeft, Link2, Unlink2, ImageIcon, Table2, ArrowUpToLine, ArrowDownToLine, Rows2, ArrowLeftToLine, ArrowRightToLine, Columns2, TableCellsMerge, TableCellsSplit, PanelTop, PanelLeft, Trash2, RemoveFormatting, Undo2, Redo2, Pilcrow, Highlighter, Baseline, Type, CaseSensitive } from 'lucide-react';
import { contentHtml } from './RichContent';

const icons = {
  'Bold': Bold,
  'Italic': Italic,
  'Underline': Underline,
  'Strike': Strikethrough,
  'Subscript': Subscript,
  'Superscript': Superscript,
  'left': AlignLeft,
  'center': AlignCenter,
  'right': AlignRight,
  'justify': AlignJustify,
  'Bullets': List,
  'Numbering': ListOrdered,
  'Indent': IndentIncrease,
  'Outdent': IndentDecrease,
  'Quote': Quote,
  'Code': Code,
  'Code block': SquareCode,
  'Rule': Minus,
  'Line break': CornerDownLeft,
  'Link': Link2,
  'Unlink': Unlink2,
  'Image': ImageIcon,
  'Table': Table2,
  'Row above': ArrowUpToLine,
  'Row below': ArrowDownToLine,
  'Delete row': Rows2,
  'Column before': ArrowLeftToLine,
  'Column after': ArrowRightToLine,
  'Delete column': Columns2,
  'Merge cells': TableCellsMerge,
  'Split cell': TableCellsSplit,
  'Header row': PanelTop,
  'Header column': PanelLeft,
  'Delete table': Trash2,
  'Clear formatting': RemoveFormatting,
  'Undo': Undo2,
  'Redo': Redo2,
};

const extensions = [StarterKit.configure({ link: { openOnClick: false } }), TableKit, Image, TextStyleKit,
  Highlight.configure({ multicolor: true }), SubscriptExtension, SuperscriptExtension, TextAlign.configure({ types: ['heading','paragraph'] })];

export default function RichEditor({ label, value, onChange }: { label: string; value: string; onChange: (html: string) => void }) {
  const lastValue = useRef<string>();
  const editor = useEditor({
    extensions, immediatelyRender: false, shouldRerenderOnTransaction: true,
    editorProps: { attributes: { class: 'rich-content', role: 'textbox', 'aria-multiline': 'true', 'aria-required': 'true', 'aria-label': label } },
    onUpdate: ({ editor }) => {
      const html = editor.isEmpty ? '' : editor.getHTML();
      lastValue.current = html;
      onChange(html);
    },
  });
  useEffect(() => {
    if (editor && value !== lastValue.current) {
      editor.commands.setContent(contentHtml(value), { emitUpdate: false });
      lastValue.current = value;
    }
  }, [value, editor]);

  if (!editor) return null;
  const chain = () => editor.chain().focus();
  const action = (name: keyof typeof icons, run: () => void, mark?: string) => {
    const Icon = icons[name];
    return (
    <button key={name} aria-label={name} data-tip={name} type="button" onMouseDown={e => e.preventDefault()} onClick={run} aria-pressed={mark ? editor.isActive(mark) : undefined}><Icon aria-hidden="true" size={17} /></button>
  );
  };
  return <div className="editor-box">
    <div role="group" aria-label={label + ' formatting'} className="editor-tools">
      <label className="editor-picker" data-tip="Block style"><Pilcrow aria-hidden="true" size={17} /><select aria-label="Block style" value={editor.isActive('heading') ? editor.getAttributes('heading').level : 0}
        onChange={e => { const n = Number(e.target.value) as 1|2|3|4|5|6; n ? chain().setHeading({level:n}).run() : chain().setParagraph().run(); }}>
        <option value={0}>Paragraph</option>{[1,2,3,4,5,6].map(n => <option key={n} value={n}>Heading {n}</option>)}
      </select></label>
      {action('Bold', () => chain().toggleBold().run(), 'bold')}
      {action('Italic', () => chain().toggleItalic().run(), 'italic')}
      {action('Underline', () => chain().toggleUnderline().run(), 'underline')}
      {action('Strike', () => chain().toggleStrike().run(), 'strike')}
      {action('Subscript', () => chain().toggleSubscript().run(), 'subscript')}
      {action('Superscript', () => chain().toggleSuperscript().run(), 'superscript')}
      <label className="editor-picker" data-tip="Color"><Baseline aria-hidden="true" size={17} /><input aria-label="Text color" type="color" onChange={e => chain().setColor(e.target.value).run()} /></label>
      <label className="editor-picker" data-tip="Highlight"><Highlighter aria-hidden="true" size={17} /><input aria-label="Highlight color" type="color" onChange={e => chain().setHighlight({color:e.target.value}).run()} /></label>
      <label className="editor-picker" data-tip="Font"><Type aria-hidden="true" size={17} /><select aria-label="Font" value={editor.getAttributes('textStyle').fontFamily || ''} onChange={e => e.target.value ? chain().setFontFamily(e.target.value).run() : chain().unsetFontFamily().run()}>
        <option value="">Default font</option>{['serif','sans-serif','monospace'].map(v => <option key={v}>{v}</option>)}
      </select></label>
      <label className="editor-picker" data-tip="Font size"><CaseSensitive aria-hidden="true" size={17} /><select aria-label="Font size" value={editor.getAttributes('textStyle').fontSize || ''} onChange={e => e.target.value ? chain().setFontSize(e.target.value).run() : chain().unsetFontSize().run()}>
        <option value="">Default size</option>{[12,14,16,18,24,32].map(v => <option key={v}>{v}px</option>)}
      </select></label>
      {(['left','center','right','justify'] as const).map(v => action(v, () => chain().setTextAlign(v).run()))}
      {action('Bullets', () => chain().toggleBulletList().run(), 'bulletList')}
      {action('Numbering', () => chain().toggleOrderedList().run(), 'orderedList')}
      {action('Indent', () => chain().sinkListItem('listItem').run())}
      {action('Outdent', () => chain().liftListItem('listItem').run())}
      {action('Quote', () => chain().toggleBlockquote().run(), 'blockquote')}
      {action('Code', () => chain().toggleCode().run(), 'code')}
      {action('Code block', () => chain().toggleCodeBlock().run(), 'codeBlock')}
      {action('Rule', () => chain().setHorizontalRule().run())}
      {action('Line break', () => chain().setHardBreak().run())}
      {action('Link', () => { const href = window.prompt('Link URL', editor.getAttributes('link').href || 'https://'); if (href) chain().extendMarkRange('link').setLink({href}).run(); }, 'link')}
      {action('Unlink', () => chain().extendMarkRange('link').unsetLink().run())}
      {action('Image', () => { const src = window.prompt('Image URL'); if (src && /^https?:\/\//i.test(src)) chain().setImage({src, alt:window.prompt('Image description') || ''}).run(); })}
      {action('Table', () => chain().insertTable({rows:3,cols:3,withHeaderRow:true}).run())}
      {editor.isActive('table') && <>
        {action('Row above', () => chain().addRowBefore().run())}{action('Row below', () => chain().addRowAfter().run())}
        {action('Delete row', () => chain().deleteRow().run())}{action('Column before', () => chain().addColumnBefore().run())}
        {action('Column after', () => chain().addColumnAfter().run())}{action('Delete column', () => chain().deleteColumn().run())}
        {action('Merge cells', () => chain().mergeCells().run())}{action('Split cell', () => chain().splitCell().run())}
        {action('Header row', () => chain().toggleHeaderRow().run())}{action('Header column', () => chain().toggleHeaderColumn().run())}
        {action('Delete table', () => chain().deleteTable().run())}
      </>}
      {action('Clear formatting', () => chain().clearNodes().unsetAllMarks().run())}
      {action('Undo', () => chain().undo().run())}{action('Redo', () => chain().redo().run())}
    </div>
    <EditorContent editor={editor} />
    <input className="sr-only" aria-label={label + ' required'} tabIndex={-1} required value={value} onChange={() => {}} onInvalid={() => editor.commands.focus()} />
  </div>;
}
