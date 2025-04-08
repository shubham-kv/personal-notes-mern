import DOMPurify from 'dompurify';
import { useEditor, EditorContent, UseEditorOptions } from '@tiptap/react';

export type TiptapEditorProps = Pick<
  UseEditorOptions,
  'editable' | 'extensions' | 'editorProps' | 'content'
> & {
  onContentChange?: (content: string) => void;
};

export function TiptapEditor(props: TiptapEditorProps) {
  const { onContentChange, ...restProps } = props;

  const editor = useEditor({
    ...restProps,
    onUpdate({ editor }) {
      if (onContentChange) {
        const sanitizedHtml = DOMPurify.sanitize(editor.getHTML());
        onContentChange(sanitizedHtml);
      }
    },
  });

  return <EditorContent editor={editor} />;
}
