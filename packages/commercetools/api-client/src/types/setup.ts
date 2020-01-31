import { ApolloClientOptions } from 'apollo-client'

export interface ApiConfig {
  uri: string,
  authHost: string,
  projectKey: string,
  clientId: string,
  clientSecret: string,
  scopes: string[]
}

export interface Token {
  access_token: string,
  expires_at: number,
  expires_in: number,
  scope: string,
  token_type: string
}

export interface StoreConfig {
  currency: string,
  country: string,
  locale: string
}

export interface BaseSetupConfig<TCacheShape> {
  api?: ApiConfig,
  customOptions?: ApolloClientOptions<TCacheShape>
}

export type SetupConfig<T> = BaseSetupConfig<T> & StoreConfig
