const superagent = require('superagent');
const config = require('./conf');
const api_url = 'https://owner-api.teslamotors.com';

class TeslaAPI {
  constructor(username, password) {
    this.username = username
    this.password = password
    
    let token = config.getStoredAccessToken(username);
    if(token) {
      this.token = token;
    } else {
      this.setAccessToken(this.username, this.password)
    }
  }

  /**
   * Make GET call with given url
   * @param {*} url 
   */
  async apiGET(url) {
    try {
      const res = await superagent
        .get(`${url}`)
        .set('Authorization', `Bearer ${this.token}`)
        .set('Accept', 'application/json')

        return res.body.response;
    } catch(err) {
      console.error('Could not fetch vehicles', err)
    }
  }

  /**
   * Get access token from Tesla using username and password and set it in config
   * @param {*} username 
   * @param {*} password 
   */
  async setAccessToken(username,  password) {
    try {
      const res = await superagent
        .post(`${api_url}/oauth/token`)
        .send({
          grant_type: 'password',
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          email: username,
          password: password
        })
        .set('accept', 'json')
        config.storeAccessToken(username, res.body.access_token)
        this.token = res.body.access_token;
    } catch(err) {
      console.error('No access token found', err);
    }
  }

  /**
   * Get all vehicles associated with account
   */
  async getVehicles() {
    const res = await this.apiGET(`${api_url}/api/1/vehicles`)

    return res;
  }

  /**
   * Get Vehicle State
   * @param {*} id 
   */
  async getVehicleState(id) {
    const res = await this.apiGET(`${api_url}/api/1/vehicles/${id}/data_request/vehicle_state`)
    
    return res;
  }
  
  /**
   * Get Charge State
   * @param {*} id 
   */
  async getChargeState(id) {
    const res = await this.apiGET(`${api_url}/api/1/vehicles/${id}/data_request/charge_state`)
    
    return res;
  }

  /**
   * Get Climate State
   * @param {*} id 
   */
  async getClimateState(id) {
    const res = await this.apiGET(`${api_url}/api/1/vehicles/${id}/data_request/climate_state`)
    
    return res;
  }

  /**
   * Get Drive State
   * @param {*} id 
   */
  async getDriveState(id) {
    const res = await this.apiGET(`${api_url}/api/1/vehicles/${id}/data_request/drive_state`)
    
    return res;
  }

  /**
   * Get Tokens (Tesla1, Tesla2)
   * @param {*} id 
   */
  async getTokens(id) {
    const res = await this.apiGET(`${api_url}/api/1/vehicles/${id}/vehicle_data`)

    let tokens = {
      Tesla1: res.tokens[0],
      Tesla2: res.tokens[1]
    }

    return tokens;
  }
}

module.exports = TeslaAPI;