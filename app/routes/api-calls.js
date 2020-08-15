const { default: Axios } = require("axios");
module.exports=function(url){

return Axios.get(url)
}