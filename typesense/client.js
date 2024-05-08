const Typesense = require('typesense')
dotenv.config();



const typesenseClient = new Typesense.Client({
  nodes: [{
    host: process.env.TYPESENSE_HOST, // For Typesense Cloud use xxx.a1.typesense.net
    port:process.env.TYPESENSE_PORT,      // For Typesense Cloud use 443
    protocol: process.env.TYPESENSE_PROTOCOL   // For Typesense Cloud use https
  }],
  apiKey: process.env.TYPESENSE_APIKEY,
  connectionTimeoutSeconds: process.env.TYPESENSE_CONNECTION_TIMEOUT_SECONDS
})

module.exports = typesenseClient


// const booksSchema = {
//   'name': 'books',
//   'fields': [
//     {'name': 'title', 'type': 'string' },
//     {'name': 'authors', 'type': 'string[]', 'facet': true },
//     {'name': 'image_url', 'type': 'string' },
//     {'name': 'publication_year', 'type': 'int32', 'facet': true },
//     {'name': 'ratings_count', 'type': 'int32' },
//     {'name': 'average_rating', 'type': 'float' }
//   ],
//   'default_sorting_field': 'ratings_count'
// }

// client.collections().create(booksSchema)
//   .then(function () {
//     client.collections('books').documents().import(booksInJsonl)

//   })