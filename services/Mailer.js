const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');


// this is a class extension of a sendgrid class
class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();

        // these are all required for sendgrid
        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        // this function already exists from helper.mail
        this.addContent(this.body)

        // we define these next two
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients) {
        return recipients.map( ({email}) => {
            return new helper.Email(email);
        });
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.clickTracking(true, true)

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize)
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = this.sgApi.API(request);
        return response;
    }
}

module.exports = Mailer;