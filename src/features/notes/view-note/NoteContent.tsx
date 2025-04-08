import StarterKit from '@tiptap/starter-kit';
import { Extensions } from '@tiptap/react';
import { EditorProps } from '@tiptap/pm/view';

import { TiptapEditor, TiptapEditorProps } from '@/components/TiptapEditor';

const extensions: Extensions = [
  StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
];

const editorProps: EditorProps<any> = {
  attributes: {
    class: 'editor note-content min-h-[150px] pb-24 focus-visible:outline-none',
  },
};

export function NoteContent(
  props: Pick<TiptapEditorProps, 'content' | 'onContentChange'>
) {
  return (
    <TiptapEditor
      editorProps={editorProps}
      extensions={extensions}
      {...props}
      editable={false}
    />
  );
}
