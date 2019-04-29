const algoliaMonitors = require("../models/algolia").monitors

module.exports = (req, res) => {
  const {
    id,
    field,
    age,
    lat,
    lng,
    language,
    experience,
    skills,
  } = req.body;
  return algoliaMonitors.addObject({
    id,
    field,
    age,
    lat,
    lng,
    language,
    experience,
    ready: true,
    skills: skills.split(/[.,،]/)
  })
    .then(() => {
      res.json({state: "success"})
    })
    .catch(err => {
      res.json({state: "failed"})
      console.error(err)
    });
}