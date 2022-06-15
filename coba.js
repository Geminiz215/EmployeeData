const axios = require("axios").default;
const ip = require("ip")

const hallo = async () => {
    let ip =  await axios.get(`https://ipapi.co/json/`)
    

    console.log(ip.data)


}

hallo()
