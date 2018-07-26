const Path                          = require('path');
const Fs                            = require('fs');
const { createKeyStore }            = require('oidc-provider');

module.exports = () => {
    const keystore = createKeyStore();

    return new Promise((resolve, reject) => {
        Promise.all([
            keystore.generate('RSA', 2048, {
              kid: 'sig-rs-0',
              use: 'sig',
            }),
            keystore.generate('RSA', 2048, {
              kid: 'enc-rs-0',
              use: 'enc',
            }),
            keystore.generate('EC', 'P-256', {
              kid: 'sig-ec2-0',
              use: 'sig',
            }),
            keystore.generate('EC', 'P-256', {
              kid: 'enc-ec2-0',
              use: 'enc',
            }),
            keystore.generate('EC', 'P-384', {
              kid: 'sig-ec3-0',
              use: 'sig',
            }),
            keystore.generate('EC', 'P-384', {
              kid: 'enc-ec3-0',
              use: 'enc',
            }),
            keystore.generate('EC', 'P-521', {
              kid: 'sig-ec5-0',
              use: 'sig',
            }),
            keystore.generate('EC', 'P-521', {
              kid: 'enc-ec5-0',
              use: 'enc',
            })
          ]).then(() => {
            Fs.writeFile(Path.join(__dirname, '../../keystore.json'), JSON.stringify(keystore.toJSON(true)), (err) => {
                if (err)
                    reject(err);
                else
                    resolve(keystore);
            });
        });
    });
}