'use client';
import { useEffect, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TableKit } from '@tiptap/extension-table';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { TextStyleKit } from '@tiptap/extension-text-style';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { contentHtml } from './RichContent';

const extensions = [StarterKit.configure({ link: { openOnClick: false } }), TableKit, Image, TextStyleKit,
  Highlight.configure({ multicolor: true }), Subscript, Superscript, TextAlign.configure({ types: ['heading','paragraph'] })];

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
  const action = (name: string, run: () => void, mark?: string) => (
    <button key={name} type="button" onMouseDown={e => e.preventDefault()} onClick={run} aria-pressed={mark ? editor.isActive(mark) : undefined}>{name}</button>
  );
  return <div className="editor-box">
    <div role="group" aria-label={label + ' formatting'} className="editor-tools">
      <select aria-label="Block style" value={editor.isActive('heading') ? editor.getAttributes('heading').level : 0}
        onChange={e => { const n = Number(e.target.value) as 1|2|3|4|5|6; n ? chain().setHeading({level:n}).run() : chain().setParagraph().run(); }}>
        <option value={0}>Paragraph</option>{[1,2,3,4,5,6].map(n => <option key={n} value={n}>Heading {n}</option>)}
      </select>
      {action('Bold', () => chain().toggleBold().run(), 'bold')}
      {action('Italic', () => chain().toggleItalic().run(), 'italic')}
      {action('Underline', () => chain().toggleUnderline().run(), 'underline')}
      {action('Strike', () => chain().toggleStrike().run(), 'strike')}
      {action('Subscript', () => chain().toggleSubscript().run(), 'subscript')}
      {action('Superscript', () => chain().toggleSuperscript().run(), 'superscript')}
      <label>Color <input aria-label="Text color" type="color" onChange={e => chain().setColor(e.target.value).run()} /></label>
      <label>Highlight <input aria-label="Highlight color" type="color" onChange={e => chain().setHighlight({color:e.target.value}).run()} /></label>
      <select aria-label="Font" value={editor.getAttributes('textStyle').fontFamily || ''} onChange={e => e.target.value ? chain().setFontFamily(e.target.value).run() : chain().unsetFontFamily().run()}>
        <option value="">Default font</option>{['serif','sans-serif','monospace'].map(v => <option key={v}>{v}</option>)}
      </select>
      <select aria-label="Font size" value={editor.getAttributes('textStyle').fontSize || ''} onChange={e => e.target.value ? chain().setFontSize(e.target.value).run() : chain().unsetFontSize().run()}>
        <option value="">Default size</option>{[12,14,16,18,24,32].map(v => <option key={v}>{v}px</option>)}
      </select>
      {['left','center','right','justify'].map(v => action(v, () => chain().setTextAlign(v).run()))}
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
