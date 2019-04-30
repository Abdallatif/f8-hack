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
                "Subtitle": textTruncate(hit.skills),
                "Text": "",
                "Images": [
                    {
                        "URL": ""
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
            res.json({ state: "success", "success_message": "Here are some of the best monitors", hero_cards: cards })
        })
        .catch(err => {
            res.json({ state: "failed", "failure_message": "Oops. I couldn't find experts", })
            console.error(err)
        });
}