const algoliaMonitors = require("../models/algolia").monitors

module.exports = (req, res) => {
  const {
    SenderId,
    name,
    field,
    age,
    location,
    language,
    experience,
    skills,
    picture,
  } = req.body;
  const [lat, lng] = (location || "").split(",")
  return algoliaMonitors.addObject({
    objectID: SenderId,
    field,
    age: +age,
    name,
    picture,
    language,
    experience: +experience,
    ready: true,
    "_geoloc": { lat: +lat, lng: +lng },
    skills: skills.split(/[.,،]/)
  })
    .then(() => {
      res.json({ state: "success" })
    })
    .catch(err => {
      res.json({ state: "failed" })
      console.error(err)
    });
}