const fs = require('fs');
const dotenv = require('dotenv');

// Load only the variables from .env file
const envConfig = dotenv.config().parsed || {};
const environment = `
export const environment = {
  production: true,
  api: \`${envConfig['API_TEVET'] || ''}\`
  // Add other variables as needed
};`;

// Generate environment.ts file
fs.writeFile(
  './src/environments/environment.prod.ts',
  environment,
  function (err: any) {
    console.log(envConfig);
    if (err) {
      throw console.error(err);
    } else {
      console.log(`Angular environment.prod.ts file generated`);
    }
  },
);


fs.writeFile(
  './src/environments/environment.ts',
  environment,
  function (err: any) {
    if (err) {
      throw console.error(err);
    } else {
      console.log(`Angular environment.ts file generated`);
    }
  },
);
