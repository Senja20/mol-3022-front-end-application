import { ChangeEvent, useState } from "react";

const TextArea = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <textarea
      className="p-2 border border-gray-300 rounded-md w-full h-48 resize-none focus:outline-none focus:border-blue-500"
      placeholder="Enter your protein string in .fasta format..."
      value={value}
      onChange={onChange}
    ></textarea>
  );
};

export default TextArea;
