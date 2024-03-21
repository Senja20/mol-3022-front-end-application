import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { Inter } from "next/font/google";
import ButtonComponent from "@/components/Button";
import TextArea from "@/components/TextArea";
import { DataPointState } from "@/types/DataPointState";
import VisualizeResultTable from "@/components/VisualizeResult";
import { Format, FormatInstance } from "@/types/Format";
import { availableFormats } from "@/utils/parseList";
import convertToFasta from "@/utils/convertToFasta";
import sendDataRequest from "@/utils/dataRequest";
import { Slider } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [inputText, setInputText] = useState<string>("");
  const [selectedFormat, setSelectedFormat] = useState<Format>(
    availableFormats[0]
  );

  const selectedFormatRef = useRef(selectedFormat);

  const [loading, setLoading] = useState(false);

  const [dataPointStates, setDataPointStates] = useState<DataPointState[]>([]);

  const abortController = useMemo(() => new AbortController(), []);

  const [threshold, setThreshold] = useState<number>(90);

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
  }, []);

  const handleSubmit = useCallback(() => {
    setLoading(true);

    const data = convertToFasta(inputText, selectedFormatRef);

    const initialDataPointStates = data.map(
      (d: FormatInstance, index: number) => {
        return {
          id: index + "",
          data: d,
          requestFinished: false,
          completeResponseString: "",
          result: {
            sp: 0,
            no_sp: 0,
          },
        };
      }
    );

    if (initialDataPointStates.length === 0) {
      setLoading(false);
      return;
    }

    setDataPointStates(initialDataPointStates);

    const promises = initialDataPointStates.map((d: DataPointState) => {
      return sendDataRequest(
        d,
        abortController.signal,
        setDataPointStates,
        threshold / 100
      );
    });

    Promise.all(promises).then(() => {
      setLoading(false);
    });
  }, [inputText, abortController.signal, threshold]); // this makes sure that the function is re-created only when the inputText and threshold changes

  const handleCancel = useCallback(() => {
    console.log("Cancelled");
    abortController.abort();
    setLoading(false);
  }, [abortController]);

  return (
    <main
      className={`flex flex-col items-center justify-between p-4 lg:p-24 ${inter.className}`}
    >
      <div className="max-w-5xl w-full">
        <div className="">
          <Slider
            label="Select a threshold"
            color="foreground"
            size="sm"
            step={5}
            marks={[
              {
                value: 20,
                label: "20%",
              },
              {
                value: 50,
                label: "50%",
              },
              {
                value: 80,
                label: "80%",
              },
            ]}
            defaultValue={90}
            className="max-w-md mx-auto mr-4"
            onChange={(e: number | number[]) => {
              if (Array.isArray(e)) {
                return;
              }
              setThreshold(e);
            }}
          />
        </div>
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
