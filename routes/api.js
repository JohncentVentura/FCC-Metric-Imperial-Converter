'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  //Called in $('#convertForm').submit in index.html
  app.route('/api/convert').get((req, res) => {
    //Get and assign the input, initNum gets & parse the number from input, 
    //initUnit gets and checks if the string from input is a unit from metric/imperial system
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    if(!initNum && !initUnit){
      res.send("invalid number and unit");
      return;
      }
    else if(!initNum){
      res.send("invalid number");
      return;
    }
    else if(!initUnit){
      res.send("invalid unit");
      return;
    }
    
    //Convert the initNum base from initUnit, convert the initUnit base on the converted unit, return results in res.json
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let toString = convertHandler.getString(
      initNum, 
      initUnit, 
      returnNum, 
      returnUnit
    );

    //respond with the string representation
    res.json({initNum, initUnit, returnNum, returnUnit, string: toString});
  });
};
