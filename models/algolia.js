const algolia = require("algoliasearch");

const client = algolia(process.env.ALGOLIA_ID, process.env.ALGOLIA_KEY) 

const algoliaMonitors = client.initIndex('monitors')

module.exports = algoliaMonitors