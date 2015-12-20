System.config({
  defaultJSExtensions: true,
  transpiler: "TypeScript",
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "TypeScript": "npm:babel-core@5.8.34",
    "TypeScript-runtime": "npm:babel-runtime@5.8.34",
    "angular": "github:angular/bower-angular@1.4.8",
    "angular-animate": "github:angular/bower-angular-animate@1.4.8",
    "angular-filter": "npm:angular-filter@0.5.8",
    "angular-gettext": "npm:angular-gettext@2.1.2",
    "angular-loading-bar": "npm:angular-loading-bar@0.8.0",
    "angular-sanitize": "github:angular/bower-angular-sanitize@1.4.8",
    "angular-toastr": "npm:angular-toastr@1.6.0",
    "angular-tooltips": "npm:angular-tooltips@1.0.6",
    "angular-ui-router": "npm:angular-ui-router@0.2.15",
    "angularjs-datepicker": "npm:angularjs-datepicker@0.2.16",
    "angulartics": "npm:angulartics@0.20.2",
    "angulartics-google-analytics": "npm:angulartics-google-analytics@0.1.3",
    "animate.css": "npm:animate.css@3.4.0",
    "babel": "npm:babel-core@5.8.34",
    "babel-runtime": "npm:babel-runtime@5.8.34",
    "bootstrap": "github:twbs/bootstrap@3.3.6",
    "bootstrap-less": "github:distros/bootstrap-less@3.3.9",
    "core-js": "npm:core-js@1.2.6",
    "highcharts": "npm:highcharts@4.2.0",
    "highcharts-ng": "npm:highcharts-ng@0.0.11",
    "jquery": "github:components/jquery@2.1.4",
    "moment": "npm:moment@2.10.6",
    "moment-duration-format": "npm:moment-duration-format@1.3.0",
    "ng-smooth-scroll": "npm:ng-smooth-scroll@1.7.3",
    "ngstorage": "npm:ngstorage@0.3.10",
    "typescript": "npm:typescript@1.7.5",
    "ui-select": "npm:ui-select@0.13.2",
    "underscore": "npm:underscore@1.8.3",
    "github:angular/bower-angular-animate@1.4.8": {
      "angular": "github:angular/bower-angular@1.4.8"
    },
    "github:angular/bower-angular-sanitize@1.4.8": {
      "angular": "github:angular/bower-angular@1.4.8"
    },
    "github:distros/bootstrap-less@3.3.9": {
      "jquery": "github:components/jquery@2.1.4"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:twbs/bootstrap@3.3.6": {
      "jquery": "github:components/jquery@2.1.4"
    },
    "npm:angular-filter@0.5.8": {
      "angular": "npm:angular@1.4.8"
    },
    "npm:angular-tooltips@1.0.6": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:angular-ui-router@0.2.15": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:angular@1.4.8": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:angulartics-google-analytics@0.1.3": {
      "angulartics": "npm:angulartics@0.20.2"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.34": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:highcharts-ng@0.0.11": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:highcharts@4.2.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:moment@2.10.6": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:ng-smooth-scroll@1.7.3": {
      "angular": "npm:angular@1.4.8"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:ui-select@0.13.2": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
