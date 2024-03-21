import { FormatInstance, FormatInstanceList } from "./Format";

export interface FormatClass {
  header: string;
  sequence: string;
  format: string;
}

export interface FormatParser {
  parse(input: string): FormatInstance;
  multipleParse(input: string): FormatInstanceList;
}
