import { ChangeEvent, useState } from "react";

const TextArea = ({
  value,
  onChange,
  format,
}: {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  format: string;
}) => {
  return (
    <textarea
      className="p-2 border border-gray-300 rounded-md w-full h-48 resize-none focus:outline-none focus:border-blue-500"
      placeholder={`Enter your protein string in ${format} format...`}
      value={value}
      onChange={onChange}
    ></textarea>
  );
};

export default TextArea;
