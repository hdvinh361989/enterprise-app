/**
 * Created by vinhhoang on 27/03/2016.
 */
let MODULE_NAME = 'vtcomponents.threeColumn', COMPONENT_NAME = 'vtThreeColumn';

class ThreeColumnComp {
  constructor() {
    let ctrl = this;

    ctrl.restrict = 'AE';
    ctrl.transclude = {
      'column1': 'column1',
      'column2': 'column2',
      'column3': 'column3'
    };
    ctrl.templateUrl = './partial-component/three-column/three-column.tpl.html';
  }

  static get name() {
    return COMPONENT_NAME;
  }
}


angular.module(MODULE_NAME, [])
  .component(ThreeColumnComp.name, new ThreeColumnComp());

export let ThreeColumn = {
  name: MODULE_NAME,
  compName: COMPONENT_NAME
};