const fs = require('fs');

const getHttpsCredentials = () => {
  let credentials;

  // Certificate
  if (process.env.ENV === 'PROD') {
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/mypantry.space/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/mypantry.space/cert.pem', 'utf8');
    const ca = fs.readFileSync('/etc/letsencrypt/live/mypantry.space/chain.pem', 'utf8');

    credentials = {
      key: privateKey,
      cert: certificate,
      ca: ca,
    };
  }

  return credentials;
};

module.exports = { getHttpsCredentials };
