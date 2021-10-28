module.exports = {
  client: {
    includes: ['./pages/**/*.tsx'],
    service: {
      name: 'pipeline-database',
      url: 'http://localhost:3000/api'
    }
  }
};