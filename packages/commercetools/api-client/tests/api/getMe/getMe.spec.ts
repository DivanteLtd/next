import getMe from '../../../src/api/getMe'
import { apolloClient } from '../../../src/index'
import defaultQuery from '../../../src/api/getMe/defaultQuery'

describe('[commercetools-api-client] getMe', () => {
  it('fetches current user data', async () => {
    const givenVariables = {
      locale: 'en',
    };

    (apolloClient.query as any).mockImplementation(({ variables, query }) => {
      expect(variables).toEqual(givenVariables)
      expect(query).toEqual(defaultQuery)

      return { data: 'me response' }
    })

    const { data } = await getMe()

    expect(data).toBe('me response')
  });
});
