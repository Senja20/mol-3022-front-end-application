import { SetStateAction, useState, useCallback } from "react";
import { Inter } from "next/font/google";
import ButtonComponent from "@/components/Button";
import TextArea from "@/components/TextArea";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [inputText, setInputText] = useState("");

  const handleInputChange = useCallback(
    (event: { target: { value: SetStateAction<string> } }) => {
      setInputText(event.target.value);
    },
    []
  );

  const handleSubmit = useCallback(() => {
    console.log("Input text:", inputText);
    // todo: send inputText to server
  }, [inputText]);

  const handleCancel = useCallback(() => {
    setInputText("");
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div>Hello world</div>
        <div className="flex mt-4">
          <TextArea value={inputText} onChange={handleInputChange} />
          <div className="flex flex-col ml-4">
            <ButtonComponent
              onClick={handleSubmit}
              displayText="Submit"
              displayColor="green"
            />
            <ButtonComponent
              onClick={handleCancel}
              displayColor="red"
              displayText="Cancel"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
