import takeQuery from './../../src/helpers/graphql/takeQuery'

describe('takeQuery', () => {
  it('returns an original query', () => {
    const query = takeQuery('{ original query }', { query: '{ original query }' })

    expect(query).toBe('{ original query }')
  })

  it('returns a query with included fields', () => {
    const originalQuery = `
      {
        product(id: "c8d1fb5e-c3ae-4428-b895-66a17486e6a9") {
          id
          key
          version
          fields {
            test
          }
        }
      }
    `
    const query = takeQuery(originalQuery, { include: ['newField', 'newField.xxx'] })
    console.log(JSON.stringify(query))
  })
})
