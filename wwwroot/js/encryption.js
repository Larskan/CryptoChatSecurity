
// TODO: Change from visible key to a secure method of storing the key
// TODO: Likely need a shared key between the two private people
const key = crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode("1234567890123456"),//16 byte key
    { name: "AES-GCM" },
    false, //false means that the key is not extractable..cannot be exported
    ["encrypt", "decrypt"]
);

async function encryptMessage(message) {
    const encodedMessage = new TextEncoder().encode(message);
    const iv = crypto.getRandomValues(new Uint8Array(12)); //12 byte nonce(IV)
    const cryptoKey = await key;

    const encryptedData = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        cryptoKey,
        encodedMessage
    );

    const encryptedBytes = new Uint8Array(encryptedData);
    const tag = encryptedBytes.slice(-16); //Last 16 bytes are the tag
    const cipherText = encryptedBytes.slice(0, encryptedBytes.length - 16); //Removes the tag from the encrypted data

    // Convert the encrypted data, nonce, and tag to Base64 strings
    // Because: SignalR uses mainly text data
    // Spread operation to convert the Uint8Array to an array of numbers, so each byte from the Uint8Array is converted to a string character.
    return {
        encryptedMessage: btoa(String.fromCharCode(...cipherText)),
        nonce: btoa(String.fromCharCode(...iv)),
        tag: btoa(String.fromCharCode(...tag))
    };
}

async function decryptMessage(encryptedMessage, nonce, tag) {
    try {
        console.log("Decrypting...");
        //Convert Base64 strings to Uint8Arrays
        const encryptedBytes = new Uint8Array(atob(encryptedMessage).split("").map(c => c.charCodeAt(0)));
        const ivNonce = new Uint8Array(atob(nonce).split("").map(c => c.charCodeAt(0)));
        const tagBytes = new Uint8Array(atob(tag).split("").map(c => c.charCodeAt(0)));

        const cryptoKey = await key;

        // AES-GCM decryption
        const decryptedData = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: ivNonce, tagLength: 128 },
            cryptoKey,
            new Uint8Array([...encryptedBytes, ...tagBytes]) //Combining the encrypted message and tag into one Uint8Array])
        );

        // Convert the decrypted data to a string
        const decryptedMessage = new TextDecoder().decode(decryptedData);
        return decryptedMessage;

    } catch (error) {
        console.error("Error decrypting the message", error);
        return "Error Decrypting the message";
    }
}

