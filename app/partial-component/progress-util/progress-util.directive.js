/**
 * Created by vinhhoang on 29/03/2016.
 */
let MODULE_NAME = 'vtdirectives.progress-util',
  DIRECTIVE_NAME = 'vtProgressUtil';
//SERVICE_NAME = 'services.progUtilSer';

function DirectiveFactory(utilSer) {
  class Directive {
    constructor() {
      let dir = this;

      dir.restrict = 'A';
    }

    link(scope, ele, attr) {
      scope.$on('progress-bar-hide', (event)=> {
        let parent = ele.parent();
        parent.remove();
      })
    }
  }

  return new Directive();
}
DirectiveFactory.$inject = [];


function ServiceFactory() {
  class Service {
    constructor() {

    }
  }
  return new Service();
}

angular.module(MODULE_NAME, [])
  .directive(DIRECTIVE_NAME, DirectiveFactory)
//.factory(ServiceFactory.name, ServiceFactory);

export let ProgressUtil_Module = {
  name: MODULE_NAME
};

export let ProgressUtil_Directive = DIRECTIVE_NAME;
//export let ProgressUtil_Service = SERVICE_NAME;
