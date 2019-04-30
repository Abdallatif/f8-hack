const fetch = require("node-fetch");
const algoliaMonitors = require("../models/algolia").monitors

module.exports = async (req, res) => {
  const {
    SenderId,
    name,
    field,
    age,
    location,
    language,
    experience,
    skills,
  } = req.body;
  const [lat, lng] = (location || "").split(",")
  let picURL = "";
  try {
    const graphAPI = await fetch(`https://graph.facebook.com/${SenderId}?fields=profile_pic&access_token=${process.env.PAGE_AT}`)
    const jsonGraphAPI = await graphAPI.json()
    picURL = jsonGraphAPI.profile_pic;
  } catch (e) {
    console.error
  }
  return algoliaMonitors.addObject({
    objectID: SenderId,
    field,
    age: +age,
    name,
    picture: picURL,
    language,
    experience: +experience,
    ready: true,
    "_geoloc": { lat: +lat, lng: +lng },
    skills: skills
  })
    .then(() => {
      res.json({ state: "success" })
    })
    .catch(err => {
      res.json({ state: "failed" })
      console.error(err)
    });
}