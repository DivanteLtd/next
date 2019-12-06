import gql from 'graphql-tag'
import set from 'lodash/set'

const parse = (obj) => {
  const innerParse = (obj, newObj) =>
    obj.selectionSet.selections.reduce(
      (prev, selection) => ({
        ...prev,
        [selection.name.value]: selection.selectionSet ? innerParse(selection, {}) : null,
      }),
      newObj,
    );

  return innerParse(obj, {})
}

const createQueryString = (queryObj) =>
  JSON.stringify(queryObj)
    .replace(/(\"|null|\:)/g, '')
    .replace(/(,)/g, " ")


const takeQuery = (defaultQuery: string, modifier) => {

  if (modifier.query) {
    return defaultQuery
  }

  const query = gql`${defaultQuery}`
  const parsedQuery = parse(query.definitions[0].selectionSet.selections[0])

  return createQueryString(
    modifier.include.reduce((prev, curr) => set(prev, curr, null), parsedQuery)
  )
};

export default takeQuery;
