'use client'; // Needed in Next.js 13 App Router

import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './TextFormattingTools';
import TextAlign from '@tiptap/extension-text-align'


export default function TiptapEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
    TextAlign.configure({
      types: ['paragraph', 'heading'],
    }),
      ],
    content: '<p>Hello Tiptap!</p>',
    immediatelyRender: false,
  })

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="prose border border-gray-300 p-4 rounded"
      />
    </div>
  )
}
