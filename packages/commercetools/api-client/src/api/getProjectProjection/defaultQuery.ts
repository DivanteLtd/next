import gql from 'graphql-tag'

export default gql`
query project {
  project {
    languages
    createdAt
    trialUntil
    version
    countries
    currencies
  }
}
`;