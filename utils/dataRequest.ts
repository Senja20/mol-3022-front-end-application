import { DataPointState } from "@/types/DataPointState";
import { ResponseFormat } from "@/types/DataResponse";

/**
 * @description Sends a request to the server with the data provided
 * @param dataBody (`DataPointState`): The data to be sent to the server
 * @param signal  (`AbortSignal`): The signal to be used to cancel the request
 * @param setDataPointStates  (`React.Dispatch<React.SetStateAction<DataPointState[]>>`): The state setter function to update the state of the data points
 * @returns (`Promise<void>`): A promise that resolves when the request is finished
 */
const sendDataRequest = async (
  dataBody: DataPointState,
  signal: AbortSignal,
  setDataPointStates: React.Dispatch<React.SetStateAction<DataPointState[]>>,
  threshold: number
) => {
  const urlInference = process.env.API_URL;

  if (!urlInference) {
    throw new Error("API_URL is not defined");
  }

  return fetch(urlInference, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
    body: JSON.stringify({
      header: dataBody.data.header,
      sequence: dataBody.data.sequence,
    }),
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
            prediction: data.sp > threshold,
            completeResponseString: JSON.stringify(data),
            result: data,
          };
        });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default sendDataRequest;
