const inquirer = require('inquirer')

module.exports = {
  askForCredentials: () => {
    const queries = [
      {
        name: 'username',
        type: 'input', 
        message: 'Enter your Tesla account email:',
        validate: function(value) {
          if(value.length) {
            return true
          } else {
            return 'Please enter your email address'
          }
        }
      },
      {
        name: 'password',
        type: 'password',
        message: 'Enter your Tesla account password:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your password.';
          }
        }
      }
    ]

    return inquirer.prompt(queries)
  },
  askForVehicle: (cars) => {
    const queries = [
      {
        type: 'list',
        name: 'vehicle',
        message: 'Which vehicle do you want data from?',
        choices: cars,
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please make a choice.';
          }
        }
      }
    ]

    return inquirer.prompt(queries);
  },
  askForDataSet: () => {
    const choices = [
      {
        name: 'Vehicle State',
        value: 'vehicle'
      },
      {
        name: 'Charge State',
        value: 'charge'
      },
      {
        name: 'Climate State',
        value: 'climate'
      },
      {
        name: 'Drive State',
        value: 'drive'
      },
      {
        name: 'Car Tokens',
        value: 'tokens'
      }
    ]
    const queries = [
      {
        type: 'list',
        name: 'dataset',
        message: 'Which dataset do you want to return?',
        choices: choices,
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please make a choice.';
          }
        }
      }
    ]

    return inquirer.prompt(queries)
  }
}