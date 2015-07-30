import webapp2

import webapp2
import json
import logging

from google.appengine.api import mail

import config


class SendEmail(webapp2.RequestHandler):
    def post(self):
        data = json.loads(self.request.body)
    	name = data['name']
    	userEmail = data['email']
    	message = data['message']
        if not mail.is_email_valid(userEmail): 
            self.response.set_status(400)
        else: 
            senderAddress = "Alec Hewitt  <" + config.MY_EMAIL + ">"
            receipeint = config.MY_EMAIL
            subject = "Email from alechewitt.com site"
            message = "From: " + userEmail + "\nName:" + name + "\n\nMessage:\n"+ message
            mail.send_mail(senderAddress, receipeint, subject, message)
            self.response.set_status(200)


app = webapp2.WSGIApplication([
    ('/send_email', SendEmail),
], debug=True)