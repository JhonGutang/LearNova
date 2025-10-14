import { Button } from "@/components/ui/button"

interface NavigationProps {
    goToPrevPage: () => void,
    goToNextPage: () => void,
    currentPage: number,
    totalPages: number,
    handleFinishLesson: () => void
}

const Navigation: React.FC<NavigationProps> = ({
    goToPrevPage,
    goToNextPage,
    currentPage,
    totalPages,
    handleFinishLesson
}) => {
    const isLastPage = currentPage === totalPages - 1;
    const handleNextOrFinish = () => {
        if (isLastPage) {
            handleFinishLesson()
        } else {
            goToNextPage();
        }
    }
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
                onClick={handleNextOrFinish}
                variant="outline"
            >
                {isLastPage ? "Finish" : "Next"}
            </Button>
        </div>
    );
}

export default Navigation