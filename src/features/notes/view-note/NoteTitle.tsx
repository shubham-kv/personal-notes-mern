import { Extensions } from '@tiptap/react';

import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import { EditorProps } from '@tiptap/pm/view';
import { Extension } from '@tiptap/core';

import { TiptapEditor, TiptapEditorProps } from '@/components/TiptapEditor';

const DisableEnter = Extension.create({
  addKeyboardShortcuts: () => ({ Enter: () => true }),
});

const extensions: Extensions = [
  DisableEnter,
  Document,
  Text,
  Heading.configure({ levels: [1] }),
];

const editorProps: EditorProps<any> = {
  attributes: { class: `editor note-title focus-visible:outline-none` },
};

export function NoteTitle(
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
