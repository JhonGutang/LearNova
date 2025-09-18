'use client'; // Needed in Next.js 13 App Router

import { useEditor, EditorContent, Editor } from '@tiptap/react'
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

  // Track if debounce is currently active
  const isDebouncingRef = useRef(false);

  // Debounced auto-save handler
  const debouncedAutoSave = useRef(
    debounce(async (content: string) => {
      console.log('Debounced auto-save executing with content:', content);
      isDebouncingRef.current = false;
      if (onAutoSave) {
        try {
          await onAutoSave(content);
          // Update the last saved content only after the save is completed
          lastSavedContentRef.current = content;
          console.log('Auto-save completed successfully');
        } catch (error) {
          console.error('Auto-save failed:', error);
        }
      }
    }, 1000)
  ).current;

  // Forward the editor instance to the ref
  useEffect(() => {
    if (editorRef && editor) {
      editorRef.current = editor;
    }
  }, [editor, editorRef]);

  // Update editor content when prop changes
  useEffect(() => {
    if (editor && content !== undefined) {
      editor.commands.setContent(content || '<p></p>');
      lastSavedContentRef.current = content || '';
    }
  }, [content, editor]);

  // Auto-save effect: watches editor content changes
  useEffect(() => {
    if (!editor || !onAutoSave) return;

    // Handler for editor updates - this covers content changes AND formatting changes
    const handleUpdate = () => {
      const currentContent = editor.getHTML();
      if (currentContent !== lastSavedContentRef.current) {
        console.log('Editor content changed, triggering auto-save:', {
          previousContent: lastSavedContentRef.current,
          newContent: currentContent,
          isDebouncing: isDebouncingRef.current
        });
        
        // If not currently debouncing, start debounce and notify parent
        if (!isDebouncingRef.current) {
          isDebouncingRef.current = true;
          console.log('Starting debounce period');
          onDebounceStart?.();
        } else {
          console.log('Debounce already active, cancelling previous and restarting');
        }
        
        // Cancel previous debounce and start new one
        debouncedAutoSave.cancel();
        debouncedAutoSave(currentContent);
        console.log('Debounced function scheduled, will execute in 1 second if no more changes');
      }
    };

    // Listen to multiple events to catch all types of changes:
    // - "update": Content changes (typing, deleting)
    // - "transaction": All editor transactions including formatting
    // - "selectionUpdate": Selection changes that might affect formatting
    editor.on("update", handleUpdate);
    editor.on("transaction", handleUpdate);

    // Clean up on unmount
    return () => {
      editor.off("update", handleUpdate);
      editor.off("transaction", handleUpdate);
      debouncedAutoSave.cancel();
    };
  }, [editor, onAutoSave, debouncedAutoSave]);

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
