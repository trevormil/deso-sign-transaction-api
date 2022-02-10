# deso-sign-transaction-api
API to sign a DeSo transaction by manually entering encryptionKey, encryptedSeedHex, and transactionHex.

I created this for personal use and it may contain vulnerabilities. Do not fully trust this code. Please let me know of any issues you may find.

Most of code was taken from DeSo's open source identity repository. One thing I took out was the accessLevel check. This API does not take into account the accessLevel or accessLevelHmac. Please implement this on your own if you wish.

Note: This is my personal API. You may use it if you want, but it is strongly recommended not to. You need to enter your encryptedSeedHex and an encryptionKey which should never be given out to anyone under any circumstances. You have full permission to use this code, but PLEASE CREATE YOUR OWN API FOR PRIVACY REASONS.
How to use:

1) Get a TransactionHex from one of DeSo's backend API routes. More info can be found in DeSo's documentation for their backend API.

2) Get your encryptedSeedHex for your account using DeSo Identity. I found https://github.com/BogdanDidenko/react-bitclout-login really useful. Also, this can be found in your browser's local storage.

3) Important: get your encryption key from the same hostname as you got your encryptedSeedHex from. This can be done by viewing the local storage of identity.bitclout.com and finding the field that is seed-hex-key-yourhostname.

4) Submit an HTTP POST request to your API route that holds your function (mine lives at POST - https://us-central1-bitbadgespost.cloudfunctions.net/api/sign (currently not running because I have too many projects for my free tier on Firebase)). The request body should be a JSON object in the following format: 
{
  transactionHex: "",
  encryptedSeedHex: "",
  hostEncryptionKey: ""
}

5) You should get back a JSON object with a signedHex property. This signedHex can then be entered into the request body of POST - https://bitclout.com/api/v0/submit-transaction in the format:
{
  TransactionHex: ""
}

Once this comes back with a success message, your transaction should be executed on the DeSo blockchain.
