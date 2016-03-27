/**
 * Created by vinhhoang on 26/03/2016.
 */
let MODULE_NAME = 'vtcomponents.header', COMPONENT_NAME = 'vtHeader';

class HeaderComp {
  constructor() {
    let dir = this;

    dir.restrict = 'E';
    dir.controller = HeaderCompController;
    dir.templateUrl = './partial-component/header/header.tpl.html';
    dir.bindings = {
      options: '='
    }
  }
}


class HeaderCompController {
  constructor() {
    let ctrl = this;
    let defaultOptions, DIRECTION_BOTTOM = 'bottom';

    defaultOptions = {
      /**
       * Menu
       * Possible value
       * {
          label: 'Holds',
          routeName: 'Holds'
        }
       * */
      menus: [],

      /**
       * UserFab
       * */
      userFab: {
        isOpen: false,
        direction: 'down',
        avatar: 'public/image/jessica.jpg',

        /**
         * Possible value: md-fling, md-scale
         * */
        animationMode: 'md-fling',

        /**
         * Possible value
         * {
         label: 'Setting',
         tooltip: undefined,
         tooltipDirection: 'left',
         click: emptyFn,
         icon: 'settings'
         }
         * */
        actions: []
      },

      /**
       * ToolbarFab
       * */
      toolbarFab: {
        isOpen: false
      },

      /**
       * Logo
       * */
      logo: 'public/logo.jpg',


      /**Buttons
       * Possible value
       * {
          label: 'add',
          click: emptyFn,
          tooltip: 'Add new entiry'
        }
       * */
      controlButtons: [],

      /**
       * Process bar
       * */
      showProcessBar: false
    };
    ctrl.options = ctrl.options && Object.keys(ctrl.options).length > 0 ? angular.merge(defaultOptions, ctrl.options) : defaultOptions;

    angular.forEach(ctrl.options.controlButtons, (v)=> {
      v.tooltipDirection = v.tooltipDirection || DIRECTION_BOTTOM;
    });
  }
}
HeaderCompController.$inject = [];

function emptyFn() {
}


angular.module(MODULE_NAME, [])
  .component(COMPONENT_NAME, new HeaderComp());

export let HeaderComponent = {
  name: MODULE_NAME,
  compName: COMPONENT_NAME
};