/**
 * Created by vinhhoang on 26/03/2016.
 */
export class Configuration {
  constructor($locationProvider, $controllerProvider,
              $compileProvider, $filterProvider, $provide, moduleLoaderProvider) {
    $locationProvider.html5Mode(true);

    moduleLoaderProvider.register = {
      controller: $controllerProvider.register,
      directive: $compileProvider.directive,
      component: $compileProvider.component,
      filter: $filterProvider.register,
      factory: $provide.factory,
      service: $provide.service,
      provider: $provide.provider
    };
  }
}
Configuration.$inject = ['$locationProvider', '$controllerProvider',
  '$compileProvider', '$filterProvider', '$provide', 'moduleLoaderProvider'];


export class DynamicConfiguration {
  constructor($controllerProvider,
              $compileProvider, $filterProvider, $provide, moduleLoaderProvider) {

    moduleLoaderProvider.register = {
      controller: $controllerProvider.register,
      directive: $compileProvider.directive,
      component: $compileProvider.component,
      filter: $filterProvider.register,
      factory: $provide.factory,
      service: $provide.service,
      provider: $provide.provider
    };
  }
}
DynamicConfiguration.$inject = ['$controllerProvider',
  '$compileProvider', '$filterProvider', '$provide', 'moduleLoaderProvider'];