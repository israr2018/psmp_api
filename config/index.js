
var dotenv=require('dotenv');
var _ = require("lodash");
var defaults =require("./env/defaults");
var node_env=(process.env.NODE_ENV||'development').trim();
//var dev=(process.env.NODE_ENV||'development');

var config = require('./env/'+node_env);
// merge the default , the current one ie production  ,development and export it for use
//module.exports = _.merge({}, defaults, config);

module.exports=config;