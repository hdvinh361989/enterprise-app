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
    var rs = [], LENGTH = 10, CRIT_LENGTH = 4;
    let FIRST_NAMES = ['Vinh', 'Duc', 'David', 'Stephen', 'Jone', 'Jessica'],
      LAST_NAME = ['Pepsi', 'Hoang', 'Coca', 'Bacon', 'Banana', 'Strawberry'],
      LEVEL = ['POB', 'Revenue Contract', 'Line'],
      APPLY_ON = ['Revenue'],
      EXPIRY_ON = ['Acceptance Date', 'Invoice Date', 'Order Create Date'],
      STATUS = [true, false],
      FIELD_NAME = ['Field 1', 'Field 2', 'Field 2'],
      FILTER = ['Equal', 'Not Equal To', 'Greater Than', 'Less Than'];

    for (let i = 0; i < LENGTH; i++) {
      let now = new Date();
      let now2 = new Date();
      let newHold = {
        id: ser.getUUID(),
        holdName: FIRST_NAMES[ser.getRandom(FIRST_NAMES)] + ' ' + LAST_NAME[ser.getRandom(LAST_NAME)],
        level: LEVEL[ser.getRandom(LEVEL)],
        applyOn: APPLY_ON[0],
        expiryOn: EXPIRY_ON[ser.getRandom(EXPIRY_ON)],
        effectiveFrom: now,
        effectiveTo: new Date(now2.setDate(now2.getDate() + 6)),
        status: STATUS[ser.getRandom(STATUS)],
        criterias: (function () {
          let rs = [];
          for (var j = 0; j < Math.round(Math.random() * CRIT_LENGTH); j++) {
            let newCrit = {
              fieldName: FIELD_NAME[ser.getRandom(FIELD_NAME)],
              filter: FILTER[ser.getRandom(FILTER)],
              value: Math.round(Math.random * 10)
            }
            rs.push(newCrit);
          }
          return rs;
        }).call()
      }

      rs.push(newHold);
    }

    return rs;
  }

  searchByName(searchQuery) {
    let ser = this;
    return _q.resolve(ser.getMockData())
      .then((data)=> {
        return data.filter((v)=> v.name.indexOf(searchQuery) > -1);
      });
  }

  getRandom(array) {
    return Math.floor(Math.random() * array.length);
  }

  getUUID() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
}
HoldsService.$inject = ['$q'];