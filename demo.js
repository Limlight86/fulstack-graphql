const gql = require("graphql-tag")
const { ApolloServer } = require("apollo-server")

let email = "laz"
let avatar = "avatar"
let friends = [{email: 'laz@whatever.com', avatar: "http://yoda.png", friends: []},
                {email: 'notlaz@whatever.com', avatar: "http://yoda.png", friends: []}]

const typeDefs = gql`
  enum ShoeType{
    nike
    adidas
    converse
  }

  type User {
    email: String!
    avatar: String!
    friends: [User]!
  }

  type Shoe{
    brand: ShoeType!
    size: Int!
  }

  input ShoesInput{
    brand: ShoeType
    size: Int
  }

  type Query{
    me: User!
    you: User!
    shoes(input:ShoesInput): [Shoe]!
  }

  input NewShoeInput{
    brand: ShoeType!
    size: Int!
  }

  type Mutation{
    newShoe(input: NewShoeInput!) : Shoe
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
      },
      you(){
        return{
          email,
          avatar,
          friends: friends
        }
      },
      shoes(_, {input}){
        if(input){
          return[
            {brand: "nike", size:12},{brand: "adidas", size:13}
          ].filter(shoe => shoe.brand === input.brand)
        }else{
          return[
            {brand: "nike", size:12},{brand: "adidas", size:13}
          ]
        }
      }
    },
    Mutation:{
      newShoe(_, {input}){
        return input
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
// ! at the end of a scalar will make it a non null value
// friends: [User]! - an array of users, ! means the array must be there, ! inside means it needs contents
// other scalars include ID, Int, Float,  Boolean, JSON fields to overcome graphql requirements
// a schema always needs a query, type Query by default
// returning an object for the query, i.e. me will return the user and all its contents
// resolvers must be the same as typeDefs
// remember its like JS, but its not JS!

// graphql has only 1 end point, graphql does not respect http, everything can be a post, all based on response
// resolvers can be async, ability to hit multiple apis and merge data on server side for client
// schema + resolver = minimum for server
