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

// Enhanced toolbar component using shadcn/ui and lucide icons
export default function MenuBar({ editor }: MenuBarProps) {
  if (!editor) return null

  return (
    <TooltipProvider>
      <div className="flex gap-2 mb-4 bg-muted/40 p-2 rounded border w-fit">
        {/* Bold */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant={editor.isActive('bold') ? 'secondary' : 'ghost'}
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              aria-label="Bold"
            >
              <Bold className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Bold</span>
          </TooltipContent>
        </Tooltip>
        {/* Italic */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant={editor.isActive('italic') ? 'secondary' : 'ghost'}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              aria-label="Italic"
            >
              <Italic className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Italic</span>
          </TooltipContent>
        </Tooltip>
        {/* Heading 1 */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant={editor.isActive('heading', { level: 1 }) ? 'secondary' : 'ghost'}
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}
              aria-label="Heading 1"
            >
              <Heading1 className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Heading 1</span>
          </TooltipContent>
        </Tooltip>
        {/* Heading 2 */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant={editor.isActive('heading', { level: 2 }) ? 'secondary' : 'ghost'}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
              aria-label="Heading 2"
            >
              <Heading2 className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Heading 2</span>
          </TooltipContent>
        </Tooltip>
        {/* Heading 3 */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant={editor.isActive('heading', { level: 3 }) ? 'secondary' : 'ghost'}
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              disabled={!editor.can().chain().focus().toggleHeading({ level: 3 }).run()}
              aria-label="Heading 3"
            >
              <Heading3 className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Heading 3</span>
          </TooltipContent>
        </Tooltip>
        {/* Bullet List */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant={editor.isActive('bulletList') ? 'secondary' : 'ghost'}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              disabled={!editor.can().chain().focus().toggleBulletList().run()}
              aria-label="Bullet List"
            >
              <List className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Bullet List</span>
          </TooltipContent>
        </Tooltip>
        {/* Ordered List */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant={editor.isActive('orderedList') ? 'secondary' : 'ghost'}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              disabled={!editor.can().chain().focus().toggleOrderedList().run()}
              aria-label="Ordered List"
            >
              <ListOrdered className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Numbered List</span>
          </TooltipContent>
        </Tooltip>
        {/* List Item */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => editor.chain().focus().splitListItem('listItem').run()}
              disabled={!editor.can().chain().focus().splitListItem('listItem').run()}
              aria-label="New List Item"
            >
              <ListPlus className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>New List Item</span>
          </TooltipContent>
        </Tooltip>
        {/* Blockquote */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant={editor.isActive('blockquote') ? 'secondary' : 'ghost'}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              disabled={!editor.can().chain().focus().toggleBlockquote().run()}
              aria-label="Blockquote"
            >
              <Quote className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Blockquote</span>
          </TooltipContent>
        </Tooltip>
        {/* Code Block */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant={editor.isActive('codeBlock') ? 'secondary' : 'ghost'}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
              aria-label="Code Block"
            >
              <Code2 className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Code Block</span>
          </TooltipContent>
        </Tooltip>
        {/* Text Alignment: Left */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant={editor.isActive({ textAlign: 'left' }) ? 'secondary' : 'ghost'}
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              aria-label="Align Left"
            >
              <AlignLeft className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Align Left</span>
          </TooltipContent>
        </Tooltip>
        {/* Text Alignment: Center */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant={editor.isActive({ textAlign: 'center' }) ? 'secondary' : 'ghost'}
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              aria-label="Align Center"
            >
              <AlignCenter className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Align Center</span>
          </TooltipContent>
        </Tooltip>
        {/* Text Alignment: Right */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant={editor.isActive({ textAlign: 'right' }) ? 'secondary' : 'ghost'}
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              aria-label="Align Right"
            >
              <AlignRight className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Align Right</span>
          </TooltipContent>
        </Tooltip>
        {/* Text Alignment: Justify */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant={editor.isActive({ textAlign: 'justify' }) ? 'secondary' : 'ghost'}
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              aria-label="Align Justify"
            >
              <AlignJustify className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Justify</span>
          </TooltipContent>
        </Tooltip>
        {/* Clear Formatting */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => editor.chain().focus().clearNodes().run()}
              aria-label="Clear Formatting"
            >
              <Eraser className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Clear Formatting</span>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}