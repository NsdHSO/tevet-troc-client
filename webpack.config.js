const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = {
  plugins: [
    new Dotenv({
      systemvars: true, // Load all system variables from Vercel
      safe: false, // Don't require .env file
      silent: true, // Don't show any errors if .env is missing
    }),
    // This explicitly defines the environment variables for Angular
    new webpack.DefinePlugin({
      'process.env.TEVET_API': JSON.stringify(process.env.TEVET_API || ''),
      'process.env.TEVET_API_AUTH_CLIENT': JSON.stringify(process.env.TEVET_API_AUTH_CLIENT || ''),
      'process.env.TEVET_API_AUTH': JSON.stringify(
        process.env.TEVET_API_AUTH || ''
      ),
    }),
  ],
};
