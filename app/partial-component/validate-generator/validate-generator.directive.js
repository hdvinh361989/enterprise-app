/**
 * Created by vinhhoang on 28/03/2016.
 */
let MODULE_NAME = 'vtdirective.validate-generator', DIRECTIVE_NAME = 'vtValidate';

let SUPPORT_VALIDATES = ['required', 'md-maxlength'];

export function ValidateDirectory($compile) {
  class Directive {
    constructor() {
      let dir = this;

      dir.restrict = 'A';
      dir.require = '?ngModel';
      dir.scope = {
        vtValidate: '<'
      }
    }

    link(scope, elm, attr, ctrl) {
      if (!ctrl) return;

      let rules = scope.vtValidate;
      let isTouched = false;

      //Required first time validate
      function onBlur() {
        isTouched = true;
        ctrl.$validate();
        elm.off('blur', onBlur)
      }

      elm.on('blur', onBlur)


      //Setup validation based on validate rule
      angular.forEach(rules, (r)=> {

        if (SUPPORT_VALIDATES.indexOf(r.name) === -1) return;

        attr.$set(r.name, r.value);

        ctrl.$validators[r.name] = behaviorFactory(r.name).bind(r);

        attr.$observe(r.name, function () {
          ctrl.$validate();
        });
      });

      //Factory return suitable validate behavior for each rule
      function behaviorFactory(ruleName) {
        switch (ruleName) {
          case 'required':
            return requiredBehavior;
          case 'md-maxlength':
            return mdMaxLengthBehavior;
        }
      }


      function requiredBehavior(modelValue, viewValue) {
        if (!isTouched) return true;
        return !attr.required || !ctrl.$isEmpty(viewValue);
      }

      function mdMaxLengthBehavior(modelValue, viewValue) {
        let rule = this;
        if (viewValue) return !attr['md-maxlength'] || viewValue.length <= rule.value;

        return true;
      }

    }
  }

  return new Directive();
}
ValidateDirectory.$inject = ['$compile'];


angular.module(MODULE_NAME, [])
  .directive(DIRECTIVE_NAME, ValidateDirectory);

export let ValidateGenerator = {
  name: MODULE_NAME
};

