const config = {
    port:8080,
    ACAO:"https://psmsapp.herokuapp.com",
    database: {
      debug: false,
      connection:'mongodb://israr:Computer2018@ds249372.mlab.com:49372/sms_db'
     
    },
    logger: {
      level: "debug",
      format: 'combined'
    }
   
  };
  
  module.exports = config;