const { gql } = require('apollo-server')

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    pets: [Pet]!
  }

  type Pet {
    id: ID!,
    createdAt: String!
    name: String!
    type: String!
    owner: User!
  }
  
  input PetInput{
    name: String
    type: String
  }

  input UserInput{
    username: String
    id: String
  }

  type Query{
    pets(input: PetInput): [Pet]!
    pet(input: PetInput): Pet
    user(input: UserInput): User
  }

  input newPetInput{
    name: String!
    type: String!
  }

  type Mutation{
    newPet(input:newPetInput!) : Pet!
  }
`;

module.exports = typeDefs
