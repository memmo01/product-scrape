


let twohour = 1000 * 60 * 60 * 2
let tenMin = 1000 * 60 * 10

//constructor to create product objects and give the ability to control timeinterval checks separately
function Productwatch(url, product) {
  this.url = url
  this.product = product

  //setting time interval. If timelength is undefined then it will default to .5 sec
  this.Timeinterval = (productObj, timelength = 1000) => {
    this.stopTime = setInterval(() => {
      // check stock of item by calling callApi function
      callApi(productObj)
    }, timelength)
  }

  this.Stoptimeinterval = () => {
    // allows to stop timeinterval for each specific object
    clearInterval(this.stopTime)
  }

}

// create objects with the products you are looking to keep track of
let daengShampoo = new Productwatch("https://www.costco.com/daeng-gi-meo-ri-ki-gold-premium%2c-3-pack.product.100412436.html", "daengshampoo")
let babyYoda = new Productwatch("https://www.costco.com/star-wars-the-mandalorian%2cthe-child-plush-with-accessories.product.100658415.html", "yoda")



// set the timeinterval for each object
daengShampoo.Timeinterval(daengShampoo)
babyYoda.Timeinterval(babyYoda)


// runs the object through an ajax call to begin scraping the site to get product information
function callApi(productItem) {
  let { product, url } = productItem
  $.ajax({ url: `/api/scrape/${product}`, method: "get" }).then((response) => {
    let responsedata = { product: `${product}`, data: response, url: url }
    assembleHTML(responsedata, productItem)
  })
}


// creates HTML to display results 

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
    // if item is in stock the stop timeinterval and change it to check every two hours. then send and email informing of the change of status
    productItem.Stoptimeinterval()
    productItem.Timeinterval(productItem, twohour)
    sendEmail(responsedata)


  } else {
    console.log(productItem)
    // if item is still not in stock check again in ten minutes
    productItem.Stoptimeinterval()
    productItem.Timeinterval(productItem, tenMin)

  }

}

//ajax call for sending email to inform of item being in stock
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

