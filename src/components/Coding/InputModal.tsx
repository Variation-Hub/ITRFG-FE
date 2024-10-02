import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";

interface InputModalProps {
  closeWindow: () => void;
  code: string;
}

const InputModal: React.FC<InputModalProps> = ({ closeWindow, code }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleCompileRun = () => {};

  return (
    <div className="question-container coding-scrollbar h-full overflow-y-auto border-r border-gray-300 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Output Window</h1>
        <div className="cursor-pointer" onClick={closeWindow}>
          <RxCross1 clasName="h-8 w-5 font-bold" />
        </div>
      </div>
      <div>
        <div className="flex flex-col">
          <label>Input:</label>
          <textarea
            placeholder="Please add your inputs"
            rows={6}
            className="w-64 border border-slate-200 p-2 text-sm outline-none"
          />
        </div>

        <div className="mt-4 flex flex-col">
          <label>Output:</label>
          <textarea
            placeholder="Your output will be visible here..."
            rows={6}
            className="w-64 border border-slate-200 p-2 text-sm outline-none"
            readOnly
          />
        </div>

        <button
          className="mx-auto mt-4 rounded-md bg-green-500 px-4 py-1 font-bold text-white hover:bg-green-400"
          onClick={handleCompileRun}
        >
          Compile & Run
        </button>
      </div>
    </div>
  );
};

export default InputModal;
