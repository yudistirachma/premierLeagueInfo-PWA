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
   "endpoint": "https://fcm.googleapis.com/fcm/send/c9uUR3xDas0:APA91bGSyVH9hYS7Va5fRFrYnRnbR9qlDaQqZp5o1yv_dIVsS_TvrOQCFjFsSLsiSkrGa4GFmcEInMkqKsshEKTOeVA08_sUO1oKlzhC1VshabY_67ZASvYI98nB-d6fr0lY_kkj7_av",
   "keys": {
       "p256dh": "BLJ+Pq1qHnH/WYieGcuZKXuWwAkrTmRMMBISUI7lSzNSjR6pkfqWy/6vuZwiw0l3fL+QB38O9ogf4miUUSTSMqE=",
       "auth": "5X9gdV5k+ew86RDgTAdtpA=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '288788509592',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);