const dotenv = require('dotenv');

dotenv.config();


const MONGODB_URL = process.env.MONGODB_URL;
const CLIENT_URL = process.env.CLIENT_URL;
const ACTIVATION_TOKEN_SECRET = process.env.ACTIVATION_TOKEN_SECRET;

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;






module.exports =  { MONGODB_URL, CLIENT_URL, ACTIVATION_TOKEN_SECRET, ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET  }

