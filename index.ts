import * as Csv from 'fast-csv';

interface IPinCodeRegister {
  OfficeName: string;
  PinCode: string;
  OfficeType: string;
  DeliveryStatus: string;
  DivisionName: string;
  RegionName: string;
  CircleName: string;
  Taluk: string;
  DistrictName: string;
  StateName: string;
  Telephone: string;
  RelatedSubOffice: string;
  RelatedHeadOffice: string;
}

function extract(data: string[]): IPinCodeRegister {
  const [ OfficeName, PinCode, OfficeType, DeliveryStatus, DivisionName,
    RegionName, CircleName, Taluk, DistrictName, StateName,
    Telephone, RelatedSubOffice, RelatedHeadOffice ] = data;

  return { OfficeName, PinCode, OfficeType, DeliveryStatus, DivisionName,
    RegionName, CircleName, Taluk, DistrictName, StateName,
    Telephone, RelatedSubOffice, RelatedHeadOffice };
}

function verify(
    by: string,
    searchTerm: string,
    register: IPinCodeRegister,
    { fullMatch } = { fullMatch: true },
  ): boolean {
  if (fullMatch) {
    return register[by] === searchTerm;
  } else {
    return register[by].indexOf(searchTerm) !== -1;
  }
}

function searchBy(by: string, searchTerm: string, callback: Function, opts: any = { }) {
  const result = [];
  Csv.fromPath('pinCode.csv')
    .on('data', (data: string[]) => {
      const register = extract(data);
      if (verify(by, searchTerm, register, opts)) {
          result.push(register);
      }
    }).on('end', () => {
        return callback(result);
    });
}

export const seachByPin = (pin: string, callback: Function) => {
  if (pin.length < 6 || pin.length > 6) return callback('Invalid PinCode');
  searchBy('PinCode', pin, callback);
}

export const seachByArea = (area: string, callback: Function) => {
    searchBy('OfficeName', area, callback, { fullMatch: false });
}

export const seachByDistrict = (district, callback) => {
  searchBy('DistrictName', district, callback, { fullMatch: false });
}

export const seachByTaluk = (taluk, callback) => {
  searchBy('Taluk', taluk, callback, { fullMatch: false });
}

