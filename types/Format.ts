import { Clustal } from "@/Classes/Clustal";
import { Fasta } from "@/Classes/Fasta";
import { Fastq } from "@/Classes/Fastq";

export type Format = "Fasta" | "FASTQ" | "Clustal";
export type FormatInstanceList = Fasta[] | Fastq[] | Clustal[];
export type FormatInstance = Fasta | Fastq | Clustal;
