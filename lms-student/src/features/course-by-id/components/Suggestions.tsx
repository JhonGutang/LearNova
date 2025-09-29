import { suggestions } from "@/mock/Courses"

const Suggestions:React.FC = () => {
    return (
        <div className="mt-2">
            <div className="font-semibold text-sm mb-2 ml-1 text-gray-700">Suggestions for you</div>
            <div className="overflow-x-auto scrollbar-thin">
              <div className="flex gap-3 min-w-full">
                {suggestions.map((s, idx) => (
                  <div
                    key={idx}
                    className="min-w-[200px] max-w-[220px] bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col items-start gap-2 shrink-0"
                  >
                    <img src={s.icon} alt="" className="w-7 h-7 mb-1" />
                    <div className="font-medium text-gray-800 text-sm">{s.title}</div>
                    <div className="text-xs text-gray-500">{s.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
    )
}

export default Suggestions