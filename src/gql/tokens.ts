import { gql } from "@apollo/client";

export const TOKENS = gql`
  query Tokens($whereContract: ContractFilter, $first: Int, $skip: Int ) {
    tokens(whereContract: $whereContract, first: $first, skip: $skip, orderBy: TOKEN_ID, orderDirection: ASC) {
      tokens {
        contract {
            id
            type
            name
          }
        tokenID
        name
        description
        dexTrades
        tokenURI
        image {
          thumbnails {
            url
          }
        }
      }
    }
  }
`;