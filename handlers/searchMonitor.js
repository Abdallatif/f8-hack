const algoliaMonitors = require("../models/algolia").monitors

const textTruncate = (string) => {
    const text = string || ""
    const length = 140;
    const ending = "...";
    if (text.length > length) {
        return text.substring(0, length - ending.length) + ending;
    } else {
        return text;
    }
};


module.exports = (req, res) => {
    const {
        field,
        age,
        location,
        skills,
    } = req.body;
    const [lat, lng] = (location || "0,0").split(",")
    return algoliaMonitors.search({
        query: skills,
        aroundLatLng: `${lat}, ${lng}`,
        facetFilters: [`field:${field}`, `ready:${true}`],
        numericFilters: [`age > ${age}`]
    })
        .then((algoliaRes) => {
            console.log(algoliaRes);
            const cards = algoliaRes.hits.map(hit => ({
                "Title": textTruncate(hit.name),
                "Subtitle": textTruncate(hit.skills.join(",")),
                "Text": "",
                "Images": [
                    {
                        "URL": hit.picture || ""
                    }
                ],
                "Buttons": [
                    {
                        "Title": "Contact",
                        "Type": "PostBack",
                        "Value": hit.objectID
                    }
                ]
            }))
            if (cards.length > 0) {
                res.json({ response: "success", "success_message": "Here are some of the best monitors", "failure_message": "Oops. I couldn't find experts", hero_cards: cards })
            } else {
                res.json({ state: "failed" })
            }
        })
        .catch(err => {
            res.json({ state: "failed" })
            console.error(err)
        });
}