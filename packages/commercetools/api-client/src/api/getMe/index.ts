import { apolloClient, locale, localizedVariables } from './../../index'
import { ProfileResponse } from './../../types/Api'
import defaultQuery from './defaultQuery'

const getMe = async (): Promise<ProfileResponse> => {
  return await apolloClient.query({
    query: defaultQuery,
    variables: localizedVariables({}),
    fetchPolicy: 'no-cache'
  })
}

export default getMe
