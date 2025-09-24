import React from 'react';

type ChipToggleProps = {
    option: string;
    isSelected: boolean;
    onToggle: () => void;
};

const ChipToggle: React.FC<ChipToggleProps> = ({ option, isSelected, onToggle }) => {
    return (
        <button
            type="button"
            key={option}
            onClick={onToggle}
            className={`chip transition
        ${isSelected
                    ? "chip chip-primary"
                    : "chip chip-default"
                }`}
            aria-pressed={isSelected}
        >
            {option}
            {isSelected && (
                <span className="ml-1 text-xs align-middle">&#10005;</span>
            )}
        </button>
    )
};

export default ChipToggle;
