import axios from "axios";

let GlobalURL = "http://www.localhost:5004";
// let GlobalServerURL = "https://404040.co.il/fullstack/EllieThor/vacations_stars/server/uploads/paris.png";

export function postRequest(url, ob) {
  return new Promise(async (resolve, reject) => {
    console.log("POST ");
    try {
      let res = await axios.post(GlobalURL + url, ob);
      resolve(res);
    } catch (err) {
      resolve("Error : ", err);
    }
  });
}

export function getRequest(url) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios.get(GlobalURL + url);
      resolve(res);
    } catch (err) {
      resolve("Error : ", err);
    }
  });
}
