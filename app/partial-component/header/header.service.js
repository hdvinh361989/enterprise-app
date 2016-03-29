/**
 * Created by vinhhoang on 28/03/2016.
 */
let SERVICE_NAME = 'services.header';

export class HeaderSer {
  constructor() {
    let ser = this;

    ser._options = {
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
    }
  }

  static get name() {
    return SERVICE_NAME;
  }

  /**
   * Set options method
   * */
  setOptions(options) {
    let ser = this;
    ser._options = angular.merge(ser._options, options);
    return ser._options;
  }

  get options() {
    return this._options;
  }
}