# MOL3022 - Front End - Signal Peptide

The project is the front the part of a signal peptide prediction project in the "MOL3022 - Bioinformatics - Method Oriented Project" course. The application is taking data (protein strings) and is sending those string to the backend where it uses those to make predictions, then the application displays the results to the user. This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Prerequisites

Make sure that you have the following installed on your system:

- [Node](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)
- [Next](https://nextjs.org/)
- [React](https://react.dev/)

### Run the application

To get started with the project, follow these steps:

1. Navigate to the project directory: `cd project-directory`
2. Install the dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

In the project directory, you can run the following scripts:

### `npm run dev`

Runs the development server.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser (as mentioned above).

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles Next.js in production mode and optimizes the build for the best performance.

### `npm start`

Starts the production server.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run lint`

Runs the linter to check for code style and formatting issues.

### `npm run test`

Launches the test runner in the interactive watch mode. See the section about [running tests](https://nextjs.org/docs/testing) for more information.

## The Page

The main page is comprised of an input filed (purple), the data formats that the user can choose, the buttons for interaction with the program (violet) and slider to choose the threshold (red). The threshold is the confidence tha the system need before claim that a passed in protein string has a signal peptide.

![](main-page-colors.png)

The data can be downloaded as demonstrated the the following GIF:

![](downlaod-data.gif)

The threshold can be chosen. The threshold has to be chosen by sliding the slider as demonstrated by the following GIF:

![](slider-threshold.gif)

## The Results

The provided data is parsed, and for each data point a separate prediction is performed. The prediction can be above the threshold (green) or the below (red). Each data points gets an associated ID. Also each results can be expanded and see the more exact resulting values.

![](results-demo.png)

The expansion and closing is demonstrated by the following GIF:

![](expand-and-close.gif)

## The Data Types and Interfaces

Different structures are used in the application. This sections describes of each those structures, that save represented by interface and types.

### FormatClass

This interface represents a format class with the following properties:

- `header`: A string representing the header.
- `sequence`: A string representing the sequence.
- `format`: A string representing the format.

```ts
export interface FormatClass {
  header: string;
  sequence: string;
  format: string;
}
```

### FormatParser

This interface represents a format parser with the following methods:

- `parse(input: string)`: This method takes a string as input and returns a `FormatInstance`.
- `multipleParse(input: string)`: This method takes a string as input and returns a `FormatInstanceList`.

```ts
export interface FormatParser {
  parse(input: string): FormatInstance;
  multipleParse(input: string): FormatInstanceList;
}
```

### Format

This is a type that can be either "Fasta", "FASTQ", or "Clustal".

```ts
export type Format = "Fasta" | "FASTQ" | "Clustal";
```

### FormatInstanceList

This is a type that can be an array of `Fasta`, `Fastq`, or `Clustal`.

```ts
export type FormatInstanceList = Fasta[] | Fastq[] | Clustal[];
```

### FormatInstance

This is a type that can be either `Fasta`, `Fastq`, or `Clustal`.

```ts
export type FormatInstance = Fasta | Fastq | Clustal;
```

### ResponseFormat

This interface represents a response format with the following properties:

- `sp`: A number representing the sp.
- `no_sp`: A number representing the no_sp.

```ts
export interface ResponseFormat {
  sp: number;
  no_sp: number;
}
```

### DataPointState

This interface represents a data point state with the following properties:

- `id`: A string representing the id.
- `prediction`: An optional boolean representing the prediction.
- `completeResponseString`: A string representing the complete response string.
- `requestFinished`: A boolean representing if the request has finished.
- `data`: A `FormatInstance` representing the data.
- `result`: A `ResponseFormat` representing the result.

```ts
export interface DataPointState {
  id: string;
  prediction?: boolean;
  completeResponseString: string;
  requestFinished: boolean;
  data: FormatInstance;
  result: ResponseFormat;
}
```
