/* eslint-disable camelcase */
import { ApolloClientOptions } from 'apollo-client';

export interface ApiConfig {
  uri: string;
  authHost: string;
  projectKey: string;
  clientId: string;
  clientSecret: string;
  scopes: string[];
}

export interface Token {
  access_token: string;
  expires_at: number;
  expires_in: number;
  scope: string;
  token_type: string;
}

export interface CookiesConfig {
  currencyCookieName: string;
  countryCookieName: string;
  localeCookieName: string;
}

export interface LocaleItem {
  name: string;
  label: string;
}

export interface Auth {
  onTokenChange?: (token: Token) => void;
  onTokenRemove?: () => void;
}

export type PaginationDefaults = {
  global: PaginationOptions;
  products?: PaginationOptions;
  orders?: PaginationOptions;
}

export interface PaginationOptions {
  pageSize: number;
}

export interface SetupConfig<TCacheShape> {
  api?: ApiConfig;
  currentToken?: Token;
  customOptions?: ApolloClientOptions<TCacheShape>;
  currency?: string;
  locale?: string;
  country?: string;
  countries?: LocaleItem[];
  currencies?: LocaleItem[];
  locales?: LocaleItem[];
  cookies?: CookiesConfig;
  auth?: Auth;
  pagination?: PaginationDefaults;
}

export interface CustomerCredentials {
  username: string;
  password: string;
}
