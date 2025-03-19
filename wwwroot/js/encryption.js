// from: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey
// Makes the secret key hidden and secure. 
const rawKey = window.crypto.getRandomValues(new Uint8Array(16));

function importSecretKey(rawKey) {
    return window.crypto.subtle.importKey(
        'raw',
        rawKey,
        'AES-GCM',
        true,
        ['encrypt', 'decrypt']
    );
}

async function encryptMessage(message) { }

async function decryptMessage(encryptedMessage) { }
//Test