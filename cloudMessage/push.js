var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BPeAPjTyQzw8lnMr38EkD85w_XLRFO3_ndYdlHL6MyVrQLET0TTnnbFeL8oLxtzvEgTOOSNBKjPOMmXppTgeiEo",
   "privateKey": "ZiqWZvuG1vgAmC9BF9SVyJL3xODUL08OTIZ67ZvKs4U"
}; 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dyMEE7uiVT8:APA91bHns5pyF4pyH9WukThLSgW6w7wO0M81fRXPUbPnF1tnC8xbMyvrsnBWouEPZecCi40n9wNjcwsq4NOelHqMN4J4wEbOIsRLE-cv3QlgVYNjR6Zpag-gm4ohqJ1krl6ymS2ybvqO",
   "keys": {
       "p256dh": "BEW1j+1ZKEhTt81pQaDgwRmn2Dq73Z5ahvLQaA715jakNrb5iBfes8QzPwVTCWNGitBLXcQsllUxlY2ARBRryuc=",
       "auth": "CiwYw5rdoQ1HGd2Zf0BzsQ=="
   }
};
var payload = 'Ayo cek aplikasi ada info klasemen terbalu loh !';
 
var options = {
   gcmAPIKey: '288788509592',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);