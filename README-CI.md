# Cypress CI Workflow Documentation

The workflow is triggered on pull requests targeting the `main` branch and is specifically tailored for continuous integration (CI) purposes involving Cypress tests.

## Overview

The workflow consists of several steps aimed at setting up the environment, installing dependencies, building the application, starting a development server (for certain tasks), running Cypress tests, and uploading screenshots in case of test failures.

## Workflow Triggers

The workflow is configured to trigger on two events:

- **Pull Requests** targeting the `main` branch.

## Jobs

The workflow defines a single job named `build-and-test`.

### Job: build-and-test

This job runs on the latest Ubuntu runner provided by GitHub Actions.

#### Steps

1. **Checkout Code**: Uses the `actions/checkout@v4` action to checkout the repository's code. It's configured to fetch all history for all tags and branches.

2. **Set Up Node.js**: Utilizes the `actions/setup-node@v4` action to set up a specific version of Node.js (version 20) required for the project.

3. **Install Dependencies**: Runs `npm ci` to install all dependencies defined in `package.json`.

4. **Build Next.js Application**: Executes `npm run build` to compile the Next.js application.

5. **Start Next.js Development Server**: Starts the Next.js development server using `npm run dev`. This step is crucial for certain tasks that require a running server, such as serving static assets during tests.

6. **Run Cypress Tests**: Uses the `cypress-io/github-action@v6` action to execute Cypress tests against the application.

7. **Upload Screenshots**: If any tests fail, this step uploads the screenshots taken by Cypress to GitHub using the `actions/upload-artifact@v4` action. The artifacts are named `cypress-screenshots` and are stored in the `cypress/screenshots` directory.

## Error Handling

The workflow includes basic error handling through conditional steps. For instance, screenshots are only uploaded if there were any test failures (`if: failure()`).
