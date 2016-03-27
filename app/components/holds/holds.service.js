/**
 * Created by vinhhoang on 27/03/2016.
 */

let SERVICE_NAME = 'services.holds';
let _q;

export class HoldsService {
  constructor($q) {
    _q = $q;
    let ser = this;

  }

  static get name() {
    return SERVICE_NAME;
  }

  getHolds() {
    return _q.resolve(this.getMockData());
  }

  getMockData() {
    let ser = this;
    let rs = [], LENGTH = 10;
    let FIRST_NAMES = ['Vinh', 'Duc', 'David', 'Stephen', 'Jone', 'Jessica'],
      LAST_NAME = ['Pepsi', 'Hoang', 'Coca', 'Bacon', 'Banana', 'Strawberry'],
      LEVEL = ['POB', 'Revenue Contract', 'Line'],
      APPLY_ON = ['Revenue'],
      EXPIRY_ON = ['Acceptance'],
      STATUS = [true, false]

    for (let i = 0; i < LENGTH; i++) {
      let now = new Date();
      let now2 = new Date();
      let newHold = {
        id: ser.getUUID(),
        name: FIRST_NAMES[ser.getRandom(FIRST_NAMES)] + ' ' + LAST_NAME[ser.getRandom(LAST_NAME)],
        level: LEVEL[ser.getRandom(LEVEL)],
        applyOn: APPLY_ON[0],
        expiryOn: EXPIRY_ON[0],
        effectiveFrom: now,
        effectiveTo: new Date(now2.setDate(now2.getDate() + 6)),
        status: STATUS[ser.getRandom(STATUS)]
      }

      rs.push(newHold);
    }

    return rs;
  }

  getRandom(array){
    return Math.floor(Math.random() * array.length);
  }

  getUUID(){
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
}
HoldsService.$inject = ['$q'];