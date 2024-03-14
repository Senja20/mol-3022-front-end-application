import { ClustalParser } from "@/Classes/Clustal";
import { FastaParser } from "@/Classes/Fasta";
import { FastqParser } from "@/Classes/Fastq";
import { Format, FormatInstanceList } from "@/types/Format";

const availableFormats: Format[] = ["Fasta", "FASTQ", "Clustal"];

/**
 * @description A list of parsers for different formats
 * @type {Record<Format, (input: string) => FormatInstanceList>}
 * @property {Format} - The format of the input
 * @property {(input: string) => FormatInstanceList} - The parser function
 * @returns {FormatInstanceList} - The list of instances of the provided format
 * @example parserList["Fasta"](">")
 */
const parserList: Record<Format, (input: string) => FormatInstanceList> = {
  Fasta: FastaParser.parseMultiple,
  FASTQ: FastqParser.parseMultiple,
  Clustal: ClustalParser.parseMultiple,
};

export default parserList;
export { availableFormats };
