import { Button } from "@/src/shadcn/components/ui/button";
import { FileText, Plus } from "lucide-react";

interface FallbackMessageProps {
  addPage: () => void;
}

const FallbackMessage: React.FC<FallbackMessageProps> = ({ addPage }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center bg-gray-50 rounded-lg shadow-inner p-8">
      <div className="flex flex-col items-center gap-3 mb-6">
        <FileText className="w-12 h-12 text-gray-400" />
        <h2 className="text-2xl font-semibold text-gray-700">No Pages Yet</h2>
        <p className="text-gray-500 max-w-md">
          You haven't added any pages to this lesson. Start by creating your first page to begin building your lesson content.
        </p>
      </div>
      <Button
        onClick={addPage}
        className="flex items-center gap-2 px-6 py-2 text-base font-medium bg-blue-600 hover:bg-blue-700 transition text-white rounded"
        size="lg"
      >
        <Plus className="w-5 h-5" />
        Add First Page
      </Button>
    </div>
  );
};

export default FallbackMessage;
