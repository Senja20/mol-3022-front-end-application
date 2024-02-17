class Fastq {
  private _header: string;
  private _sequence: string;
  private _quality: string;

  constructor(header: string, sequence: string, quality: string) {
    if (!header) {
      throw new Error("Header is required");
    }

    if (!sequence) {
      throw new Error("Sequence is required");
    }

    if (!quality) {
      throw new Error("Quality is required");
    }

    this._header = header;
    this._sequence = sequence;
    this._quality = quality;
  }

  get header(): string {
    return this._header;
  }

  get sequence(): string {
    return this._sequence;
  }

  get quality(): string {
    return this._quality;
  }
}

class FastqParser {
  /**
   * [parse description] Parses a string in .fastq format and returns a Fastq object.
   * @param {string} input
   * @returns {Fastq} A Fastq object
   */
  static parse(input: string): Fastq {
    if (input.split("\n").length < 4) {
      throw new Error(
        `Input is not in .fastq format. It must contain at least a header, a sequence, a '+' and a quality. (4 lines are required, but only ${
          input.split("\n").length
        } line is provided.)`
      );
    }

    const [header, sequence, plus, quality] = input.split("\n");
    return new Fastq(header, sequence, quality);
  }

  /**
   * [parseMultiple description] Parses a string in .fastq format and returns an array of Fastq objects.
   * @param {string} input
   * @returns {Fastq[]} An array of Fastq objects
   */
  static parseMultiple(input: string): Fastq[] {
    const lines = input.split("\n");
    const fastqObjects: Fastq[] = [];

    for (let i = 0; i < lines.length; i += 4) {
      const [header, sequence, plus, quality] = lines.slice(i, i + 4);
      fastqObjects.push(new Fastq(header, sequence, quality));
    }

    return fastqObjects;
  }
}

export { Fastq, FastqParser };
