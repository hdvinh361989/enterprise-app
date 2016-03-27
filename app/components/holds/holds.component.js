/**
 * Created by vinhhoang on 26/03/2016.
 */
import {HeaderComponent} from '../../partial-component/header/header.component'
import {ThreeColumn} from '../../partial-component/three-column/three-column'
import {SearchList} from '../../partial-component/search-list/search-list.component'
import {FormGenerator} from '../../partial-component/form-generator/form-generator.component'

import {HoldsService} from './holds.service'

let MODULE_NAME = 'component.holds';
let COMPONENT_NAME = 'vtHolds';

class HoldsComp {
  constructor() {
    let comp = this;

    comp.template = `
    <div flex="" layout="column" layout-fill="">
        <vt-header  options="$ctrl.headerOptions"></vt-header>

        <vt-three-column flex layout="column">
          <column1> <vt-search-list option="$ctrl.searchOptions" dataset="$ctrl.holds"></vt-search-list> </column1>
          <column2><vt-form-generator></vt-form-generator></column2>
          <column3>Column 3</column3>
      </vt-three-column>
    </div>
    `;
    comp.controller = HoldsCompController;
  }

  static get name() {
    return COMPONENT_NAME;
  }
}

class HoldsCompController {
  constructor(holdSer) {
    let ctrl = this;

    ctrl.headerOptions = {
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
    ctrl.searchOptions = {};

    holdSer.getHolds().then((data)=> ctrl.holds = data);
  }
}
HoldsCompController.$inject = [HoldsService.name];

function emptyFn() {
}

angular
  .module(MODULE_NAME, [HeaderComponent.name, ThreeColumn.name
    , SearchList.name, FormGenerator.name])
  .component(HoldsComp.name, new HoldsComp())
  .service(HoldsService.name, HoldsService)

export let HoldsComponent = {
  name: MODULE_NAME,
  compName: COMPONENT_NAME
};

