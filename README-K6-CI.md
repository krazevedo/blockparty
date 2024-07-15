# K6 Load CI Test Workflow Documentation

## Overview

The workflow is configured to trigger on pull request events targeting the `main` branch. Its primary goal is to run load tests using k6 to ensure the application's performance under simulated load conditions.

## Workflow Triggers

The workflow is triggered by pull requests targeting the `main` branch. This ensures that every proposed change is subjected to load testing before it can be merged into the main branch.

## Permissions

The workflow requires write permissions to the repository's contents to perform necessary operations, such as checking out the code and uploading artifacts.

## Jobs

The workflow defines a single job named `build`.

### Job: build

This job runs on the latest Ubuntu runner provided by GitHub Actions.

#### Steps

1. **Checkout Code**: Uses the `actions/checkout@v4` action to checkout the repository's code. It's configured to fetch all history for all tags and branches.

2. **Run k6 Load Test**: Uses the `grafana/k6-action@v0.3.1` action to execute the k6 load test script located at `k6-tests/load_ci_test.js`. This script is responsible for simulating the load on the application.

3. **Move Report**: Moves the generated `index.html` report from the default location to a newly created `report` directory. This step ensures that the report is organized and easily accessible.

4. **Upload Artifact**: Uses the `actions/upload-artifact@v4` action to upload the `report` directory containing the load test results. This makes the test results accessible for further analysis outside of GitHub Actions.

5. **Publish Report**: Uses the `peaceiris/actions-gh-pages@v4` action to publish the `report` directory to a `gh-pages` branch on the repository. This step makes the test reports publicly accessible via a URL.
   It works only in public repositories.

## Conclusion

This workflow automates the process of running load tests on the application using k6 whenever changes are proposed via pull requests. By integrating load testing into the CI pipeline, it helps ensure that the application remains performant under various load scenarios, contributing to overall code quality and reliability.
