/**
 * Created by vinhhoang on 26/03/2016.
 */
import {HeaderComponent} from '../../partial-component/header/header.component'

let MODULE_NAME = 'component.holds';
let COMPONENT_NAME = 'vtHolds';

class HoldsComp {
  constructor() {
    let comp = this;

    comp.template = '<vt-header></vt-header>';

    comp.controller = HoldsCompController;
  }

  static get name() {
    return COMPONENT_NAME;
  }
}

class HoldsCompController {
  constructor(){

  }
}
HoldsCompController.$inject = [];


export let HoldsComponent = angular
  .module(MODULE_NAME, [HeaderComponent.name])
  .component(HoldsComp.name, new HoldsComp());

HoldsComponent.name = MODULE_NAME;
HoldsComponent.compName = COMPONENT_NAME;
