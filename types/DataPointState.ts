import { Fasta } from "@/Classes/Fasta";
import { Fastq } from "@/Classes/Fastq";

export interface DataPointState {
  id: string;
  prediction?: boolean;
  completeResponseString: string;
  requestFinished: boolean;
  data: Fasta | Fastq;
}
