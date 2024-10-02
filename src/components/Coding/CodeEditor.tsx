import React from "react";
import MonacoEditor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  onCodeChange: (newCode: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onCodeChange }) => {
  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode !== undefined) {
      onCodeChange(newCode);
    }
  };

  return (
    <div className="code-editor-container h-full flex-1 overflow-y-auto px-4 py-1">
      <MonacoEditor
        height="100%"
        theme="vs-dark"
        language="javascript"
        value={code}
        onChange={handleCodeChange}
      />
    </div>
  );
};

export default CodeEditor;
