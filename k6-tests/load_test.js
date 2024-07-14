import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'https://staging.nftnode.org/nftindexer/sepolia/graphql';

export let options = {
  stages: [
    // Start 100 iterations per `timeUnit` for the 10 seconds.
    { target: 100, duration: '1m' },

    // Linearly ramp-up to starting 1000 iterations per `timeUnit` over the following two minutes.
    { target: 100, duration: '1m' },

    // // Linearly ramp-down to starting 100 iterations per `timeUnit` over the last one minute.
    { target: 0, duration: '1m' },
  ],
  thresholds: {
    checks: ['rate > 0.95'],
    http_req_duration: ['p(95) < 1000'],
  },
};

export default function () {
  let query = `
query Tokens($whereContract: ContractFilter, $first: Int, $skip: Int) {
  tokens(
    whereContract: $whereContract
    first: $first
    skip: $skip
    orderBy: TOKEN_ID
    orderDirection: ASC
  ) {
    tokens {
      contract {
        id
        type
        name
        __typename
      }
      tokenID
      name
      description
      dexTrades
      tokenURI
      image {
        thumbnails {
          url
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}`;
  let res = http.post(
    BASE_URL,
    JSON.stringify({
      query: query,
      variables: {
        first: 24,
        whereContract: { id: '0xe6c1ee6624c6819262f29199dF25A70B2648B818' },
      },
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  check(res, {
    'Status is 200': (r) => r.status == 200,
  });

  sleep(1);
}
