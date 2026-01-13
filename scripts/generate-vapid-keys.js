#!/usr/bin/env node

import { generateVAPIDKeys } from '../worker/push.js';

console.log('Generating VAPID keys for push notifications...\n');
const vapidKeys = await generateVAPIDKeys();
console.log('VAPID Public Key:', vapidKeys.publicKey);
console.log('VAPID Private Key:', vapidKeys.privateKey);
console.log('\nAdd these to your environment:');
console.log(`VAPID_PUBLIC_KEY=${vapidKeys.publicKey}`);
console.log(`VAPID_PRIVATE_KEY=${vapidKeys.privateKey}`);
console.log('\nCopy these keys to your .env file or set them as Fly.io secrets.');
