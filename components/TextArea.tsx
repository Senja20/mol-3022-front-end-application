import { ChangeEvent } from "react";

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
      className="p-2 border border-gray-300 rounded-md w-full h-64 resize-none focus:outline-none focus:border-blue-500 text-sm"
      placeholder={`Enter your protein string in ${format} format...`}
      value={value}
      onChange={onChange}
      onInput={onChange}
      style={{ width: "100%", maxWidth: "100%" }}
    ></textarea>
  );
};

export default TextArea;
