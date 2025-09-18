'use client'; // Needed in Next.js 13 App Router

import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './TextFormattingTools';
import TextAlign from '@tiptap/extension-text-align'
import { useEffect } from 'react';


export default function TiptapEditor({ content }: { content: string }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['paragraph', 'heading'],
      }),
    ],
    content: content || '<p></p>',
    immediatelyRender: false,
  });

  // Update editor content when prop changes
  useEffect(() => {
    if (editor && content !== undefined) {
      editor.commands.setContent(content || '<p></p>');
    }
  }, [content, editor]);

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="prose border border-gray-300 p-4 rounded"
      />
    </div>
  );
}
