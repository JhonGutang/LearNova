'use client'

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

interface SearchbarProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
  inputClassName?: string;
  autoFocus?: boolean;
  disabled?: boolean;
}

const Searchbar: React.FC<SearchbarProps> = ({
  value,
  placeholder = "Search...",
  onChange,
  onSearch,
  className = "",
  inputClassName = "",
  autoFocus = false,
  disabled = false,
}) => {
  const [internalValue, setInternalValue] = useState(value || "");

  React.useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(internalValue);
  };

  return (
    <form
      className={`w-full max-w-md ${className}`}
      onSubmit={handleSubmit}
      role="search"
    >
      <div className="relative flex items-center w-full ">
        <Input
          type="text"
          className={`pr-12 flex-1 min-w-[320px] min-h-[40px] px-5 py-3 ${inputClassName}`}
          placeholder={placeholder}
          value={internalValue}
          onChange={handleInputChange}
          autoFocus={autoFocus}
          disabled={disabled}
          aria-label="Search"
        />
        <Button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 flex items-center justify-center rounded-md bg-teal-600 hover:bg-teal-700 text-white"
          disabled={disabled}
          aria-label="Submit search"
          variant="default"
          tabIndex={0}
        >
          <SearchIcon className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default Searchbar;
