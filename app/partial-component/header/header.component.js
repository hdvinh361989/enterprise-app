/**
 * Created by vinhhoang on 26/03/2016.
 */
import {HeaderSer} from './header.service'

let MODULE_NAME = 'vtcomponents.header', COMPONENT_NAME = 'vtHeader';

class HeaderComp {
  constructor() {
    let comp = this;

    comp.restrict = 'E';
    comp.controller = HeaderCompController;
    comp.templateUrl = './partial-component/header/header.tpl.html';
    comp.bindings = {}
  }
}


class HeaderCompController {
  constructor(headerSer) {
    let ctrl = this;
    let defaultOptions, DIRECTION_BOTTOM = 'bottom';

    ctrl.options = headerSer.options;

    angular.forEach(ctrl.options.controlButtons, (v)=> {
      v.tooltipDirection = v.tooltipDirection || DIRECTION_BOTTOM;
    });
  }
}
HeaderCompController.$inject = [HeaderSer.name];

function emptyFn() {
}


angular.module(MODULE_NAME, [])
  .component(COMPONENT_NAME, new HeaderComp())
  .service(HeaderSer.name, HeaderSer);

export let HeaderComponent = {
  name: MODULE_NAME,
  compName: COMPONENT_NAME
};
export let HeaderService = HeaderSer.name;