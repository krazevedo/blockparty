"use client";
import { Grid, GridProps, Spinner } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { TOKENS } from "@/gql/tokens";
import { clientIndexer } from "@/contexts/ApolloClientsContext";
import { QueryResult, Tokens, Token } from "@/types";
import NFTCard from "../NFTCard";

interface NFTIndexProps extends GridProps {}

const NFTIndex: React.FC<NFTIndexProps> = ({ ...props }) => {
  const { data, loading, error }: QueryResult<{ tokens: Tokens }> = useQuery(
    TOKENS,
    {
      client: clientIndexer,
      variables: {
        first: 24,
        whereContract: { id: "0xe6c1ee6624c6819262f29199dF25A70B2648B818" },
      },
    }
  );

  if (error) throw error;
  if (loading) return <Spinner />;

  const { tokens } = data?.tokens as Tokens;

  return (
    <Grid
      gap={4}
      width="100%"
      templateColumns={{
        base: "repeat(auto-fill, minmax(250px, 1fr))",
        md: "repeat(auto-fill, minmax(300px, 1fr))",
      }}
      {...props}
    >
      {tokens.map((token: Token) => {
        return <NFTCard key={token.tokenID} nft={token} />;
      })}
    </Grid>
  );
};

export default NFTIndex;
