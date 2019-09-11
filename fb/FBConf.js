import * as firebase from 'firebase';

const fb_init = () => {
  if (!firebase.apps.length) {
    const firebaseConfig = {
      apiKey: "AIzaSyAys1FS8vamGngn24oev5grkd-1smTMLSU",
      authDomain: "municipios-3e54c.firebaseapp.com",
      databaseURL: "https://municipios-3e54c.firebaseio.com",
      projectId: "municipios-3e54c",
      storageBucket: "municipios-3e54c.appspot.com",
      messagingSenderId: "659250775850",
      appId: "1:659250775850:web:70f41e1154d73793ee0053"
    };
    firebase.initializeApp(firebaseConfig);
  }
};

export default fb_init;