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
   "endpoint": "https://fcm.googleapis.com/fcm/send/dl8AZKLdDFo:APA91bGc6MOIWZkfyirGVe3EOeiwSsx4kcjMmMSmG_cn7WAZYWY85SXnxICL_rjqVKSUlQeUalAjgSqV9TNK1LTRs1xfjn7RbSVYotaAkM3GiDu3Yz3jVU51Hg2Pll4oVil4B9XXTgeX",
   "keys": {
       "p256dh": "BFcd8dKnCxL9hl6FuhRPSv3rZ6mxeYxq+xk7QE3BXSbygMTKvCl4Ujk+RJ84hbIDTTV3FU1A9qsVG+zAik5kbm4=",
       "auth": "YzVHGi/Md4k5Qxuwd8hRMw=="
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