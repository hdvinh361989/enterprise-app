/**
 * Created by vinhhoang on 28/03/2016.
 */
let MODULE_NAME = 'vtUtil', SERVICE_NAME = 'services.util';

class UtilSer {
  constructor() {
    let ser = this;
  }

  static get name() {
    return SERVICE_NAME;
  }

  generateId() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
}

angular.module(MODULE_NAME, [])
  .service(SERVICE_NAME, UtilSer);

export let Util = {
  name: MODULE_NAME
}

export let UtilService = SERVICE_NAME;