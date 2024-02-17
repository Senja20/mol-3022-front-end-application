import { Fasta } from "@/Fasta";
import { Fastq } from "@/Fastq";

export interface DataPointState {
  id: string;
  prediction?: boolean;
  completeResponseString: string;
  requestFinished: boolean;
  data: Fasta | Fastq;
}
