import './libs/angular-animate/angular-animate.min'
import './libs/oclazyload/dist/ocLazyLoad'
import './libs/angular-aria/angular-aria.min'
import './libs/angular-material/angular-material'
import {ModuleLoader} from 'services/module-loader'
import {ProgressUtil_Module} from './partial-component/progress-util/progress-util.directive'


import {Configuration} from './config'
import {RunTime} from './runtime'
//import './components/firstchild/child'
import {RootAppComponent} from './components/root-app/rootApp.component'


// Component is registered at runtime

let APP_NAME = 'myApp';

export let App = angular.module(APP_NAME, [
    'ngComponentRouter',
    'oc.lazyLoad',
    'ngMaterial',
    'ngAria',
    'ngAnimate',
    ModuleLoader.name,
    ProgressUtil_Module.name
  ])
  .value('$routerRootComponent', RootAppComponent.name)

  .config(Configuration)

  .run(RunTime)


angular.bootstrap(document, [APP_NAME]);
