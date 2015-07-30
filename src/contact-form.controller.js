"use strict";

export default class ContactFormController {
    constructor($http) {
        this.http_ = $http;

        this.name = "";
        this.email = "";
        this.message = "";

        this.emailSent = false;
        this.emailError = false;
    }

    isEmailSent() {
        return this.emailSent;
    }

    isEmailError() {
        return this.emailError;
    }

    sendEmail() {
        this.contactForm.name.$setTouched();
        this.contactForm.email.$setTouched();
        this.contactForm.message.$setTouched();

        if (this.contactForm.$valid) {
            let sendEmailRequest = this.http_({
                method: "post",
                url   : "/send_email",
                data  : {
                    name   : this.name,
                    email  : this.email,
                    message: this.message
                }
            });

            let self = this;
            sendEmailRequest.success(
                function (data) {
                    console.log("Email Successfylly sent!!");
                    self.emailSent = true;
                }
            );

            sendEmailRequest.error(
                function (err) {
                    console.log("Error Sending email");
                    self.emailError = true;
                }
            );
        }
        else {
            // Invalid contact form. angular material an ngMessages will display the
            // Error messages for us.
        }
    }
}
