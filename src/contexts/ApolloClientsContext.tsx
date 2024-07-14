"use client";
import React, { createContext, useContext } from "react";
import { ApolloClient, NormalizedCacheObject, InMemoryCache } from "@apollo/client";
import { API_ENDPOINT } from "@/constants";

export const clientUri = `${API_ENDPOINT}nftindexer/sepolia/graphql`;

// Create a new Apollo client
export const clientIndexer = new ApolloClient({
	uri: clientUri,
	cache: new InMemoryCache(),
  });
  
  // Create the context with a default value
  export const ApolloClientsContext = createContext(clientIndexer);
  
  // Export the provider component
  export const ApolloClientsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
	  <ApolloClientsContext.Provider value={clientIndexer}>
		{children}
	  </ApolloClientsContext.Provider>
	);
  };
