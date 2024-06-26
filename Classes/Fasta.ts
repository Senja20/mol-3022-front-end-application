class Fasta {
  private _header: string;
  private _sequence: string;
  private _format = "Fasta";

  /**
   * [constructor description] Creates a Fasta object.
   * @param {string} header
   * @param {string} sequence
   * @throws {Error} Header is required
   * @throws {Error} Sequence is required
   * @returns {void}
   * @example
   * const fasta = new Fasta(">header", "sequence");
   */
  constructor(header: string, sequence: string) {
    if (!header) {
      throw new Error("Header is required");
    }

    if (!sequence) {
      throw new Error("Sequence is required");
    }

    this._header = header;
    this._sequence = sequence;
  }

  get header(): string {
    return this._header;
  }

  get sequence(): string {
    return this._sequence;
  }

  get format(): string {
    return this._format;
  }
}

class FastaParser {
  /**
   * [parse description] Parses a string in .fasta format and returns a Fasta object.
   * @param {string}
   * @throws {Error} Input is required
   * @throws {Error} Input is not in .fasta format. Lack of '>' at the beginning of the header.
   **/
  static parse(input: string): Fasta {
    // lacks header and sequence
    if (input.split("\n").length < 2) {
      throw new Error(
        `Input is not in .fasta format. It must contain at least a header and a sequence. (2 lines are required, but only ${
          input.split("\n").length
        } line is provided.)`
      );
    }

    const [header, sequence] = input.split("\n");
    return new Fasta(header, sequence);
  }

  /**
   * [parseMultiple description] Parses a string in .fasta format and returns an array of Fasta objects.
   * @param {string} input - A string in .fasta format
   * @throws {Error} Input is required
   * @throws {Error} Input is not in .fasta format. Lack of '>' at the beginning of the header.
   * @example
   * parseMultiple(`>header1 \n sequence1 \n >header2 \n sequence2`);
   **/
  static parseMultiple(input: string): Fasta[] {
    if (!input) {
      throw new Error("Input is required");
    }

    // make sure it starts with ">"
    if (!input.startsWith(">")) {
      throw new Error(
        "Input is not in .fasta format. Lack of '>' at the beginning of the header."
      );
    }

    return input
      .split(">")
      .filter((x) => x)
      .map(FastaParser.parse);
  }
}

export { Fasta, FastaParser };
