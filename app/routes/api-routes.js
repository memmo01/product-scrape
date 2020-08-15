
let htmlBuild = require("../utils/htmlbuild")
let APIcall = require("./api-calls")
// store url with key value of product name to make query to site 
let urls = { yoda: "https://www.costco.com/star-wars-the-mandalorian%2cthe-child-plush-with-accessories.product.100658415.html", daengshampoo: "https://www.costco.com/daeng-gi-meo-ri-ki-gold-premium%2c-3-pack.product.100412436.html" }

module.exports = function (app) {
    app.get("/api/scrape/:item", function (req, res) {
        let product = req.params.item

        //get value of url in array based on what is passed into the request
        APIcall(urls[product]).then(function (data) {
            // parse data collected from site and get information needed to send to client 
            htmlBuild.costco(data, function (response) {
                res.json(response)

            })
        })
    })

}
