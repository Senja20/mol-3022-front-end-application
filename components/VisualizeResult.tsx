import React from "react";
import { DataPointState } from "@/types/DataPointState";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

function VisualizeResult({
  dataPointState,
}: {
  dataPointState: DataPointState;
}) {
  const [isLoading, setIsLoading] = useState(!dataPointState.requestFinished);

  useEffect(() => {
    setIsLoading(!dataPointState.requestFinished);
  }, [dataPointState.requestFinished]);

  return (
    <div
      key={dataPointState.id}
      className={`data-point ${
        dataPointState.requestFinished
          ? dataPointState.prediction
            ? "finished-positive"
            : "finished-negative"
          : "pending"
      }`}
    >
      <p color="black">
        <strong>ID:</strong> {dataPointState.id}
      </p>
      <div>
        {isLoading ? (
          <div className="loading-spinner">
            <FaSpinner className="spinner-icon" color="black" />
          </div>
        ) : (
          <div>
            <p>
              <strong>Header:</strong> {dataPointState.data.header}
            </p>
            <p>
              <strong>Sequence:</strong> {dataPointState.data.sequence}
            </p>
            <p>
              <strong>Prediction:</strong>{" "}
              {dataPointState.prediction ? "Yes" : "No"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function VisualizeResultTable({
  dataPointStates,
}: {
  dataPointStates: DataPointState[];
}) {
  return (
    <div className="w-full pt-4">
      {dataPointStates.map((dataPointState) => (
        <div
          key={dataPointState.id}
          className={`data-point ${
            dataPointState.requestFinished ? "finished" : "pending"
          }`}
        >
          <VisualizeResult dataPointState={dataPointState} />
        </div>
      ))}
    </div>
  );
}

export default VisualizeResultTable;
