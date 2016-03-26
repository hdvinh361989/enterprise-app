/**
 * Created by vinhhoang on 26/03/2016.
 */
/**
 * This module responsible for dynamic register component/controller/directive/service...
 *
 * You must be setup in config phase of module that dependent this module
 * Example:
 *
 * angular.module('myApp',['moduleLoader'].config(DynamicConfiguration);
 *
 *  class DynamicConfiguration {
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
 * */

let MODULE_NAME = 'moduleLoader';

export let ModuleLoader = angular.module(MODULE_NAME, [])
  .provider('moduleLoader', ModuleLoaderProvider);

function ModuleLoaderProvider() {
  let provider = this;

  provider.register = undefined;

  provider.$get = [function () {
    return new ModuleLoaderService(provider.register)
  }];

}

class ModuleLoaderService {
  constructor(register) {
    let ser = this;
    ser = angular.merge(ser, register);
  }
}

ModuleLoader.name = MODULE_NAME;