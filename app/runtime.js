/**
 * Created by vinhhoang on 26/03/2016.
 */
import {RootAppComponent} from './components/root-app/rootApp.component'

/**
 * Runtime delegate register component for moduleLoader service
 * */
export class RunTime {
  constructor(moduleLoader, $ocLazyLoad) {
    let runtime = this;

    moduleLoader.component(RootAppComponent.name, new RootAppComponent($ocLazyLoad));
  }
}
RunTime.$inject = ['moduleLoader', '$ocLazyLoad'];