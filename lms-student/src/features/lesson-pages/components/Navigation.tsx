import { Button } from "@/components/ui/button"

interface NavigationProps {
    goToPrevPage: () => void,
    goToNextPage: () => void,
    currentPage: number,
    totalPages: number,
    
}

const Navigation: React.FC<NavigationProps> = ({goToPrevPage, goToNextPage, currentPage, totalPages}) => {
    return (
        <div className="flex justify-between items-center px-10">
        <Button
          onClick={goToPrevPage}
          disabled={currentPage === 0}
          variant="outline"
        >
          Previous
        </Button>
        <span className="text-gray-500">
          Page {currentPage + 1} of {totalPages}
        </span>
        <Button
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
          variant="outline"
        >
          Next
        </Button>
      </div>
    )
}

export default Navigation