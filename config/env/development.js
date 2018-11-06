const config = {
    port:8000,
    ACAO:"http://localhost:4200",
    database: {
      debug: true,
      connection:'mongodb://localhost:27017/SMS'
      
    },
    logger: {
      level: "debug",
      format: 'combined'
    },
   
  };
  
  module.exports = config;