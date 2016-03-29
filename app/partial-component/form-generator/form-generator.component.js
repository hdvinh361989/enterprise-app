/**
 * Created by vinhhoang on 27/03/2016.
 */
import {UtilService, Util} from '../../services/ultil.service'
import {ValidateGenerator} from '../validate-generator/validate-generator.directive'

let MODULE_NAME = 'vtcomponent.form-generator', COMPONENT_NAME = 'vtFormGenerator';
let SPECIAL_INPUT = ['select', 'radio', 'checkbox', 'textarea', 'date'];

class Component {
  constructor() {
    let ctrl = this;

    ctrl.restrict = 'E';
    ctrl.templateUrl = './partial-component/form-generator/form-generator.tpl.html';
    ctrl.controller = CompController;
    ctrl.bindings = {
      'vtFields': '<',
      'ngModel': '=',
      'vtOptions': '<'
    }
  }
}

class CompController {
  constructor(utilSer, $scope, $q) {
    let ctrl = this;

    ctrl.$scope = $scope;

    ctrl.formName = 'form' + utilSer.generateId();
    ctrl.isStart = true;

    //Init special input
    ctrl.initSpecialInput();
  }

  isSpecialInput(type) {
    let ctrl = this;
    return SPECIAL_INPUT.indexOf(type) > -1;
  }

  //Special init for special input
  initSpecialInput() {
    let ctrl = this;

    angular.forEach(ctrl.vtFields, (f)=> {
      switch (f.type) {
        case 'select':
        {
          if (!f.options[0]) break;

          if (angular.isString(f.options[0])) {
            ctrl.ngModel[f.key] = f.options[0];
            break;
          }

          if (angular.isObject(f.options[0])) {
            if (f.options[0].value) {
              ctrl.ngModel[f.key] = f.options[0].value || '';
            } else {
              console.log('field -> options[0].value is undefined');
            }
          }
          break;
        }
      }
    });
  }

  isObject(obj) {
    return angular.isObject(obj);
  }

  getLayoutTemplate(field) {
    return angular.isArray(field) ? '/multi-column.html' : '/one-column.html'
  }

  getInputTemplate(type) {
    switch (type) {
      case 'select':
        return '/selectInput.html';
      case 'date':
        return '/dateInput.html';
      default:
        return '/commonInput.html';
    }
  }

}
CompController.$inject = [UtilService, '$scope', '$q'];


angular.module(MODULE_NAME, [Util, ValidateGenerator])
  .component(COMPONENT_NAME, new Component());

export let FormGenerator = {
  name: MODULE_NAME,
  compName: COMPONENT_NAME
};