import React from "react";

const CategoryChip: React.FC<{ active?: boolean; onClick?: () => void; label: string }> = ({
  active,
  onClick,
  label,
}) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-2 rounded-lg
      cursor-pointer
      text-sm font-medium transition-all duration-150
      flex items-center justify-center
      ${active 
        ? "bg-[#F0F2F5] text-[#333333] border-none"
        : "bg-white text-[#666666] border border-[#E0E0E0] hover:bg-gray-50"}
      focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1
    `}
    style={{ minHeight: 40 }}
  >
    {label}
  </button>
);

const EnrolledChip: React.FC = () => (
  <span className="bg-green-50 text-green-900 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-green-300 ml-2 flex items-center shadow-sm">
    <svg
      className="w-3.5 h-3.5 mr-1 text-green-600"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path fillRule="evenodd" d="M16.707 6.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0l-3.535-3.536a1 1 0 111.414-1.414l2.828 2.829 6.364-6.364a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
    Enrolled
  </span>
);

// Parent Chip function/component
type ChipProps = 
  | { type: 'enrolled' }
  | { type: 'category'; active?: boolean; onClick?: () => void; label: string };

export const Chip: React.FC<ChipProps> = (props) => {
  if (props.type === 'enrolled') {
    return <EnrolledChip />;
  } else {
    const { active, onClick, label } = props;
    return <CategoryChip active={active} onClick={onClick} label={label} />;
  }
};
