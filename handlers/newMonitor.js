const algoliaMonitors = require("../models/algolia")

module.exports = (req, res) => {
  const {
    id,
    field,
    age,
    lat,
    lng,
    experience,
    skills,
  } = req.body;
  const algoliaPromise = algoliaMonitors.addObject({
    id,
    field,
    age,
    lat,
    lng,
    experience,
    ready: true,
    skills: skills.split(/[.,،]/)
  }).catch(console.error);
  return algoliaPromise;
}