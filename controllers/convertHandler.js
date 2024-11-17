
function numberStringSplitter(input) {
  //Get & assign Whole number, Decimal input, Fractional Input, 
  //Fractional Input w/ Decimal, to number from input, return "1" if there is no digits
  let number = input.match(/[.\d\/]+/g) || ["1"];

  //Get & assign string from input
  let string = input.match(/[a-zA-Z]+/g)[0];

  //Returns an array of strings, number[0] contains first match of number (along with "." and "/")
  return [number[0], string];
}

function checkDivisibility(possibleFraction) {
  //split possibleFraction to an array, to check how many "/" it contains
  let nums = possibleFraction.split("/");

  //if possibleFraction contains more than one "/", return false because it's treated like dividing 
  if (nums.length > 2) {
    return false;
  }

  //if possibleFraction contains only one "/", return it because it's a fraction
  return nums;
}

function ConvertHandler() {
  this.getNum = function (input) { 
    //splits, get, & assign only the numbers from input (input is a string)
    let result = numberStringSplitter(input)[0];

    //checks if it's a fraction or division, return undefined if it's a division
    //else return an array of strings, containing the numbers from result
    let nums = checkDivisibility(result);
    if (!nums) {
      return undefined;
    }

    //get the elements from nums, parse it into float (since it came from input which is a string)
    //checks if it is a number or not before returning the result
    let num1 = nums[0];
    let num2 = nums[1] || "1";
    result = parseFloat(num1) / parseFloat(num2);
    if (isNaN(num1) || isNaN(num2)) {
      return undefined;
    }

    return result;
  };

  this.getUnit = function (input) {
    //Checks if the string from input is a unit from metric/imperial system
    let result = numberStringSplitter(input)[1].toLowerCase();
    switch (result) {
      case "km":
        return "km";
      case "gal":
        return "gal";
      case "lbs":
        return "lbs";
      case "mi":
        return "mi";
      case "l":
        return "L";
      case "kg":
        return "kg";
      default:
        return undefined;
    }
  };

  this.getReturnUnit = function (initUnit) {
    //Checks the unit corresponding unit from metric/imperial system, and converts it
    let unit = initUnit.toLowerCase();

    switch (unit) {
      case "km":
        return "mi";
      case "gal":
        return "L";
      case "lbs":
        return "kg";
      case "mi":
        return "km";
      case "l":
        return "gal";
      case "kg":
        return "lbs";
      default:
        return undefined;
    }
  };

  this.spellOutUnit = function (initUnit) {
    //Checks the unit and return the full word of that unit
    let unit = initUnit.toLowerCase();

    switch (unit) {
      case "km":
        return "kilometers";
      case "gal":
        return "gallons";
      case "lbs":
        return "pounds";
      case "mi":
        return "miles";
      case "l":
        return "liters";
      case "kg":
        return "kilograms";
      default:
        return "invalid metric";
    }
  };

  this.convert = function (initNum, initUnit) {
    //Converts unit to a different unit
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = initUnit.toLowerCase();
    let result;

    switch (unit) {
      case "km":
        result = initNum / miToKm;
        break;
      case "gal":
        result = initNum * galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      default:
        result = undefined;
    }
    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    //Returns the result of the conversion, rendered in the website
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
