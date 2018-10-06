"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fast_csv_1 = __importDefault(require("fast-csv"));
const pinCodeCsvPath = "./pinCode.csv";
function pinCodeParser(csvLineData) {
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
function searchByPin(pin, callback) {
    const result = [];
    if (pin.length !== 6) {
        return callback("Invalid PinCode");
    }
    const csvStream = fast_csv_1.default.fromPath(pinCodeCsvPath)
        .on("data", function (data) {
        if (data[1] === pin) {
            result.push(pinCodeParser(data));
        }
    })
        .on("end", function () {
        return callback(result);
    });
}
exports.searchByPin = searchByPin;
//# sourceMappingURL=index.js.map