/**
 * Created by vinhhoang on 26/03/2016.
 */

export class RootAppComponent {
  constructor($ocLazyLoad) {
    let comp = this;

    comp.template = `
    <div layout="column" layout-fill="" layout-align="center center">
      <h1>Welcome To My Service</h1>
      <md-progress-circular vt-progress-util md-mode="{{$ctrl.progressMode}}" md-diameter="96"></md-progress-circular>
    </div>
    <div class="root-app-wrapper" layout="column" layout-fill>
      <ng-outlet flex="" layout="column" layout-fill=""></ng-outlet>
    </div>
    `;


    comp.$routeConfig = [
      {
        path: '/holds', loader: function () {
        return System.import('./components/holds/holds.component').then((m)=> {
          //Must return a component name
          return $ocLazyLoad.load(m.HoldsComponent).then(()=> m.HoldsComponent.compName)
        })
      }, name: 'Holds', useAsDefault: true
      }
    ];

    comp.controller = RootAppController

  }

  static get name() {
    return 'rootApp';
  }
}


class RootAppController {
  constructor() {
    let ctrl = this;

    ctrl.progressMode = 'indeterminate';
  }
}