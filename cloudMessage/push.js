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
   "endpoint": "https://fcm.googleapis.com/fcm/send/cue_jNqM_PI:APA91bHt1sffOm7z3ztjhVzg3wGhsiQBpiXl41B5dps-QoBzEuJvNeSiBqICoVHs2KXj_HOfB7W256NFhTZ9ZtAe2d2ZC6mppjGNEtONsVGmLehlBHBli3uf8UebHRmvKdZFDCrarF82",
   "keys": {
       "p256dh": "BG/QBM/6kBdt2pjah/2KsXNYwL8sPAWHkQVgefY7NbPAGMZ9TFJBDLYxYXYLHpg/1gFgz8xcH2hAKFdFeNOHhaA=",
       "auth": "Wj2D6S6i9Y47q+QJcSsBTA=="
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