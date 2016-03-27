/**
 * Created by vinhhoang on 26/03/2016.
 */
import {HeaderComponent} from '../../partial-component/header/header.component'
import {ThreeColumn} from '../../partial-component/three-column/three-column'

let MODULE_NAME = 'component.holds';
let COMPONENT_NAME = 'vtHolds';

class HoldsComp {
  constructor() {
    let comp = this;

    comp.template = `
    <vt-header options="$ctrl.options"></vt-header>

    <vt-three-column>
      <column1>Column 1</column1>
      <column2>Column 2</column2>
      <column3>Column 3</column3>
    </vt-three-column>
    `;
    comp.controller = HoldsCompController;
  }

  static get name() {
    return COMPONENT_NAME;
  }
}

class HoldsCompController {
  constructor() {
    let ctrl = this;

    ctrl.options = {
      menus: [
        {
          label: 'Holds',
          routeName: 'Holds'
        },
        {
          label: 'VC',
          route: 'VC'
        }
      ],
      userFab: {
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
      },
      controlButtons: [
        {
          label: 'add',
          click: emptyFn,
          tooltip: 'Add new entiry'
        },
        {
          label: 'save',
          click: emptyFn,
          tooltip: undefined
        },
        {
          label: 'edit',
          click: emptyFn,
          tooltip: undefined
        }
      ]
    };
  }
}
HoldsCompController.$inject = [];

function emptyFn() {
}

angular
  .module(MODULE_NAME, [HeaderComponent.name, ThreeColumn.name])
  .component(HoldsComp.name, new HoldsComp());

export let HoldsComponent = {
  name: MODULE_NAME,
  compName: COMPONENT_NAME
};

