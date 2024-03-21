import React from "react";
import { DataPointState } from "@/types/DataPointState";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

function VisualizeResult({
  dataPointState,
}: {
  dataPointState: DataPointState;
}) {
  const [isLoading, setIsLoading] = useState(!dataPointState.requestFinished);
  const [isExpanded, setIsExpanded] = useState(false);

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
          <div className="result-content">
            <div className="content-header">
              {isExpanded ? (
                <GoChevronDown onClick={() => setIsExpanded(false)} />
              ) : (
                <GoChevronUp onClick={() => setIsExpanded(true)} />
              )}
            </div>
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
            {isExpanded && (
              <div className="data-point">
                <strong>Result:</strong>

                <p className="relative left-5">
                  <li>sp: {dataPointState.result.sp.toFixed(3)}</li>
                  <li>no sp: {dataPointState.result.no_sp.toFixed(3)}</li>
                </p>

                <strong>Format:</strong>
                <p className="relative left-5">
                  {(dataPointState.data.format as string).toUpperCase()}
                </p>
              </div>
            )}
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
