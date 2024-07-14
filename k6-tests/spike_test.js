import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'https://staging.nftnode.org/nftindexer/sepolia/graphql';

export let options = {
  stages: [
    { target: 100, duration: '10s' },
    { target: 100, duration: '1m' },
    { target: 1000, duration: '10s' },
    { target: 1000, duration: '1m' },
    { target: 100, duration: '10s' },
    { target: 100, duration: '1m' },
    { target: 0, duration: '10s' },
  ],
  thresholds: {
    checks: ['rate > 0.95'],
    http_req_failed: ['rate < 0.01'],
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
