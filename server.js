var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Book {
    title: String
    author: String
  }
  
  type Query {
    greeting: String,
	hello: String,
	getBooks: [Book]
	
  }  
  
`);

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];



// The root provides a resolver function for each API endpoint
var root = {
  greeting: () => {
    return 'Hello world!';
  },
  
    hello: () => {
    return 'Hello world!';
  },
   getBooks: () => books,
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');