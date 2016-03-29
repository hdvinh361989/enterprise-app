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
      'vtSearch': '&',
      'vtDataSet': '<',
      'vtDelay': '@',
      'vtOnSelect': '&'
    }
  }
}


class CompController {
  constructor($q, $timeout) {


    let ctrl = this;
    ctrl._q = $q;
    ctrl._timeout = $timeout;

    ctrl.searchQuery = '';

    $q.resolve(ctrl.vtDataSet)
      .then((dataset)=> ctrl.vtOnSelect({'$selected': dataset[0]}));
  }

  //Search handler
  onSearch($event) {
    let ctrl = this;

    if (ctrl.timeoutPromise)
      ctrl._timeout.cancel(ctrl.timeoutPromise);

    ctrl.timeoutPromise = ctrl._timeout(()=> {
      ctrl.vtSearch({vtQuery: ctrl.searchQuery})
    }, parseInt(ctrl.vtDelay))
  }

  onSelectItem(item) {
    let ctrl = this;
    ctrl.vtOnSelect({'$selected': item});
  }
}
CompController.$inject = ['$q', '$timeout'];


function empty() {
}


angular.module(MODULE_NAME, [])
  .component(COMPONENT_NAME, new Component());

export let SearchList = {
  name: MODULE_NAME,
  compName: COMPONENT_NAME
};