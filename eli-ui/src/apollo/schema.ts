import { gql } from 'apollo-server-micro';
import { makeExecutableSchema } from '@graphql-tools/schema';

const typeDefs = gql`
  type OnboardingStatus {
    status: String!
  }

  type Query {
    onboardingStatus: OnboardingStatus
  }
`;

const resolvers = {
  Query: {
    onboardingStatus: () => ({
      status: 'NOT_STARTED'
    })
  }
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
}); 