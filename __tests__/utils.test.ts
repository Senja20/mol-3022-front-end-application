import parserList from "../utils/parseList";
import { Fasta } from "../Classes/Fasta";

describe("parse", () => {
  it("one element in the provided data", () => {
    const header = "EUKARYA";
    const sequence =
      "MAPTLFQKLFSKRTGLGAPGRDARDPDCGFSWPLPEFDPSQIRLIVYQDCERRGRNVLFDSSVKRRNEDI";

    const combined_sequence_1 = `>${header}\n${sequence}`;
    expect(parserList["Fasta"](combined_sequence_1)).toEqual(
      new Fasta(header, sequence)
    );
  });

  it("two elements in the provided data", () => {
    const header1 = "EUKARYA";
    const sequence1 =
      "MAPTLFQKLFSKRTGLGAPGRDARDPDCGFSWPLPEFDPSQIRLIVYQDCERRGRNVLFDSSVKRRNEDI";

    const header2 = "BACTERIA";
    const sequence2 =
      "MAPTLFQKLFSKRTGLGAPGRDARDPDCGFSWPLPEFDPSQIRLIVYQDCERRGRNVLFDSSVKRRNEDI";

    const combined_sequence_2 = `>${header1}\n${sequence1}\n>${header2}\n${sequence2}`;
    expect(parserList["Fasta"](combined_sequence_2)).toEqual([
      new Fasta(header1, sequence1),
      new Fasta(header2, sequence2),
    ]);
  });

  it("10 elements in the provided data", () => {
    const header = "EUKARYA";
    const sequence =
      "MAPTLFQKLFSKRTGLGAPGRDARDPDCGFSWPLPEFDPSQIRLIVYQDCERRGRNVLFDSSVKRRNEDI";
    let sequences = "";
    for (let i = 0; i < 10; i++) {
      const combined_sequence_3 = `>${header}\n${sequence}`;
      sequences += combined_sequence_3;
      console.log(combined_sequence_3);
      if (i !== 9) {
        sequences += "\n";
      }
    }
    expect(parserList["Fasta"](sequences)).toEqual(
      Array(10).fill(new Fasta(header, sequence))
    );
  });

  it("failed because lacking >", () => {
    const header = "EUKARYA";
    const sequence =
      "MAPTLFQKLFSKRTGLGAPGRDARDPDCGFSWPLPEFDPSQIRLIVYQDCERRGRNVLFDSSVKRRNEDI";

    const combined_sequence_4 = `${header}\n${sequence}`;
    expect(() => parserList["Fasta"](combined_sequence_4)).toThrow(
      new Error(
        `Input is not in .fasta format. Lack of '>' at the beginning of the header.`
      )
    );
  });

  it("failed because lacking sequence", () => {
    const header = "EUKARYA";

    const combined_sequence_5 = `>${header}`;
    expect(() => parserList["Fasta"](combined_sequence_5)).toThrow(
      new Error(
        `Input is not in .fasta format. It must contain at least a header and a sequence. (2 lines are required, but only 1 line is provided.)`
      )
    );
  });

  it("failed because lacking sequence", () => {
    const header = "EUKARYA";

    const combined_sequence_6 = `>${header}\n`;
    expect(() => parserList["Fasta"](combined_sequence_6)).toThrow(
      new Error(`Sequence is required`)
    );
  });
});
