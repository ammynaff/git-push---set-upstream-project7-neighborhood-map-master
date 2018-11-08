//Followed Forrest Walker and Documentation https://foursquare.com/developers/apps
class Helper {
  static baseURL () {
    ////Fetch venue details from Foursquare
    return 'https://api.foursquare.com/v2';
  }
  static auth () {
    //Foursquare authorization keys
    const keys = {
      client_id: 'FU3TJU4ZYJD50M0NPLYKQGDAIFOVNBVBBQVPBTSJSEHRLB3P',
      client_secret: '454XLKTZJXLRSWVOQOOVWXXZIKV4WPXBVLMAVDIRK3GBBL2M',
      v: '20181031',
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
  //fetch params for venue
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

/* code below exports a class used for 
endpoints designated to venue data
*/

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
