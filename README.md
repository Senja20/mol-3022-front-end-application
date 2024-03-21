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

## The Results

The provided data is parsed, and for each data point a separate prediction is performed. The prediction can be above the threshold (green) or the below (red). Each data points gets an associated ID. Also each results can be expanded and see the more exact resulting values.

![](results-demo.png)

The expansion and closing is demonstrated by the following GIF:

![](expand-and-close.gif)
