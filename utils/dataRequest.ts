import { DataPointState } from "@/types/DataPointState";
import { ResponseFormat } from "@/types/DataResponse";

const sendDataRequest = async (
  dataBody: DataPointState,
  signal: AbortSignal,
  setDataPointStates: React.Dispatch<React.SetStateAction<DataPointState[]>>
) => {
  const urlInference = process.env.API_URL;
  const threshold = process.env.THRESHOLD;

  if (!urlInference) {
    throw new Error("API_URL is not defined");
  }

  if (!threshold) {
    throw new Error("THRESHOLD is not defined");
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
      threshold: +threshold,
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

          console.log(data);

          return {
            ...d,
            requestFinished: true,
            prediction: data.sp > +threshold,
            completeResponseString: JSON.stringify(data),
          };
        });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default sendDataRequest;
