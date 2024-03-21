import { FormatInstance } from "./Format";
import { ResponseFormat } from "./DataResponse";
export interface DataPointState {
  id: string;
  prediction?: boolean;
  completeResponseString: string;
  requestFinished: boolean;
  data: FormatInstance;
  result: ResponseFormat;
}
