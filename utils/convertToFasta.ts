import { Fasta } from "@/Classes/Fasta";
import parserList, { availableFormats } from "./parseList";
import { MutableRefObject } from "react";
import { Format } from "@/types/Format";

/**
 * @description Convert the provided data to fasta format
 * @param data - the list of provided data in some format
 * @param selectedFormatRef - the reference to the selected format
 * @returns the list of data in fasta format
 */
function convertToFasta(
  InputText: string,
  selectedFormatRef: MutableRefObject<Format>
) {
  const data = parserList[selectedFormatRef.current](InputText);
  if (selectedFormatRef.current !== availableFormats[0]) {
    return data.map((d) => {
      return new Fasta(d.header, d.sequence);
    });
  }

  return data;
}

export default convertToFasta;
