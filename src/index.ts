import csv from "fast-csv";
import fs from "fs";


import path from "path";
const pinCodeCsvPath = path.join(__dirname, "../pinCode.csv");


interface PinResult {
  PinCode: string;
  OfficeName: string;
  DivisionName: string;
  RegionName: string;
  Taluk: string;
  DistrictName: string;
  StateName: string;
}



function pinCodeParser(csvLineData: string[]): PinResult {
  return {
    PinCode: csvLineData[1],
    OfficeName: csvLineData[0],
    DivisionName: csvLineData[4],
    RegionName: csvLineData[5],
    Taluk: csvLineData[7],
    DistrictName: csvLineData[8],
    StateName: csvLineData[9]
  };
}

// TODO: define data in on "data" callback
// TODO: accept numbers into searchByPin Function
// TODO: convert functions to promises or async/await for readability

function searchByPin(pin: string, cb: Function) {
  const results: PinResult[] = [];
  if (pin.length !== 6) {
    return cb("Invalid PinCode");
  }
  const csvStream = csv.fromPath(pinCodeCsvPath);
  csvStream
      .on("data",
          function(data: any) {
            if (data[1] === pin) {
              results.push(pinCodeParser(data));
            }
          })
      .on("end", function() {
        return cb(results);
      });
}


function searchByArea(area: string, cb: Function) {
  const results: PinResult[] = [];
  const csvStream = csv.fromPath(pinCodeCsvPath);
  csvStream
      .on("data",
          function(data) {
            try {
              if (data[0].indexOf(area) > -1) {
                results.push(pinCodeParser(data));
              }
            } catch (e) {
            }
          })
      .on("end", function() {
        return cb(results);
      });
}


function searchByDistrict(district: string, cb: Function) {
  const results: PinResult[] = [];
  const csvStream = csv.fromPath(pinCodeCsvPath);
  csvStream
      .on("data",
          function(data) {
            try {
              if (data[8] === district) {
                results.push(pinCodeParser(data));
              }
            } catch (e) {
            }
          })
      .on("end", function() {
        return cb(results);
      });
}

function searchByTaluk(taluk: string, cb: Function) {
  const results: PinResult[] = [];
  const csvStream = csv.fromPath(pinCodeCsvPath);
  csvStream
      .on("data",
          function(data) {
            try {
              if (data[7].indexOf(taluk) > -1) {
                results.push(pinCodeParser(data));
              }
            } catch (e) {
            }
          })
      .on("end", function() {
        return cb(results);
      });
}


export {searchByPin, searchByArea, searchByDistrict, searchByTaluk};