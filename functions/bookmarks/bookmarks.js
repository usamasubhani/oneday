const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require('faunadb'),
  q = faunadb.query;

var client = new faunadb.Client({ secret: process.env.FAUNADB_ADMIN_SECRET });

const typeDefs = gql`
  type Query {
    bookmarks: [Bookmark!]
  }
  type Bookmark {
    url: String!
    pageTitle: String!
    description: String
  }
  type Mutation {
    addBookmark(url: String!, pageTitle: String!, description: String) : Bookmark
  }
`

const bookmarks = [
  {
    "url": "https://medium.com/incerto/religion-violence-tolerance-progress-nothing-to-do-with-theology-a31f351c729e?s=09",
    "pageTitle": "Religion, Violence, Tolerance & Progress: Nothing to do with Theology",
    "description": "Religions create highly differentiated belief clusters and mentalities that have little to do with their theologies."
  },
  {
    "url": "https://medium.com/incerto/religion-violence-tolerance-progress-nothing-to-do-with-theology-a31f351c729e?s=09",
    "pageTitle": "Title",
    "description": "Religions create highly differentiated belief clusters and mentalities that have little to do with their theologies."
  }
]

const resolvers = {
  Query: {
    bookmarks: async (parent, args, { user }) => {
      const results = await client.query(
        q.Paginate(q.Match(q.Index("all_bookmarks")))
      );
      return results.data.map(([url, pageTitle, description]) => ({
        url,
        pageTitle,
        description
      }));
      // return bookmarks
    },
  },
  Mutation: {
    addBookmark: async (_, { url, pageTitle, description }) => {
      console.log(url)
      try {
        const result = await client.query(
          q.Create(
            q.Collection('links'),
            {
              data: {
                url,
                pageTitle,
                description
              }
            }
          )
        )
        return result.ref.data
      } catch (error) {
        console.log('Error')
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
