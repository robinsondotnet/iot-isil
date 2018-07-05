// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyASRerPmnd5zYQ623XM4YUhd_6JLdCY8P4',
    authDomain: "iot-isil.firebaseapp.com",
    databaseURL: "https://iot-isil.firebaseio.com",
    projectId: "iot-isil",
    storageBucket: "iot-isil.appspot.com",
    messagingSenderId: "1068545785880"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
