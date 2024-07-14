/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string; }
    String: { input: string; output: string; }
    Boolean: { input: boolean; output: boolean; }
    Int: { input: number; output: number; }
    Float: { input: number; output: number; }
    Any: { input: any; output: any; }
    Int64: { input: number; output: number; }
    Int256: { input: any; output: any; }
    Map: { input: any; output: any; }
    Time: { input: any; output: any; }
    UInt8: { input: any; output: any; }
    UInt32: { input: any; output: any; }
    UInt64: { input: any; output: any; }
    UInt256: { input: any; output: any; }
};

export type Balance = {
    contract: Contract;
    owner: Scalars['String']['output'];
    token?: Maybe<Token>;
    value: Scalars['String']['output'];
};

export type BalanceFilter = {
    contract?: InputMaybe<Scalars['String']['input']>;
    tokenID?: InputMaybe<Scalars['String']['input']>;
};

export enum BalanceOrderBy {
    Contract = 'CONTRACT'
}

export type Balances = Plural & {
    balances: Array<Balance>;
    count: Scalars['UInt64']['output'];
    cursor?: Maybe<Scalars['String']['output']>;
    remaining: Scalars['UInt64']['output'];
};

export type Contract = {
    createdAt: Scalars['Time']['output'];
    createdBlock: Scalars['Int']['output'];
    decimals?: Maybe<Scalars['Int']['output']>;
    holders: Scalars['Int']['output'];
    id: Scalars['ID']['output'];
    isERC20: Scalars['Boolean']['output'];
    isERC721: Scalars['Boolean']['output'];
    isERC1155: Scalars['Boolean']['output'];
    name?: Maybe<Scalars['String']['output']>;
    supportsMetadata: Scalars['Boolean']['output'];
    symbol?: Maybe<Scalars['String']['output']>;
    tokens: Tokens;
    type: ContractType;
};


export type ContractTokensArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    orderBy?: InputMaybe<TokenOrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']['input']>;
    where?: InputMaybe<TokenFilter>;
};

export type ContractFilter = {
    case_sensitive?: InputMaybe<Scalars['Boolean']['input']>;
    decimals_null?: InputMaybe<Scalars['Boolean']['input']>;
    error_null?: InputMaybe<Scalars['Boolean']['input']>;
    id?: InputMaybe<Scalars['String']['input']>;
    is_erc20?: InputMaybe<Scalars['Boolean']['input']>;
    is_erc721?: InputMaybe<Scalars['Boolean']['input']>;
    is_erc1155?: InputMaybe<Scalars['Boolean']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
    name_like?: InputMaybe<Scalars['String']['input']>;
    name_null?: InputMaybe<Scalars['Boolean']['input']>;
    type?: InputMaybe<ContractType>;
};

export enum ContractOrderBy {
    CreatedAt = 'CREATED_AT',
    CreatedBlock = 'CREATED_BLOCK',
    Id = 'ID',
    Name = 'NAME',
    Symbol = 'SYMBOL'
}

export enum ContractType {
    Erc20 = 'ERC20',
    Erc721 = 'ERC721',
    Erc1155 = 'ERC1155',
    Unknown = 'UNKNOWN'
}

export type Contracts = Plural & {
    contracts: Array<Contract>;
    count: Scalars['UInt64']['output'];
    cursor?: Maybe<Scalars['String']['output']>;
    remaining: Scalars['UInt64']['output'];
};

export type Image = {
    contentType: Scalars['String']['output'];
    createdAt: Scalars['Time']['output'];
    errorMsg?: Maybe<Scalars['String']['output']>;
    height: Scalars['Int']['output'];
    status: ImageStatus;
    thumbnails: Array<Thumbnail>;
    url: Scalars['String']['output'];
    width: Scalars['Int']['output'];
};


export type ImageThumbnailsArgs = {
    orderBy?: InputMaybe<ThumbnailOrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<ThumbnailFilter>;
};

