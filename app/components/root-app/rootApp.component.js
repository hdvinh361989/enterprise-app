/**
 * Created by vinhhoang on 26/03/2016.
 */

export class RootAppComponent {
  constructor($ocLazyLoad) {
    let comp = this;

    comp.template = `
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

  }

  static get name() {
    return 'rootApp';
  }
}
RootAppComponent.$inject = ['$ocLazyLoad', '$rootScope'];