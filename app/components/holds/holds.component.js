/**
 * Created by vinhhoang on 26/03/2016.
 */
import '../../libs/angular-messages/angular-messages.min'
import '../../libs/angular-material-data-table/dist/md-data-table.min'

import {HeaderComponent, HeaderService} from '../../partial-component/header/header.component'
import {ThreeColumn} from '../../partial-component/three-column/three-column'
import {SearchList} from '../../partial-component/search-list/search-list.component'
import {FormGenerator} from '../../partial-component/form-generator/form-generator.component'

import {HoldsService} from './holds.service'

let MODULE_NAME = 'component.holds',
  COMPONENT_NAME = 'vtHolds',
  FIELD_NAMES = ['Field 1', 'Field 2'],
  FILTER = ['Equal', 'Not Equal To', 'Less Than', 'Greater Than'];

class HoldsComp {
  constructor() {
    let comp = this;

    comp.templateUrl = './components/holds/holds.tpl.html';
    comp.controller = HoldsCompController;
  }

  static get name() {
    return COMPONENT_NAME;
  }
}

let _holdSer;

class HoldsCompController {
  constructor(holdSer, headerSer, $rootScope) {
    _holdSer = holdSer;

    $rootScope.$broadcast('progress-bar-hide');

    let ctrl = this;

    //Control state
    ctrl.isEdit = false;

    //Header config
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
        userFab: false,
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
          click: ctrl.onAdd.bind(ctrl),
          tooltip: 'Add new Hold',
          isDisabled: false
        },
        {
          label: 'save',
          click: ctrl.onSave.bind(ctrl),
          tooltip: undefined,
          isDisabled: true
        },
        {
          label: 'edit',
          click: ctrl.onEdit.bind(ctrl),
          tooltip: undefined,
          isDisabled: false
        }
      ]
    };
    ctrl.headerOptions = headerSer.setOptions(ctrl.headerOptions);

    //Search List config
    ctrl.holds = [];
    ctrl.selectedItem = {};
    holdSer.getHolds()
      .then((data)=> {
        ctrl.holds = data;
      });


    //Form generator config
    ctrl.newHold = {};
    ctrl.newCrit = undefined;
    ctrl.formFields = [
      {
        label: 'name',
        type: 'text',
        key: 'holdName',
        validates: [
          {name: 'required', errorMsg: 'Name is required', value: true},
          {name: 'md-maxlength', errorMsg: 'Max length 10', value: 10}
        ]
      }, {
        label: 'Level',
        type: 'select',
        key: 'Level',
        options: [
          'Revenue Contract', 'POB', 'Line'
        ],
        validates: [
          {name: 'required', errorMsg: 'Level is required', value: true}
        ]
      }, {
        label: 'Release Event',
        type: 'text',
        key: 'releaseEvent'
      }, {
        label: 'Apply on',
        type: 'select',
        key: 'applyOn',
        options: [
          'Revenue', 'Allocation', 'Posting', 'VC', 'Review', 'Cost'
        ]
      }, [
        {
          label: 'Expiry on',
          type: 'select',
          key: 'expiryOn',
          options: [
            'Acceptance Date', 'Invoice Date', 'Order Create Date'
          ]
        },
        {
          label: 'Days',
          type: 'number',
          key: 'days'
        }
      ], {
        label: 'Effective From',
        type: 'date',
        key: 'effectiveFrom'
      }, {
        label: 'Effective To',
        type: 'date',
        key: 'effectiveTo'
      }, {
        label: 'Status',
        type: 'select',
        key: 'status',
        options: [
          {value: true, label: 'Active'},
          {value: false, label: 'Inactive'}
        ]
      }

    ];
    ctrl.formOptions = {
      isEdit: ctrl.isEdit
    }

    //Table config
    ctrl.rowSelected = [];
    ctrl.query = {
      order: 'fieldName',
      limit: 5,
      page: 1
    };
    ctrl.tableOptions = {
      rowSelection: false,
      multiSelect: true,
      autoSelect: true,
      largeEditDialog: false,
      boundaryLinks: false,
      limitSelect: true,
      pageSelect: true
    };
  }

  //Search handleer
  onSearch(searchQuery) {
    let ctrl = this;

    return _holdSer.searchByName(searchQuery)
      .then((data)=> {
        return ctrl.holds = data || []
      });
  }

  //Get field names for criteria
  getFieldName() {
    return FIELD_NAMES;
  }

  getFilter() {
    return FILTER;
  }

  onKeyPress($event) {
    let ctrl = this;
    if ($event.keyCode === 13) {
      ctrl.onCriteriaSave();
    }
  }

  onCriteriaSave() {
    let ctrl = this;
    if (!ctrl.newHold.criterias)  ctrl.newHold.criterias = [];
    ctrl.newHold.criterias.push(ctrl.newCrit);
    ctrl.newCrit = {};
  }

  onCriteriaRemove() {
    let ctrl = this;

    angular.forEach(ctrl.rowSelected, (crit)=> {
      let index = ctrl.newHold.criterias.indexOf(crit);
      ctrl.newHold.criterias.splice(index, 1);
    });
  }

  onSave(button, buttons) {
    let ctrl = this;
    ctrl.newHold.id = ctrl.getUUID();
    ctrl.holds.push(ctrl.newHold);
    ctrl.selectedItem = ctrl.newHold;
    ctrl.newCrit = {};
    ctrl.formOptions.isEdit = ctrl.isEdit = ctrl.tableOptions.rowSelection = false;
    buttons[0].isDisabled = false;
    button.isDisabled = true;
    buttons[2].isDisabled = false;
  }

  onAdd(button, buttons) {
    let ctrl = this;
    ctrl.newHold = {};
    ctrl.newCrit = {};
    ctrl.formOptions.isEdit = ctrl.isEdit = ctrl.tableOptions.rowSelection = true;

    button.isDisabled = true;
    buttons[1].isDisabled = false;
    buttons[2].isDisabled = true;
  }

  onEdit(button, buttons) {
    let ctrl = this;
    if (ctrl.selectedItem) {
      ctrl.formOptions.isEdit = ctrl.isEdit = ctrl.tableOptions.rowSelection = true;

      button.isDisabled = true;
      buttons[0].isDisabled = false;
      buttons[1].isDisabled = false;
    } else {
      alert('Please select item to edit')
    }
  }

  onSelect(selectedItem) {
    let ctrl = this,
      buttons = ctrl.headerOptions.controlButtons;

    if (buttons[0].isDisabled) {
      if (ctrl.newHold.holdName && !confirm('You got unsaved data. Continues?')) return;
      buttons[0].isDisabled = false;
      buttons[1].isDisabled = true;
      buttons[2].isDisabled = false;
      ctrl.isEdit = ctrl.formOptions.isEdit = ctrl.tableOptions.rowSelection = false;
    }
    ctrl.selectedItem = ctrl.newHold = selectedItem;
  }

  getUUID() {
    return _holdSer.getUUID();
  }
}
HoldsCompController.$inject = [HoldsService.name, HeaderService, '$rootScope'];

function emptyFn() {
}

angular
  .module(MODULE_NAME, [
    'ngMessages', 'md.data.table', HeaderComponent.name,
    ThreeColumn.name, SearchList.name, FormGenerator.name
  ])
  .component(HoldsComp.name, new HoldsComp())
  .service(HoldsService.name, HoldsService)

export let HoldsComponent = {
  name: MODULE_NAME,
  compName: COMPONENT_NAME
};