export type ImageFilter = {
    status?: InputMaybe<ImageStatus>;
    status_null?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum ImageOrderBy {
    CreatedAt = 'CREATED_AT'
}

export enum ImageStatus {
    NotAvailable = 'NOT_AVAILABLE',
    NotRecognized = 'NOT_RECOGNIZED',
    Ok = 'OK',
    Reset = 'RESET',
    TooLarge = 'TOO_LARGE'
}

export enum MetadataStatus {
    Blacklisted = 'BLACKLISTED',
    IsImage = 'IS_IMAGE',
    NotAvailable = 'NOT_AVAILABLE',
    NotSupported = 'NOT_SUPPORTED',
    Ok = 'OK',
    Processing = 'PROCESSING',
    TokenUriProblem = 'TOKEN_URI_PROBLEM'
}

export enum OrderDirection {
    Asc = 'ASC',
    Desc = 'DESC'
}

export enum OrderSide {
    Make = 'MAKE',
    Take = 'TAKE'
}

export enum Ordering {
    Asc = 'ASC',
    Desc = 'DESC'
}

export type Plural = {
    count: Scalars['UInt64']['output'];
    cursor?: Maybe<Scalars['String']['output']>;
    remaining: Scalars['UInt64']['output'];
};

export type Query = {
    balance?: Maybe<Balance>;
    balances: Balances;
    contract?: Maybe<Contract>;
    contracts: Contracts;
    token?: Maybe<Token>;
    tokenCount: Scalars['UInt64']['output'];
    tokens: Tokens;
};


export type QueryBalanceArgs = {
    contract: Scalars['ID']['input'];
    contractType?: InputMaybe<ContractType>;
    owner: Scalars['ID']['input'];
    tokenID?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBalancesArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    orderBy?: InputMaybe<BalanceOrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    owner: Scalars['ID']['input'];
    skip?: InputMaybe<Scalars['Int']['input']>;
    where?: InputMaybe<BalanceFilter>;
    whereContract?: InputMaybe<ContractFilter>;
    whereToken?: InputMaybe<TokenFilter>;
};


export type QueryContractArgs = {
    id: Scalars['ID']['input'];
};


export type QueryContractsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    orderBy?: InputMaybe<ContractOrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']['input']>;
    where?: InputMaybe<ContractFilter>;
};


export type QueryTokenArgs = {
    contract: Scalars['ID']['input'];
    tokenID: Scalars['ID']['input'];
};


export type QueryTokenCountArgs = {
    where?: InputMaybe<TokenFilter>;
    whereContract?: InputMaybe<ContractFilter>;
    whereSwap?: InputMaybe<SwapFilter>;
};


export type QueryTokensArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    orderBy?: InputMaybe<TokenOrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']['input']>;
    where?: InputMaybe<TokenFilter>;
    whereContract?: InputMaybe<ContractFilter>;
    whereSwap?: InputMaybe<SwapFilter>;
};

export type SwapFilter = {
    dex_contract?: InputMaybe<Scalars['String']['input']>;
    dex_version?: InputMaybe<Scalars['String']['input']>;
    side?: InputMaybe<OrderSide>;
    status?: InputMaybe<SwapStatus>;
    status_in?: InputMaybe<Array<SwapStatus>>;
};

export enum SwapStatus {
    Closed = 'CLOSED',
    Dropped = 'DROPPED',
    Open = 'OPEN'
}

export type Thumbnail = {
    contentType: Scalars['String']['output'];
    createdAt: Scalars['Time']['output'];
    height: Scalars['Int']['output'];
    preset: ThumbnailPreset;
    status: ThumbnailStatus;
    url: Scalars['String']['output'];
    width: Scalars['Int']['output'];
};

export type ThumbnailFilter = {
    preset?: InputMaybe<ThumbnailPreset>;
};

export enum ThumbnailOrderBy {
    CreatedAt = 'CREATED_AT',
    Preset = 'PRESET'
}

export enum ThumbnailPreset {
    Large = 'LARGE',
    LargeVideo = 'LARGE_VIDEO',
    Medium = 'MEDIUM',
    MediumVideo = 'MEDIUM_VIDEO',
    Micro = 'MICRO',
    MicroVideo = 'MICRO_VIDEO',
    Original = 'ORIGINAL',
    Small = 'SMALL',
    SmallVideo = 'SMALL_VIDEO',
    Xlarge = 'XLARGE',
    XlargeVideo = 'XLARGE_VIDEO'
}

export enum ThumbnailStatus {
    NotAvailable = 'NOT_AVAILABLE',
    NotRecognized = 'NOT_RECOGNIZED',
    Ok = 'OK'
}

