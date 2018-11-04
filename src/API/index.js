class Helper {
  static baseURL () {
    return 'https://api.foursquare.com/v2';
  }
  static auth () {
    const keys = {
      client_id: 'FU3TJU4ZYJD50M0NPLYKQGDAIFOVNBVBBQVPBTSJSEHRLB3P',
      client_secret: 'WAPZ4TILOP1211YCCNMZDPTCGKKEWE3DCZDKQP01YHPMZK13',
      v: '20181101',
    };
    return Object.keys (keys).map (key => `${key}=${keys[key]}`).join ('&');
  }
  static urlBuilder (urlPrams) {
    if (!urlPrams) {
      return '';
    }
    return Object.keys (urlPrams)
      .map (key => `${key}=${urlPrams[key]}`)
      .join ('&');
  }
  static headers () {
    return {
      Accept: 'application/json',
    };
  }
  static simpleFetch (endPoint, method, urlPrams) {
    let requestData = {
      method,
      headers: Helper.headers (),
    };
    return fetch (
      `${Helper.baseURL ()}${endPoint}?${Helper.auth ()}&${Helper.urlBuilder (urlPrams)}`,
      requestData
    ).then (res => res.json ());
  }
}
export default class FourSquareAPI {
  static search (urlPrams) {
    return Helper.simpleFetch ('/venues/search', 'GET', urlPrams);
  }
  static getVenueDetails (VENUE_ID) {
    return Helper.simpleFetch (`/venues/${VENUE_ID}`, 'GET');
  }
  static getVenuePhotos (VENUE_ID) {
    return Helper.simpleFetch (`/venues/${VENUE_ID}/photos`, 'GET');
  }
}
