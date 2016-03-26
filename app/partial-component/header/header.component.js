/**
 * Created by vinhhoang on 26/03/2016.
 */
let MODULE_NAME = 'vtcomponents.header', COMPONENT_NAME = 'vtHeader';

class HeaderComp {
  constructor() {
    let dir = this;

    dir.restrict = 'E';
    dir.controller = HeaderCompController;
    dir.bindToController = true;

    dir.templateUrl = './partial-component/header/header.tpl.html';
  }
}


class HeaderCompController {
  constructor() {
    let ctrl = this;
    let defaultMenus, defaultUserFab, defaultToolbarFab, defaultLogo,
      defaultButtons;

    //Menu
    defaultMenus = [
      {
        label: 'Holds',
        routeName: 'Holds'
      },
      {
        label: 'VC',
        route: 'VC'
      }
    ];
    ctrl.menus = ctrl.menu ? angular.merge(defaultMenus, ctrl.menu) : defaultMenus;

    //UserFab
    defaultUserFab = {
      isOpen: false,
      direction: 'down',
      avatar: 'public/image/jessica.jpg',

      //Possible value: md-fling, md-scale
      animationMode: 'md-fling',
      actions: [
        {
          label: 'Setting',
          tooltip: undefined,
          tooltipDirection: 'left',
          click: emptyFn,
          icon: 'settings'
        },
        {
          label: 'Logout',
          tooltip: undefined,
          tooltipDirection: 'left',
          click: emptyFn,
          icon: 'undo'
        }
      ]
    };
    ctrl.userFab = ctrl.userFab ? angular.merge(defaultUserFab, ctrl.userFab) : defaultUserFab;
    angular.forEach(ctrl.userFab.actions, (act)=> act.tooltip = act.tooltip || act.label);

    //ToolbarFab
    defaultToolbarFab = {
      isOpen: false
    };
    ctrl.toolbarFab = ctrl.toolbarFab ? angular.merge(defaultToolbarFab, ctrl.toolbarFab) : defaultToolbarFab;

    //Logo
    defaultLogo = 'public/logo.jpg';
    ctrl.logo = ctrl.logo ? angular.merge(defaultLogo, ctrl.logo) : defaultLogo;

    //Buttons
    defaultButtons = [
      {
        label: 'Add',
        click: emptyFn
      },
      {
        label: 'Save',
        click: emptyFn
      },
      {
        label: 'Edit',
        click: emptyFn
      }
    ];
    ctrl.controlButtons = ctrl.buttons ? angular.extend(defaultButtons, ctrl.buttons) : defaultButtons;
  }
}
HeaderCompController.$inject = [];

function emptyFn() {
}


export let HeaderComponent = angular.module(MODULE_NAME, [])
  .component(COMPONENT_NAME, new HeaderComp());

HeaderComponent.name = MODULE_NAME;