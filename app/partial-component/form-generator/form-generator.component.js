/**
 * Created by vinhhoang on 27/03/2016.
 */
let MODULE_NAME = 'vtcomponent.form-generator', COMPONENT_NAME = 'vtForm-Generator';

class Component {
  constructor() {
    let ctrl = this;

    ctrl.restrict = 'E';
    ctrl.templateUrl = './partial-component/form-generator/form-generator.tpl.html';
    ctrl.controller = CompController;
  }
}

class CompController {
  constructor() {

  }
}
CompController.$inject = [];

angular.module(MODULE_NAME, [])
  .component(COMPONENT_NAME, new Component());

export let FormGenerator = {
  name: MODULE_NAME,
  compName: COMPONENT_NAME
};