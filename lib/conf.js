const Configstore = require('configstore')
const pkg = require('../package.json')
const CryptoJS = require('crypto-js')
const conf = new Configstore(pkg.name)

module.exports = {
  getStoredAccessToken: (username) => {
    return conf.get(`tesla.access.${CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(username))}`)
  },
  storeAccessToken: (username, token) => {
    conf.set(`tesla.access.${CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(username))}`, token);
  }
}