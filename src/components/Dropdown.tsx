import React, { useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";

const Dropdown: React.FC<{
  label: string;
  options: string[];
  selectedOption: string;
  onChange: (selectedOption: string) => void;
  className?: string;
}> = ({ label, options, selectedOption, onChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: Event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current?.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`${className}`}>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-600"
      >
        {label}
      </label>
      <div
        ref={dropdownRef}
        className={`relative w-52 ${isOpen ? "z-10" : ""}`}
      >
        <button
          type="button"
          className={`border outline-none ${
            isOpen ? "border-indigo-500" : "border-gray-300"
          } flex w-full items-center justify-between rounded-md p-2 focus:ring-indigo-500 sm:text-sm`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption || "Select a option"}

          <BiChevronDown style={{ fontSize: "1.2rem" }} />
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg">
            <ul>
              {/* <li
                className="cursor-not-allowed p-2 bg-indigo-100"
                onClick={() => setIsOpen(false)}
              >
                Select
              </li> */}
              {options.map((option, index) => (
                <li
                  key={index}
                  className="cursor-pointer p-2 hover:bg-indigo-100"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
