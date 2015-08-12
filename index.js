var fs = require('fs');
var csv = require('fast-csv');
var result = [];

exports.seachByPin = function (pin, callback) {
    if (pin.length < 6 || pin.length > 6)
        return callback("Invalid PinCode");
    var csvStream = csv.fromPath("pinCode.csv").on("data", function (data) {
        if (data[1] === pin) {
            result.push({
                PinCode : data[1],
                OfficeName : data[0], 
                DivisionName : data[4], 
                RigionName : data[5], 
                Taluk : data[7],
                DistrictName : data[8],
                StateName : data[9]
            });
        }
    }).on("end", function () {
        return callback(result);
    });
}

exports.seachByArea = function (area, callback) {
    var csvStream = csv.fromPath("pinCode.csv").on("data", function (data) {
    	try	{
	        if (data[0].indexOf(area) > -1) {
	            result.push({
	                PinCode : data[1],
	                OfficeName : data[0], 
	                DivisionName : data[4], 
	                RigionName : data[5], 
	                Taluk : data[7],
	                DistrictName : data[8],
	                StateName : data[9]
	            });
	        }
    	}
    	catch(e) {}
    }).on("end", function () {
        return callback(result);
    });
}

exports.seachByDistrict = function (district, callback) {
    var csvStream = csv.fromPath("pinCode.csv").on("data", function (data) {
    	try	{
	        if (data[8] === district) {
	            result.push({
	                PinCode : data[1],
	                OfficeName : data[0], 
	                DivisionName : data[4], 
	                RigionName : data[5], 
	                Taluk : data[7],
	                DistrictName : data[8],
	                StateName : data[9]
	            });
	        }
    	}
    	catch(e) {}
    }).on("end", function () {
        return callback(result);
    });
}

exports.seachByTaluk = function (taluk, callback) {
    var csvStream = csv.fromPath("pinCode.csv").on("data", function (data) {
    	try	{
	        if (data[7].indexOf(taluk) > -1) {
	            result.push({
	                PinCode : data[1],
	                OfficeName : data[0], 
	                DivisionName : data[4], 
	                RigionName : data[5], 
	                Taluk : data[7],
	                DistrictName : data[8],
	                StateName : data[9]
	            });
	        }
    	}
    	catch(e) {}
    }).on("end", function () {
        return callback(result);
    });
}

