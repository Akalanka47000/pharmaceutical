import config from '../../config';

const { initializeApp, cert } = require('firebase-admin/app');

initializeApp({
  credential: cert(JSON.parse(Buffer.from(config.FIREBASE_SERVICE_ACCOUNT_KEY, 'base64').toString())),
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
});

const storage = require('./storage.service');

module.exports = {
  ...storage,
};
