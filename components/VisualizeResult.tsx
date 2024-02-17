import { DataPointState } from "@/types/DataPointState";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

function VisualizeResult({
  dataPointStates,
}: {
  dataPointStates: DataPointState[];
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full pt-4">
      {dataPointStates.map((dataPointState) => (
        <div
          key={dataPointState.id}
          className={`data-point ${
            dataPointState.requestFinished ? "finished" : "pending"
          }`}
        >
          <p>
            <strong>ID:</strong> {dataPointState.id}
          </p>
          <div className="loading-spinner">
            <FaSpinner className="spinner-icon" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default VisualizeResult;
