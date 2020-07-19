require('dotenv').config();

const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const inquirer = require('./lib/inquirer')
const TeslaAPI = require('./lib/tesla')


clear();

console.log(
  chalk.blue(
    figlet.textSync('Tesla API CLI', { horizontalLayout: 'full' })
  ),
);
console.log(' Created by Alexander Uleberg')

const displayData = (data) => {
  console.log(
    chalk.red('Dataset:')
  );
  
  console.dir(data, { depth: null, colors: true })
}

const runCLI = async() => {
  // Ask for credentials and check if we have access token
  const credentials = await inquirer.askForCredentials()
  const tesla = new TeslaAPI(credentials.username, credentials.password);
  
  // Get cars and make a selector for which vehicle you want info
  const vehicles = await tesla.getVehicles()

  let names = [];
  Object.values(vehicles).forEach((item) => {
    names.push({
      name: `${item.display_name}(${item.vin})`,
      value: item.id_s
    });
  })
  const selected = await inquirer.askForVehicle(names)
  
  // Select dataset type and make correct request
  const type = await inquirer.askForDataSet()

  let data
  switch(type.dataset) {
    case 'vehicle':
      data = await tesla.getVehicleState(selected.vehicle)
      break;
    case 'charge':
      data = await tesla.getChargeState(selected.vehicle)
      break;
    case 'climate':
      data = await tesla.getClimateState(selected.vehicle)
      break;
    case 'drive':
      data = await tesla.getDriveState(selected.vehicle)
      break;
    case 'tokens':
      data = await tesla.getTokens(selected.vehicle)
      break;
    default:
      data = await tesla.getVehicleState(selected.vehicle)
  }

  displayData(data)
}

runCLI()