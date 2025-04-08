import DOMPurify from 'dompurify';
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

type NoteEditorProps = {
  onContentChange?: (content: string) => void;
} & Pick<TiptapEditorProps, 'content'>;

export function NoteContent(props: NoteEditorProps) {
  const { content, onContentChange } = props;

  return (
    <TiptapEditor
      editorProps={editorProps}
      extensions={extensions}
      editable={true}
      content={content}
      onUpdate={({ editor }) => {
        if (onContentChange) {
          const sanitizedHtml = DOMPurify.sanitize(editor.getHTML());
          onContentChange(sanitizedHtml);
        }
      }}
    />
  );
}
