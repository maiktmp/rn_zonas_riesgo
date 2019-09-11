const findPhotos = (id, place) => {
  const findPhotos = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?' +
    'input=' + place + '&' +
    'inputtype=textquery&' +
    'fields=photos,name&' +
    'key=AIzaSyDapnKRfWPWVQ37Ufp42N9mzPE4WJk1ZoM';

  fetch(findPhotos)
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status === 'OK') {
        getPhoto(responseJson.candidates[0].photos[0].photo_reference, response => {
          const log =
            '{' +
            'id: "' + id + '"' +
            ',' +
            'image_url: "' + response.url + '"' +
            '},';
          console.log(log);
        });
        return responseJson.candidates[0].photos;
      }
      return null;
    });
};

const getPhoto = (reference, cb) => {
  const url = 'https://maps.googleapis.com/maps/api/place/photo?' +
    'maxwidth=400&' +
    'photoreference=' + reference + '&' +
    'key=AIzaSyDapnKRfWPWVQ37Ufp42N9mzPE4WJk1ZoM';
  fetch(url)
    .then((response) => cb(response));
};
const MapServices = {findPhotos, getPhoto};

export default MapServices;