import { SetStateAction, useState, useCallback, useEffect } from "react";
import { Inter } from "next/font/google";
import ButtonComponent from "@/components/Button";
import TextArea from "@/components/TextArea";
import { Fasta, FastaParser } from "@/Fasta";
import { Fastq, FastqParser } from "@/Fastq";
import { DataPointState } from "@/types/DataPointState";

const inter = Inter({ subsets: ["latin"] });

const availableFormats = ["Fasta", "FASTQ"];

export default function Home() {
  const [inputText, setInputText] = useState<string>("");
  const [selectedFormat, setSelectedFormat] = useState<string>(
    availableFormats[0]
  );
  const [loading, setLoading] = useState(false); // track the loading state

  const [dataPointStates, setDataPointStates] = useState<DataPointState[]>([]);

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
        ? FastaParser.parseMultiple(inputText)
        : FastqParser.parseMultiple(inputText);

    const updatedDataPointStates = data.map(
      (d: Fasta | Fastq, index: number) => {
        return {
          id: index + "",
          data: d,
          requestFinished: false,
          completeResponseString: "",
        };
      }
    );

    console.log(updatedDataPointStates);

    setDataPointStates(updatedDataPointStates);

    const promises = updatedDataPointStates.map((d: DataPointState) =>
      sendDataRequest(d)
    );

    // how to check if all promises are resolved
    Promise.all(promises)
      .then(() => {
        console.log("All requests are resolved");
        console.log(dataPointStates);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setInputText("");
        setLoading(false);
      });
  }, [inputText]);

  const sendDataRequest = (dataBody: DataPointState) => {
    return new Promise((resolve, reject) => {
      fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: dataBody }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // find the dataPointState that matches the id
          const updatedDataPointStates = dataPointStates.map((d) =>
            d.id === dataBody.id
              ? {
                  ...d,
                  requestFinished: true,
                  completeResponseString: JSON.stringify(data),
                  prediction: data.prediction,
                }
              : d
          );

          if (updatedDataPointStates) {
            setDataPointStates(updatedDataPointStates);
          }

          resolve(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          reject(error);
        });
    });
  };

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
