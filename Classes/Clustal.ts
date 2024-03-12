import { FormatClass, FormatParser } from "../types/FormatParser";

class Clustal implements FormatClass {
  private _header: string;
  private _sequence: string;
  private _length: string;

  constructor(header: string, sequence: string, length = "") {
    if (!header) {
      throw new Error("Header is required");
    }

    if (!sequence) {
      throw new Error("Sequence is required");
    }

    this._header = header;
    this._sequence = sequence;
    this._length = length;
  }

  get header(): string {
    return this._header;
  }

  get sequence(): string {
    return this._sequence;
  }

  get length(): string {
    return this._length;
  }
}

class ClustalParser implements FormatParser {
  static parse(input: string): Clustal {
    // split by space or tab
    const lines = input.split("\n");

    if (lines.length < 2) {
      throw new Error(
        `Input must contain CLUSTAL head, empty line and sequence. (3 lines are required, but only ${lines.length} line is provided.)`
      );
    }

    if (lines[0].trim().toLowerCase().includes("clustalw")) {
      throw new Error(
        `Input is not in .clustal format. The first line must start with the words "CLUSTAL W" or "CLUSTALW".`
      );
    }

    // second line must be empty
    if (lines[1].trim() !== "") {
      throw new Error(
        `Input is not in .clustal format. The second line must be empty.`
      );
    }

    // third line must contain the sequence

    const dataLines = lines[2].split(" ");

    if (dataLines.length < 2) {
      throw new Error(
        `Input is not in .clustal format. It must contain at least a header and a sequence. (2 lines are required, but only ${lines.length} line is provided.)`
      );
    }

    const [header, sequence, length] = dataLines;

    return new Clustal(header, sequence, length);
  }

  static parseMultiple(input: string): Clustal[] {
    const lines = input.split("\n");
    const clustalObjects: Clustal[] = [];

    if (lines.length < 2) {
      throw new Error(
        `Input must contain CLUSTAL head, empty line and sequence. (3 lines are required, but only ${lines.length} line is provided.)`
      );
    }

    if (lines[0].trim().toLowerCase().includes("clustalw")) {
      throw new Error(
        `Input is not in .clustal format. The first line must start with the words "CLUSTAL W" or "CLUSTALW".`
      );
    }

    // second line must be empty
    if (lines[1].trim() !== "") {
      throw new Error(
        `Input is not in .clustal format. The second line must be empty.`
      );
    }

    // move all of the lines after index 1
    const dataLines = lines.slice(2);

    for (let i = 0; i < dataLines.length; i++) {
      const [header, sequence, length] = dataLines[i].split(" ");
      clustalObjects.push(new Clustal(header, sequence, length));
    }

    return clustalObjects;
  }

  parse(input: string): Clustal {
    return ClustalParser.parse(input);
  }

  multipleParse(input: string): Clustal[] {
    return ClustalParser.parseMultiple(input);
  }
}

export { Clustal, ClustalParser };
