const gql = require("graphql-tag")
const { ApolloServer } = require("apollo-server")

const typeDefs = gql`
  type User {
    email: String!
    avatar: String!
    friends: [User]!
  }

  type Query{
    me: User!
  }
`

const resolvers = {
    Query:{
      me(){
        return{
          email: 'laz@whatever.com',
          avatar: "http://yoda.png",
          friends: []
        }
      }
    }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen(8080)
  .then(()=> {console.log("Listening on Port 8080")})

// everything wrapped n the gql`` will be recognized as graph ql
// ! at the end of a scalar will make it a required value
// friends: [User]! - an array of users, ! means the array must be there, ! inside means it needs contents
// other scalars include ID, Int, Float,  Boolean, JSON fields to overcome graphql requirements
// a schema always needs a query, type Query by default
// returning an object for the query, i.e. me will return the user and all its contents
// resolvers must be the same as typeDefs
// remember its like JS, but its not JS!