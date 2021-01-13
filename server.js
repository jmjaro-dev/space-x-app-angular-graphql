const express = require('express');
const cors = require('cors');
const { graphqlHTTP }  = require('express-graphql');
const schema = require('./schema');
const path = require('path');

const app = express();

// Allow Cross-Origin
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.use(express.static('dist/client'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'client', '/index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, _ => console.log(`Server started on port ${PORT}.`));