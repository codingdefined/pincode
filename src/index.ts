import * as csv from "fast-csv";
import fs from "fs";



interface PinResult {
  PinCode: string;
  OfficeName: string;
  DivisionName: string;
  RegionName: string;
  Taluk: string;
  DistrictName: string;
  StateName: string;
}

const pinCodeCsvPath = "./pinCode.csv";

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
function searchByPin(pin: string, callback: Function) {
  const result: PinResult[] = [];
  if (pin.length !== 6) {
    return callback("Invalid PinCode");
  }
  const csvStream = csv.fromPath(pinCodeCsvPath)
                        .on("data",
                            function(data: any) {
                              if (data[1] === pin) {
                                result.push(pinCodeParser(data));
                              }
                            })
                        .on("end", function() {
                          return callback(result);
                        });
}


// exports.seachByPin = function(pin, callback) {
//   if (pin.length < 6 || pin.length > 6) return callback("Invalid PinCode");
//   const csvStream = csv.fromPath("pinCode.csv")
//                         .on("data",
//                             function(data) {
//                               if (data[1] === pin) {
//                                 result.push({
//                                   PinCode: data[1],
//                                   OfficeName: data[0],
//                                   DivisionName: data[4],
//                                   RigionName: data[5],
//                                   Taluk: data[7],
//                                   DistrictName: data[8],
//                                   StateName: data[9]
//                                 });
//                               }
//                             })
//                         .on("end", function() {
//                           return callback(result);
//                         });
// };

// exports.seachByArea = function(area, callback) {
//   const csvStream = csv.fromPath("pinCode.csv")
//                         .on("data",
//                             function(data) {
//                               try {
//                                 if (data[0].indexOf(area) > -1) {
//                                   result.push({
//                                     PinCode: data[1],
//                                     OfficeName: data[0],
//                                     DivisionName: data[4],
//                                     RigionName: data[5],
//                                     Taluk: data[7],
//                                     DistrictName: data[8],
//                                     StateName: data[9]
//                                   });
//                                 }
//                               } catch (e) {
//                               }
//                             })
//                         .on("end", function() {
//                           return callback(result);
//                         });
// };

// exports.seachByDistrict = function(district, callback) {
//   const csvStream = csv.fromPath("pinCode.csv")
//                         .on("data",
//                             function(data) {
//                               try {
//                                 if (data[8] === district) {
//                                   result.push({
//                                     PinCode: data[1],
//                                     OfficeName: data[0],
//                                     DivisionName: data[4],
//                                     RigionName: data[5],
//                                     Taluk: data[7],
//                                     DistrictName: data[8],
//                                     StateName: data[9]
//                                   });
//                                 }
//                               } catch (e) {
//                               }
//                             })
//                         .on("end", function() {
//                           return callback(result);
//                         });
// };

// exports.seachByTaluk = function(taluk, callback) {
//   const csvStream = csv.fromPath("pinCode.csv")
//                         .on("data",
//                             function(data) {
//                               try {
//                                 if (data[7].indexOf(taluk) > -1) {
//                                   result.push({
//                                     PinCode: data[1],
//                                     OfficeName: data[0],
//                                     DivisionName: data[4],
//                                     RigionName: data[5],
//                                     Taluk: data[7],
//                                     DistrictName: data[8],
//                                     StateName: data[9]
//                                   });
//                                 }
//                               } catch (e) {
//                               }
//                             })
//                         .on("end", function() {
//                           return callback(result);
//                         });
// };


export {searchByPin};