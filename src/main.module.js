"use strict";

// Contact Form
import ContactFormDir from "./contact-form.directive";
import ContactFormController from "./contact-form.controller.js";

// Work
import WorkController from "./work.controller.js";
import WorkInfoController from "./work-info.controller.js";

let app = angular.module("mainModule", ["ngMaterial"]);

app.directive("contactForm", ContactFormDir);
app.controller("ContactFormCtrl", ContactFormController);

app.controller("WorkController", WorkController);
app.controller("WorkInfoController", WorkInfoController);

app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme("default")
        .primaryPalette("orange")
        .accentPalette("deep-orange");
});
