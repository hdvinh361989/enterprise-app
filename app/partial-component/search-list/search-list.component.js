/**
 * Created by vinhhoang on 27/03/2016.
 */
let MODULE_NAME = 'vtcomponent.searchList', COMPONENT_NAME = 'vtSearchList';

class Component {
  constructor() {
    let comp = this;

    comp.restrict = 'E';
    comp.templateUrl = './partial-component/search-list/search-list.tpl.html';
    comp.controller = CompController;
    comp.bindings = {
      options: '=',
      dataset: '='
    }
  }
}


//1288323623006
class CompController {
  constructor() {
    let ctrl = this, defaultOptions;

    ctrl.searchQuery = '';

    //Init defaultOptions
    defaultOptions = {

    };

  }

  onSearch($event){

  }
}
CompController.$inject = [];


angular.module(MODULE_NAME, [])
  .component(COMPONENT_NAME, new Component());

export let SearchList = {
  name: MODULE_NAME,
  compName: COMPONENT_NAME
};