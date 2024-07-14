# Load Testing Demo using K6.io

This project uses [K6](https://k6.io/) for load testing. K6 is a modern load testing tool, written in Go and JavaScript, which makes performance testing easy and efficient. This README provides a brief overview of the setup, and usage.

Uses a sample API defined here:

https://staging.nftnode.org/nftindexer/sepolia/graphql

## Notes

- Run all commands below from the root directory of the project

## Getting started

- For Node.js installation instructions look at the [installation guide](https://nodejs.org/en/download/)
- For K6 installation instructions look at the [installation guide](https://k6.io/docs/getting-started/installation/).

## Run Tests

After installing k6, you can run the following command on the terminal to the root directory of this project.

### Smoke test

- Description: A preliminary test to check if the system can handle a minimal load without critical failures. It's often the first test to run to ensure that the system is stable enough for further, more intensive testing.
- Purpose: Validate the basic functionality and performance of the system under a light load.

```bash
k6 run k6-tests/smoke_test.js
```

### Load test

- Description: Evaluates the system's performance under expected, normal load conditions. It measures response times, throughput, and resource utilization to ensure the system can handle the anticipated number of users.
- Purpose: Verify that the system performs well under expected user loads and meets performance requirements.

```bash
k6 run k6-tests/load_test.js
```

### Stress test

- Description: Determines the system's behavior under extreme load conditions, pushing it beyond its intended capacity to identify breaking points and ensure graceful degradation.
- Purpose: Identify the system's maximum capacity and ensure it can handle high-stress situations without crashing.

`k6 run k6-tests/stress_test.js`

### Skipe Test

- Description: Assesses the system's ability to handle sudden, sharp increases in load, simulating scenarios like a flash sale or a viral event where user traffic surges quickly.
- Purpose: Ensure the system can cope with abrupt spikes in traffic and maintain performance stability during these peaks.

`k6 run k6-tests/spike_test.js`

## Interpret the results

### Execution parameters

```plain
execution: local
```

You can use k6 OSS to run test scripts locally (`local`) or on k6 Cloud (`cloud`).
In this test, the test script was executed on your local machine.

```plain
script: test.js`
```

This is the filename of the script that was executed.

```plain
output: -`
```

This indicates the default behavior: k6 printed your test results to standard output.

k6 can also [output results in other formats](https://k6.io/docs/getting-started/results-output/#external-outputs). These options, when used, are displayed in `output`.

```plain
scenarios: (100.00%) 1 scenario, 1 max VUs, 1m30s max duration (incl. graceful stop):
```

An execution [scenario](https://k6.io/docs/misc/glossary/#scenario) is a set of instructions about running a test: what code should run, when and how often it should run, and other configurable parameters. In this case, your first test was executed using default parameters: one scenario, one [virtual user (VU)](https://k6.io/docs/misc/glossary/#virtual-user), and a max duration of 1 minute and 30 seconds.

The max duration is the execution time limit; it is the time beyond which the test will be forcibly stopped. In this case, k6 received a response to the request in the script long before this time period elapsed.

A [graceful stop](https://k6.io/docs/misc/glossary/#graceful-stop) is a period at the end of the test when k6 finishes any running [iterations](https://k6.io/docs/misc/glossary/#iteration), if possible. By default, k6 includes a graceful stop of 30 seconds within the max duration of 1 minutes and 30 seconds.

```plain
* default: 1 iterations for each of 1 VUs (maxDuration: 1m0s, gracefulStop: 30s)
```

`default` here refers to the scenario name. Since the test script did not have any explicitly set up, k6 used the default name.

An iteration is a single execution loop of the test. Load tests typically involve repeated execution loops within a certain amount of time so that requests are continuously made. Unless otherwise specified, k6 runs through the default function once.

Think of a virtual user as a single thread or instance that attempts to simulate a real end user of your application. In this case, k6 started one virtual user to run the test.

### Execution summary

The execution summary shows an overview of what happened during the test run.

```plain
running (00m00.7s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m00.7s/10m0s  1/1 iters, 1 per VU
```

In this case, the test ran for 0.7 seconds with 1 VU. A single iteration was executed and fully completed (i.e., it was not interrupted). 1 iteration per VU was executed (a total of 1).

### k6 built-in metrics

Now for the [metrics](https://k6.io/docs/misc/glossary/#metric)! k6 comes with [many built-in metrics](https://k6.io/docs/using-k6/metrics/#built-in-metrics).

```plain
     data_received..................: 5.9 kB 9.0 kB/s
     data_sent......................: 564 B  860 B/s
     http_req_blocked...............: avg=524.18ms min=524.18ms med=524.18ms max=524.18ms p(90)=524.18ms p(95)=524.18ms
     http_req_connecting............: avg=123.28ms min=123.28ms med=123.28ms max=123.28ms p(90)=123.28ms p(95)=123.28ms
     http_req_duration..............: avg=130.19ms min=130.19ms med=130.19ms max=130.19ms p(90)=130.19ms p(95)=130.19ms
       { expected_response:true }...: avg=130.19ms min=130.19ms med=130.19ms max=130.19ms p(90)=130.19ms p(95)=130.19ms
     http_req_failed................: 0.00%  ✓ 0        ✗ 1
     http_req_receiving.............: avg=165µs    min=165µs    med=165µs    max=165µs    p(90)=165µs    p(95)=165µs
     http_req_sending...............: avg=80µs     min=80µs     med=80µs     max=80µs     p(90)=80µs     p(95)=80µs
     http_req_tls_handshaking.......: avg=399.48ms min=399.48ms med=399.48ms max=399.48ms p(90)=399.48ms p(95)=399.48ms
     http_req_waiting...............: avg=129.94ms min=129.94ms med=129.94ms max=129.94ms p(90)=129.94ms p(95)=129.94ms
     http_reqs......................: 1      1.525116/s
     iteration_duration.............: avg=654.72ms min=654.72ms med=654.72ms max=654.72ms p(90)=654.72ms p(95)=654.72ms
     iterations.....................: 1      1.525116/s
```

The following metrics are usually the most important for test analysis.

#### Response time

```plain
http_req_duration..............: avg=130.19ms min=130.19ms med=130.19ms max=130.19ms p(90)=130.19ms p(95)=130.19ms
```

"Response time" can be vague, because it can be broken down into multiple components. However, in most cases, `http_req_duration` is the metric you're looking for. It includes:

- `http_req_sending` (the time it took to send data to the target host)
- `http_req_waiting` (Time to First Byte or "TTFB"; the time it took before the target server began to respond to the request)
- `http_req_receiving` (the time it took for the target server to process and fully respond to k6)

The response time in this line is reported as an average, minimum, median, maximum, 90th percentile, and 95th percentile, in milliseconds (ms). If you're not sure which to use, take the 95th percentile figure.

A 95th percentile response time of 130.19 ms means that 95% of the requests had a response time of 130.19 ms or less. In this particular situation, however, your test script only made a single request, so all the metrics in this line are reporting the same value: 130.19 ms. When you run tests with multiple requests, you'll see a variation in these values.

Something to keep in mind here is that `http_req_duration` is the value for _all_ requests, whether or not they passed. This behavior can cause misunderstandings when interpreting response times, because failed requests can often have a shorter or longer response time than successful ones.

The line below reports the response time for only the successful requests.

```plain
  { expected_response:true }...: avg=130.19ms min=130.19ms med=130.19ms max=130.19ms p(90)=130.19ms p(95)=130.19ms
```

To improve accuracy and prevent failed requests from skewing results, use the 95th percentile value of the successful requests as a response time.

#### Error rate

The `http_req_failed` metric describes the error rate for the test. The error rate is the number of requests that failed during the test as a percentage of the total requests.

```plain
http_req_failed................: 0.00%  ✓ 0        ✗ 1
```

`http_req_failed` automatically marks HTTP response codes of between 200 and 399. This means that HTTP 4xx and HTTP 5xx response codes are considered errors by k6 by default. (Note: This behavior can be changed using [`setResponseCallback`](https://k6.io/docs/javascript-api/k6-http/setresponsecallback-callback).)

This test run had an error rate of `0.00%`, because the single request it ran succeeded. It may seem counter-intuitive, but the `✓` on this line actually means that no requests had `http_req_failed = true`, meaning that there were no failures. Conversely, the `✗` means that 1 request had `http_req_failed = false`, meaning that it was successful.

#### Number of requests

The number of total requests sent by all VUs during the test is described in the line below.

```plain
http_reqs......................: 1      1.525116/s
```

Additionally, the number `1.525116/s` is the number of **requests per second (rps)** that the test executed throughout the test. In some tools, this is described as "test throughput". This helps you further quantify how much load your application experienced during the test.

#### Iteration duration

`http_req_duration` measures the time taken for an HTTP request within the script to get a response from the server. But what if you have multiple HTTP requests strung together in a user flow, and you'd like to know how the entire flow would take for a user?

In that case, the iteration duration is the metric to look at.

```plain
iteration_duration.............: avg=654.72ms min=654.72ms med=654.72ms max=654.72ms p(90)=654.72ms p(95)=654.72ms
```

The iteration duration is the amount of time it took for k6 to perform a single loop of your VU code. If your script included steps like logging in, browsing a product page, adding to a cart, and entering payment information, then the iteration duration gives you an idea of how long one of your application's users might take to purchase a product.

This metric could be useful when you're trying to decide on what is an acceptable response time for each HTTP request. For example, perhaps the payment request takes 2 seconds, but if the total iteration duration is still only 3 seconds, you might decide that's acceptable anyway.

Like the other metrics, the iteration duration is expressed in terms of the average, minimum, median, maximum, 90th percentile, and 95th percentile times, in milliseconds.

#### Number of iterations

The number of iterations describes how many times k6 looped through your script in total, including the iterations for all VUs. This metric can be useful when you want to verify some output associated with each iteration, such as an account signup.

```plain
iterations.....................: 1      1.525116/s
```

The number `1.525116/s` on the same line is the **iterations per second**. It describes the rate at which k6 did full iterations through the script. This, like [requests per second](03-Understanding-k6-results.md#Number-of-requests), is a measure of the speed or rate at which k6 sent messages to the application server.

### Smoke test

Run the smoke test, you should get a response like this:

```bash
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: k6-tests\smoke_test.js
        output: -

     scenarios: (100.00%) 1 scenario, 1 max VUs, 1m0s max duration (incl. graceful stop):
              * default: 1 looping VUs for 30s (gracefulStop: 30s)


     ✓ Status is 200

   ✓ checks.........................: 100.00% ✓ 36       ✗ 0
     data_received..................: 994 kB  33 kB/s
     data_sent......................: 32 kB   1.0 kB/s
     http_req_blocked...............: avg=16.67ms  min=0s       med=0s       max=600.37ms p(90)=0s      p(95)=0s
     http_req_connecting............: avg=4.33ms   min=0s       med=0s       max=156.05ms p(90)=0s      p(95)=0s
     http_req_duration..............: avg=827.33ms min=386.66ms med=826.19ms max=1.72s    p(90)=1.12s   p(95)=1.23s
       { expected_response:true }...: avg=827.33ms min=386.66ms med=826.19ms max=1.72s    p(90)=1.12s   p(95)=1.23s
     http_req_failed................: 0.00%   ✓ 0        ✗ 36
     http_req_receiving.............: avg=689.13µs min=0s       med=506.1µs  max=5.51ms   p(90)=1.21ms  p(95)=1.7ms
     http_req_sending...............: avg=139.59µs min=0s       med=0s       max=1.5ms    p(90)=519.6µs p(95)=532.12µs
     http_req_tls_handshaking.......: avg=10.76ms  min=0s       med=0s       max=387.52ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=826.5ms  min=386.49ms med=825.89ms max=1.72s    p(90)=1.12s   p(95)=1.23s
     http_reqs......................: 36      1.184533/s
     iteration_duration.............: avg=844.26ms min=386.68ms med=826.24ms max=1.72s    p(90)=1.17s   p(95)=1.39s
     iterations.....................: 36      1.184533/s
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1

running (0m30.4s), 0/1 VUs, 36 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  30s
```

### Load test

Run the load test, you should get a response like this:

```bash
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: k6-tests\load_test.js
        output: -

     scenarios: (100.00%) 1 scenario, 100 max VUs, 3m30s max duration (incl. graceful stop):
              * default: Up to 100 looping VUs for 3m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


       ✓ Status is 200

   ✓ checks.........................: 100.00% ✓ 5472      ✗ 0
     data_received..................: 151 MB  822 kB/s
     data_sent......................: 4.6 MB  25 kB/s
     http_req_blocked...............: avg=8.61ms   min=0s       med=0s       max=653.57ms p(90)=0s       p(95)=0s
     http_req_connecting............: avg=2.83ms   min=0s       med=0s       max=194.9ms  p(90)=0s       p(95)=0s
   ✗ http_req_duration..............: avg=1.2s     min=175.64ms med=984.42ms max=17.31s   p(90)=2.07s    p(95)=2.77s
       { expected_response:true }...: avg=1.2s     min=175.64ms med=984.42ms max=17.31s   p(90)=2.07s    p(95)=2.77s
     http_req_failed................: 0.00%   ✓ 0         ✗ 5472
     http_req_receiving.............: avg=9.73ms   min=0s       med=552.45µs max=1.18s    p(90)=2.01ms   p(95)=8.07ms
     http_req_sending...............: avg=219.01µs min=0s       med=0s       max=63.06ms  p(90)=549.19µs p(95)=635.08µs
     http_req_tls_handshaking.......: avg=5.74ms   min=0s       med=0s       max=398.37ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=1.19s    min=175.64ms med=976.46ms max=17.31s   p(90)=2.05s    p(95)=2.76s
     http_reqs......................: 5472    29.849012/s
     iteration_duration.............: avg=2.22s    min=1.18s    med=1.99s    max=18.31s   p(90)=3.09s    p(95)=3.8s
     iterations.....................: 5472    29.849012/s
     vus............................: 1       min=1       max=100
     vus_max........................: 100     min=100     max=100


running (3m03.3s), 000/100 VUs, 5472 complete and 0 interrupted iterations
default ✓ [======================================] 000/100 VUs  3m0s
```

### Stress test

Run the stress test, you should get a response like this:

```bash
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: k6-tests\stress_test.js
        output: -

     scenarios: (100.00%) 1 scenario, 300 max VUs, 6m0s max duration (incl. graceful stop):
              * default: Up to 300 looping VUs for 5m30s over 7 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     ✓ Status is 200

   ✓ checks.........................: 100.00% ✓ 24263     ✗ 0
     data_received..................: 668 MB  2.0 MB/s
     data_sent......................: 20 MB   61 kB/s
     http_req_blocked...............: avg=7.32ms   min=0s       med=0s       max=3.48s   p(90)=0s       p(95)=0s
     http_req_connecting............: avg=2.79ms   min=0s       med=0s       max=3.16s   p(90)=0s       p(95)=0s
     http_req_duration..............: avg=1.41s    min=168.07ms med=1.03s    max=21.42s  p(90)=2.74s    p(95)=3.55s
       { expected_response:true }...: avg=1.41s    min=168.07ms med=1.03s    max=21.42s  p(90)=2.74s    p(95)=3.55s
   ✓ http_req_failed................: 0.00%   ✓ 0         ✗ 24263
     http_req_receiving.............: avg=60.85ms  min=0s       med=617.5µs  max=19.26s  p(90)=153.63ms p(95)=309.28ms
     http_req_sending...............: avg=144.68µs min=0s       med=0s       max=45.99ms p(90)=512.8µs  p(95)=585.87µs
     http_req_tls_handshaking.......: avg=4.52ms   min=0s       med=0s       max=2.23s   p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=1.35s    min=165.67ms med=991.99ms max=17.94s  p(90)=2.59s    p(95)=3.38s
     http_reqs......................: 24263   73.272078/s
     iteration_duration.............: avg=2.42s    min=1.17s    med=2.04s    max=22.42s  p(90)=3.75s    p(95)=4.59s
     iterations.....................: 24263   73.272078/s
     vus............................: 1       min=1       max=300
     vus_max........................: 300     min=300     max=300


running (5m31.1s), 000/300 VUs, 24263 complete and 0 interrupted iterations
default ✓ [======================================] 000/300 VUs  5m30s
```

### Spike test

Run the spike test, you should get a response like this:

```bash
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: k6-tests\spike_test.js
        output: -

     scenarios: (100.00%) 1 scenario, 1000 max VUs, 4m10s max duration (incl. graceful stop):
              * default: Up to 1000 looping VUs for 3m40s over 7 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     ✗ Status is 200
      ↳  98% — ✓ 12371 / ✗ 192

   ✓ checks.........................: 98.47% ✓ 12371    ✗ 192
     data_received..................: 345 MB 1.6 MB/s
     data_sent......................: 11 MB  49 kB/s
     http_req_blocked...............: avg=34.95ms  min=0s       med=0s    max=547.89ms p(90)=0s       p(95)=463.01ms
     http_req_connecting............: avg=11.51ms  min=0s       med=0s    max=190.06ms p(90)=0s       p(95)=152.27ms
     http_req_duration..............: avg=5.82s    min=0s       med=3.01s max=54.6s    p(90)=14.19s   p(95)=18.12s
       { expected_response:true }...: avg=5.91s    min=185.47ms med=3.36s max=54.6s    p(90)=14.29s   p(95)=18.19s
   ✗ http_req_failed................: 1.52%  ✓ 192      ✗ 12371
     http_req_receiving.............: avg=117.09ms min=0s       med=1ms   max=14.05s   p(90)=156.52ms p(95)=173.13ms
     http_req_sending...............: avg=272.52µs min=0s       med=0s    max=28.78ms  p(90)=629µs    p(95)=956.96µs
     http_req_tls_handshaking.......: avg=23.4ms   min=0s       med=0s    max=383.15ms p(90)=0s       p(95)=309.48ms
     http_req_waiting...............: avg=5.7s     min=0s       med=2.9s  max=54.3s    p(90)=13.94s   p(95)=17.79s
     http_reqs......................: 12563  56.62965/s
     iteration_duration.............: avg=7.18s    min=1.18s    med=4.73s max=55.61s   p(90)=16.12s   p(95)=21.43s
     iterations.....................: 12563  56.62965/s
     vus............................: 1      min=1      max=1000
     vus_max........................: 1000   min=1000   max=1000

running (3m41.8s), 0000/1000 VUs, 12563 complete and 0 interrupted iterations
default ✓ [======================================] 0000/1000 VUs  3m40s
```

## Suggestions for Improvement

### Server-Side Optimization:

- Optimize Database Queries: Look into optimizing database queries and use indexing to speed up data retrieval.
- Improve Application Code: Profile and optimize the server-side application code to reduce processing time.
- Cache Results: Implement caching mechanisms to store frequently accessed data.

### Reduce Blocked and Connecting Times:

- Connection Pooling: Use connection pooling to manage connections more efficiently.
- Keep-Alive Connections: Ensure HTTP keep-alive is enabled to reduce the time spent establishing new connections.

### Improve Network Performance:

- Content Delivery Network (CDN): Use a CDN to distribute the content closer to the users, reducing latency.
- Optimize Payload Size: Compress responses and optimize payload size to reduce data transfer times.

### Handling High Traffic:

- Load Balancing: Distribute the load across multiple servers to prevent any single server from becoming a bottleneck.
- Auto-Scaling: Implement auto-scaling to adjust the number of server instances based on the load.

### Monitoring and Logging:

- Real-Time Monitoring: Use monitoring tools to get real-time insights into server performance and identify bottlenecks.
- Detailed Logging: Implement detailed logging to capture the root cause of the high waiting times and failed checks.

### Front-End Optimization:

- Optimize Client-Side Code: Ensure that the client-side code is efficient and makes minimal requests to the server.
- Use Browser Caching: Leverage browser caching by setting appropriate HTTP headers.

---

This project was created by [Kaio Azevedo].
