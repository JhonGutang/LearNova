import { Editor } from '@tiptap/react'
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Eraser,
  List,
  ListOrdered,
  Quote,
  Code2,
  ListPlus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from 'lucide-react'
import { Button } from '@/src/shadcn/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/src/shadcn/components/ui/tooltip'

interface MenuBarProps {
  editor: Editor | null
}

type ToolbarButton = {
  key: string
  icon: React.ElementType
  label: string
  ariaLabel: string
  isActive?: (editor: Editor) => boolean
  isDisabled?: (editor: Editor) => boolean
  onClick: (editor: Editor) => void
  variant?: (editor: Editor) => 'secondary' | 'ghost'
}

const toolbarButtons: ToolbarButton[] = [
  {
    key: 'bold',
    icon: Bold,
    label: 'Bold',
    ariaLabel: 'Bold',
    isActive: (editor) => editor.isActive('bold'),
    isDisabled: (editor) => !editor.can().chain().focus().toggleBold().run(),
    onClick: (editor) => editor.chain().focus().toggleBold().run(),
    variant: (editor) => editor.isActive('bold') ? 'secondary' : 'ghost',
  },
  {
    key: 'italic',
    icon: Italic,
    label: 'Italic',
    ariaLabel: 'Italic',
    isActive: (editor) => editor.isActive('italic'),
    isDisabled: (editor) => !editor.can().chain().focus().toggleItalic().run(),
    onClick: (editor) => editor.chain().focus().toggleItalic().run(),
    variant: (editor) => editor.isActive('italic') ? 'secondary' : 'ghost',
  },
  {
    key: 'heading1',
    icon: Heading1,
    label: 'Heading 1',
    ariaLabel: 'Heading 1',
    isActive: (editor) => editor.isActive('heading', { level: 1 }),
    isDisabled: (editor) => !editor.can().chain().focus().toggleHeading({ level: 1 }).run(),
    onClick: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    variant: (editor) => editor.isActive('heading', { level: 1 }) ? 'secondary' : 'ghost',
  },
  {
    key: 'heading2',
    icon: Heading2,
    label: 'Heading 2',
    ariaLabel: 'Heading 2',
    isActive: (editor) => editor.isActive('heading', { level: 2 }),
    isDisabled: (editor) => !editor.can().chain().focus().toggleHeading({ level: 2 }).run(),
    onClick: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    variant: (editor) => editor.isActive('heading', { level: 2 }) ? 'secondary' : 'ghost',
  },
  {
    key: 'heading3',
    icon: Heading3,
    label: 'Heading 3',
    ariaLabel: 'Heading 3',
    isActive: (editor) => editor.isActive('heading', { level: 3 }),
    isDisabled: (editor) => !editor.can().chain().focus().toggleHeading({ level: 3 }).run(),
    onClick: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    variant: (editor) => editor.isActive('heading', { level: 3 }) ? 'secondary' : 'ghost',
  },
  {
    key: 'bulletList',
    icon: List,
    label: 'Bullet List',
    ariaLabel: 'Bullet List',
    isActive: (editor) => editor.isActive('bulletList'),
    isDisabled: (editor) => !editor.can().chain().focus().toggleBulletList().run(),
    onClick: (editor) => editor.chain().focus().toggleBulletList().run(),
    variant: (editor) => editor.isActive('bulletList') ? 'secondary' : 'ghost',
  },
  {
    key: 'orderedList',
    icon: ListOrdered,
    label: 'Numbered List',
    ariaLabel: 'Ordered List',
    isActive: (editor) => editor.isActive('orderedList'),
    isDisabled: (editor) => !editor.can().chain().focus().toggleOrderedList().run(),
    onClick: (editor) => editor.chain().focus().toggleOrderedList().run(),
    variant: (editor) => editor.isActive('orderedList') ? 'secondary' : 'ghost',
  },
  {
    key: 'listItem',
    icon: ListPlus,
    label: 'New List Item',
    ariaLabel: 'New List Item',
    isDisabled: (editor) => !editor.can().chain().focus().splitListItem('listItem').run(),
    onClick: (editor) => editor.chain().focus().splitListItem('listItem').run(),
    variant: () => 'ghost',
  },
  {
    key: 'blockquote',
    icon: Quote,
    label: 'Blockquote',
    ariaLabel: 'Blockquote',
    isActive: (editor) => editor.isActive('blockquote'),
    isDisabled: (editor) => !editor.can().chain().focus().toggleBlockquote().run(),
    onClick: (editor) => editor.chain().focus().toggleBlockquote().run(),
    variant: (editor) => editor.isActive('blockquote') ? 'secondary' : 'ghost',
  },
  {
    key: 'codeBlock',
    icon: Code2,
    label: 'Code Block',
    ariaLabel: 'Code Block',
    isActive: (editor) => editor.isActive('codeBlock'),
    isDisabled: (editor) => !editor.can().chain().focus().toggleCodeBlock().run(),
    onClick: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    variant: (editor) => editor.isActive('codeBlock') ? 'secondary' : 'ghost',
  },
  {
    key: 'alignLeft',
    icon: AlignLeft,
    label: 'Align Left',
    ariaLabel: 'Align Left',
    isActive: (editor) => editor.isActive({ textAlign: 'left' }),
    onClick: (editor) => editor.chain().focus().setTextAlign('left').run(),
    variant: (editor) => editor.isActive({ textAlign: 'left' }) ? 'secondary' : 'ghost',
  },
  {
    key: 'alignCenter',
    icon: AlignCenter,
    label: 'Align Center',
    ariaLabel: 'Align Center',
    isActive: (editor) => editor.isActive({ textAlign: 'center' }),
    onClick: (editor) => editor.chain().focus().setTextAlign('center').run(),
    variant: (editor) => editor.isActive({ textAlign: 'center' }) ? 'secondary' : 'ghost',
  },
  {
    key: 'alignRight',
    icon: AlignRight,
    label: 'Align Right',
    ariaLabel: 'Align Right',
    isActive: (editor) => editor.isActive({ textAlign: 'right' }),
    onClick: (editor) => editor.chain().focus().setTextAlign('right').run(),
    variant: (editor) => editor.isActive({ textAlign: 'right' }) ? 'secondary' : 'ghost',
  },
  {
    key: 'alignJustify',
    icon: AlignJustify,
    label: 'Justify',
    ariaLabel: 'Align Justify',
    isActive: (editor) => editor.isActive({ textAlign: 'justify' }),
    onClick: (editor) => editor.chain().focus().setTextAlign('justify').run(),
    variant: (editor) => editor.isActive({ textAlign: 'justify' }) ? 'secondary' : 'ghost',
  },
  {
    key: 'clearFormatting',
    icon: Eraser,
    label: 'Clear Formatting',
    ariaLabel: 'Clear Formatting',
    onClick: (editor) => editor.chain().focus().clearNodes().run(),
    variant: () => 'ghost',
  },
]

// Enhanced toolbar component using shadcn/ui and lucide icons
export default function MenuBar({ editor }: MenuBarProps) {
  if (!editor) return null

  return (
    <TooltipProvider>
      <div className="flex gap-2 mb-4 bg-muted/40 p-2 rounded border w-fit">
        {toolbarButtons.map((btn) => {
          const Icon = btn.icon
          const isDisabled = btn.isDisabled ? btn.isDisabled(editor) : false
          const variant = btn.variant ? btn.variant(editor) : 'ghost'
          return (
            <Tooltip key={btn.key}>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  size="icon"
                  variant={variant}
                  onClick={() => btn.onClick(editor)}
                  disabled={isDisabled}
                  aria-label={btn.ariaLabel}
                >
                  <Icon className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>{btn.label}</span>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}