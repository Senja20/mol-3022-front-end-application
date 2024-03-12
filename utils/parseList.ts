import { ClustalParser } from "@/Classes/Clustal";
import { FastaParser } from "@/Classes/Fasta";
import { FastqParser } from "@/Classes/Fastq";
import { Format, FormatInstanceList } from "@/types/Format";

const availableFormats: Format[] = ["Fasta", "FASTQ", "Clustal"];

const parserList: Record<Format, (input: string) => FormatInstanceList> = {
  Fasta: FastaParser.parseMultiple,
  FASTQ: FastqParser.parseMultiple,
  Clustal: ClustalParser.parseMultiple,
};

export default parserList;
export { availableFormats };
