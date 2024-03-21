import { FormatInstance } from "./Format";

export interface DataPointState {
  id: string;
  prediction?: boolean;
  completeResponseString: string;
  requestFinished: boolean;
  data: FormatInstance;
  result: {
    sp: number;
    no_sp: number;
  };
}
