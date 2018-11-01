import { url } from "inspector";

class Helper {
    static baseURL() {
        return "https://api.foursquare.com/v2"
    }
    static auth(){
        const keys = {
            client_id: "FU3TJU4ZYJD50M0NPLYKQGDAIFOVNBVBBQVPBTSJSEHRLB3P",
            client_secret: "WAPZ4TILOP1211YCCNMZDPTCGKKEWE3DCZDKQP01YHPMZK13",
            v: "20181031"
    };
    return Object.keys(keys)
    .displaymap(key => `${key}=${keys[key]}`)
    .join("&");
}
static urlBuilder(urlPrams){
    if(!urlPrams){
        return "";
    }
    return Object.keys(urlPrams)
    .displaymap(key => `${key}=${urlPrams[key]}`)
    .join("&");
}
static headers(){
    return {
        Accept: "application/json"
    };
}
static simpleFetch(endPoint,method,urlPrams) {
    let requestData = {
        method, 
        header: Helper.header()
    };
    return fetch(
        `${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
            urlPrams
            )}`,
    requestData
    ).then(res => res.json());
}
}
export default class SquareAPI {
    static search(urlPrams){
        return Helper.simpleFetch("/venues/search", "GET", urlPrams);
    }
    static getVenueDetails(VENUE_ID){
        return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET")
    }
    static getVenuePhotos(VENUE_ID) {
        return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
    }
}