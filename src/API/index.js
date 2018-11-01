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
static headers(){
    return {
        Accept: "application/json"
    };
}
static simpleFetch(endPoint,method,urlparams) {
    
}