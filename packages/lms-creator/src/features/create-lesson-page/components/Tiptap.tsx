'use client'; // Needed in Next.js 13 App Router

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './TextFormattingTools';
import TextAlign from '@tiptap/extension-text-align'
import { useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';

interface TiptapEditorProps {
  content: string;
  editorRef?: React.MutableRefObject<any>;
  onAutoSave?: (content: string) => void;
  onDebounceStart?: () => void;
}

export default function TiptapEditor({ content, editorRef, onAutoSave, onDebounceStart }: TiptapEditorProps) {
  const lastSavedContentRef = useRef<string>(content || '');
  const isDebouncingRef = useRef(false);

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

  // Hold a debounced function ref that updates whenever onAutoSave changes
  const debouncedAutoSaveRef = useRef<ReturnType<typeof debounce> | null>(null);

  useEffect(() => {
    if (!onAutoSave) return;

    debouncedAutoSaveRef.current = debounce(async (content: string) => {
      isDebouncingRef.current = false;
      try {
        await onAutoSave(content);
        lastSavedContentRef.current = content;
      } catch (error) {
        // Optionally handle error silently
      }
    }, 1000);

    return () => {
      debouncedAutoSaveRef.current?.cancel();
    };
  }, [onAutoSave]);

  // Forward the editor instance to the parent ref
  useEffect(() => {
    if (editorRef && editor) {
      editorRef.current = editor;
    }
  }, [editor, editorRef]);

  // Sync editor content with prop updates
  useEffect(() => {
    if (editor && content !== undefined) {
      editor.commands.setContent(content || '<p></p>');
      lastSavedContentRef.current = content || '';
    }
  }, [content, editor]);

  // Auto-save effect: watches editor content changes
  useEffect(() => {
    if (!editor || !onAutoSave) return;

    const handleUpdate = () => {
      const currentContent = editor.getHTML();
      if (currentContent !== lastSavedContentRef.current) {
        if (!isDebouncingRef.current) {
          isDebouncingRef.current = true;
          onDebounceStart?.();
        }
        debouncedAutoSaveRef.current?.cancel();
        debouncedAutoSaveRef.current?.(currentContent);
      }
    };

    editor.on("update", handleUpdate);
    editor.on("transaction", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
      editor.off("transaction", handleUpdate);
      debouncedAutoSaveRef.current?.cancel();
    };
  }, [editor, onAutoSave, onDebounceStart]);

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
