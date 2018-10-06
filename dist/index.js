"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fast_csv_1 = __importDefault(require("fast-csv"));
const path_1 = __importDefault(require("path"));
const pinCodeCsvPath = path_1.default.join(__dirname, "../pinCode.csv");
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
// TODO: accept numbers into searchByPin Function
// TODO: convert functions to promises or async/await for readability
function searchByPin(pin, cb) {
    const results = [];
    if (pin.length !== 6) {
        return cb("Invalid PinCode");
    }
    const csvStream = fast_csv_1.default.fromPath(pinCodeCsvPath);
    csvStream
        .on("data", function (data) {
        if (data[1] === pin) {
            results.push(pinCodeParser(data));
        }
    })
        .on("end", function () {
        return cb(results);
    });
}
exports.searchByPin = searchByPin;
function searchByArea(area, cb) {
    const results = [];
    const csvStream = fast_csv_1.default.fromPath(pinCodeCsvPath);
    csvStream
        .on("data", function (data) {
        try {
            if (data[0].indexOf(area) > -1) {
                results.push(pinCodeParser(data));
            }
        }
        catch (e) {
        }
    })
        .on("end", function () {
        return cb(results);
    });
}
exports.searchByArea = searchByArea;
function searchByDistrict(district, cb) {
    const results = [];
    const csvStream = fast_csv_1.default.fromPath(pinCodeCsvPath);
    csvStream
        .on("data", function (data) {
        try {
            if (data[8] === district) {
                results.push(pinCodeParser(data));
            }
        }
        catch (e) {
        }
    })
        .on("end", function () {
        return cb(results);
    });
}
exports.searchByDistrict = searchByDistrict;
function searchByTaluk(taluk, cb) {
    const results = [];
    const csvStream = fast_csv_1.default.fromPath(pinCodeCsvPath);
    csvStream
        .on("data", function (data) {
        try {
            if (data[7].indexOf(taluk) > -1) {
                results.push(pinCodeParser(data));
            }
        }
        catch (e) {
        }
    })
        .on("end", function () {
        return cb(results);
    });
}
exports.searchByTaluk = searchByTaluk;
//# sourceMappingURL=index.js.map