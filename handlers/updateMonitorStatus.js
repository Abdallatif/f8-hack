const algoliaMonitors = require("../models/algolia").monitors

module.exports = (req, res) => {
  const {
    SenderId,
    status,
  } = req.body;
  return algoliaMonitors.partialUpdateObject({
    objectID: SenderId,
    status: status === "true",
  })
    .then(() => {
      res.json({ state: "success" })
    })
    .catch(err => {
      res.json({ state: "failed" })
      console.error(err)
    });
}