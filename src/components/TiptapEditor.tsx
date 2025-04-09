import { useEditor, EditorContent, UseEditorOptions } from '@tiptap/react';

export type TiptapEditorProps = Pick<
  UseEditorOptions,
  'editable' | 'extensions' | 'editorProps' | 'content' | 'onUpdate'
>;

export function TiptapEditor(props: TiptapEditorProps) {
  const editor = useEditor(props);

  return <EditorContent editor={editor} />;
}
