import ContactFormDir from "./contact-form.directive";
import ContactFormController from "./contact-form.controller.js";

let app = angular.module("mainModule", ["ngMaterial"]);

app.directive("contactForm", ContactFormDir);
app.controller("ContactFormCtrl", ContactFormController);

app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('orange')
        .accentPalette('deep-orange');
});