export type Token = {
    burnedAt?: Maybe<Scalars['Time']['output']>;
    burnedBlock?: Maybe<Scalars['Int']['output']>;
    contract: Contract;
    createdAt: Scalars['Time']['output'];
    createdBlock: Scalars['Int']['output'];
    description?: Maybe<Scalars['String']['output']>;
    dexTrades: Scalars['Int']['output'];
    errorMsg?: Maybe<Scalars['String']['output']>;
    expired?: Maybe<Scalars['Boolean']['output']>;
    holders: Balances;
    image?: Maybe<Image>;
    metadataContent?: Maybe<Scalars['String']['output']>;
    metadataContentType?: Maybe<Scalars['String']['output']>;
    metadataStatus?: Maybe<MetadataStatus>;
    name?: Maybe<Scalars['String']['output']>;
    tokenID: Scalars['String']['output'];
    tokenURI?: Maybe<Scalars['String']['output']>;
    tokenURIStatus?: Maybe<TokenUriStatus>;
};


export type TokenHoldersArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    skip?: InputMaybe<Scalars['Int']['input']>;
};

export type TokenFilter = {
    burned?: InputMaybe<Scalars['Boolean']['input']>;
    caseSensitive?: InputMaybe<Scalars['Boolean']['input']>;
    expired?: InputMaybe<Scalars['Boolean']['input']>;
    metadataStatus?: InputMaybe<MetadataStatus>;
    metadataStatus_null?: InputMaybe<Scalars['Boolean']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
    name_like?: InputMaybe<Scalars['String']['input']>;
    name_null?: InputMaybe<Scalars['Boolean']['input']>;
    tokenID?: InputMaybe<Scalars['String']['input']>;
    tokenURIStatus?: InputMaybe<TokenUriStatus>;
};

export enum TokenOrderBy {
    ClosedSwapId = 'CLOSED_SWAP_ID',
    CollectionHolders = 'COLLECTION_HOLDERS',
    Contract = 'CONTRACT',
    CreatedAt = 'CREATED_AT',
    CreatedBlock = 'CREATED_BLOCK',
    DexTrades = 'DEX_TRADES',
    Name = 'NAME',
    TokenId = 'TOKEN_ID'
}

export enum TokenUriStatus {
    Empty = 'EMPTY',
    IsImage = 'IS_IMAGE',
    IsMetadata = 'IS_METADATA',
    NotAvailable = 'NOT_AVAILABLE',
    NotSupported = 'NOT_SUPPORTED',
    Ok = 'OK',
    Special = 'SPECIAL'
}

export type Tokens = {
    count: Scalars['UInt64']['output'];
    cursor?: Maybe<Scalars['String']['output']>;
    timing?: Maybe<Scalars['String']['output']>;
    tokens: Array<Token>;
};

export type ContractQueryVariables = Exact<{
    id: Scalars['ID']['input'];
}>;


export type ContractQuery = { contract?: { symbol?: string | null, name?: string | null, type: ContractType, createdAt: any, holders: number, tokens: { tokens: Array<{ name?: string | null, tokenID: string }> } } | null };

export type ContractsQueryVariables = Exact<{
    where?: InputMaybe<ContractFilter>;
}>;


export type ContractsQuery = { contracts: { contracts: Array<{ symbol?: string | null, name?: string | null, id: string, decimals?: number | null, type: ContractType }> } };

export type TokenQueryVariables = Exact<{
    contract: Scalars['ID']['input'];
    tokenID: Scalars['ID']['input'];
}>;


export type TokenQuery = { token?: { name?: string | null, tokenID: string, metadataContent?: string | null, description?: string | null, createdAt: any, createdBlock: number, contract: { name?: string | null, type: ContractType, id: string }, image?: { thumbnails: Array<{ url: string }> } | null } | null };

export type TokensQueryVariables = Exact<{
    whereContract?: InputMaybe<ContractFilter>;
    first?: InputMaybe<Scalars['Int']['input']>;
    skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type TokensQuery = { tokens: { count: any, cursor?: string | null, timing?: string | null, tokens: Array<{ tokenID: string, name?: string | null, description?: string | null, dexTrades: number, tokenURI?: string | null, contract: { id: string, type: ContractType, name?: string | null }, image?: { thumbnails: Array<{ url: string }> } | null }> } };

export type TokensTypesQueryVariables = Exact<{
    whereContract?: InputMaybe<ContractFilter>;
}>;


export type TokensTypesQuery = { tokens: { tokens: Array<{ contract: { type: ContractType } }> } };

export type TokensCountQueryVariables = Exact<{
    whereContract?: InputMaybe<ContractFilter>;
}>;


export type TokensCountQuery = { tokens: { count: any } };

export type QueryResult<Data> = {
    data: Data | undefined;
    loading: boolean;
    error?: Error;
};