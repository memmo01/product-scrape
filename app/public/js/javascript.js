


let twohour = 1000 * 60 * 60 * 2
let tenMin = 1000 * 60 * 10

//constructor to create product objects and give the ability to control timeinterval checks separately
function Productwatch(url, product) {
  this.url = url
  this.product = product


  this.Timeinterval = (productObj, timelength = 500) => {
    this.stopTime = setInterval(() => {
      callApi(productObj)
    }, timelength)
  }

  this.Stoptimeinterval = () => {
    clearInterval(this.stopTime)
  }

}

// create objects with the products you are looking to keep track of
let daengShampoo = new Productwatch("https://www.costco.com/daeng-gi-meo-ri-ki-gold-premium%2c-3-pack.product.100412436.html", "daengshampoo")
let babyYoda = new Productwatch("https://www.costco.com/star-wars-the-mandalorian%2cthe-child-plush-with-accessories.product.100658415.html", "yoda")




daengShampoo.Timeinterval(daengShampoo)
babyYoda.Timeinterval(babyYoda)



function callApi(productItem) {
  let { product, url } = productItem

  $.ajax({ url: `/api/scrape/${product}`, method: "get" }).then((response) => {
    let responsedata = { product: `${product}`, data: response, url: url }
    assembleHTML(responsedata, productItem)
  })
}




function assembleHTML(responsedata, productItem) {
  let time = new Date()
  // loop through the array of saved data 

  $(`#${productItem.product}`).empty()

  let { img, stock } = responsedata.data[0]
  let image = $("<img>")
  let company = $("<h1>")
  let stockP = $("<p>")
  let link = $("<a>")
  let dateTime = $("<p>")

  image.attr("src", img)

  company.text("Costco")

  stockP.text(stock)

  link.attr("href", responsedata.url)
  link.attr("target", "_blank")
  link.text("view site")

  dateTime.text("last updated: " + time.toLocaleString())
  $(`#${productItem.product}`).append(image, company, stockP, link, dateTime)


  if (stock !== "Out of Stock") {
    productItem.Stoptimeinterval()
    productItem.Timeinterval(productItem, twohour)
    sendEmail(responsedata)


  } else {
    productItem.Stoptimeinterval()
    productItem.Timeinterval(productItem, tenMin)

  }

}
function sendEmail(item) {
  $.ajax({
    url: "/api/sendemail",
    type: "POST",
    data: { data: item }
  }).done(function (data) {
    console.log('sent update')
    console.log(data)
  });


}

