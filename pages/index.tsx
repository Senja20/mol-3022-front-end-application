import { useState, useCallback, useRef, useEffect } from "react";
import { Inter } from "next/font/google";
import ButtonComponent from "@/components/Button";
import TextArea from "@/components/TextArea";
import { Fasta, FastaParser } from "@/Classes/Fasta";
import { Fastq, FastqParser } from "@/Classes/Fastq";
import { Clustal, ClustalParser } from "@/Classes/Clustal";
import { DataPointState } from "@/types/DataPointState";
import { ResponseFormat } from "@/types/DataResponse";
import VisualizeResultTable from "@/components/VisualizeResult";
import { Format, FormatInstance, FormatInstanceList } from "@/types/Format";

const inter = Inter({ subsets: ["latin"] });

const parserList: Record<Format, (input: string) => FormatInstanceList> = {
  Fasta: FastaParser.parseMultiple,
  FASTQ: FastqParser.parseMultiple,
  Clustal: ClustalParser.parseMultiple,
};

const availableFormats: Format[] = ["Fasta", "FASTQ", "Clustal"];

export default function Home() {
  const [inputText, setInputText] = useState<string>("");
  const [selectedFormat, setSelectedFormat] = useState<Format>(
    availableFormats[0]
  );

  const selectedFormatRef = useRef(selectedFormat);

  const [loading, setLoading] = useState(false);

  const [dataPointStates, setDataPointStates] = useState<DataPointState[]>([]);

  const abortController = new AbortController();

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputText(event.target.value);
    },
    []
  );

  useEffect(() => {
    selectedFormatRef.current = selectedFormat;
  }, [selectedFormat]);

  const handleFormatSelect = useCallback((format: Format) => {
    setSelectedFormat(format);
    console.log("Selected format:", format);
  }, []);

  const handleReset = useCallback(() => {
    setInputText("");
    setDataPointStates([]);
  }, [inputText]);

  const handleSubmit = useCallback(() => {
    setLoading(true);

    const data = parserList[selectedFormatRef.current](inputText);

    const initialDataPointStates = data.map(
      (d: FormatInstance, index: number) => {
        return {
          id: index + "",
          data: d,
          requestFinished: false,
          completeResponseString: "",
        };
      }
    );

    if (initialDataPointStates.length === 0) {
      setLoading(false);
      return;
    }

    setDataPointStates(initialDataPointStates);

    const promises = initialDataPointStates.map((d: DataPointState) => {
      return sendDataRequest(d, abortController.signal);
    });

    Promise.all(promises).then(() => {
      setLoading(false);
    });
  }, [inputText]);

  const sendDataRequest = (dataBody: DataPointState, signal: AbortSignal) => {
    return fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal,
      body: JSON.stringify({ data: dataBody }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: ResponseFormat) => {
        setDataPointStates((prevState) => {
          return prevState.map((d) => {
            if (d.id !== dataBody.id) {
              return d;
            }

            return {
              ...d,
              requestFinished: true,
              prediction: data.prediction,
              completeResponseString: JSON.stringify(data),
            };
          });
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCancel = useCallback(() => {
    console.log("Cancelled");
    abortController.abort();
    setLoading(false);
  }, []);

  return (
    <main
      className={`flex flex-col items-center justify-between p-4 lg:p-24 ${inter.className}`}
    >
      <div className="max-w-5xl w-full">
        <p className="text-lg font-bold mb-2">BioInformatics</p>
        <div className="flex space-x-4 mb-4">
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
        <div className="flex flex-col lg:flex-row">
          <div className="flex-grow">
            {" "}
            <TextArea
              value={inputText}
              onChange={handleInputChange}
              format={selectedFormat || ""}
            />
          </div>
          <div className="flex flex-col lg:flex-col justify-center ml-0 lg:ml-4 mt-4 lg:mt-0">
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
            <ButtonComponent
              onClick={handleReset}
              displayColor="blue"
              displayText="Reset"
            />
          </div>
        </div>
      </div>
      <VisualizeResultTable dataPointStates={dataPointStates} />
    </main>
  );
}
