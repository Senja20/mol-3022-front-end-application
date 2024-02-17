import { SetStateAction, useState, useCallback } from "react";
import { Inter } from "next/font/google";
import ButtonComponent from "@/components/Button";
import TextArea from "@/components/TextArea";
import { Fasta, FastaParser } from "@/Fasta";
import { Fastq, FastqParser } from "@/Fastq";

const inter = Inter({ subsets: ["latin"] });

const availableFormats = ["Fasta", "FASTQ"];

export default function Home() {
  const [inputText, setInputText] = useState<string>("");
  const [selectedFormat, setSelectedFormat] = useState<string>(
    availableFormats[0]
  );
  const [loading, setLoading] = useState(false);

  const handleInputChange = useCallback(
    (event: { target: { value: SetStateAction<string> } }) => {
      setInputText(event.target.value);
    },
    []
  );

  const handleFormatSelect = useCallback(
    (format: string) => {
      setSelectedFormat(format);
    },
    [selectedFormat]
  );

  const handleSubmit = useCallback(() => {
    setLoading(true);

    const data =
      selectedFormat === "Fasta"
        ? FastaParser.parse(inputText)
        : FastqParser.parse(inputText);

    fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error:", error));
  }, [inputText]);

  const handleCancel = useCallback(() => {
    console.log("Cancelled");
    setInputText("");
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="mb-4">
          {" "}
          <p className="text-lg font-bold mb-2">BioInformatics</p>
          <div className="flex space-x-4">
            {availableFormats.map((format) => (
              <button
                className={`${
                  selectedFormat === format ? "bg-gray-300" : ""
                } px-4 py-2 rounded-md`}
                key={format}
                onClick={() => handleFormatSelect(format)}
              >
                {format}
              </button>
            ))}
          </div>
        </div>
        <div className="flex mt-4">
          <TextArea
            value={inputText}
            onChange={handleInputChange}
            format={selectedFormat || ""}
          />
          <div className="flex flex-col ml-4">
            <ButtonComponent
              onClick={handleSubmit}
              displayText="Submit"
              displayColor="green"
              loading={loading}
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
