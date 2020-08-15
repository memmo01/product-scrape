
const cheerio = require("cheerio");
module.exports = {
    costco: function (data, cb) {
        let dataArr = []
        let obj = {}
        //use cheerio to parse through the data collected from the axios call
        let $ = cheerio.load(data.data)
        $("#add-to-cart").each(function () {
            // get the value of stock  and place it in object with stock key
            let stock = $(this).children("input").val()
            obj.stock = stock;
        })
        //get image link of product on site
        $("#productImageOverlay").each(function () {
            let imgLink = $(this).children("img")[1].attribs.src
            obj.img = imgLink

        })
        dataArr.push(obj)
        cb(dataArr)

    }
}