import sanitizeHtml from 'sanitize-html';
import './rich-content.css';

export function contentHtml(value: string) {
  if (!value) return '';
  if (!/^\s*<(p|div|h[1-6]|ol|ul|blockquote|pre|hr|table|img)\b/i.test(value)) {
    return '<p>' + value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r?\n/g, '<br>') + '</p>';
  }
  return sanitizeHtml(value, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img', 'mark', 's', 'u', 'colgroup', 'col'],
    allowedAttributes: { a: ['href', 'title'], img: ['src', 'alt'], td: ['colspan','rowspan'], th: ['colspan','rowspan'], ol: ['start'], '*': ['style'] },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowProtocolRelative: false,
    allowedStyles: { '*': {
      'text-align': [/^(left|center|right|justify)$/],
      color: [/^#[\da-f]{3,8}$/i, /^rgb\([\d, ]+\)$/],
      'background-color': [/^#[\da-f]{3,8}$/i, /^rgb\([\d, ]+\)$/],
      'font-family': [/^(serif|sans-serif|monospace)$/],
      'font-size': [/^(12|14|16|18|24|32)px$/],
    } },
  });
}

export default function RichContent({ value }: { value: string }) {
  return <div className="rich-content" dangerouslySetInnerHTML={{ __html: contentHtml(value) }} />;
}
