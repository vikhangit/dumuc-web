import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFunnelDollar, faVideo, faChalkboardTeacher, faRocket, faUsers, faMoneyCheck, faPodcast, faPeopleCarry, faShare, faMagnet, faChartBar, faCalendarDay, faBullhorn } from '@fortawesome/free-solid-svg-icons'

export const COOKIE_TOKEN = "__a_token";
export const COOKIE_REF_TOKEN = "__ref_token";

export const smartTrim = (str, length, delim, appendix) => {
  if (str.length <= length) return str;

  var trimmedStr = str.substr(0, length + delim.length);

  var lastDelimIndex = trimmedStr.lastIndexOf(delim);
  if (lastDelimIndex >= 0) trimmedStr = trimmedStr.substr(0, lastDelimIndex);

  if (trimmedStr) trimmedStr += appendix;
  return trimmedStr;
};

// export const numberWithCommas = (x) => {
//   //return x;
//   let t1 = Math.round(x);
//   return t1.toString();
//   // return t1.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
// };

export const numberWithCommas = (nStr) => {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
     x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

export const company_sizes = [
  {
    value: 0,
    description: "Không xác định",
  },
  {
    value: 1,
    description: "Ít hơn 10",
  },
  {
    value: 2,
    description: "10 - 24",
  },
  {
    value: 3,
    description: "25 - 99",
  },
  {
    value: 4,
    description: "100 - 499",
  },
  {
    value: 5,
    description: "500 - 999",
  },
  {
    value: 6,
    description: "1.000 - 4.999",
  },
  {
    value: 7,
    description: "5.000 - 9.999",
  },
  {
    value: 8,
    description: "10.000 - 19.999",
  },
  {
    value: 9,
    description: "20.000 - 49.999",
  },
  {
    value: 10,
    description: "Hơn 50.000",
  },
];

export const getCompanySize = (value) => {
  const item = company_sizes.find((item) => item.value === value);
  return item;
};

export const categoriesCarousel = [
  {
    value: 50,
    description: "Kinh doanh",
    keywords: "",
  },
  {
    value: 1,
    description: "Bán hàng",
    keywords: "",
  },
  {
    value: 39,
    description: "Lao động phổ thông",
    keywords: "",
  },
  {
    value: 31,
    description: "Kế toán - Kiểm toán",
    keywords: "",
  },
  {
    value: 30,
    description: "IT phần mềm",
    keywords: "",
  },
  {
    value: 8,
    description: "Cơ khí, Chế tạo",
    keywords: "",
  },
  {
    value: 76,
    description: "Chăm sóc khách hàng",
    keywords: "",
  },
  {
    value: 25,
    description: "Hành chính văn phòng",
    keywords: "",
  },
  {
    value: 13,
    description: "Dịch vụ",
    keywords: "",
  },
  {
    value: 16,
    description: "Điện tử, Điện lạnh",
    keywords: "",
  },
  {
    value: 35,
    description: "Kỹ thuật",
    keywords: "",
  },
  {
    value: 41,
    description: "Marketing - PR",
    keywords: "",
  },
];

export const cities_and_districts_wards = [
  {
    value: 'Hồ Chí Minh',
    keywords: 'HCM',
    districts: [
      {
        value: 'Quận 1',
        keywords: 'Q1',
        wards: [
          {
            value: 'Phường Bến Thành',
            keywords: 'BT'
          },
          {
            value: 'Phường Cầu Kho',
            keywords: 'CK'
          },
        ]
      },
      {
        value: 'Quận 2',
        keywords: 'Q2'
      },
      {
        value: 'Quận 3',
        keywords: 'Q3'
      },
      {
        value: 'Quận 4',
        keywords: 'Q4'
      },
      {
        value: 'Quận 5',
        keywords: 'Q5'
      },
      {
        value: 'Quận 6',
        keywords: 'Q6'
      },
      {
        value: 'Quận 7',
        keywords: 'Q7'
      },
      {
        value: 'Quận 8',
        keywords: 'Q8'
      },
      {
        value: 'Quận 9',
        keywords: 'Q9'
      },
      {
        value: 'Quận 10',
        keywords: 'Q10'
      },
      {
        value: 'Quận 11',
        keywords: 'Q11'
      },
      {
        value: 'Quận 12',
        keywords: 'Q12'
      },
      {
        value: 'Bình Tân',
        keywords: 'BT'
      },
      {
        value: 'Bình Thạnh',
        keywords: 'BT'
      },
      {
        value: 'Gò Vấp',
        keywords: 'GV'
      },
      {
        value: 'Phú Nhuận',
        keywords: 'PN'
      },
      {
        value: 'Tân Bình',
        keywords: 'TB'
      },
      {
        value: 'Tân Phú',
        keywords: 'TP'
      },
      {
        value: 'Thủ Đức',
        keywords: 'TD'
      },
      {
        value: 'Bình Chánh',
        keywords: 'BC'
      },
      {
        value: 'Cần Giờ',
        keywords: 'CG'
      },
      {
        value: 'Củ Chi',
        keywords: 'CC'
      },
      {
        value: 'Hóc Môn',
        keywords: 'HM'
      },
      {
        value: 'Nhà Bè',
        keywords: 'NB'
      },
    ]
  },
  {
    value: 'Hà Nội',
    keywords: 'HN',
    districts: [
      {
        value: 'Hoàn Kiếm',
        keywords: 'HK'
      },
      {
        value: 'Ba Đình',
        keywords: 'BD'
      },
      {
        value: 'Đống Đa',
        keywords: 'DD'
      },
      {
        value: 'Hai Bà Trưng',
        keywords: 'HBT'
      },
      {
        value: 'Thanh Xuân',
        keywords: 'TX'
      },
      {
        value: 'Tây Hồ',
        keywords: 'TH'
      },
      {
        value: 'Cầu Giấy',
        keywords: 'CG'
      },
      {
        value: 'Hoàng Mai',
        keywords: 'HM'
      },
      {
        value: 'Long Biên',
        keywords: 'LB'
      },
      {
        value: 'Đông Anh',
        keywords: 'DA'
      },
      {
        value: 'Gia Lâm',
        keywords: 'GL'
      },
      {
        value: 'Sóc Sơn',
        keywords: 'SS'
      },
      {
        value: 'Thanh Trì',
        keywords: 'TT'
      },
      {
        value: 'Nam Từ Liêm',
        keywords: 'NTL'
      },
      {
        value: 'Hà Đông',
        keywords: 'HD'
      },
      {
        value: 'Sơn Tây',
        keywords: 'ST'
      },
      {
        value: 'Mê Linh',
        keywords: 'ML'
      },
      {
        value: 'Ba Vì',
        keywords: 'BV'
      },
      {
        value: 'Phúc Thọ',
        keywords: 'PT'
      },
      {
        value: 'Đan Phượng',
        keywords: 'DP'
      },
      {
        value: 'Hoài Đức',
        keywords: 'HD'
      },
      {
        value: 'Quốc Oai',
        keywords: 'QO'
      },
      {
        value: 'Thạch Thất',
        keywords: 'TT'
      },
      {
        value: 'Chương Mỹ',
        keywords: 'CM'
      },
      {
        value: 'Thanh Oai',
        keywords: 'TO'
      },
      {
        value: 'Thường Tín',
        keywords: 'TT'
      },
      {
        value: 'Phú Xuyên',
        keywords: 'PX'
      },
      {
        value: 'Ứng Hòa',
        keywords: 'UH'
      },
      {
        value: 'Mỹ Đức',
        keywords: 'MD'
      },
      {
        value: 'Bắc Từ Liêm',
        keywords: 'BTL'
      },
    ]
  },
  {
    value: 'Đà Nẵng',
    keywords: 'DN',
    districts: [
      {
        value: 'Cẩm Lệ',
        keywords: 'CL'
      },
      {
        value: 'Hải Châu',
        keywords: 'HC'
      },
      {
        value: 'Liên Chiểu',
        keywords: 'LC'
      },
      {
        value: 'Ngũ Hành Sơn',
        keywords: 'NHS'
      },
      {
        value: 'Sơn Trà',
        keywords: 'ST'
      },
      {
        value: 'Thanh Khê',
        keywords: 'TK'
      },
      {
        value: 'Hòa Vang',
        keywords: 'HV'
      },
      {
        value: 'Hoàng Sa',
        keywords: 'HS'
      },
    ]
  },
  {
    value: 'Bình Dương',
    keywords: 'BD',
    districts: [
      {
        value: 'Bến Cát',
        keywords: 'BC'
      },
      {
        value: 'Dầu Tiếng',
        keywords: 'DT'
      },
      {
        value: 'Dĩ An',
        keywords: 'DA'
      },
      {
        value: 'Phú Giáo',
        keywords: 'PG'
      },
      {
        value: 'Tân Uyên',
        keywords: 'TU'
      },
      {
        value: 'Thuận An',
        keywords: 'TA'
      },
      {
        value: 'Thủ Dầu Một',
        keywords: 'TDM'
      },
      {
        value: 'Bàu Bàng',
        keywords: 'BB'
      },
    ]
  },
  {
    value: 'Đồng Nai',
    keywords: 'DN',
    districts: [
      {
        value: 'Cẩm Mỹ',
        keywords: 'CM'
      },
      {
        value: 'Định Quán',
        keywords: 'DQ'
      },
      {
        value: 'Long Thành',
        keywords: 'LT'
      },
      {
        value: 'Nhơn Trạch',
        keywords: 'NT'
      },
      {
        value: 'Tân Phú',
        keywords: 'TP'
      },
      {
        value: 'Thống Nhất',
        keywords: 'TN'
      },
      {
        value: 'Trảng Bom',
        keywords: 'TB'
      },
      {
        value: 'Vĩnh Cửu',
        keywords: 'VC'
      },
      {
        value: 'Xuân Lộc',
        keywords: 'XL'
      },
      {
        value: 'Biên Hòa',
        keywords: 'BH'
      },
      {
        value: 'Long Khánh',
        keywords: 'LK'
      },
    ]
  },
  {
    value: 'Khánh Hòa',
    keywords: 'KH',
    districts: [
      {
        value: 'Cam Lâm',
        keywords: 'CL'
      },
      {
        value: 'Diên Khánh',
        keywords: 'DK'
      },
      {
        value: 'Khánh Sơn',
        keywords: 'KS'
      },
      {
        value: 'Khánh Vĩnh',
        keywords: 'KV'
      },
      {
        value: 'Ninh Hòa',
        keywords: 'NH'
      },
      {
        value: 'Trường Sa',
        keywords: 'TS'
      },
      {
        value: 'Vạn Ninh',
        keywords: 'VN'
      },
      {
        value: 'Nha Trang',
        keywords: 'NT'
      },
      {
        value: 'Cam Ranh',
        keywords: 'CR'
      },
    ]
  },
  {
    value: 'Hải Phòng',
    keywords: 'HP',
    districts: [
      {
        value: 'Đồ Sơn',
        keywords: 'DS'
      },
      {
        value: 'Dương Kinh',
        keywords: 'DK'
      },
      {
        value: 'Hải An',
        keywords: 'HA'
      },
      {
        value: 'Hồng Bàng',
        keywords: 'HB'
      },
      {
        value: 'Kiến An',
        keywords: 'KA'
      },
      {
        value: 'Lê Chân',
        keywords: 'LC'
      },
      {
        value: 'Ngô Quyền',
        keywords: 'NQ'
      },
      {
        value: 'An Dương',
        keywords: 'AD'
      },
      {
        value: 'An Lão',
        keywords: 'AL'
      },
      {
        value: 'Bạch Long Vĩ',
        keywords: 'BLV'
      },
      {
        value: 'Cát Hải',
        keywords: 'CH'
      },
      {
        value: 'Kiến Thụy',
        keywords: 'KT'
      },
      {
        value: 'Thủy Nguyên',
        keywords: 'TN'
      },
      {
        value: 'Tiên Lãng',
        keywords: 'TL'
      },
      {
        value: 'Vĩnh Bảo',
        keywords: 'VB'
      },
    ]
  },
  {
    value: 'Cần Thơ',
    keywords: 'CT',
    districts: [
      {
        value: 'Cờ Đỏ',
        keywords: 'CD'
      },
      {
        value: 'Phong Điền',
        keywords: 'PD'
      },
      {
        value: 'Thốt Nốt',
        keywords: 'TN'
      },
      {
        value: 'Vĩnh Thạnh',
        keywords: 'VT'
      },
      {
        value: 'Bình Thủy',
        keywords: 'BT'
      },
      {
        value: 'Cái Răng',
        keywords: 'CR'
      },
      {
        value: 'Ninh Kiều',
        keywords: 'NK'
      },
      {
        value: 'Ô Môn',
        keywords: 'OM'
      },
      {
        value: 'Thới Lai',
        keywords: 'TL'
      },
    ]
  },
  {
    value: 'Long An',
    keywords: 'LA'
  },
  {
    value: 'Quảng Nam',
    keywords: 'QN'
  },
  {
    value: 'Bà Rịa Vũng Tàu',
    keywords: 'BRVT'
  },
  {
    value: 'Đắk Lắk',
    keywords: 'DL'
  },
  {
    value: 'Bình Thuận',
    keywords: 'BT'
  },
  {
    value: 'Lâm Đồng',
    keywords: 'LD'
  },
  {
    value: 'Thừa Thiên Huế',
    keywords: 'TTH'
  },
  {
    value: 'Kiên Giang',
    keywords: 'KG'
  },
  {
    value: 'Bắc Ninh',
    keywords: 'BN'
  },
  {
    value: 'Quảng Ninh',
    keywords: 'QN'
  },
  {
    value: 'Thanh Hóa',
    keywords: 'TH'
  },
  {
    value: 'Nghệ An',
    keywords: 'NA'
  },
  {
    value: 'Hải Dương',
    keywords: 'HD'
  },
  {
    value: 'Gia Lai',
    keywords: 'GL'
  },
  {
    value: 'Bình Phước',
    keywords: 'BP'
  },
  {
    value: 'Hưng Yên',
    keywords: 'HY'
  },
  {
    value: 'Bình Định',
    keywords: 'BD'
  },
  {
    value: 'Tiền Giang',
    keywords: 'TG'
  },
  {
    value: 'Thái Bình',
    keywords: 'TB'
  },
  {
    value: 'Bắc Giang',
    keywords: 'BG'
  },
  {
    value: 'Hòa Bình',
    keywords: 'HB'
  },
  {
    value: 'An Giang',
    keywords: 'AG'
  },
  {
    value: 'Vĩnh Phúc',
    keywords: 'VP'
  },
  {
    value: 'Tây Ninh',
    keywords: 'TN'
  },
  {
    value: 'Thái Nguyên',
    keywords: 'TN'
  },
  {
    value: 'Lào Cai',
    keywords: 'LC'
  },
  {
    value: 'Nam Định',
    keywords: 'ND'
  },
  {
    value: 'Quảng Ngãi',
    keywords: 'QN'
  },
  {
    value: 'Bến Tre',
    keywords: 'BT'
  },
  {
    value: 'Đắk Nông',
    keywords: 'DN'
  },
  {
    value: 'Cà Mau',
    keywords: 'CM'
  },
  {
    value: 'Vĩnh Long',
    keywords: 'VL'
  },
  {
    value: 'Ninh Bình',
    keywords: 'NB'
  },
  {
    value: 'Phú Thọ',
    keywords: 'PT'
  },
  {
    value: 'Ninh Thuận',
    keywords: 'NT'
  },
  {
    value: 'Phú Yên',
    keywords: 'PY'
  },
  {
    value: 'Hà Nam',
    keywords: 'HN'
  },
  {
    value: 'Hà Tĩnh',
    keywords: 'HT'
  },
  {
    value: 'Đồng Tháp',
    keywords: 'DT'
  },
  {
    value: 'Sóc Trăng',
    keywords: 'ST'
  },
  {
    value: 'Kon Tum',
    keywords: 'KT'
  },
  {
    value: 'Quảng Bình',
    keywords: 'QB'
  },
  {
    value: 'Quảng Trị',
    keywords: 'QT'
  },
  {
    value: 'Trà Vinh',
    keywords: 'TV'
  },
  {
    value: 'Hậu Giang',
    keywords: 'HG'
  },
  {
    value: 'Sơn La',
    keywords: 'SL'
  },
  {
    value: 'Bạc Liêu',
    keywords: 'BL'
  },
  {
    value: 'Yên Bái',
    keywords: 'YB'
  },
  {
    value: 'Tuyên Quang',
    keywords: 'TQ'
  },
  {
    value: 'Điện Biên',
    keywords: 'DB'
  },
  {
    value: 'Lai Châu',
    keywords: 'LC'
  },
  {
    value: 'Lạng Sơn',
    keywords: 'LS'
  },
  {
    value: 'Hà Giang',
    keywords: 'HG'
  },
  {
    value: 'Bắc Cạn',
    keywords: 'BC'
  },
  {
    value: 'Cao Bằng',
    keywords: 'CB'
  },
]
export const getCity = (value) => {
  const item = cities_and_districts_wards.find(item => item.value === value);
  return item;
}
export const getDistrict = (value) => {
  let districts = [];
  cities_and_districts_wards.forEach((city) => {
    if (city.districts !== undefined) {
      city.districts.forEach((district) => {
        districts.push(district);
      });
    }
  });

  const district = districts.find(item => item.value === value);
  return district;
}

export const otoTypes= {
  "1": {
    name: "Dưới 6 chỗ ngồi - 480.700 VND",
    price: 480700,
    maloaixe: "3001",
    socho: 5,
    mdsd: "1",
  },
  "2": {
    name: "Từ 6 đến 11 chỗ ngồi - 873.400 VND",
    price: 873400,
    maloaixe: "3002",
    socho: 7,
    mdsd: "1",
  },
  "3": {
    name: "Xe bán tải (pickup) - 480.700 VND",
    price: 480700,
    maloaixe: "30051",
    socho: 5,
    mdsd: "1",
  },
  "4": {
    name: "Xe tải VAN - 480.700 VND",
    price: 480700,
    maloaixe: "30052",
    socho: 2,
    mdsd: "1",
  },
  "5": {
    name: "Dưới 6 chỗ ngồi - 831.600 VND",
    price: 831600,
    maloaixe: "4001",
    socho: 5,
    mdsd: "2",
  },
  "6": {
    name: "7 chỗ ngồi - 1.188.000 VND",
    price: 1188000,
    maloaixe: "4003",
    socho: 7,
    mdsd: "2",
  },
  "7": {
    name: "8 chỗ ngồi - 1.378.300 VND",
    price: 1378300,
    maloaixe: "4004",
    socho: 8,
    mdsd: "2",
  },
  "8": {
    name: "Xe bán tải (pickup) - 1.026.300 VND",
    price: 1026300,
    maloaixe: "400101",
    socho: 5,
    mdsd: "2",
  },
  "9": {
    name: "Xe tải VAN - 1.026.300 VND",
    price: 1026300,
    maloaixe: "400102",
    socho: 2,
    mdsd: "2",
  },
  "10": {
    name: "Xe chở hàng dưới 3 tấn - 938.300 VND",
    price: 938300,
    maloaixe: "500103",
    socho: 2,
    mdsd: "2",
  },
  "11": {
    name: "Xe chở hàng từ 3 đến 8 tấn - 1.826.000 VND",
    price: 1826000,
    maloaixe: "500203",
    socho: 2,
    mdsd: "2",
  },
}

export const contractStatus= {
  "0": {
    name: "Đang xữ lý",
  },
  "1": {
    name: "Đã thành hợp đồng",
  },
}

export const vnpResponseCodes= {
  "00": {
    name: "Giao dịch thành công",
  },
  "07": {
    name: "Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).",
  },
  "09": {
    name: "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.",
  },
  "10": {
    name: "Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần",
  },
  "11": {
    name: "Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.",
  },
  "12": {
    name: "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.",
  },
  "13": {
    name: "Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.",
  },
  "24": {
    name: "Giao dịch không thành công do: Khách hàng hủy giao dịch",
  },
  "51": {
    name: "Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.",
  },
  "65": {
    name: "Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.",
  },
  "75": {
    name: "Ngân hàng thanh toán đang bảo trì.",
  },
  "79": {
    name: "Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch",
  },
  "99": {
    name: "Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)",
  },
}

export const funds = 
[
  {
    "id": 23,
    "name": "QUỸ ĐẦU TƯ CỔ PHIẾU TIẾP CẬN THỊ TRƯỜNG VIỆT NAM",
    "shortName": "VESAF",
    "code": "VESAF",
    "subCode": null,
    "tradeCode": "VESAFN002",
    "sipCode": "VESAFN003",
    "price": 10000,
    "nav": 26047.98,
    "lastYearNav": 26021.65,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 2000000,
    "buyMaxValue": null,
    "sellMin": 10,
    "sellMinValue": null,
    "holdingMin": 0,
    "instock": null,
    "holdingVolume": 8836550.75,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1492448400000,
    "approveAt": 1596773666000,
    "endIssueAt": 1871139600000,
    "maturityAt": null,
    "website": "https://wm.vinacapital.com/quy-dau-tu-co-phieu-tiep-can-thi-truong-viet-nam-vesaf",
    "websiteURL": "https://wm.vinacapital.com/quy-dau-tu-co-phieu-tiep-can-thi-truong-viet-nam-vesaf",
    "customField": "Phí chuyển đổi",
    "customValue": "0%",
    "expectedReturn": 0,
    "managementFee": 1.75,
    "performanceFee": null,
    "closedOrderBookAt": "14:40",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "14:40",
    "productTradingSession": {
      "tradingTime": 1652288400000,
      "closedOrderBookTime": 1652254800000,
      "closedBankNoteTime": 1652254800000,
      "tradingTimeString": "12/05/2022",
      "closedOrderBookTimeString": "14:40 11/05/2022",
      "closedBankNoteTimeString": "14:40 11/05/2022"
    },
    "completeTransactionDuration": 4,
    "description": "Quỹ VESAF đầu tư vào cổ phiếu tăng trưởng cao, bền vững và có mức định giá hấp dẫn, với chiến lược đầu tư trung và dài hạn để gia tăng giá trị.",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "VESAFN002",
    "avgAnnualReturn": 33,
    "isTransferred": true,
    "createAt": 1596276866748,
    "updateAt": 1642960149091,
    "productAssetAllocationList": [
      3
    ],
    "productAssetAllocationModelList": [
      {
        "id": 3,
        "name": "Cổ phiếu niêm yết"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 3,
      "name": "Cổ phiếu niêm yết"
    },
    "productAssetAllocationModel2": null,
    "productSupervisoryBankAccount": {
      "name": "VESAF",
      "number": "90264118611",
      "bankId": 14,
      "bank": {
        "id": 14,
        "name": "Standard Chartered",
        "shortName": "Standard Chartered",
        "stockName": "SCB",
        "binCode": "970410",
        "swiftCode": null,
        "hsbcCode": "BKSCVN",
        "hsbcDefaultBranchCode": "BRSCVNVN",
        "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
        "branches": []
      },
      "branch": "TP.HCM",
      "comment": null,
      "productId": 23,
      "agentName": null
    },
    "owner": {
      "id": 677,
      "encodeURL": "cong-ty-co-phan-quan-ly-quy-vinacapital_677",
      "code": "007F02838278535",
      "name": "CÔNG TY CỔ PHẦN QUẢN LÝ QUỸ VINACAPITAL",
      "userId": 677,
      "userCode": "007F02838278535",
      "email": "irwm@vinacapital.com",
      "email2": "fincorp.vn@gmail.com",
      "shortName": "VINACAPITAL",
      "address1": "Lầu 17, 115 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP Hồ Chí Minh",
      "phone": "02838278535",
      "phonePostal": "84",
      "website": "https://wm.vinacapital.com",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/9e01919f-30b1-498e-b115-a7bab933e16f.docx",
      "hsbcCode": "VinaCapital",
      "securityDepositoryCenter": {
        "id": 1,
        "code": "VSD",
        "name": "Trung tâm lưu ký VSD"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/643f4146-b446-4830-a794-64cc93760791.png",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 17,
      "name": "Trung bình-Cao"
    },
    "moneyTransferSyntax": {
      "id": 6,
      "name": "[STK]",
      "syntax": "[STK]",
      "weight": 5,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 1,
      "name": "Quỹ cổ phiếu",
      "code": "STOCK"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": -1.69,
      "navToLastYear": 0.1,
      "navToEstablish": 31.7,
      "navTo3Months": 0.54,
      "navTo6Months": -1.16,
      "navTo12Months": 39.46,
      "navTo36Months": 120.75,
      "navToBeginning": 160.48,
      "updateAt": 1652116500331
    },
    "productFeeList": [
      {
        "id": 3366,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3367,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3368,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 12,
        "fee": 2,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3369,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 12,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 24,
        "fee": 1.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3370,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 24,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1061,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 10000000,
        "fee": 0,
        "destProductId": 20,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1062,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 10000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0,
        "destProductId": 20,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1063,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 10000000,
        "fee": 0,
        "destProductId": 21,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1064,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 10000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0,
        "destProductId": 21,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1065,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 10000000,
        "fee": 0,
        "destProductId": 22,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1066,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 10000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0,
        "destProductId": 22,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      1,
      2,
      3,
      4,
      5
    ],
    "productTransactionDateModelList": [
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "VESAF",
        "number": "90264118611",
        "bankId": 14,
        "bank": {
          "id": 14,
          "name": "Standard Chartered",
          "shortName": "Standard Chartered",
          "stockName": "SCB",
          "binCode": "970410",
          "swiftCode": null,
          "hsbcCode": "BKSCVN",
          "hsbcDefaultBranchCode": "BRSCVNVN",
          "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
          "branches": []
        },
        "branch": "TP.HCM",
        "comment": null,
        "productId": 23,
        "agentName": null
      }
    ],
    "extra": {
      "lastNAV": 26047.98,
      "currentNAV": 26047.98,
      "lastNAVDate": 1652029200000
    },
    "isDelete": false
  },
  {
    "id": 20,
    "name": "QUỸ ĐẦU TƯ CỔ PHIẾU HƯNG THỊNH",
    "shortName": "VEOF",
    "code": "VEOF",
    "subCode": null,
    "tradeCode": "VEOFN003",
    "sipCode": "VEOFN004",
    "price": 10000,
    "nav": 26170.17,
    "lastYearNav": 26394.69,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 2000000,
    "buyMaxValue": null,
    "sellMin": 10,
    "sellMinValue": null,
    "holdingMin": 0,
    "instock": null,
    "holdingVolume": 3248985.58,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1404147600000,
    "approveAt": 1596773666000,
    "endIssueAt": 1933434000000,
    "maturityAt": null,
    "website": "https://wm.vinacapital.com/quy-dau-tu-co-phieu-hung-thinh-veof",
    "websiteURL": "https://wm.vinacapital.com/quy-dau-tu-co-phieu-hung-thinh-veof",
    "customField": "Phí chuyển đổi",
    "customValue": "0%",
    "expectedReturn": 0,
    "managementFee": 1.75,
    "performanceFee": null,
    "closedOrderBookAt": "14:40",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "14:40",
    "productTradingSession": {
      "tradingTime": 1652288400000,
      "closedOrderBookTime": 1652254800000,
      "closedBankNoteTime": 1652254800000,
      "tradingTimeString": "12/05/2022",
      "closedOrderBookTimeString": "14:40 11/05/2022",
      "closedBankNoteTimeString": "14:40 11/05/2022"
    },
    "completeTransactionDuration": 4,
    "description": "Quỹ VEOF đầu tư vào cổ phiếu có nền tảng và tiềm năng tăng trưởng tốt với chiến lược đầu tư trung và dài hạn (1-3 năm) để gia tăng giá trị.",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "VEOFN003",
    "avgAnnualReturn": 22,
    "isTransferred": true,
    "createAt": 1596254431128,
    "updateAt": 1642960149091,
    "productAssetAllocationList": [
      3
    ],
    "productAssetAllocationModelList": [
      {
        "id": 3,
        "name": "Cổ phiếu niêm yết"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 3,
      "name": "Cổ phiếu niêm yết"
    },
    "productAssetAllocationModel2": null,
    "productSupervisoryBankAccount": {
      "name": "VEOF",
      "number": "90228298411",
      "bankId": 14,
      "bank": {
        "id": 14,
        "name": "Standard Chartered",
        "shortName": "Standard Chartered",
        "stockName": "SCB",
        "binCode": "970410",
        "swiftCode": null,
        "hsbcCode": "BKSCVN",
        "hsbcDefaultBranchCode": "BRSCVNVN",
        "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
        "branches": []
      },
      "branch": "TP. HCM",
      "comment": null,
      "productId": 20,
      "agentName": null
    },
    "owner": {
      "id": 677,
      "encodeURL": "cong-ty-co-phan-quan-ly-quy-vinacapital_677",
      "code": "007F02838278535",
      "name": "CÔNG TY CỔ PHẦN QUẢN LÝ QUỸ VINACAPITAL",
      "userId": 677,
      "userCode": "007F02838278535",
      "email": "irwm@vinacapital.com",
      "email2": "fincorp.vn@gmail.com",
      "shortName": "VINACAPITAL",
      "address1": "Lầu 17, 115 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP Hồ Chí Minh",
      "phone": "02838278535",
      "phonePostal": "84",
      "website": "https://wm.vinacapital.com",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/9e01919f-30b1-498e-b115-a7bab933e16f.docx",
      "hsbcCode": "VinaCapital",
      "securityDepositoryCenter": {
        "id": 1,
        "code": "VSD",
        "name": "Trung tâm lưu ký VSD"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/643f4146-b446-4830-a794-64cc93760791.png",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 17,
      "name": "Trung bình-Cao"
    },
    "moneyTransferSyntax": {
      "id": 6,
      "name": "[STK]",
      "syntax": "[STK]",
      "weight": 5,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 1,
      "name": "Quỹ cổ phiếu",
      "code": "STOCK"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": -2.32,
      "navToLastYear": -0.85,
      "navToEstablish": 20.56,
      "navTo3Months": -1.49,
      "navTo6Months": -2.14,
      "navTo12Months": 27.15,
      "navTo36Months": 85.99,
      "navToBeginning": 117.29,
      "updateAt": 1652116500230
    },
    "productFeeList": [
      {
        "id": 3381,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3382,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3383,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 12,
        "fee": 2,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3384,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 12,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 24,
        "fee": 1.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3385,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 24,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 546,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": 21,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 547,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0,
        "destProductId": 21,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 544,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": 22,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 545,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0,
        "destProductId": 22,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1069,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 10000000,
        "fee": 0,
        "destProductId": 23,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1070,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 10000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0,
        "destProductId": 23,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      1,
      2,
      3,
      4,
      5
    ],
    "productTransactionDateModelList": [
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "VEOF",
        "number": "90228298411",
        "bankId": 14,
        "bank": {
          "id": 14,
          "name": "Standard Chartered",
          "shortName": "Standard Chartered",
          "stockName": "SCB",
          "binCode": "970410",
          "swiftCode": null,
          "hsbcCode": "BKSCVN",
          "hsbcDefaultBranchCode": "BRSCVNVN",
          "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
          "branches": []
        },
        "branch": "TP. HCM",
        "comment": null,
        "productId": 20,
        "agentName": null
      }
    ],
    "extra": {
      "lastNAV": 26170.17,
      "currentNAV": 26170.17,
      "lastNAVDate": 1652029200000
    },
    "isDelete": false
  },
  {
    "id": 32,
    "name": "QUỸ ĐẦU TƯ CỔ PHIẾU HÀNG ĐẦU VCBF",
    "shortName": "VCBF-BCF",
    "code": "VCBFBCF",
    "subCode": null,
    "tradeCode": "VCBFBCF",
    "sipCode": "SIP VCBFBCF",
    "price": 10000,
    "nav": 29489.17,
    "lastYearNav": 29233.93,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 5000000,
    "buyMaxValue": null,
    "sellMin": 100,
    "sellMinValue": null,
    "holdingMin": 0,
    "instock": null,
    "holdingVolume": 195750.4,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1408640400000,
    "approveAt": 1626078546505,
    "endIssueAt": 1814893200000,
    "maturityAt": null,
    "website": "https://www.vcbf.com/quy-mo/cac-quy-mo/quy-dau-tu-co-phieu-hang-dau-vcbf/",
    "websiteURL": "https://www.vcbf.com/quy-mo/cac-quy-mo/quy-dau-tu-co-phieu-hang-dau-vcbf/",
    "customField": "Phí chuyển đổi",
    "customValue": "0%",
    "expectedReturn": 0,
    "managementFee": 0,
    "performanceFee": 1.9,
    "closedOrderBookAt": "14:00",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "14:00",
    "productTradingSession": {
      "tradingTime": 1652806800000,
      "closedOrderBookTime": 1652770800000,
      "closedBankNoteTime": 1652770800000,
      "tradingTimeString": "18/05/2022",
      "closedOrderBookTimeString": "14:00 17/05/2022",
      "closedBankNoteTimeString": "14:00 17/05/2022"
    },
    "completeTransactionDuration": 5,
    "description": "Quỹ đầu tư chủ yếu vào cổ phiếu, sử dụng phân tích các chỉ số cơ bản để lựa chọn công ty đầu tư nhằm gia tăng tài sản của quỹ trong trung và dài hạn.",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "VCBFBCFN001",
    "avgAnnualReturn": 25,
    "isTransferred": true,
    "createAt": 1626075722113,
    "updateAt": 1642960149091,
    "productAssetAllocationList": [
      16,
      3
    ],
    "productAssetAllocationModelList": [
      {
        "id": 16,
        "name": "Cổ phiếu Bluechip"
      },
      {
        "id": 3,
        "name": "Cổ phiếu niêm yết"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 16,
      "name": "Cổ phiếu Bluechip"
    },
    "productAssetAllocationModel2": {
      "id": 3,
      "name": "Cổ phiếu niêm yết"
    },
    "productSupervisoryBankAccount": {
      "name": "QUY DAU TU CO PHIEU HANG DAU VCBF ",
      "number": "90249862609",
      "bankId": 14,
      "bank": {
        "id": 14,
        "name": "Standard Chartered",
        "shortName": "Standard Chartered",
        "stockName": "SCB",
        "binCode": "970410",
        "swiftCode": null,
        "hsbcCode": "BKSCVN",
        "hsbcDefaultBranchCode": "BRSCVNVN",
        "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
        "branches": []
      },
      "branch": "Hội sở chính",
      "comment": null,
      "productId": 32,
      "agentName": null
    },
    "owner": {
      "id": 6859,
      "encodeURL": "cong-ty-lien-doanh-quan-ly-quy-dau-tu-chung-khoan-vietcombank_6859",
      "code": "007F907057977",
      "name": "CÔNG TY LIÊN DOANH QUẢN LÝ QUỸ ĐẦU TƯ CHỨNG KHOÁN VIETCOMBANK",
      "userId": 6859,
      "userCode": "007F907057977",
      "email": "fincorp082018@gmail.com",
      "email2": "fincorp.vn@gmail.com",
      "shortName": "VCBF",
      "address1": "Tầng 15, Tòa nhà Vietcombank, 198 Trần Quang Khải, Hoàn Kiếm,  TP. Hà Nội",
      "phone": "0907057977",
      "phonePostal": "84",
      "website": "https://www.vcbf.com/",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/9951d5bd-00cb-48a1-8bbb-1151776bc352.docx",
      "hsbcCode": "vcbf vsd",
      "securityDepositoryCenter": {
        "id": 1,
        "code": "VSD",
        "name": "Trung tâm lưu ký VSD"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/00d8dfc1-c087-420d-991b-b2765052aa6d.png",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 3,
      "name": "Cao"
    },
    "moneyTransferSyntax": {
      "id": 3,
      "name": "[STK] [HoTen] [MaGD] [DLPP]",
      "syntax": "[STK] [HoTen] [MaGD] [DLPP]",
      "weight": 2,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 1,
      "name": "Quỹ cổ phiếu",
      "code": "STOCK"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": 1.67,
      "navToLastYear": 0.87,
      "navToEstablish": 25.24,
      "navTo3Months": 0.25,
      "navTo6Months": -1.84,
      "navTo12Months": 22.12,
      "navTo36Months": 58.44,
      "navToBeginning": 50.87,
      "updateAt": 1652116500530
    },
    "productFeeList": [
      {
        "id": 2515,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 1000000000,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2516,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 1000000000,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 5000000000,
        "fee": 0.3,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2517,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 5000000000,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2518,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 1,
        "fee": 3,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2519,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 1,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 12,
        "fee": 1,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2520,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 12,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 24,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2521,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 24,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2113,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": 31,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2114,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0,
        "destProductId": 31,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2111,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": 33,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2112,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0,
        "destProductId": 33,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      3
    ],
    "productTransactionDateModelList": [
      "Thứ tư"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "QUY DAU TU CO PHIEU HANG DAU VCBF ",
        "number": "90249862609",
        "bankId": 14,
        "bank": {
          "id": 14,
          "name": "Standard Chartered",
          "shortName": "Standard Chartered",
          "stockName": "SCB",
          "binCode": "970410",
          "swiftCode": null,
          "hsbcCode": "BKSCVN",
          "hsbcDefaultBranchCode": "BRSCVNVN",
          "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
          "branches": []
        },
        "branch": "Hội sở chính",
        "comment": null,
        "productId": 32,
        "agentName": null
      }
    ],
    "extra": {
      "lastNAV": 29489.17,
      "currentNAV": 29489.17,
      "lastNAVDate": 1651597200000
    },
    "isDelete": false
  },
  {
    "id": 22,
    "name": "QUỸ ĐẦU TƯ CÂN BẰNG TUỆ SÁNG VINACAPITAL",
    "shortName": "VIBF",
    "code": "VIBF",
    "subCode": null,
    "tradeCode": "VIBFN003",
    "sipCode": "VIBFN001",
    "price": 10000,
    "nav": 15430.53,
    "lastYearNav": 15147.57,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 2000000,
    "buyMaxValue": null,
    "sellMin": 10,
    "sellMinValue": null,
    "holdingMin": 0,
    "instock": null,
    "holdingVolume": 1137570.71,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1562000400000,
    "approveAt": 1596773666000,
    "endIssueAt": 1870534800000,
    "maturityAt": null,
    "website": "https://wm.vinacapital.com/quy-dau-tu-can-bang-tue-sang-vinacapital-vibf",
    "websiteURL": "https://wm.vinacapital.com/quy-dau-tu-can-bang-tue-sang-vinacapital-vibf",
    "customField": "Phí chuyển đổi",
    "customValue": "0%",
    "expectedReturn": 0,
    "managementFee": 1.75,
    "performanceFee": null,
    "closedOrderBookAt": "14:40",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "14:40",
    "productTradingSession": {
      "tradingTime": 1652288400000,
      "closedOrderBookTime": 1652254800000,
      "closedBankNoteTime": 1652254800000,
      "tradingTimeString": "12/05/2022",
      "closedOrderBookTimeString": "14:40 11/05/2022",
      "closedBankNoteTimeString": "14:40 11/05/2022"
    },
    "completeTransactionDuration": 4,
    "description": "Quỹ VIBF đầu tư vào cổ phiếu của các công ty có lợi thế cạnh trạnh bền vững và các tài sản có thu nhập cố định tạo thu nhập ổn định trong trung và dài hạn.",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "VIBFN003",
    "avgAnnualReturn": 19,
    "isTransferred": true,
    "createAt": 1596276486577,
    "updateAt": 1642960149091,
    "productAssetAllocationList": [
      3,
      7
    ],
    "productAssetAllocationModelList": [
      {
        "id": 3,
        "name": "Cổ phiếu niêm yết"
      },
      {
        "id": 7,
        "name": "Công cụ có thu nhập cố định"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 3,
      "name": "Cổ phiếu niêm yết"
    },
    "productAssetAllocationModel2": {
      "id": 7,
      "name": "Công cụ có thu nhập cố định"
    },
    "productSupervisoryBankAccount": {
      "name": "VIBF",
      "number": "90341629111",
      "bankId": 14,
      "bank": {
        "id": 14,
        "name": "Standard Chartered",
        "shortName": "Standard Chartered",
        "stockName": "SCB",
        "binCode": "970410",
        "swiftCode": null,
        "hsbcCode": "BKSCVN",
        "hsbcDefaultBranchCode": "BRSCVNVN",
        "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
        "branches": []
      },
      "branch": "TP.HCM",
      "comment": null,
      "productId": 22,
      "agentName": null
    },
    "owner": {
      "id": 677,
      "encodeURL": "cong-ty-co-phan-quan-ly-quy-vinacapital_677",
      "code": "007F02838278535",
      "name": "CÔNG TY CỔ PHẦN QUẢN LÝ QUỸ VINACAPITAL",
      "userId": 677,
      "userCode": "007F02838278535",
      "email": "irwm@vinacapital.com",
      "email2": "fincorp.vn@gmail.com",
      "shortName": "VINACAPITAL",
      "address1": "Lầu 17, 115 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP Hồ Chí Minh",
      "phone": "02838278535",
      "phonePostal": "84",
      "website": "https://wm.vinacapital.com",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/9e01919f-30b1-498e-b115-a7bab933e16f.docx",
      "hsbcCode": "VinaCapital",
      "securityDepositoryCenter": {
        "id": 1,
        "code": "VSD",
        "name": "Trung tâm lưu ký VSD"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/643f4146-b446-4830-a794-64cc93760791.png",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 2,
      "name": "Trung bình"
    },
    "moneyTransferSyntax": {
      "id": 6,
      "name": "[STK]",
      "syntax": "[STK]",
      "weight": 5,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 3,
      "name": "Quỹ cân bằng",
      "code": "BALANCED"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": 0.45,
      "navToLastYear": 1.87,
      "navToEstablish": 19,
      "navTo3Months": 1.67,
      "navTo6Months": 0.51,
      "navTo12Months": 22.12,
      "navTo36Months": null,
      "navToBeginning": 54.41,
      "updateAt": 1652116500300
    },
    "productFeeList": [
      {
        "id": 3371,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3372,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3373,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 12,
        "fee": 2,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3374,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 12,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 24,
        "fee": 1.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3375,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 24,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 590,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": 20,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 591,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0,
        "destProductId": 20,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 570,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 10000000,
        "fee": 0,
        "destProductId": 21,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 571,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 10000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0,
        "destProductId": 21,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1059,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 10000000,
        "fee": 0,
        "destProductId": 23,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1060,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 10000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0,
        "destProductId": 23,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      2,
      4
    ],
    "productTransactionDateModelList": [
      "Thứ ba",
      "Thứ năm"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "VIBF",
        "number": "90341629111",
        "bankId": 14,
        "bank": {
          "id": 14,
          "name": "Standard Chartered",
          "shortName": "Standard Chartered",
          "stockName": "SCB",
          "binCode": "970410",
          "swiftCode": null,
          "hsbcCode": "BKSCVN",
          "hsbcDefaultBranchCode": "BRSCVNVN",
          "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
          "branches": []
        },
        "branch": "TP.HCM",
        "comment": null,
        "productId": 22,
        "agentName": null
      }
    ],
    "extra": {
      "lastNAV": 15430.53,
      "currentNAV": 15430.53,
      "lastNAVDate": 1651683600000
    },
    "isDelete": false
  },
  {
    "id": 35,
    "name": "QUỸ ĐẦU TƯ CỔ PHIẾU TĂNG TRƯỞNG MIRAE ASSET VIỆT NAM",
    "shortName": "MAGEF",
    "code": "MAGEF",
    "subCode": null,
    "tradeCode": "MAGEFN001",
    "sipCode": "MAGEFS002",
    "price": 10000,
    "nav": 15388.58,
    "lastYearNav": 15954.41,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 1000000,
    "buyMaxValue": null,
    "sellMin": 10,
    "sellMinValue": null,
    "holdingMin": 0,
    "instock": null,
    "holdingVolume": 180190.56,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1563814800000,
    "approveAt": 1631499159447,
    "endIssueAt": 1814893200000,
    "maturityAt": null,
    "website": "http://fundmanagement-miraeasset.com.vn/pages/thong-tin-chung",
    "websiteURL": "http://fundmanagement-miraeasset.com.vn/pages/thong-tin-chung",
    "customField": "",
    "customValue": "",
    "expectedReturn": 0,
    "managementFee": 0,
    "performanceFee": 1.75,
    "closedOrderBookAt": "11:00",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "11:00",
    "productTradingSession": {
      "tradingTime": 1652806800000,
      "closedOrderBookTime": 1652760000000,
      "closedBankNoteTime": 1652760000000,
      "tradingTimeString": "18/05/2022",
      "closedOrderBookTimeString": "11:00 17/05/2022",
      "closedBankNoteTimeString": "11:00 17/05/2022"
    },
    "completeTransactionDuration": 5,
    "description": "Quỹ đầu tư vào các cổ phiếu niêm yết có tiềm năng tăng trưởng tốt, cổ phiếu của các công ty đứng đầu ngành nhằm gia tăng giá trị tài sản ròng trong dài hạn.",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "MAGEFN001",
    "avgAnnualReturn": 21,
    "isTransferred": true,
    "createAt": 1631498836664,
    "updateAt": 1642960149091,
    "productAssetAllocationList": [
      3
    ],
    "productAssetAllocationModelList": [
      {
        "id": 3,
        "name": "Cổ phiếu niêm yết"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 3,
      "name": "Cổ phiếu niêm yết"
    },
    "productAssetAllocationModel2": null,
    "productSupervisoryBankAccount": {
      "name": "MAGEF",
      "number": "90359462919",
      "bankId": 14,
      "bank": {
        "id": 14,
        "name": "Standard Chartered",
        "shortName": "Standard Chartered",
        "stockName": "SCB",
        "binCode": "970410",
        "swiftCode": null,
        "hsbcCode": "BKSCVN",
        "hsbcDefaultBranchCode": "BRSCVNVN",
        "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
        "branches": []
      },
      "branch": "Việt Nam",
      "comment": null,
      "productId": 35,
      "agentName": null
    },
    "owner": {
      "id": 16346,
      "encodeURL": "cong-ty-tnhh-quan-ly-quy-mirae-asset-viet-nam_16346",
      "code": "007F987387267",
      "name": "CONG TY TNHH QUAN LY QUY MIRAE ASSET VIET NAM",
      "userId": 16346,
      "userCode": "007F987387267",
      "email": "minhka0407@gmail.com",
      "email2": "minhka0407@gmail.com",
      "shortName": "MIRAE ASSET",
      "address1": "Tầng 38 Keangnam Hanoi Landmark Tower, Khu E6, Khu ĐTM Cầu Giấy, Phường Mễ Trì, Quận Nam Từ Liêm, Thành phố Hà Nội",
      "phone": "0987387267",
      "phonePostal": "84",
      "website": "http://fundmanagement-miraeasset.com.vn/",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/d5efdc0c-48fc-45ae-a502-51ddf483d281.docx",
      "hsbcCode": "MIRAE ASSET",
      "securityDepositoryCenter": {
        "id": 1,
        "code": "VSD",
        "name": "Trung tâm lưu ký VSD"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/235dcb3b-398f-4703-8566-e4dd4fedbfed.png",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 3,
      "name": "Cao"
    },
    "moneyTransferSyntax": {
      "id": 3,
      "name": "[STK] [HoTen] [MaGD] [DLPP]",
      "syntax": "[STK] [HoTen] [MaGD] [DLPP]",
      "weight": 2,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 1,
      "name": "Quỹ cổ phiếu",
      "code": "STOCK"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": 1.8,
      "navToLastYear": -3.55,
      "navToEstablish": 19.24,
      "navTo3Months": -1.32,
      "navTo6Months": -4.31,
      "navTo12Months": 19.64,
      "navTo36Months": null,
      "navToBeginning": 53.89,
      "updateAt": 1652116500558
    },
    "productFeeList": [
      {
        "id": 3682,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 20000000000,
        "fee": 0.75,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3683,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 20000000000,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3684,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 12,
        "fee": 1.25,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3685,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 12,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      3
    ],
    "productTransactionDateModelList": [
      "Thứ tư"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "MAGEF",
        "number": "90359462919",
        "bankId": 14,
        "bank": {
          "id": 14,
          "name": "Standard Chartered",
          "shortName": "Standard Chartered",
          "stockName": "SCB",
          "binCode": "970410",
          "swiftCode": null,
          "hsbcCode": "BKSCVN",
          "hsbcDefaultBranchCode": "BRSCVNVN",
          "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
          "branches": []
        },
        "branch": "Việt Nam",
        "comment": null,
        "productId": 35,
        "agentName": null
      }
    ],
    "extra": {
      "lastNAV": 15388.58,
      "currentNAV": 15388.58,
      "lastNAVDate": 1651597200000
    },
    "isDelete": false
  },
  {
    "id": 31,
    "name": "QUỸ ĐẦU TƯ CÂN BẰNG CHIẾN LƯỢC VCBF",
    "shortName": "VCBF-TBF",
    "code": "VCBFTBF",
    "subCode": null,
    "tradeCode": "VCBFTBF",
    "sipCode": "SIP VCBFTBF",
    "price": 10000,
    "nav": 26802,
    "lastYearNav": 26716.61,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 5000000,
    "buyMaxValue": null,
    "sellMin": 100,
    "sellMinValue": null,
    "holdingMin": 0,
    "instock": null,
    "holdingVolume": 127379.05,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1387818000000,
    "approveAt": 1626077755847,
    "endIssueAt": 1814893200000,
    "maturityAt": null,
    "website": "https://www.vcbf.com/quy-mo/cac-quy-mo/quy-dau-tu-can-bang-chien-luoc-vcbf/#?tabid=102",
    "websiteURL": "https://www.vcbf.com/quy-mo/cac-quy-mo/quy-dau-tu-can-bang-chien-luoc-vcbf/#?tabid=102",
    "customField": "Phí chuyển đối",
    "customValue": "0%",
    "expectedReturn": 0,
    "managementFee": 1.5,
    "performanceFee": 0,
    "closedOrderBookAt": "14:00",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "14:00",
    "productTradingSession": {
      "tradingTime": 1652806800000,
      "closedOrderBookTime": 1652770800000,
      "closedBankNoteTime": 1652770800000,
      "tradingTimeString": "18/05/2022",
      "closedOrderBookTimeString": "14:00 17/05/2022",
      "closedBankNoteTimeString": "14:00 17/05/2022"
    },
    "completeTransactionDuration": 5,
    "description": "Quỹ phân bổ tài sản vào Cổ phiếu và Tài sản có thu nhập cố định tùy thuộc vào điều kiện thị trường . Mục tiêu là mang lại lợi nhuận dài hạn.",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "VCBFTBFN001",
    "avgAnnualReturn": 20,
    "isTransferred": true,
    "createAt": 1626077388528,
    "updateAt": 1642960149091,
    "productAssetAllocationList": [
      3,
      15
    ],
    "productAssetAllocationModelList": [
      {
        "id": 3,
        "name": "Cổ phiếu niêm yết"
      },
      {
        "id": 15,
        "name": "Tài sản có thu nhập cố định"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 3,
      "name": "Cổ phiếu niêm yết"
    },
    "productAssetAllocationModel2": {
      "id": 15,
      "name": "Tài sản có thu nhập cố định"
    },
    "productSupervisoryBankAccount": {
      "name": "QUY DAU TU CAN BANG CHIEN LUOC VCBF ",
      "number": "90249861809",
      "bankId": 14,
      "bank": {
        "id": 14,
        "name": "Standard Chartered",
        "shortName": "Standard Chartered",
        "stockName": "SCB",
        "binCode": "970410",
        "swiftCode": null,
        "hsbcCode": "BKSCVN",
        "hsbcDefaultBranchCode": "BRSCVNVN",
        "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
        "branches": []
      },
      "branch": "Hội sở chính",
      "comment": null,
      "productId": 31,
      "agentName": null
    },
    "owner": {
      "id": 6859,
      "encodeURL": "cong-ty-lien-doanh-quan-ly-quy-dau-tu-chung-khoan-vietcombank_6859",
      "code": "007F907057977",
      "name": "CÔNG TY LIÊN DOANH QUẢN LÝ QUỸ ĐẦU TƯ CHỨNG KHOÁN VIETCOMBANK",
      "userId": 6859,
      "userCode": "007F907057977",
      "email": "fincorp082018@gmail.com",
      "email2": "fincorp.vn@gmail.com",
      "shortName": "VCBF",
      "address1": "Tầng 15, Tòa nhà Vietcombank, 198 Trần Quang Khải, Hoàn Kiếm,  TP. Hà Nội",
      "phone": "0907057977",
      "phonePostal": "84",
      "website": "https://www.vcbf.com/",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/9951d5bd-00cb-48a1-8bbb-1151776bc352.docx",
      "hsbcCode": "vcbf vsd",
      "securityDepositoryCenter": {
        "id": 1,
        "code": "VSD",
        "name": "Trung tâm lưu ký VSD"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/00d8dfc1-c087-420d-991b-b2765052aa6d.png",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 2,
      "name": "Trung bình"
    },
    "moneyTransferSyntax": {
      "id": 3,
      "name": "[STK] [HoTen] [MaGD] [DLPP]",
      "syntax": "[STK] [HoTen] [MaGD] [DLPP]",
      "weight": 2,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 3,
      "name": "Quỹ cân bằng",
      "code": "BALANCED"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": 1.26,
      "navToLastYear": 0.32,
      "navToEstablish": 20.05,
      "navTo3Months": 0.15,
      "navTo6Months": -0.83,
      "navTo12Months": 16.14,
      "navTo36Months": 35.35,
      "navToBeginning": 34.37,
      "updateAt": 1652116500513
    },
    "productFeeList": [
      {
        "id": 2503,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 1000000000,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2504,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 1000000000,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 5000000000,
        "fee": 0.3,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2505,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 5000000000,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2506,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 1,
        "fee": 3,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2507,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 1,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 12,
        "fee": 1,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2508,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 12,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 24,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2509,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 24,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2623,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": 32,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2624,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0,
        "destProductId": 32,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2625,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": 33,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2626,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0,
        "destProductId": 33,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      3
    ],
    "productTransactionDateModelList": [
      "Thứ tư"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "QUY DAU TU CAN BANG CHIEN LUOC VCBF ",
        "number": "90249861809",
        "bankId": 14,
        "bank": {
          "id": 14,
          "name": "Standard Chartered",
          "shortName": "Standard Chartered",
          "stockName": "SCB",
          "binCode": "970410",
          "swiftCode": null,
          "hsbcCode": "BKSCVN",
          "hsbcDefaultBranchCode": "BRSCVNVN",
          "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
          "branches": []
        },
        "branch": "Hội sở chính",
        "comment": null,
        "productId": 31,
        "agentName": null
      }
    ],
    "extra": {
      "lastNAV": 26802,
      "currentNAV": 26802,
      "lastNAVDate": 1651597200000
    },
    "isDelete": false
  },
  {
    "id": 14,
    "name": "QUỸ ĐẦU TƯ CỔ PHIẾU TRIỂN VỌNG BẢO VIỆT",
    "shortName": "BVPF",
    "code": "BVPF",
    "subCode": null,
    "tradeCode": "BVPFN001",
    "sipCode": "BVPFS002",
    "price": 10000,
    "nav": 16965,
    "lastYearNav": 17186,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 1000000,
    "buyMaxValue": null,
    "sellMin": 5,
    "sellMinValue": null,
    "holdingMin": 0,
    "instock": null,
    "holdingVolume": 242609.81,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1482944400000,
    "approveAt": 1596772727489,
    "endIssueAt": 1902070800000,
    "maturityAt": null,
    "website": "https://baovietfund.com.vn/san-pham/BVPF",
    "websiteURL": "https://baovietfund.com.vn/san-pham/BVPF",
    "customField": "Phí chuyển đổi",
    "customValue": "0.1%",
    "expectedReturn": 0,
    "managementFee": 1.5,
    "performanceFee": null,
    "closedOrderBookAt": "14:45",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "14:45",
    "productTradingSession": {
      "tradingTime": 1652374800000,
      "closedOrderBookTime": 1652341500000,
      "closedBankNoteTime": 1652341500000,
      "tradingTimeString": "13/05/2022",
      "closedOrderBookTimeString": "14:45 12/05/2022",
      "closedBankNoteTimeString": "14:45 12/05/2022"
    },
    "completeTransactionDuration": 3,
    "description": "Quỹ hướng tới mục tiêu tạo ra lợi nhuận bền vững, dài hạn trên cơ sở khai thác hiệu quả cơ hội đầu tư vào các cty có nền tảng tốt và triển vọng phát triển.",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "BVPFN001",
    "avgAnnualReturn": 14,
    "isTransferred": true,
    "createAt": 1576808725507,
    "updateAt": 1642960149091,
    "productAssetAllocationList": [
      3,
      9
    ],
    "productAssetAllocationModelList": [
      {
        "id": 3,
        "name": "Cổ phiếu niêm yết"
      },
      {
        "id": 9,
        "name": "Cổ phần chưa niêm yết"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 3,
      "name": "Cổ phiếu niêm yết"
    },
    "productAssetAllocationModel2": {
      "id": 9,
      "name": "Cổ phần chưa niêm yết"
    },
    "productSupervisoryBankAccount": {
      "name": "QUY DAU TU CO PHIEU TRIEN VONG BAO VIET",
      "number": "12210002026745",
      "bankId": 6,
      "bank": {
        "id": 6,
        "name": "BIDV",
        "shortName": "BIDV",
        "stockName": "BID",
        "binCode": "970418",
        "swiftCode": null,
        "hsbcCode": "BKBIDV",
        "hsbcDefaultBranchCode": "BRBIDVVN",
        "website": "https://www.bidv.vn:81/iportalweb/iRetail@1",
        "branches": []
      },
      "branch": "Hà Thành",
      "comment": null,
      "productId": 14,
      "agentName": null
    },
    "owner": {
      "id": 651,
      "encodeURL": "cong-ty-tnhh-quan-ly-quy-bao-viet_651",
      "code": "007F02439289589",
      "name": "CÔNG TY TNHH QUẢN LÝ QUỸ BẢO VIỆT",
      "userId": 651,
      "userCode": "007F02439289589",
      "email": "info@baovietfund.com.vn",
      "email2": "fincorp.vn@gmail.com",
      "shortName": "BAOVIETFUND",
      "address1": "Tầng 6, 72 Trần Hưng Đạo, Phường Trần Hưng Đạo, Quận Hoàn Kiếm, TP Hà Nội",
      "phone": "02439289589",
      "phonePostal": "84",
      "website": "https://baovietfund.com.vn",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/b0cc9b8c-63d2-4c86-b3ee-f2fdfc10064b.docx",
      "hsbcCode": "bvf",
      "securityDepositoryCenter": {
        "id": 1,
        "code": "VSD",
        "name": "Trung tâm lưu ký VSD"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/1fbb4db1-9ae3-42b9-a29f-aa23fe1ac153.png",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 3,
      "name": "Cao"
    },
    "moneyTransferSyntax": {
      "id": 1,
      "name": "[HoTen] [STK] [MaGD] [DLPP]",
      "syntax": "[HoTen] [STK] [MaGD] [DLPP]",
      "weight": 0,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 1,
      "name": "Quỹ cổ phiếu",
      "code": "STOCK"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": 1.17,
      "navToLastYear": -1.29,
      "navToEstablish": 12.98,
      "navTo3Months": -1.79,
      "navTo6Months": -1.43,
      "navTo12Months": 16.1,
      "navTo36Months": 52.29,
      "navToBeginning": 69.62,
      "updateAt": 1652116500209
    },
    "productFeeList": [
      {
        "id": 3777,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 2000000000,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3778,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 2000000000,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 5000000000,
        "fee": 0.3,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3779,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 5000000000,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 20000000000,
        "fee": 0.2,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3780,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 20000000000,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": null,
        "fee": 0.15,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3781,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 3,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3782,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 3,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 6,
        "fee": 0.4,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3783,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 6,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 12,
        "fee": 0.3,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3784,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 12,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1126,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 1000000000,
        "fee": 0.1,
        "destProductId": 12,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1127,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 1000000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0.1,
        "destProductId": 12,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1132,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 1000000000,
        "fee": 0.1,
        "destProductId": 13,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1133,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 1000000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0.1,
        "destProductId": 13,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      2,
      5
    ],
    "productTransactionDateModelList": [
      "Thứ ba",
      "Thứ sáu"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "QUY DAU TU CO PHIEU TRIEN VONG BAO VIET",
        "number": "12210002026745",
        "bankId": 6,
        "bank": {
          "id": 6,
          "name": "BIDV",
          "shortName": "BIDV",
          "stockName": "BID",
          "binCode": "970418",
          "swiftCode": null,
          "hsbcCode": "BKBIDV",
          "hsbcDefaultBranchCode": "BRBIDVVN",
          "website": "https://www.bidv.vn:81/iportalweb/iRetail@1",
          "branches": []
        },
        "branch": "Hà Thành",
        "comment": null,
        "productId": 14,
        "agentName": null
      }
    ],
    "extra": {
      "lastNAV": 16965,
      "currentNAV": 16965,
      "lastNAVDate": 1651770000000
    },
    "isDelete": false
  },
  {
    "id": 11,
    "name": "QUỸ ĐẦU TƯ LỢI THẾ CẠNH TRANH BỀN VỮNG SSI",
    "shortName": "SSISCA",
    "code": "SSISCA",
    "subCode": null,
    "tradeCode": "mua SSISCA",
    "sipCode": "mua SIP SSISCA",
    "price": 10000,
    "nav": 28742.87,
    "lastYearNav": 31881.89,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 500000,
    "buyMaxValue": null,
    "sellMin": null,
    "sellMinValue": null,
    "holdingMin": 0,
    "instock": null,
    "holdingVolume": 491986.11,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1411664400000,
    "approveAt": 1566827410082,
    "endIssueAt": 1814893200000,
    "maturityAt": null,
    "website": "https://www.ssi.com.vn/ssiam/hieu-qua-dau-tu-cua-quy-ssi-sca",
    "websiteURL": "https://www.ssi.com.vn/ssiam/hieu-qua-dau-tu-cua-quy-ssi-sca",
    "customField": "Phí chuyển đổi",
    "customValue": "0%",
    "expectedReturn": 0,
    "managementFee": 1.75,
    "performanceFee": null,
    "closedOrderBookAt": "15:00",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "15:00",
    "productTradingSession": {
      "tradingTime": 1652288400000,
      "closedOrderBookTime": 1652256000000,
      "closedBankNoteTime": 1652256000000,
      "tradingTimeString": "12/05/2022",
      "closedOrderBookTimeString": "15:00 11/05/2022",
      "closedBankNoteTimeString": "15:00 11/05/2022"
    },
    "completeTransactionDuration": 3,
    "description": "Quỹ tăng trưởng NAV thông qua việc chủ động và linh hoạt đầu tư vào cổ phiếu của các công ty có lợi thế cạnh trạnh bền vững và các tài sản có thu nhập cố định.",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "SSISCAN001",
    "avgAnnualReturn": 29,
    "isTransferred": true,
    "createAt": 1566826497938,
    "updateAt": 1650256295037,
    "productAssetAllocationList": [
      3,
      7
    ],
    "productAssetAllocationModelList": [
      {
        "id": 3,
        "name": "Cổ phiếu niêm yết"
      },
      {
        "id": 7,
        "name": "Công cụ có thu nhập cố định"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 3,
      "name": "Cổ phiếu niêm yết"
    },
    "productAssetAllocationModel2": {
      "id": 7,
      "name": "Công cụ có thu nhập cố định"
    },
    "productSupervisoryBankAccount": {
      "name": "SSISCA",
      "number": "90275350218",
      "bankId": 14,
      "bank": {
        "id": 14,
        "name": "Standard Chartered",
        "shortName": "Standard Chartered",
        "stockName": "SCB",
        "binCode": "970410",
        "swiftCode": null,
        "hsbcCode": "BKSCVN",
        "hsbcDefaultBranchCode": "BRSCVNVN",
        "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
        "branches": []
      },
      "branch": "Hà Nội",
      "comment": null,
      "productId": 11,
      "agentName": null
    },
    "owner": {
      "id": 606,
      "encodeURL": "cong-ty-tnhh-quan-ly-quy-ssi_606",
      "code": "007F02838242897",
      "name": "CÔNG TY TNHH QUẢN LÝ QUỸ SSI",
      "userId": 606,
      "userCode": "007F02838242897",
      "email": "info@ssi.com.vn",
      "email2": "fincorp.vn@gmail.com",
      "shortName": "SSIAM",
      "address1": "Tầng 5, 1C Ngô Quyền, Phường Lý Thái Tổ, Quận Hoàn Kiếm, TP Hà Nội",
      "phone": "02838242897",
      "phonePostal": "84",
      "website": "https://www.ssi.com.vn",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/2c15939b-7a77-4516-94e5-a0b892f38611.docx",
      "hsbcCode": "ssiam",
      "securityDepositoryCenter": {
        "id": 1,
        "code": "VSD",
        "name": "Trung tâm lưu ký VSD"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/58175a8b-40ca-4039-85ec-e8aa1d0d31fc.png",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 2,
      "name": "Trung bình"
    },
    "moneyTransferSyntax": {
      "id": 1,
      "name": "[HoTen] [STK] [MaGD] [DLPP]",
      "syntax": "[HoTen] [STK] [MaGD] [DLPP]",
      "weight": 0,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 1,
      "name": "Quỹ cổ phiếu",
      "code": "STOCK"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": -5.66,
      "navToLastYear": -9.85,
      "navToEstablish": 24.25,
      "navTo3Months": -9.07,
      "navTo6Months": -11.15,
      "navTo12Months": 13.69,
      "navTo36Months": 62.81,
      "navToBeginning": 99.43,
      "updateAt": 1652172975049
    },
    "productFeeList": [
      {
        "id": 4110,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 1000000000,
        "fee": 0.75,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4111,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 1000000000,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 10000000000,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4112,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 10000000000,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": null,
        "fee": 0.25,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4113,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 12,
        "fee": 1.25,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4114,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 12,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 24,
        "fee": 0.75,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4115,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 24,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 495,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": 8,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 496,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": 8,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      1,
      2,
      3,
      4,
      5
    ],
    "productTransactionDateModelList": [
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "SSISCA",
        "number": "90275350218",
        "bankId": 14,
        "bank": {
          "id": 14,
          "name": "Standard Chartered",
          "shortName": "Standard Chartered",
          "stockName": "SCB",
          "binCode": "970410",
          "swiftCode": null,
          "hsbcCode": "BKSCVN",
          "hsbcDefaultBranchCode": "BRSCVNVN",
          "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
          "branches": []
        },
        "branch": "Hà Nội",
        "comment": null,
        "productId": 11,
        "agentName": null
      }
    ],
    "extra": {
      "lastNAV": 28742.87,
      "currentNAV": 28742.87,
      "lastNAVDate": 1652115600000
    },
    "isDelete": false
  },
  {
    "id": 12,
    "name": "QUỸ ĐẦU TƯ CỔ PHIẾU NĂNG ĐỘNG BẢO VIỆT",
    "shortName": "BVFED",
    "code": "BVFED",
    "subCode": null,
    "tradeCode": "BVFEDN001",
    "sipCode": "BVFEDS003",
    "price": 10000,
    "nav": 21660,
    "lastYearNav": 23045,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 1000000,
    "buyMaxValue": null,
    "sellMin": 5,
    "sellMinValue": null,
    "holdingMin": 0,
    "instock": null,
    "holdingVolume": 272111.68,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1389114000000,
    "approveAt": 1596772727489,
    "endIssueAt": 1814893200000,
    "maturityAt": null,
    "website": "https://baovietfund.com.vn/san-pham/BVFED",
    "websiteURL": "https://baovietfund.com.vn/san-pham/BVFED",
    "customField": "Phí chuyển đổi",
    "customValue": "0.1%",
    "expectedReturn": 0,
    "managementFee": 1,
    "performanceFee": null,
    "closedOrderBookAt": "14:45",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "14:45",
    "productTradingSession": {
      "tradingTime": 1652288400000,
      "closedOrderBookTime": 1652255100000,
      "closedBankNoteTime": 1652255100000,
      "tradingTimeString": "12/05/2022",
      "closedOrderBookTimeString": "14:45 11/05/2022",
      "closedBankNoteTimeString": "14:45 11/05/2022"
    },
    "completeTransactionDuration": 3,
    "description": "Quỹ đầu tư vào nhóm Cổ phiếuVN30 nhằm tối đa hóa lợi nhuận dài hạn cho Nhà đầu tư trên cơ sở kết hợp giữa tăng trưởng vốn và các dòng thu nhập từ tài sản đầu tư",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "BVFEDN001",
    "avgAnnualReturn": 16,
    "isTransferred": true,
    "createAt": 1576753983716,
    "updateAt": 1642960149091,
    "productAssetAllocationList": [
      16,
      3
    ],
    "productAssetAllocationModelList": [
      {
        "id": 16,
        "name": "Cổ phiếu Bluechip"
      },
      {
        "id": 3,
        "name": "Cổ phiếu niêm yết"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 16,
      "name": "Cổ phiếu Bluechip"
    },
    "productAssetAllocationModel2": {
      "id": 3,
      "name": "Cổ phiếu niêm yết"
    },
    "productSupervisoryBankAccount": {
      "name": "QUY DAU TU CO PHIEU NANG DONG BAO VIET",
      "number": "0611002002380",
      "bankId": 5,
      "bank": {
        "id": 5,
        "name": "VIETCOMBANK",
        "shortName": "VIETCOMBANK",
        "stockName": "VCB",
        "binCode": "970436",
        "swiftCode": null,
        "hsbcCode": "BKVCB",
        "hsbcDefaultBranchCode": "BRVCBVN",
        "website": "https://vcbdigibank.vietcombank.com.vn/#/login?returnUrl=%2Fhome",
        "branches": [
          {
            "id": 25,
            "name": "TP.HCM",
            "isEnable": true
          }
        ]
      },
      "branch": "Ba Đình",
      "comment": null,
      "productId": 12,
      "agentName": null
    },
    "owner": {
      "id": 651,
      "encodeURL": "cong-ty-tnhh-quan-ly-quy-bao-viet_651",
      "code": "007F02439289589",
      "name": "CÔNG TY TNHH QUẢN LÝ QUỸ BẢO VIỆT",
      "userId": 651,
      "userCode": "007F02439289589",
      "email": "info@baovietfund.com.vn",
      "email2": "fincorp.vn@gmail.com",
      "shortName": "BAOVIETFUND",
      "address1": "Tầng 6, 72 Trần Hưng Đạo, Phường Trần Hưng Đạo, Quận Hoàn Kiếm, TP Hà Nội",
      "phone": "02439289589",
      "phonePostal": "84",
      "website": "https://baovietfund.com.vn",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/b0cc9b8c-63d2-4c86-b3ee-f2fdfc10064b.docx",
      "hsbcCode": "bvf",
      "securityDepositoryCenter": {
        "id": 1,
        "code": "VSD",
        "name": "Trung tâm lưu ký VSD"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/1fbb4db1-9ae3-42b9-a29f-aa23fe1ac153.png",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 2,
      "name": "Trung bình"
    },
    "moneyTransferSyntax": {
      "id": 1,
      "name": "[HoTen] [STK] [MaGD] [DLPP]",
      "syntax": "[HoTen] [STK] [MaGD] [DLPP]",
      "weight": 0,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 1,
      "name": "Quỹ cổ phiếu",
      "code": "STOCK"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": 0.33,
      "navToLastYear": -6.01,
      "navToEstablish": 13.98,
      "navTo3Months": -8.84,
      "navTo6Months": -6.18,
      "navTo12Months": 12.33,
      "navTo36Months": 48.76,
      "navToBeginning": 92.45,
      "updateAt": 1652116500162
    },
    "productFeeList": [
      {
        "id": 3785,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 2000000000,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3786,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 2000000000,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 5000000000,
        "fee": 0.3,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3787,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 5000000000,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 20000000000,
        "fee": 0.2,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3788,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 20000000000,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": null,
        "fee": 0.15,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3789,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 3,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3790,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 3,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 6,
        "fee": 0.3,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3791,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 6,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1138,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 1000000000,
        "fee": 0.1,
        "destProductId": 13,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1139,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 1000000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0.1,
        "destProductId": 13,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1134,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 1000000000,
        "fee": 0.1,
        "destProductId": 14,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1135,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 1000000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0.1,
        "destProductId": 14,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      4
    ],
    "productTransactionDateModelList": [
      "Thứ năm"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "QUY DAU TU CO PHIEU NANG DONG BAO VIET",
        "number": "0611002002380",
        "bankId": 5,
        "bank": {
          "id": 5,
          "name": "VIETCOMBANK",
          "shortName": "VIETCOMBANK",
          "stockName": "VCB",
          "binCode": "970436",
          "swiftCode": null,
          "hsbcCode": "BKVCB",
          "hsbcDefaultBranchCode": "BRVCBVN",
          "website": "https://vcbdigibank.vietcombank.com.vn/#/login?returnUrl=%2Fhome",
          "branches": [
            {
              "id": 25,
              "name": "TP.HCM",
              "isEnable": true
            }
          ]
        },
        "branch": "Ba Đình",
        "comment": null,
        "productId": 12,
        "agentName": null
      }
    ],
    "extra": {
      "lastNAV": 21660,
      "currentNAV": 21660,
      "lastNAVDate": 1651683600000
    },
    "isDelete": false
  },
  {
    "id": 28,
    "name": "QUỸ ĐẦU TƯ CHỨNG KHOÁN NĂNG ĐỘNG DC",
    "shortName": "DCDS",
    "code": "VFMVF1",
    "subCode": null,
    "tradeCode": "VFMVF1N001",
    "sipCode": "VFMVF1S006",
    "price": 10000,
    "nav": 66719.99,
    "lastYearNav": 78132.88,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 100000,
    "buyMaxValue": null,
    "sellMin": 10,
    "sellMinValue": null,
    "holdingMin": 0,
    "instock": null,
    "holdingVolume": 1397907.89,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1084986000000,
    "approveAt": 1596772793489,
    "endIssueAt": 1902589200000,
    "maturityAt": null,
    "website": "https://vfm.com.vn/quy-dau-tu-chung-khoan-viet-nam-vfmvf1/vf1-thong-tin-ve-quy/",
    "websiteURL": "https://vfm.com.vn/quy-dau-tu-chung-khoan-viet-nam-vfmvf1/vf1-thong-tin-ve-quy/",
    "customField": "Phí chuyển đổi sang quỹ trái phiếu",
    "customValue": "1%",
    "expectedReturn": 0,
    "managementFee": 1.95,
    "performanceFee": null,
    "closedOrderBookAt": "14:30",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "14:30",
    "productTradingSession": {
      "tradingTime": 1652288400000,
      "closedOrderBookTime": 1652254200000,
      "closedBankNoteTime": 1652254200000,
      "tradingTimeString": "12/05/2022",
      "closedOrderBookTimeString": "14:30 11/05/2022",
      "closedBankNoteTimeString": "14:30 11/05/2022"
    },
    "completeTransactionDuration": 3,
    "description": "VFMVF1 là quỹ cân bằng, quỹ xây dựng một danh mục đầu tư cân đối và đa dạng nhằm tối ưu hóa lợi nhuận, tối thiểu hóa các rủi ro cho nguồn vốn đầu tư của quỹ.",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "VFMVF1N001",
    "avgAnnualReturn": 36,
    "isTransferred": true,
    "createAt": 1596771759776,
    "updateAt": 1648173794776,
    "productAssetAllocationList": [
      3,
      10
    ],
    "productAssetAllocationModelList": [
      {
        "id": 3,
        "name": "Cổ phiếu niêm yết"
      },
      {
        "id": 10,
        "name": "Trái phiếu"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 3,
      "name": "Cổ phiếu niêm yết"
    },
    "productAssetAllocationModel2": {
      "id": 10,
      "name": "Trái phiếu"
    },
    "productSupervisoryBankAccount": {
      "name": "DCDS",
      "number": "90183711720",
      "bankId": 14,
      "bank": {
        "id": 14,
        "name": "Standard Chartered",
        "shortName": "Standard Chartered",
        "stockName": "SCB",
        "binCode": "970410",
        "swiftCode": null,
        "hsbcCode": "BKSCVN",
        "hsbcDefaultBranchCode": "BRSCVNVN",
        "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
        "branches": []
      },
      "branch": "TP.HCM",
      "comment": null,
      "productId": 28,
      "agentName": null
    },
    "owner": {
      "id": 680,
      "encodeURL": "cong-ty-co-phan-quan-ly-quy-dragon-capital-viet-nam_680",
      "code": "007F02838251488",
      "name": "CÔNG TY CỔ PHẦN QUẢN LÝ QUỸ DRAGON CAPITAL VIỆT NAM",
      "userId": 680,
      "userCode": "007F02838251488",
      "email": "info@dcvfm.com.vn",
      "email2": "fincorp.vn@gmail.com",
      "shortName": "DCVFM",
      "address1": "Tầng 17, 02 Ngô Đức Kế, Phường Bến Nghé, Quận 1, TP Hồ Chí Minh",
      "phone": "02838251488",
      "phonePostal": "84",
      "website": "https://dcvfm.com.vn",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/633a75dd-7eb4-4d54-bbad-f8c45e674e22.docx",
      "hsbcCode": "dcvfm",
      "securityDepositoryCenter": {
        "id": 1,
        "code": "VSD",
        "name": "Trung tâm lưu ký VSD"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/3d052709-4859-4e15-82a6-8fd04ff9b374.png",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 2,
      "name": "Trung bình"
    },
    "moneyTransferSyntax": {
      "id": 6,
      "name": "[STK]",
      "syntax": "[STK]",
      "weight": 5,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 3,
      "name": "Quỹ cân bằng",
      "code": "BALANCED"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": -2.3,
      "navToLastYear": -14.61,
      "navToEstablish": 31.54,
      "navTo3Months": -11.31,
      "navTo6Months": -15.56,
      "navTo12Months": 10.35,
      "navTo36Months": 76.51,
      "navToBeginning": 137.04,
      "updateAt": 1652116500442
    },
    "productFeeList": [
      {
        "id": 4003,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4004,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4005,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 6,
        "fee": 2.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4006,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 6,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 12,
        "fee": 1.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4007,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 12,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 24,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4008,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 24,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3982,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 1000000000,
        "fee": 1,
        "destProductId": 25,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3983,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 1000000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 1,
        "destProductId": 25,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1097,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 1000000000,
        "fee": 1,
        "destProductId": 27,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1098,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 1000000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 1,
        "destProductId": 27,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      1,
      2,
      3,
      4,
      5
    ],
    "productTransactionDateModelList": [
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "DCDS",
        "number": "90183711720",
        "bankId": 14,
        "bank": {
          "id": 14,
          "name": "Standard Chartered",
          "shortName": "Standard Chartered",
          "stockName": "SCB",
          "binCode": "970410",
          "swiftCode": null,
          "hsbcCode": "BKSCVN",
          "hsbcDefaultBranchCode": "BRSCVNVN",
          "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
          "branches": []
        },
        "branch": "TP.HCM",
        "comment": null,
        "productId": 28,
        "agentName": null
      }
    ],
    "extra": {
      "lastNAV": 66719.99,
      "currentNAV": 66719.99,
      "lastNAVDate": 1651942800000
    },
    "isDelete": false
  },
  {
    "id": 21,
    "name": "QUỸ ĐẦU TƯ TRÁI PHIẾU BẢO THỊNH",
    "shortName": "VFF",
    "code": "VFF",
    "subCode": null,
    "tradeCode": "VFFN003",
    "sipCode": "VFFN004",
    "price": 10000,
    "nav": 19691.77,
    "lastYearNav": 19103.17,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 2000000,
    "buyMaxValue": null,
    "sellMin": 10,
    "sellMinValue": null,
    "holdingMin": 0,
    "instock": null,
    "holdingVolume": 540517.93,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1364749200000,
    "approveAt": 1596773666000,
    "endIssueAt": 1870534800000,
    "maturityAt": null,
    "website": "https://wm.vinacapital.com/quy-dau-tu-trai-phieu-bao-thinh-vff",
    "websiteURL": "https://wm.vinacapital.com/quy-dau-tu-trai-phieu-bao-thinh-vff",
    "customField": "Phí chuyển đổi",
    "customValue": "0%",
    "expectedReturn": 0,
    "managementFee": 0.95,
    "performanceFee": null,
    "closedOrderBookAt": "14:40",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "14:40",
    "productTradingSession": {
      "tradingTime": 1652288400000,
      "closedOrderBookTime": 1652254800000,
      "closedBankNoteTime": 1652254800000,
      "tradingTimeString": "12/05/2022",
      "closedOrderBookTimeString": "14:40 11/05/2022",
      "closedBankNoteTimeString": "14:40 11/05/2022"
    },
    "completeTransactionDuration": 4,
    "description": "VFF là quỹ đầu tư trái phiếu với chiến lược đầu tư trung và dài hạn (1-3 năm) để mang lại lợi nhuận ổn ​​định",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "VFFN003",
    "avgAnnualReturn": 10,
    "isTransferred": true,
    "createAt": 1596255773057,
    "updateAt": 1642960149091,
    "productAssetAllocationList": [
      10,
      7
    ],
    "productAssetAllocationModelList": [
      {
        "id": 10,
        "name": "Trái phiếu"
      },
      {
        "id": 7,
        "name": "Công cụ có thu nhập cố định"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 10,
      "name": "Trái phiếu"
    },
    "productAssetAllocationModel2": {
      "id": 7,
      "name": "Công cụ có thu nhập cố định"
    },
    "productSupervisoryBankAccount": {
      "name": "VFF",
      "number": "90193748011",
      "bankId": 14,
      "bank": {
        "id": 14,
        "name": "Standard Chartered",
        "shortName": "Standard Chartered",
        "stockName": "SCB",
        "binCode": "970410",
        "swiftCode": null,
        "hsbcCode": "BKSCVN",
        "hsbcDefaultBranchCode": "BRSCVNVN",
        "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
        "branches": []
      },
      "branch": "TP.HCM",
      "comment": null,
      "productId": 21,
      "agentName": null
    },
    "owner": {
      "id": 677,
      "encodeURL": "cong-ty-co-phan-quan-ly-quy-vinacapital_677",
      "code": "007F02838278535",
      "name": "CÔNG TY CỔ PHẦN QUẢN LÝ QUỸ VINACAPITAL",
      "userId": 677,
      "userCode": "007F02838278535",
      "email": "irwm@vinacapital.com",
      "email2": "fincorp.vn@gmail.com",
      "shortName": "VINACAPITAL",
      "address1": "Lầu 17, 115 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP Hồ Chí Minh",
      "phone": "02838278535",
      "phonePostal": "84",
      "website": "https://wm.vinacapital.com",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/9e01919f-30b1-498e-b115-a7bab933e16f.docx",
      "hsbcCode": "VinaCapital",
      "securityDepositoryCenter": {
        "id": 1,
        "code": "VSD",
        "name": "Trung tâm lưu ký VSD"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/643f4146-b446-4830-a794-64cc93760791.png",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 18,
      "name": "Thấp - Trung bình"
    },
    "moneyTransferSyntax": {
      "id": 6,
      "name": "[STK]",
      "syntax": "[STK]",
      "weight": 5,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 2,
      "name": "Quỹ trái phiếu",
      "code": "BOND"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": 0.28,
      "navToLastYear": 3.08,
      "navToEstablish": 10.64,
      "navTo3Months": 2.33,
      "navTo6Months": 4.59,
      "navTo12Months": 8.75,
      "navTo36Months": 23.17,
      "navToBeginning": 48.24,
      "updateAt": 1652116500276
    },
    "productFeeList": [
      {
        "id": 3376,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3377,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3378,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 12,
        "fee": 2,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3379,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 12,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 24,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3380,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 24,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 542,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": 20,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 543,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0,
        "destProductId": 20,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 540,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": 22,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 541,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0,
        "destProductId": 22,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1067,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 10000000,
        "fee": 0,
        "destProductId": 23,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1068,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 10000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0,
        "destProductId": 23,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      2,
      4
    ],
    "productTransactionDateModelList": [
      "Thứ ba",
      "Thứ năm"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "VFF",
        "number": "90193748011",
        "bankId": 14,
        "bank": {
          "id": 14,
          "name": "Standard Chartered",
          "shortName": "Standard Chartered",
          "stockName": "SCB",
          "binCode": "970410",
          "swiftCode": null,
          "hsbcCode": "BKSCVN",
          "hsbcDefaultBranchCode": "BRSCVNVN",
          "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
          "branches": []
        },
        "branch": "TP.HCM",
        "comment": null,
        "productId": 21,
        "agentName": null
      }
    ],
    "extra": {
      "lastNAV": 19691.77,
      "currentNAV": 19691.77,
      "lastNAVDate": 1651683600000
    },
    "isDelete": false
  },
  {
    "id": 38,
    "name": "QUỸ ĐẦU TƯ CHỦ ĐỘNG VND",
    "shortName": "VNDAF",
    "code": "VNDAF",
    "subCode": null,
    "tradeCode": "mua VNDAF",
    "sipCode": "VNDAFS004",
    "price": 10000,
    "nav": 14545.06,
    "lastYearNav": 15964.6,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 100000,
    "buyMaxValue": null,
    "sellMin": 10,
    "sellMinValue": null,
    "holdingMin": 0,
    "instock": null,
    "holdingVolume": 526612.43,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1515690000000,
    "approveAt": 1631763704096,
    "endIssueAt": 1814893200000,
    "maturityAt": null,
    "website": "https://ipaam.com.vn/vi/quy-mo/quy-mo-co-phieu-vndaf/gioi-thieu-quy-mo-vndaf/",
    "websiteURL": "https://ipaam.com.vn/vi/quy-mo/quy-mo-co-phieu-vndaf/gioi-thieu-quy-mo-vndaf/",
    "customField": "Phí chuyển đổi",
    "customValue": "0.5%",
    "expectedReturn": 0,
    "managementFee": 1.5,
    "performanceFee": null,
    "closedOrderBookAt": "14:45",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "14:45",
    "productTradingSession": {
      "tradingTime": 1652288400000,
      "closedOrderBookTime": 1652255100000,
      "closedBankNoteTime": 1652255100000,
      "tradingTimeString": "12/05/2022",
      "closedOrderBookTimeString": "14:45 11/05/2022",
      "closedBankNoteTimeString": "14:45 11/05/2022"
    },
    "completeTransactionDuration": 3,
    "description": "Quỹ đầu tư vào các doanh nghiệp niêm yết hàng đầu, có hiệu quả kinh doanh tốt nhất nhằm mang lại sự tăng trưởng tài sản trong dài hạn.",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "VNDAFN001",
    "avgAnnualReturn": 15,
    "isTransferred": true,
    "createAt": 1631763614097,
    "updateAt": 1642960149091,
    "productAssetAllocationList": [
      16,
      3
    ],
    "productAssetAllocationModelList": [
      {
        "id": 16,
        "name": "Cổ phiếu Bluechip"
      },
      {
        "id": 3,
        "name": "Cổ phiếu niêm yết"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 16,
      "name": "Cổ phiếu Bluechip"
    },
    "productAssetAllocationModel2": {
      "id": 3,
      "name": "Cổ phiếu niêm yết"
    },
    "productSupervisoryBankAccount": {
      "name": "QUY DAU TU CHU DONG VND",
      "number": "12210002277978",
      "bankId": 6,
      "bank": {
        "id": 6,
        "name": "BIDV",
        "shortName": "BIDV",
        "stockName": "BID",
        "binCode": "970418",
        "swiftCode": null,
        "hsbcCode": "BKBIDV",
        "hsbcDefaultBranchCode": "BRBIDVVN",
        "website": "https://www.bidv.vn:81/iportalweb/iRetail@1",
        "branches": []
      },
      "branch": "Hà Thành",
      "comment": null,
      "productId": 38,
      "agentName": ""
    },
    "owner": {
      "id": 17075,
      "encodeURL": "cong-ty-tnhh-mtv-quan-ly-quy-dau-tu-chung-khoan-ipa_17075",
      "code": "007F939724568",
      "name": "CONG TY TNHH MTV QUAN LY QUY DAU TU CHUNG KHOAN IPA",
      "userId": 17075,
      "userCode": "007F939724568",
      "email": "fincorp012018@gmail.com",
      "email2": "fincorp012018@gmail.com",
      "shortName": "IPAAM",
      "address1": "số 01 Nguyễn Thượng Hiền, Phường Nguyễn Du, Hai Bà Trưng, Hà Nội",
      "phone": "0939724568",
      "phonePostal": "84",
      "website": "https://ipaam.com.vn/vi/home/",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/26f53378-3278-4256-acb8-4744c5304f37.docx",
      "hsbcCode": "IPAAM",
      "securityDepositoryCenter": {
        "id": 1,
        "code": "VSD",
        "name": "Trung tâm lưu ký VSD"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/f4bc6f86-477b-459a-9851-bbfc309ef660.png",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 2,
      "name": "Trung bình"
    },
    "moneyTransferSyntax": {
      "id": 1,
      "name": "[HoTen] [STK] [MaGD] [DLPP]",
      "syntax": "[HoTen] [STK] [MaGD] [DLPP]",
      "weight": 0,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 1,
      "name": "Quỹ cổ phiếu",
      "code": "STOCK"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": -4.43,
      "navToLastYear": -8.89,
      "navToEstablish": 10.51,
      "navTo3Months": -10.46,
      "navTo6Months": -9.02,
      "navTo12Months": 8.41,
      "navTo36Months": 46.28,
      "navToBeginning": 45.45,
      "updateAt": 1652172974908
    },
    "productFeeList": [
      {
        "id": 3335,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 20000000,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3336,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 20000000,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3337,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 6,
        "fee": 2,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3338,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 6,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 12,
        "fee": 1.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3339,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 12,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 24,
        "fee": 1,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3340,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 24,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3287,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 20000000,
        "fee": 0.5,
        "destProductId": 37,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3288,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 20000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0.5,
        "destProductId": 37,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      1,
      2,
      3,
      4,
      5
    ],
    "productTransactionDateModelList": [
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "QUY DAU TU CHU DONG VND",
        "number": "12210002277978",
        "bankId": 6,
        "bank": {
          "id": 6,
          "name": "BIDV",
          "shortName": "BIDV",
          "stockName": "BID",
          "binCode": "970418",
          "swiftCode": null,
          "hsbcCode": "BKBIDV",
          "hsbcDefaultBranchCode": "BRBIDVVN",
          "website": "https://www.bidv.vn:81/iportalweb/iRetail@1",
          "branches": []
        },
        "branch": "Hà Thành",
        "comment": null,
        "productId": 38,
        "agentName": ""
      }
    ],
    "extra": {
      "lastNAV": 14545.06,
      "currentNAV": 14545.06,
      "lastNAVDate": 1652115600000
    },
    "isDelete": false
  },
  {
    "id": 27,
    "name": "QUỸ ĐẦU TƯ TRÁI PHIẾU DC",
    "shortName": "DCBF",
    "code": "VFMVFB",
    "subCode": null,
    "tradeCode": "VFMVFBN001",
    "sipCode": "VFMVFBS004",
    "price": 10000,
    "nav": 22847.4,
    "lastYearNav": 22269.94,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 100000,
    "buyMaxValue": null,
    "sellMin": 10,
    "sellMinValue": null,
    "holdingMin": 0,
    "instock": null,
    "holdingVolume": 296184.95,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1370797200000,
    "approveAt": 1596773606598,
    "endIssueAt": 1902589200000,
    "maturityAt": null,
    "website": "https://vfm.com.vn/quy-dau-tu-trai-phieu-viet-nam-vfmvfb/vfb-thong-tin-ve-quy-mo/",
    "websiteURL": "https://vfm.com.vn/quy-dau-tu-trai-phieu-viet-nam-vfmvfb/vfb-thong-tin-ve-quy-mo/",
    "customField": "Phí chuyển đổi sang quỹ cổ phiếu",
    "customValue": "1%",
    "expectedReturn": 0,
    "managementFee": 1,
    "performanceFee": null,
    "closedOrderBookAt": "14:30",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "14:30",
    "productTradingSession": {
      "tradingTime": 1652374800000,
      "closedOrderBookTime": 1652340600000,
      "closedBankNoteTime": 1652340600000,
      "tradingTimeString": "13/05/2022",
      "closedOrderBookTimeString": "14:30 12/05/2022",
      "closedBankNoteTimeString": "14:30 12/05/2022"
    },
    "completeTransactionDuration": 5,
    "description": "Quỹ VFMVFB đầu tư vào trái phiếu chính phủ, trái phiếu địa phương, trái phiếu doanh nghiệp và giấy tờ có giá để tạo ra thu nhập ổn định.",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "VFMVFBN001",
    "avgAnnualReturn": 14,
    "isTransferred": true,
    "createAt": 1596772626506,
    "updateAt": 1648462144246,
    "productAssetAllocationList": [
      10,
      1
    ],
    "productAssetAllocationModelList": [
      {
        "id": 10,
        "name": "Trái phiếu"
      },
      {
        "id": 1,
        "name": "Giấy tờ có giá"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 10,
      "name": "Trái phiếu"
    },
    "productAssetAllocationModel2": {
      "id": 1,
      "name": "Giấy tờ có giá"
    },
    "productSupervisoryBankAccount": {
      "name": "DCBF",
      "number": "90213046715",
      "bankId": 14,
      "bank": {
        "id": 14,
        "name": "Standard Chartered",
        "shortName": "Standard Chartered",
        "stockName": "SCB",
        "binCode": "970410",
        "swiftCode": null,
        "hsbcCode": "BKSCVN",
        "hsbcDefaultBranchCode": "BRSCVNVN",
        "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
        "branches": []
      },
      "branch": "TP.HCM",
      "comment": null,
      "productId": 27,
      "agentName": null
    },
    "owner": {
      "id": 680,
      "encodeURL": "cong-ty-co-phan-quan-ly-quy-dragon-capital-viet-nam_680",
      "code": "007F02838251488",
      "name": "CÔNG TY CỔ PHẦN QUẢN LÝ QUỸ DRAGON CAPITAL VIỆT NAM",
      "userId": 680,
      "userCode": "007F02838251488",
      "email": "info@dcvfm.com.vn",
      "email2": "fincorp.vn@gmail.com",
      "shortName": "DCVFM",
      "address1": "Tầng 17, 02 Ngô Đức Kế, Phường Bến Nghé, Quận 1, TP Hồ Chí Minh",
      "phone": "02838251488",
      "phonePostal": "84",
      "website": "https://dcvfm.com.vn",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/633a75dd-7eb4-4d54-bbad-f8c45e674e22.docx",
      "hsbcCode": "dcvfm",
      "securityDepositoryCenter": {
        "id": 1,
        "code": "VSD",
        "name": "Trung tâm lưu ký VSD"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/3d052709-4859-4e15-82a6-8fd04ff9b374.png",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 1,
      "name": "Thấp"
    },
    "moneyTransferSyntax": {
      "id": 6,
      "name": "[STK]",
      "syntax": "[STK]",
      "weight": 5,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 2,
      "name": "Quỹ trái phiếu",
      "code": "BOND"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": 0.15,
      "navToLastYear": 2.59,
      "navToEstablish": 14.4,
      "navTo3Months": 2.17,
      "navTo6Months": 3.87,
      "navTo12Months": 7.66,
      "navTo36Months": 24.88,
      "navToBeginning": 65.29,
      "updateAt": 1652116500419
    },
    "productFeeList": [
      {
        "id": 4050,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4051,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4052,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 12,
        "fee": 2,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4053,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 12,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 24,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4054,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 24,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1085,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 1000000000,
        "fee": 1,
        "destProductId": 25,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1086,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 1000000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 1,
        "destProductId": 25,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1089,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 1000000000,
        "fee": 1,
        "destProductId": 28,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1090,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 1000000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 1,
        "destProductId": 28,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      5
    ],
    "productTransactionDateModelList": [
      "Thứ sáu"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "DCBF",
        "number": "90213046715",
        "bankId": 14,
        "bank": {
          "id": 14,
          "name": "Standard Chartered",
          "shortName": "Standard Chartered",
          "stockName": "SCB",
          "binCode": "970410",
          "swiftCode": null,
          "hsbcCode": "BKSCVN",
          "hsbcDefaultBranchCode": "BRSCVNVN",
          "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
          "branches": []
        },
        "branch": "TP.HCM",
        "comment": null,
        "productId": 27,
        "agentName": null
      }
    ],
    "extra": {
      "lastNAV": 22847.4,
      "currentNAV": 22847.4,
      "lastNAVDate": 1651683600000
    },
    "isDelete": false
  },
  {
    "id": 37,
    "name": "QUỸ ĐẦU TƯ TRÁI PHIẾU VND",
    "shortName": "VNDBF",
    "code": "VNDBF",
    "subCode": null,
    "tradeCode": "mua VNDBF",
    "sipCode": "",
    "price": 10000,
    "nav": 11938.44,
    "lastYearNav": 11663.22,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 100000,
    "buyMaxValue": null,
    "sellMin": 10,
    "sellMinValue": null,
    "holdingMin": 0,
    "instock": null,
    "holdingVolume": 81264.06,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1562259600000,
    "approveAt": 1631763948374,
    "endIssueAt": 1814893200000,
    "maturityAt": null,
    "website": "https://ipaam.com.vn/vi/quy-mo/quy-mo-trai-phieu-vndbf/gioi-thieu-quy-mo-trai-phieu-vndbf/",
    "websiteURL": "https://ipaam.com.vn/vi/quy-mo/quy-mo-trai-phieu-vndbf/gioi-thieu-quy-mo-trai-phieu-vndbf/",
    "customField": "Phí chuyển đổi",
    "customValue": "0.5%",
    "expectedReturn": 0,
    "managementFee": 0.85,
    "performanceFee": null,
    "closedOrderBookAt": "14:45",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "14:45",
    "productTradingSession": {
      "tradingTime": 1652288400000,
      "closedOrderBookTime": 1652255100000,
      "closedBankNoteTime": 1652255100000,
      "tradingTimeString": "12/05/2022",
      "closedOrderBookTimeString": "14:45 11/05/2022",
      "closedBankNoteTimeString": "14:45 11/05/2022"
    },
    "completeTransactionDuration": 3,
    "description": "Quỹ tìm kiếm lợi nhuận ổn định và dài hạn cho Nhà đầu tư thông qua việc đầu tư vào các tài sản có thu nhập cố định có uy tín và có chất lượng tín dụng cao.",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "VNDBFN001",
    "avgAnnualReturn": 7,
    "isTransferred": true,
    "createAt": 1631762069398,
    "updateAt": 1642960149091,
    "productAssetAllocationList": [
      10,
      15
    ],
    "productAssetAllocationModelList": [
      {
        "id": 10,
        "name": "Trái phiếu"
      },
      {
        "id": 15,
        "name": "Tài sản có thu nhập cố định"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 10,
      "name": "Trái phiếu"
    },
    "productAssetAllocationModel2": {
      "id": 15,
      "name": "Tài sản có thu nhập cố định"
    },
    "productSupervisoryBankAccount": {
      "name": "QUY DAU TU TRAI PHIEU VND",
      "number": "12210002277932",
      "bankId": 6,
      "bank": {
        "id": 6,
        "name": "BIDV",
        "shortName": "BIDV",
        "stockName": "BID",
        "binCode": "970418",
        "swiftCode": null,
        "hsbcCode": "BKBIDV",
        "hsbcDefaultBranchCode": "BRBIDVVN",
        "website": "https://www.bidv.vn:81/iportalweb/iRetail@1",
        "branches": []
      },
      "branch": "Hà Thành",
      "comment": null,
      "productId": 37,
      "agentName": null
    },
    "owner": {
      "id": 17075,
      "encodeURL": "cong-ty-tnhh-mtv-quan-ly-quy-dau-tu-chung-khoan-ipa_17075",
      "code": "007F939724568",
      "name": "CONG TY TNHH MTV QUAN LY QUY DAU TU CHUNG KHOAN IPA",
      "userId": 17075,
      "userCode": "007F939724568",
      "email": "fincorp012018@gmail.com",
      "email2": "fincorp012018@gmail.com",
      "shortName": "IPAAM",
      "address1": "số 01 Nguyễn Thượng Hiền, Phường Nguyễn Du, Hai Bà Trưng, Hà Nội",
      "phone": "0939724568",
      "phonePostal": "84",
      "website": "https://ipaam.com.vn/vi/home/",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/26f53378-3278-4256-acb8-4744c5304f37.docx",
      "hsbcCode": "IPAAM",
      "securityDepositoryCenter": {
        "id": 1,
        "code": "VSD",
        "name": "Trung tâm lưu ký VSD"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/f4bc6f86-477b-459a-9851-bbfc309ef660.png",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 1,
      "name": "Thấp"
    },
    "moneyTransferSyntax": {
      "id": 1,
      "name": "[HoTen] [STK] [MaGD] [DLPP]",
      "syntax": "[HoTen] [STK] [MaGD] [DLPP]",
      "weight": 0,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 2,
      "name": "Quỹ trái phiếu",
      "code": "BOND"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": -0.03,
      "navToLastYear": 2.36,
      "navToEstablish": 6.8,
      "navTo3Months": 1.7,
      "navTo6Months": 3.17,
      "navTo12Months": 7.64,
      "navTo36Months": null,
      "navToBeginning": 19.38,
      "updateAt": 1652172974919
    },
    "productFeeList": [
      {
        "id": 3341,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 2000000000,
        "fee": 0.15,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3342,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 2000000000,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3343,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 3,
        "fee": 1,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3344,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 3,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 6,
        "fee": 0.75,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3345,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 6,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 12,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3346,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 12,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3291,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 20000000,
        "fee": 0.5,
        "destProductId": 38,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3292,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 20000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0.5,
        "destProductId": 38,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      1,
      2,
      3,
      4,
      5
    ],
    "productTransactionDateModelList": [
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "QUY DAU TU TRAI PHIEU VND",
        "number": "12210002277932",
        "bankId": 6,
        "bank": {
          "id": 6,
          "name": "BIDV",
          "shortName": "BIDV",
          "stockName": "BID",
          "binCode": "970418",
          "swiftCode": null,
          "hsbcCode": "BKBIDV",
          "hsbcDefaultBranchCode": "BRBIDVVN",
          "website": "https://www.bidv.vn:81/iportalweb/iRetail@1",
          "branches": []
        },
        "branch": "Hà Thành",
        "comment": null,
        "productId": 37,
        "agentName": null
      }
    ],
    "extra": {
      "lastNAV": 11938.44,
      "currentNAV": 11938.44,
      "lastNAVDate": 1652115600000
    },
    "isDelete": false
  },
  {
    "id": 45,
    "name": "QUỸ ĐẦU TƯ TRÁI PHIẾU PVCOM",
    "shortName": "PVBF",
    "code": "PVBF",
    "subCode": null,
    "tradeCode": "mua quy PVBF",
    "sipCode": "PVBFS002",
    "price": 10000,
    "nav": 11801.9,
    "lastYearNav": 11495.85,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 1000000,
    "buyMaxValue": null,
    "sellMin": 10,
    "sellMinValue": null,
    "holdingMin": 0,
    "instock": null,
    "holdingVolume": 76207.02,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1581008400000,
    "approveAt": 1634788727188,
    "endIssueAt": 1814893200000,
    "maturityAt": null,
    "website": "https://pvcomcapital.com.vn/quy-pvbf",
    "websiteURL": "https://pvcomcapital.com.vn/quy-pvbf",
    "customField": "",
    "customValue": "",
    "expectedReturn": 0,
    "managementFee": 0,
    "performanceFee": 1,
    "closedOrderBookAt": "14:00",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "14:00",
    "productTradingSession": {
      "tradingTime": 1652288400000,
      "closedOrderBookTime": 1652252400000,
      "closedBankNoteTime": 1652252400000,
      "tradingTimeString": "12/05/2022",
      "closedOrderBookTimeString": "14:00 11/05/2022",
      "closedBankNoteTimeString": "14:00 11/05/2022"
    },
    "completeTransactionDuration": 3,
    "description": "Quỹ đầu tư chủ yếu vào trái phiếu Chính phủ, trái phiếu doanh nghiệp hàng đầu nhằm mang lại lợi nhuận kỳ vọng bền vững và độ an toàn cao.",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "PVBFN001",
    "avgAnnualReturn": 8,
    "isTransferred": true,
    "createAt": 1634788546187,
    "updateAt": 1642960149091,
    "productAssetAllocationList": [
      10,
      15
    ],
    "productAssetAllocationModelList": [
      {
        "id": 10,
        "name": "Trái phiếu"
      },
      {
        "id": 15,
        "name": "Tài sản có thu nhập cố định"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 10,
      "name": "Trái phiếu"
    },
    "productAssetAllocationModel2": {
      "id": 15,
      "name": "Tài sản có thu nhập cố định"
    },
    "productSupervisoryBankAccount": {
      "name": "QUỸ ĐẦU TƯ TRÁI PHIẾU PVCOM",
      "number": "12210002290230",
      "bankId": 6,
      "bank": {
        "id": 6,
        "name": "BIDV",
        "shortName": "BIDV",
        "stockName": "BID",
        "binCode": "970418",
        "swiftCode": null,
        "hsbcCode": "BKBIDV",
        "hsbcDefaultBranchCode": "BRBIDVVN",
        "website": "https://www.bidv.vn:81/iportalweb/iRetail@1",
        "branches": []
      },
      "branch": "Hà Thành",
      "comment": null,
      "productId": 45,
      "agentName": null
    },
    "owner": {
      "id": 23865,
      "encodeURL": "cong-ty-cp-quan-ly-quy-ngan-hang-tmcp-dai-chung-viet-nam_23865",
      "code": "007F949080316",
      "name": "CONG TY CP QUAN LY QUY NGAN HANG TMCP DAI CHUNG VIET NAM",
      "userId": 23865,
      "userCode": "007F949080316",
      "email": "fincorp042018@gmail.com",
      "email2": "fincorp042018@gmail.com",
      "shortName": "PVCB CAPITAL",
      "address1": "Tầng 9, Tòa nhà Hapro, 11B Cát Linh, Phường Quốc Tử Giám, Quận Đống Đa, Hà Nội",
      "phone": "0949080316",
      "phonePostal": "84",
      "website": "https://pvcomcapital.com.vn/",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/e072078b-a438-4857-9b05-10129f10f62a.docx",
      "hsbcCode": "pvcom",
      "securityDepositoryCenter": {
        "id": 1,
        "code": "VSD",
        "name": "Trung tâm lưu ký VSD"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/70d271ca-a14c-43b8-99eb-d407f47d7eb5.png",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 18,
      "name": "Thấp - Trung bình"
    },
    "moneyTransferSyntax": {
      "id": 1,
      "name": "[HoTen] [STK] [MaGD] [DLPP]",
      "syntax": "[HoTen] [STK] [MaGD] [DLPP]",
      "weight": 0,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 2,
      "name": "Quỹ trái phiếu",
      "code": "BOND"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": 0.6,
      "navToLastYear": 2.66,
      "navToEstablish": 7.99,
      "navTo3Months": 1.8,
      "navTo6Months": 3.81,
      "navTo12Months": 6.97,
      "navTo36Months": null,
      "navToBeginning": 18.02,
      "updateAt": 1652116500643
    },
    "productFeeList": [
      {
        "id": 3660,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3661,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3662,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 6,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3663,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 6,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 9,
        "fee": 0.3,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3664,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 9,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 12,
        "fee": 0.15,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3665,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 12,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      2,
      4
    ],
    "productTransactionDateModelList": [
      "Thứ ba",
      "Thứ năm"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "QUỸ ĐẦU TƯ TRÁI PHIẾU PVCOM",
        "number": "12210002290230",
        "bankId": 6,
        "bank": {
          "id": 6,
          "name": "BIDV",
          "shortName": "BIDV",
          "stockName": "BID",
          "binCode": "970418",
          "swiftCode": null,
          "hsbcCode": "BKBIDV",
          "hsbcDefaultBranchCode": "BRBIDVVN",
          "website": "https://www.bidv.vn:81/iportalweb/iRetail@1",
          "branches": []
        },
        "branch": "Hà Thành",
        "comment": null,
        "productId": 45,
        "agentName": null
      }
    ],
    "extra": {
      "lastNAV": 11801.9,
      "currentNAV": 11801.9,
      "lastNAVDate": 1651683600000
    },
    "isDelete": false
  },
  {
    "id": 8,
    "name": "QUỸ ĐẦU TƯ TRÁI PHIẾU SSI",
    "shortName": "SSIBF",
    "code": "SSIBF",
    "subCode": null,
    "tradeCode": "mua SSIBF",
    "sipCode": "mua SIP SSIBF",
    "price": 10000,
    "nav": 13246.35,
    "lastYearNav": 12945.08,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 500000,
    "buyMaxValue": null,
    "sellMin": null,
    "sellMinValue": null,
    "holdingMin": 0,
    "instock": null,
    "holdingVolume": 92359.7,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1504026000000,
    "approveAt": 1566873594125,
    "endIssueAt": 1814893200000,
    "maturityAt": null,
    "website": "https://www.ssi.com.vn/ssiam/hieu-qua-dau-tu-cua-quy-ssibf",
    "websiteURL": "https://www.ssi.com.vn/ssiam/hieu-qua-dau-tu-cua-quy-ssibf",
    "customField": "Phí chuyển đổi",
    "customValue": "0%",
    "expectedReturn": 0,
    "managementFee": 1,
    "performanceFee": null,
    "closedOrderBookAt": "15:00",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "15:00",
    "productTradingSession": {
      "tradingTime": 1652288400000,
      "closedOrderBookTime": 1652256000000,
      "closedBankNoteTime": 1652256000000,
      "tradingTimeString": "12/05/2022",
      "closedOrderBookTimeString": "15:00 11/05/2022",
      "closedBankNoteTimeString": "15:00 11/05/2022"
    },
    "completeTransactionDuration": 3,
    "description": "Mục tiêu đầu tư của Quỹ là tối ưu hóa lợi nhuận cho Nhà Đầu Tư trên cơ sở tận dụng hiệu quả các cơ hội đầu tư vào các công cụ có thu nhập cố định.",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "SSIBFN001",
    "avgAnnualReturn": 7,
    "isTransferred": true,
    "createAt": 1566873507539,
    "updateAt": 1650256234969,
    "productAssetAllocationList": [
      10,
      7
    ],
    "productAssetAllocationModelList": [
      {
        "id": 10,
        "name": "Trái phiếu"
      },
      {
        "id": 7,
        "name": "Công cụ có thu nhập cố định"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 10,
      "name": "Trái phiếu"
    },
    "productAssetAllocationModel2": {
      "id": 7,
      "name": "Công cụ có thu nhập cố định"
    },
    "productSupervisoryBankAccount": {
      "name": "SSIBF",
      "number": "12210001809387",
      "bankId": 6,
      "bank": {
        "id": 6,
        "name": "BIDV",
        "shortName": "BIDV",
        "stockName": "BID",
        "binCode": "970418",
        "swiftCode": null,
        "hsbcCode": "BKBIDV",
        "hsbcDefaultBranchCode": "BRBIDVVN",
        "website": "https://www.bidv.vn:81/iportalweb/iRetail@1",
        "branches": []
      },
      "branch": "Hà Thành",
      "comment": null,
      "productId": 8,
      "agentName": null
    },
    "owner": {
      "id": 606,
      "encodeURL": "cong-ty-tnhh-quan-ly-quy-ssi_606",
      "code": "007F02838242897",
      "name": "CÔNG TY TNHH QUẢN LÝ QUỸ SSI",
      "userId": 606,
      "userCode": "007F02838242897",
      "email": "info@ssi.com.vn",
      "email2": "fincorp.vn@gmail.com",
      "shortName": "SSIAM",
      "address1": "Tầng 5, 1C Ngô Quyền, Phường Lý Thái Tổ, Quận Hoàn Kiếm, TP Hà Nội",
      "phone": "02838242897",
      "phonePostal": "84",
      "website": "https://www.ssi.com.vn",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/2c15939b-7a77-4516-94e5-a0b892f38611.docx",
      "hsbcCode": "ssiam",
      "securityDepositoryCenter": {
        "id": 1,
        "code": "VSD",
        "name": "Trung tâm lưu ký VSD"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/58175a8b-40ca-4039-85ec-e8aa1d0d31fc.png",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 1,
      "name": "Thấp"
    },
    "moneyTransferSyntax": {
      "id": 1,
      "name": "[HoTen] [STK] [MaGD] [DLPP]",
      "syntax": "[HoTen] [STK] [MaGD] [DLPP]",
      "weight": 0,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 2,
      "name": "Quỹ trái phiếu",
      "code": "BOND"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": 0.07,
      "navToLastYear": 2.33,
      "navToEstablish": 6.82,
      "navTo3Months": 1.68,
      "navTo6Months": 3.21,
      "navTo12Months": 6.47,
      "navTo36Months": 17.63,
      "navToBeginning": 32.46,
      "updateAt": 1652172975045
    },
    "productFeeList": [
      {
        "id": 4094,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4095,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4096,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 1,
        "fee": 0.02,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4097,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 1,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 2,
        "fee": 0.08,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4098,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 2,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 3,
        "fee": 0.16,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4099,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 3,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 4,
        "fee": 0.07,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4100,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 4,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 5,
        "fee": 0.1,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4101,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 5,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 6,
        "fee": 0.12,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4102,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 6,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 7,
        "fee": 0.15,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4103,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 7,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 8,
        "fee": 0.17,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4104,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 8,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 9,
        "fee": 0.2,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4105,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 9,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 10,
        "fee": 0.22,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4106,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 10,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 11,
        "fee": 0.25,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4107,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 11,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 12,
        "fee": 0.27,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4108,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 12,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 24,
        "fee": 0.3,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4109,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 24,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 493,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": 11,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 494,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": 11,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      1,
      2,
      3,
      4,
      5
    ],
    "productTransactionDateModelList": [
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "SSIBF",
        "number": "12210001809387",
        "bankId": 6,
        "bank": {
          "id": 6,
          "name": "BIDV",
          "shortName": "BIDV",
          "stockName": "BID",
          "binCode": "970418",
          "swiftCode": null,
          "hsbcCode": "BKBIDV",
          "hsbcDefaultBranchCode": "BRBIDVVN",
          "website": "https://www.bidv.vn:81/iportalweb/iRetail@1",
          "branches": []
        },
        "branch": "Hà Thành",
        "comment": null,
        "productId": 8,
        "agentName": null
      }
    ],
    "extra": {
      "lastNAV": 13246.35,
      "currentNAV": 13246.35,
      "lastNAVDate": 1652115600000
    },
    "isDelete": false
  },
  {
    "id": 48,
    "name": "QUỸ ĐẦU TƯ TRÁI PHIẾU MB",
    "shortName": "MBBOND",
    "code": "MBBOND",
    "subCode": null,
    "tradeCode": "MBBOND",
    "sipCode": "",
    "price": 10000,
    "nav": 12783,
    "lastYearNav": 12521,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 50000,
    "buyMaxValue": 20000000000,
    "sellMin": 10,
    "sellMinValue": null,
    "holdingMin": 0,
    "instock": null,
    "holdingVolume": 7638.09,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1521997200000,
    "approveAt": 1644824411374,
    "endIssueAt": 1814893200000,
    "maturityAt": null,
    "website": "https://mbcapital.com.vn/quan-ly-quy/MBBOND",
    "websiteURL": "https://mbcapital.com.vn/quan-ly-quy/MBBOND",
    "customField": "Phí chuyển đổi",
    "customValue": "0.8%",
    "expectedReturn": 0,
    "managementFee": 1.2,
    "performanceFee": null,
    "closedOrderBookAt": "14:30",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "14:30",
    "productTradingSession": {
      "tradingTime": 1652288400000,
      "closedOrderBookTime": 1652254200000,
      "closedBankNoteTime": 1652254200000,
      "tradingTimeString": "12/05/2022",
      "closedOrderBookTimeString": "14:30 11/05/2022",
      "closedBankNoteTimeString": "14:30 11/05/2022"
    },
    "completeTransactionDuration": 5,
    "description": "Quỹ MBBOND đầu tư vào các loại trái phiếu, các công cụ có thu nhập cố định mang đến cho Nhà đầu tư nguồn thu nhập hấp dẫn, ổn định và an toàn.",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "MBBONDN001",
    "avgAnnualReturn": 0,
    "isTransferred": true,
    "createAt": 1644752709566,
    "updateAt": 1649131528580,
    "productAssetAllocationList": [
      10
    ],
    "productAssetAllocationModelList": [
      {
        "id": 10,
        "name": "Trái phiếu"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 10,
      "name": "Trái phiếu"
    },
    "productAssetAllocationModel2": null,
    "productSupervisoryBankAccount": {
      "name": "QUY DAU TU TRAI PHIEU MB",
      "number": "12210002325035",
      "bankId": 6,
      "bank": {
        "id": 6,
        "name": "BIDV",
        "shortName": "BIDV",
        "stockName": "BID",
        "binCode": "970418",
        "swiftCode": null,
        "hsbcCode": "BKBIDV",
        "hsbcDefaultBranchCode": "BRBIDVVN",
        "website": "https://www.bidv.vn:81/iportalweb/iRetail@1",
        "branches": []
      },
      "branch": "Hà Thành",
      "comment": null,
      "productId": 48,
      "agentName": null
    },
    "owner": {
      "id": 49227,
      "encodeURL": "cong-ty-co-phan-quan-ly-quy-dau-tu-mb_49227",
      "code": "007F528919505",
      "name": "CONG TY CO PHAN QUAN LY QUY DAU TU MB",
      "userId": 49227,
      "userCode": "007F528919505",
      "email": "fincorp012022@gmail.com",
      "email2": "fincorp012022@gmail.com",
      "shortName": "MBCAPITAL",
      "address1": "Tầng 12, Tòa nhà Số 21 Cát Linh, Phường Cát Linh, Quận Đống Đa, Thành phố Hà Nội",
      "phone": "0528919505",
      "phonePostal": "84",
      "website": "https://mbcapital.com.vn/",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/bbd2060b-b191-4eb9-bbf2-23d98e63731a.docx",
      "hsbcCode": "Khong dung",
      "securityDepositoryCenter": {
        "id": 1,
        "code": "VSD",
        "name": "Trung tâm lưu ký VSD"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/e8e832a5-c0a2-4c56-ac1d-ab10ed1e23da.jpg",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 1,
      "name": "Thấp"
    },
    "moneyTransferSyntax": {
      "id": 1,
      "name": "[HoTen] [STK] [MaGD] [DLPP]",
      "syntax": "[HoTen] [STK] [MaGD] [DLPP]",
      "weight": 0,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 2,
      "name": "Quỹ trái phiếu",
      "code": "BOND"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": 0.01,
      "navToLastYear": 2.09,
      "navToEstablish": 6.65,
      "navTo3Months": 1.48,
      "navTo6Months": 2.86,
      "navTo12Months": 6.34,
      "navTo36Months": null,
      "navToBeginning": 14,
      "updateAt": 1652172975007
    },
    "productFeeList": [
      {
        "id": 4082,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4083,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4084,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 1,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4085,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 1,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 2,
        "fee": 0.18,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4086,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 2,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 3,
        "fee": 0.1,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4087,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 3,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3901,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 100000000,
        "fee": 0.8,
        "destProductId": 47,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3902,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0.8,
        "destProductId": 47,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      1,
      2,
      3,
      4,
      5
    ],
    "productTransactionDateModelList": [
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "QUY DAU TU TRAI PHIEU MB",
        "number": "12210002325035",
        "bankId": 6,
        "bank": {
          "id": 6,
          "name": "BIDV",
          "shortName": "BIDV",
          "stockName": "BID",
          "binCode": "970418",
          "swiftCode": null,
          "hsbcCode": "BKBIDV",
          "hsbcDefaultBranchCode": "BRBIDVVN",
          "website": "https://www.bidv.vn:81/iportalweb/iRetail@1",
          "branches": []
        },
        "branch": "Hà Thành",
        "comment": null,
        "productId": 48,
        "agentName": null
      }
    ],
    "extra": {
      "lastNAV": 12783,
      "currentNAV": 12783,
      "lastNAVDate": 1652115600000
    },
    "isDelete": false
  },
  {
    "id": 29,
    "name": "QUY DAU TU TANG TRUONG DFVN",
    "shortName": "DFVN-CAF",
    "code": "DFVN-CAF",
    "subCode": null,
    "tradeCode": "DFVNCAF",
    "sipCode": "",
    "price": 10000,
    "nav": 14630.61,
    "lastYearNav": 16308.77,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 1000000,
    "buyMaxValue": null,
    "sellMin": 10,
    "sellMinValue": null,
    "holdingMin": 0,
    "instock": null,
    "holdingVolume": 97812.88,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1546448400000,
    "approveAt": 1596772725489,
    "endIssueAt": 1811955600000,
    "maturityAt": null,
    "website": "https://www.dfvn.com.vn/vi/investment-solutions/fund-management/dfvn-caf/fund-performance",
    "websiteURL": "https://www.dfvn.com.vn/vi/investment-solutions/fund-management/dfvn-caf/fund-performance",
    "customField": "Phí chuyển đổi quỹ",
    "customValue": "0%",
    "expectedReturn": 0,
    "managementFee": 1.5,
    "performanceFee": 1.5,
    "closedOrderBookAt": "14:45",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "14:45",
    "productTradingSession": {
      "tradingTime": 1652720400000,
      "closedOrderBookTime": 1652687100000,
      "closedBankNoteTime": 1652687100000,
      "tradingTimeString": "17/05/2022",
      "closedOrderBookTimeString": "14:45 16/05/2022",
      "closedBankNoteTimeString": "14:45 16/05/2022"
    },
    "completeTransactionDuration": 4,
    "description": "Qũy đầu tư vào danh mục cổ phiếu niêm yết trên TTCK VN một cách chủ động và linh hoạt, nhằm tăng trưởng tài sản cao hơn mức tăng của Thị trường trong dài hạn.",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "DFVNCAF",
    "avgAnnualReturn": 19,
    "isTransferred": true,
    "createAt": 1622706468784,
    "updateAt": 1642960149091,
    "productAssetAllocationList": [
      3,
      7
    ],
    "productAssetAllocationModelList": [
      {
        "id": 3,
        "name": "Cổ phiếu niêm yết"
      },
      {
        "id": 7,
        "name": "Công cụ có thu nhập cố định"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 3,
      "name": "Cổ phiếu niêm yết"
    },
    "productAssetAllocationModel2": {
      "id": 7,
      "name": "Công cụ có thu nhập cố định"
    },
    "productSupervisoryBankAccount": {
      "name": "QUY DAU TU TANG TRUONG DFVN",
      "number": "091324178005",
      "bankId": 13,
      "bank": {
        "id": 13,
        "name": "HSBC",
        "shortName": "HSBC",
        "stockName": "HSB",
        "binCode": "458761",
        "swiftCode": null,
        "hsbcCode": "BKHSBC",
        "hsbcDefaultBranchCode": "BRHSBCVN",
        "website": "https://www.hsbc.com.vn/security/",
        "branches": []
      },
      "branch": "Viet Nam",
      "comment": null,
      "productId": 29,
      "agentName": null
    },
    "owner": {
      "id": 3752,
      "encodeURL": "cong-ty-tnhh-mtv-quan-ly-quy-dai-ichi-life-viet-nam_3752",
      "code": "007F02838100888",
      "name": "CÔNG TY TNHH MTV QUẢN LÝ QUỸ DAI-ICHI LIFE VIỆT NAM",
      "userId": 3752,
      "userCode": "007F02838100888",
      "email": "dfvn@dai-ichi-life.com.vn",
      "email2": "fincorp.vn@gmail.com",
      "shortName": "DFVN",
      "address1": "Tầng 11, 149-151 Nguyễn Văn Trỗi, Phường 11, Quận Phú Nhuận, TP HCM, Việt Nam",
      "phone": "0381008888",
      "phonePostal": "84",
      "website": "https://www.dfvn.com.vn",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/836276d7-964d-48a2-a40c-66b19f8f0502.docx",
      "hsbcCode": "DAFMVN",
      "securityDepositoryCenter": {
        "id": 2,
        "code": "HSBC",
        "name": "Trung tâm lưu ký HSBC"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/143ce59d-552c-4187-b32f-f3092dc9eb2e.png",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 17,
      "name": "Trung bình-Cao"
    },
    "moneyTransferSyntax": {
      "id": 5,
      "name": "[HoTen] [CMND]",
      "syntax": "[HoTen] [CMND]",
      "weight": 4,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 1,
      "name": "Quỹ cổ phiếu",
      "code": "STOCK"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": -8.96,
      "navToLastYear": -10.29,
      "navToEstablish": 13.82,
      "navTo3Months": -6.98,
      "navTo6Months": -8.11,
      "navTo12Months": 6.16,
      "navTo36Months": 39.21,
      "navToBeginning": 46.31,
      "updateAt": 1652116500482
    },
    "productFeeList": [
      {
        "id": 2498,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2499,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2500,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 6,
        "fee": 2,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2501,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 6,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 12,
        "fee": 1.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2502,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 12,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2023,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": 30,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2024,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0,
        "destProductId": 30,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      2
    ],
    "productTransactionDateModelList": [
      "Thứ ba"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "QUY DAU TU TANG TRUONG DFVN",
        "number": "091324178005",
        "bankId": 13,
        "bank": {
          "id": 13,
          "name": "HSBC",
          "shortName": "HSBC",
          "stockName": "HSB",
          "binCode": "458761",
          "swiftCode": null,
          "hsbcCode": "BKHSBC",
          "hsbcDefaultBranchCode": "BRHSBCVN",
          "website": "https://www.hsbc.com.vn/security/",
          "branches": []
        },
        "branch": "Viet Nam",
        "comment": null,
        "productId": 29,
        "agentName": null
      }
    ],
    "extra": {
      "lastNAV": 14630.61,
      "currentNAV": 14630.61,
      "lastNAVDate": 1650992400000
    },
    "isDelete": false
  },
  {
    "id": 33,
    "name": "QUỸ ĐẦU TƯ TRÁI PHIẾU VCBF",
    "shortName": "VCBF-FIF",
    "code": "VCBFFIF",
    "subCode": null,
    "tradeCode": "VCBFFIF",
    "sipCode": "SIP VCBFFIF",
    "price": 10000,
    "nav": 11654.2,
    "lastYearNav": 11431.5,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 5000000,
    "buyMaxValue": null,
    "sellMin": 100,
    "sellMinValue": null,
    "holdingMin": 0,
    "instock": null,
    "holdingVolume": 14827.41,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1565283600000,
    "approveAt": 1626078445756,
    "endIssueAt": 1814893200000,
    "maturityAt": null,
    "website": "https://www.vcbf.com/quy-mo/cac-quy-mo/quy-dau-tu-can-bang-chien-luoc-vcbf/#?tabid=102",
    "websiteURL": "https://www.vcbf.com/quy-mo/cac-quy-mo/quy-dau-tu-can-bang-chien-luoc-vcbf/#?tabid=102",
    "customField": "Phí chuyển đổi",
    "customValue": "0.2%",
    "expectedReturn": 0,
    "managementFee": 0,
    "performanceFee": 0.1,
    "closedOrderBookAt": "14:00",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "14:00",
    "productTradingSession": {
      "tradingTime": 1652806800000,
      "closedOrderBookTime": 1652770800000,
      "closedBankNoteTime": 1652770800000,
      "tradingTimeString": "18/05/2022",
      "closedOrderBookTimeString": "14:00 17/05/2022",
      "closedBankNoteTimeString": "14:00 17/05/2022"
    },
    "completeTransactionDuration": 5,
    "description": "Quỹ đầu tư 100% tài sản vào các trái phiếu có chất lượng tín dụng tốt nhằm bảo toàn vốn ban đầu và mang lại thu nhập ổn định thường xuyên.",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "VCBFFIFN001",
    "avgAnnualReturn": 6,
    "isTransferred": true,
    "createAt": 1626076735315,
    "updateAt": 1642960149091,
    "productAssetAllocationList": [
      10,
      15
    ],
    "productAssetAllocationModelList": [
      {
        "id": 10,
        "name": "Trái phiếu"
      },
      {
        "id": 15,
        "name": "Tài sản có thu nhập cố định"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 10,
      "name": "Trái phiếu"
    },
    "productAssetAllocationModel2": {
      "id": 15,
      "name": "Tài sản có thu nhập cố định"
    },
    "productSupervisoryBankAccount": {
      "name": "QUY DAU TU TRAI PHIEU VCBF ",
      "number": "90358955209",
      "bankId": 14,
      "bank": {
        "id": 14,
        "name": "Standard Chartered",
        "shortName": "Standard Chartered",
        "stockName": "SCB",
        "binCode": "970410",
        "swiftCode": null,
        "hsbcCode": "BKSCVN",
        "hsbcDefaultBranchCode": "BRSCVNVN",
        "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
        "branches": []
      },
      "branch": "Hội sở chính",
      "comment": null,
      "productId": 33,
      "agentName": null
    },
    "owner": {
      "id": 6859,
      "encodeURL": "cong-ty-lien-doanh-quan-ly-quy-dau-tu-chung-khoan-vietcombank_6859",
      "code": "007F907057977",
      "name": "CÔNG TY LIÊN DOANH QUẢN LÝ QUỸ ĐẦU TƯ CHỨNG KHOÁN VIETCOMBANK",
      "userId": 6859,
      "userCode": "007F907057977",
      "email": "fincorp082018@gmail.com",
      "email2": "fincorp.vn@gmail.com",
      "shortName": "VCBF",
      "address1": "Tầng 15, Tòa nhà Vietcombank, 198 Trần Quang Khải, Hoàn Kiếm,  TP. Hà Nội",
      "phone": "0907057977",
      "phonePostal": "84",
      "website": "https://www.vcbf.com/",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/9951d5bd-00cb-48a1-8bbb-1151776bc352.docx",
      "hsbcCode": "vcbf vsd",
      "securityDepositoryCenter": {
        "id": 1,
        "code": "VSD",
        "name": "Trung tâm lưu ký VSD"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/00d8dfc1-c087-420d-991b-b2765052aa6d.png",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 1,
      "name": "Thấp"
    },
    "moneyTransferSyntax": {
      "id": 3,
      "name": "[STK] [HoTen] [MaGD] [DLPP]",
      "syntax": "[STK] [HoTen] [MaGD] [DLPP]",
      "weight": 2,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 2,
      "name": "Quỹ trái phiếu",
      "code": "BOND"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": 0.11,
      "navToLastYear": 1.95,
      "navToEstablish": 6.01,
      "navTo3Months": 1.63,
      "navTo6Months": 3.01,
      "navTo12Months": 5.69,
      "navTo36Months": null,
      "navToBeginning": 16.54,
      "updateAt": 1652116500547
    },
    "productFeeList": [
      {
        "id": 2510,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 1000000000,
        "fee": 0.3,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2511,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 1000000000,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2512,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 3,
        "fee": 1,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2513,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 3,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 12,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2514,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 12,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2109,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 100000000,
        "fee": 0.2,
        "destProductId": 31,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2110,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0.2,
        "destProductId": 31,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2107,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 100000000,
        "fee": 0.2,
        "destProductId": 32,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2108,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0.2,
        "destProductId": 32,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      3
    ],
    "productTransactionDateModelList": [
      "Thứ tư"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "QUY DAU TU TRAI PHIEU VCBF ",
        "number": "90358955209",
        "bankId": 14,
        "bank": {
          "id": 14,
          "name": "Standard Chartered",
          "shortName": "Standard Chartered",
          "stockName": "SCB",
          "binCode": "970410",
          "swiftCode": null,
          "hsbcCode": "BKSCVN",
          "hsbcDefaultBranchCode": "BRSCVNVN",
          "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
          "branches": []
        },
        "branch": "Hội sở chính",
        "comment": null,
        "productId": 33,
        "agentName": null
      }
    ],
    "extra": {
      "lastNAV": 11654.2,
      "currentNAV": 11654.2,
      "lastNAVDate": 1651597200000
    },
    "isDelete": false
  },
  {
    "id": 13,
    "name": "QUỸ ĐẦU TƯ TRÁI PHIẾU BẢO VIỆT ",
    "shortName": "BVBF",
    "code": "BVBF",
    "subCode": null,
    "tradeCode": "BVBFN001",
    "sipCode": "BVBFS002",
    "price": 10000,
    "nav": 17367,
    "lastYearNav": 17111,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 1000000,
    "buyMaxValue": null,
    "sellMin": 5,
    "sellMinValue": null,
    "holdingMin": 0,
    "instock": null,
    "holdingVolume": 150265.03,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1463677200000,
    "approveAt": 1596772727489,
    "endIssueAt": 1909760400000,
    "maturityAt": null,
    "website": "https://baovietfund.com.vn/san-pham/BVBF",
    "websiteURL": "https://baovietfund.com.vn/san-pham/BVBF",
    "customField": "Phí chuyển đổi",
    "customValue": "0.1%",
    "expectedReturn": 0,
    "managementFee": 0.5,
    "performanceFee": null,
    "closedOrderBookAt": "14:45",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "14:45",
    "productTradingSession": {
      "tradingTime": 1652806800000,
      "closedOrderBookTime": 1652773500000,
      "closedBankNoteTime": 1652773500000,
      "tradingTimeString": "18/05/2022",
      "closedOrderBookTimeString": "14:45 17/05/2022",
      "closedBankNoteTimeString": "14:45 17/05/2022"
    },
    "completeTransactionDuration": 3,
    "description": "Quỹ đầu tư vào trái phiếu, công cụ có thu nhập cố định nhằm tối ưu hóa lợi nhuận cho nhà đầu tư trên cơ sở tận dụng hiệu quả các cơ hội đầu tư lãi suất cố định.",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "BVBFN001",
    "avgAnnualReturn": 12,
    "isTransferred": true,
    "createAt": 1576808412839,
    "updateAt": 1642960149091,
    "productAssetAllocationList": [
      10,
      7
    ],
    "productAssetAllocationModelList": [
      {
        "id": 10,
        "name": "Trái phiếu"
      },
      {
        "id": 7,
        "name": "Công cụ có thu nhập cố định"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 10,
      "name": "Trái phiếu"
    },
    "productAssetAllocationModel2": {
      "id": 7,
      "name": "Công cụ có thu nhập cố định"
    },
    "productSupervisoryBankAccount": {
      "name": "QUY DAU TU TRAI PHIEU BAO VIET",
      "number": "12210002026718",
      "bankId": 6,
      "bank": {
        "id": 6,
        "name": "BIDV",
        "shortName": "BIDV",
        "stockName": "BID",
        "binCode": "970418",
        "swiftCode": null,
        "hsbcCode": "BKBIDV",
        "hsbcDefaultBranchCode": "BRBIDVVN",
        "website": "https://www.bidv.vn:81/iportalweb/iRetail@1",
        "branches": []
      },
      "branch": "Hà Thành",
      "comment": null,
      "productId": 13,
      "agentName": null
    },
    "owner": {
      "id": 651,
      "encodeURL": "cong-ty-tnhh-quan-ly-quy-bao-viet_651",
      "code": "007F02439289589",
      "name": "CÔNG TY TNHH QUẢN LÝ QUỸ BẢO VIỆT",
      "userId": 651,
      "userCode": "007F02439289589",
      "email": "info@baovietfund.com.vn",
      "email2": "fincorp.vn@gmail.com",
      "shortName": "BAOVIETFUND",
      "address1": "Tầng 6, 72 Trần Hưng Đạo, Phường Trần Hưng Đạo, Quận Hoàn Kiếm, TP Hà Nội",
      "phone": "02439289589",
      "phonePostal": "84",
      "website": "https://baovietfund.com.vn",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/b0cc9b8c-63d2-4c86-b3ee-f2fdfc10064b.docx",
      "hsbcCode": "bvf",
      "securityDepositoryCenter": {
        "id": 1,
        "code": "VSD",
        "name": "Trung tâm lưu ký VSD"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/1fbb4db1-9ae3-42b9-a29f-aa23fe1ac153.png",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 1,
      "name": "Thấp"
    },
    "moneyTransferSyntax": {
      "id": 1,
      "name": "[HoTen] [STK] [MaGD] [DLPP]",
      "syntax": "[HoTen] [STK] [MaGD] [DLPP]",
      "weight": 0,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 2,
      "name": "Quỹ trái phiếu",
      "code": "BOND"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": 0.1,
      "navToLastYear": 1.5,
      "navToEstablish": 12.33,
      "navTo3Months": 1.79,
      "navTo6Months": 2.18,
      "navTo12Months": 4.65,
      "navTo36Months": 30.24,
      "navToBeginning": 13.54,
      "updateAt": 1652116500184
    },
    "productFeeList": [
      {
        "id": 3770,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 2000000000,
        "fee": 0.3,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3771,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 2000000000,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 5000000000,
        "fee": 0.25,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3772,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 5000000000,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": null,
        "fee": 0.15,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3773,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 3,
        "fee": 0.3,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3774,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 3,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 6,
        "fee": 0.2,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3775,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 6,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 12,
        "fee": 0.15,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3776,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 12,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1120,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 1000000000,
        "fee": 0.1,
        "destProductId": 12,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1121,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 1000000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0.1,
        "destProductId": 12,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1124,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 1000000000,
        "fee": 0.1,
        "destProductId": 14,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1125,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 1000000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0.1,
        "destProductId": 14,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      3
    ],
    "productTransactionDateModelList": [
      "Thứ tư"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "QUY DAU TU TRAI PHIEU BAO VIET",
        "number": "12210002026718",
        "bankId": 6,
        "bank": {
          "id": 6,
          "name": "BIDV",
          "shortName": "BIDV",
          "stockName": "BID",
          "binCode": "970418",
          "swiftCode": null,
          "hsbcCode": "BKBIDV",
          "hsbcDefaultBranchCode": "BRBIDVVN",
          "website": "https://www.bidv.vn:81/iportalweb/iRetail@1",
          "branches": []
        },
        "branch": "Hà Thành",
        "comment": null,
        "productId": 13,
        "agentName": null
      }
    ],
    "extra": {
      "lastNAV": 17367,
      "currentNAV": 17367,
      "lastNAVDate": 1651597200000
    },
    "isDelete": false
  },
  {
    "id": 25,
    "name": "QUỸ ĐẦU TƯ DOANH NGHIỆP HÀNG ĐẦU DC",
    "shortName": "DCBC",
    "code": "VFMVF4",
    "subCode": null,
    "tradeCode": "VFMVF4N001",
    "sipCode": "VFMVF4S006",
    "price": 10000,
    "nav": 26130.1,
    "lastYearNav": 30018.4,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 100000,
    "buyMaxValue": null,
    "sellMin": 10,
    "sellMinValue": null,
    "holdingMin": 0,
    "instock": null,
    "holdingVolume": 809882.75,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1204131600000,
    "approveAt": 1596773324802,
    "endIssueAt": 1902589200000,
    "maturityAt": null,
    "website": "https://vfm.com.vn/quy-dau-tu-doanh-nghiep-hang-dau-viet-nam-vfmvf4/vf4-thong-tin-ve-quy-mo/",
    "websiteURL": "https://vfm.com.vn/quy-dau-tu-doanh-nghiep-hang-dau-viet-nam-vfmvf4/vf4-thong-tin-ve-quy-mo/",
    "customField": "Phí chuyển đổi sang quỹ trái phiếu",
    "customValue": "1%",
    "expectedReturn": 0,
    "managementFee": 1.93,
    "performanceFee": null,
    "closedOrderBookAt": "14:30",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "14:30",
    "productTradingSession": {
      "tradingTime": 1652288400000,
      "closedOrderBookTime": 1652254200000,
      "closedBankNoteTime": 1652254200000,
      "tradingTimeString": "12/05/2022",
      "closedOrderBookTimeString": "14:30 11/05/2022",
      "closedBankNoteTimeString": "14:30 11/05/2022"
    },
    "completeTransactionDuration": 3,
    "description": "Quỹ VFMVF4 đầu tư vào các doanh nghiệp hàng đầu hoạt động trong các ngành cơ bản, chủ đạo của nền kinh tế Việt Nam.",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "VFMVF4N001",
    "avgAnnualReturn": 13,
    "isTransferred": true,
    "createAt": 1596771949127,
    "updateAt": 1648173757146,
    "productAssetAllocationList": [
      3,
      9
    ],
    "productAssetAllocationModelList": [
      {
        "id": 3,
        "name": "Cổ phiếu niêm yết"
      },
      {
        "id": 9,
        "name": "Cổ phần chưa niêm yết"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 3,
      "name": "Cổ phiếu niêm yết"
    },
    "productAssetAllocationModel2": {
      "id": 9,
      "name": "Cổ phần chưa niêm yết"
    },
    "productSupervisoryBankAccount": {
      "name": "DCBC",
      "number": "90213028920",
      "bankId": 14,
      "bank": {
        "id": 14,
        "name": "Standard Chartered",
        "shortName": "Standard Chartered",
        "stockName": "SCB",
        "binCode": "970410",
        "swiftCode": null,
        "hsbcCode": "BKSCVN",
        "hsbcDefaultBranchCode": "BRSCVNVN",
        "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
        "branches": []
      },
      "branch": "TP.HCM",
      "comment": null,
      "productId": 25,
      "agentName": null
    },
    "owner": {
      "id": 680,
      "encodeURL": "cong-ty-co-phan-quan-ly-quy-dragon-capital-viet-nam_680",
      "code": "007F02838251488",
      "name": "CÔNG TY CỔ PHẦN QUẢN LÝ QUỸ DRAGON CAPITAL VIỆT NAM",
      "userId": 680,
      "userCode": "007F02838251488",
      "email": "info@dcvfm.com.vn",
      "email2": "fincorp.vn@gmail.com",
      "shortName": "DCVFM",
      "address1": "Tầng 17, 02 Ngô Đức Kế, Phường Bến Nghé, Quận 1, TP Hồ Chí Minh",
      "phone": "02838251488",
      "phonePostal": "84",
      "website": "https://dcvfm.com.vn",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/633a75dd-7eb4-4d54-bbad-f8c45e674e22.docx",
      "hsbcCode": "dcvfm",
      "securityDepositoryCenter": {
        "id": 1,
        "code": "VSD",
        "name": "Trung tâm lưu ký VSD"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/3d052709-4859-4e15-82a6-8fd04ff9b374.png",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 17,
      "name": "Trung bình-Cao"
    },
    "moneyTransferSyntax": {
      "id": 6,
      "name": "[STK]",
      "syntax": "[STK]",
      "weight": 5,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 1,
      "name": "Quỹ cổ phiếu",
      "code": "STOCK"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": -2.78,
      "navToLastYear": -12.95,
      "navToEstablish": 11.35,
      "navTo3Months": -9.62,
      "navTo6Months": -12.99,
      "navTo12Months": 4.39,
      "navTo36Months": 57.93,
      "navToBeginning": 108.63,
      "updateAt": 1652116500379
    },
    "productFeeList": [
      {
        "id": 3997,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3998,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3999,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 6,
        "fee": 2.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4000,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 6,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 12,
        "fee": 1.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4001,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 12,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 24,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4002,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 24,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1093,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 1000000000,
        "fee": 1,
        "destProductId": 27,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1094,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 1000000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 1,
        "destProductId": 27,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3980,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 1000000000,
        "fee": 1,
        "destProductId": 28,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3981,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 1000000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 1,
        "destProductId": 28,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      1,
      2,
      3,
      4,
      5
    ],
    "productTransactionDateModelList": [
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "DCBC",
        "number": "90213028920",
        "bankId": 14,
        "bank": {
          "id": 14,
          "name": "Standard Chartered",
          "shortName": "Standard Chartered",
          "stockName": "SCB",
          "binCode": "970410",
          "swiftCode": null,
          "hsbcCode": "BKSCVN",
          "hsbcDefaultBranchCode": "BRSCVNVN",
          "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
          "branches": []
        },
        "branch": "TP.HCM",
        "comment": null,
        "productId": 25,
        "agentName": null
      }
    ],
    "extra": {
      "lastNAV": 26130.1,
      "currentNAV": 26130.1,
      "lastNAVDate": 1651942800000
    },
    "isDelete": false
  },
  {
    "id": 30,
    "name": "QUY DAU TU TRAI PHIEU DFVN",
    "shortName": "DFVN-FIX",
    "code": "DFVN-FIX",
    "subCode": null,
    "tradeCode": "DFVNFIX",
    "sipCode": "",
    "price": 10000,
    "nav": 10176.25,
    "lastYearNav": 10106.03,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 200000,
    "buyMaxValue": null,
    "sellMin": 10,
    "sellMinValue": null,
    "holdingMin": 0,
    "instock": null,
    "holdingVolume": 4964.42,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1612371600000,
    "approveAt": 1596772725489,
    "endIssueAt": 1811955600000,
    "maturityAt": null,
    "website": "https://www.dfvn.com.vn/vi",
    "websiteURL": "https://www.dfvn.com.vn/vi",
    "customField": "Phí chuyển đổi quỹ",
    "customValue": "0%",
    "expectedReturn": 0,
    "managementFee": 0.9,
    "performanceFee": 0.9,
    "closedOrderBookAt": "14:45",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "14:45",
    "productTradingSession": {
      "tradingTime": 1652720400000,
      "closedOrderBookTime": 1652687100000,
      "closedBankNoteTime": 1652687100000,
      "tradingTimeString": "17/05/2022",
      "closedOrderBookTimeString": "14:45 16/05/2022",
      "closedBankNoteTimeString": "14:45 16/05/2022"
    },
    "completeTransactionDuration": 4,
    "description": "Qũy đầu tư vào các tài sản có thu nhập cố định có chất lượng tín dụng tốt hướng tới mục tiêu tăng trưởng bền vững trong trung và dài hạn.",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "DFVNFIX",
    "avgAnnualReturn": 1,
    "isTransferred": true,
    "createAt": 1622706569261,
    "updateAt": 1642960149091,
    "productAssetAllocationList": [
      10,
      19
    ],
    "productAssetAllocationModelList": [
      {
        "id": 10,
        "name": "Trái phiếu"
      },
      {
        "id": 19,
        "name": "Chứng khoán khác"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 10,
      "name": "Trái phiếu"
    },
    "productAssetAllocationModel2": {
      "id": 19,
      "name": "Chứng khoán khác"
    },
    "productSupervisoryBankAccount": {
      "name": "QUY DAU TU TRAI PHIEU DFVN",
      "number": "091084939005",
      "bankId": 13,
      "bank": {
        "id": 13,
        "name": "HSBC",
        "shortName": "HSBC",
        "stockName": "HSB",
        "binCode": "458761",
        "swiftCode": null,
        "hsbcCode": "BKHSBC",
        "hsbcDefaultBranchCode": "BRHSBCVN",
        "website": "https://www.hsbc.com.vn/security/",
        "branches": []
      },
      "branch": "Viet Nam",
      "comment": null,
      "productId": 30,
      "agentName": null
    },
    "owner": {
      "id": 3752,
      "encodeURL": "cong-ty-tnhh-mtv-quan-ly-quy-dai-ichi-life-viet-nam_3752",
      "code": "007F02838100888",
      "name": "CÔNG TY TNHH MTV QUẢN LÝ QUỸ DAI-ICHI LIFE VIỆT NAM",
      "userId": 3752,
      "userCode": "007F02838100888",
      "email": "dfvn@dai-ichi-life.com.vn",
      "email2": "fincorp.vn@gmail.com",
      "shortName": "DFVN",
      "address1": "Tầng 11, 149-151 Nguyễn Văn Trỗi, Phường 11, Quận Phú Nhuận, TP HCM, Việt Nam",
      "phone": "0381008888",
      "phonePostal": "84",
      "website": "https://www.dfvn.com.vn",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/836276d7-964d-48a2-a40c-66b19f8f0502.docx",
      "hsbcCode": "DAFMVN",
      "securityDepositoryCenter": {
        "id": 2,
        "code": "HSBC",
        "name": "Trung tâm lưu ký HSBC"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/143ce59d-552c-4187-b32f-f3092dc9eb2e.png",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 18,
      "name": "Thấp - Trung bình"
    },
    "moneyTransferSyntax": {
      "id": 5,
      "name": "[HoTen] [CMND]",
      "syntax": "[HoTen] [CMND]",
      "weight": 4,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 2,
      "name": "Quỹ trái phiếu",
      "code": "BOND"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": 0.27,
      "navToLastYear": 0.69,
      "navToEstablish": 1.4,
      "navTo3Months": 0.52,
      "navTo6Months": 1.04,
      "navTo12Months": 1.74,
      "navTo36Months": null,
      "navToBeginning": 1.76,
      "updateAt": 1652116500500
    },
    "productFeeList": [
      {
        "id": 1984,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1985,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1986,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 3,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 1987,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 3,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2021,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 100000000,
        "fee": 0,
        "destProductId": 29,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 2022,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0,
        "destProductId": 29,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      2
    ],
    "productTransactionDateModelList": [
      "Thứ ba"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "QUY DAU TU TRAI PHIEU DFVN",
        "number": "091084939005",
        "bankId": 13,
        "bank": {
          "id": 13,
          "name": "HSBC",
          "shortName": "HSBC",
          "stockName": "HSB",
          "binCode": "458761",
          "swiftCode": null,
          "hsbcCode": "BKHSBC",
          "hsbcDefaultBranchCode": "BRHSBCVN",
          "website": "https://www.hsbc.com.vn/security/",
          "branches": []
        },
        "branch": "Viet Nam",
        "comment": null,
        "productId": 30,
        "agentName": null
      }
    ],
    "extra": {
      "lastNAV": 10176.25,
      "currentNAV": 10176.25,
      "lastNAVDate": 1650992400000
    },
    "isDelete": false
  },
  {
    "id": 47,
    "name": "QUỸ ĐẦU TƯ GIÁ TRỊ MB CAPITAL",
    "shortName": "MBVF",
    "code": "MBVF",
    "subCode": null,
    "tradeCode": "MBVF",
    "sipCode": "MBVFS005",
    "price": 10000,
    "nav": 17445,
    "lastYearNav": 18850,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 50000,
    "buyMaxValue": null,
    "sellMin": 10,
    "sellMinValue": null,
    "holdingMin": 0,
    "instock": null,
    "holdingVolume": 11063.35,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1398358800000,
    "approveAt": 1644824426390,
    "endIssueAt": 1814893200000,
    "maturityAt": null,
    "website": "https://mbcapital.com.vn/quan-ly-quy/MBVF",
    "websiteURL": "https://mbcapital.com.vn/quan-ly-quy/MBVF",
    "customField": "Phí chuyển đổi",
    "customValue": "0.3%",
    "expectedReturn": 0,
    "managementFee": 1.5,
    "performanceFee": null,
    "closedOrderBookAt": "14:30",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "14:30",
    "productTradingSession": {
      "tradingTime": 1652288400000,
      "closedOrderBookTime": 1652254200000,
      "closedBankNoteTime": 1652254200000,
      "tradingTimeString": "12/05/2022",
      "closedOrderBookTimeString": "14:30 11/05/2022",
      "closedBankNoteTimeString": "14:30 11/05/2022"
    },
    "completeTransactionDuration": 5,
    "description": "Quỹ đầu tư trung và dài hạn vào các cổ phiếu được định giá rẻ so với lợi nhuận hoặc tài sản, nhằm tối ưu hóa hiệu quả đầu tư.",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "MBVFN001",
    "avgAnnualReturn": 0,
    "isTransferred": true,
    "createAt": 1644751268754,
    "updateAt": 1649131559855,
    "productAssetAllocationList": [
      3
    ],
    "productAssetAllocationModelList": [
      {
        "id": 3,
        "name": "Cổ phiếu niêm yết"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 3,
      "name": "Cổ phiếu niêm yết"
    },
    "productAssetAllocationModel2": null,
    "productSupervisoryBankAccount": {
      "name": "QUY DAU TU GIA TRI MB CAPITAL",
      "number": "12210002325026",
      "bankId": 6,
      "bank": {
        "id": 6,
        "name": "BIDV",
        "shortName": "BIDV",
        "stockName": "BID",
        "binCode": "970418",
        "swiftCode": null,
        "hsbcCode": "BKBIDV",
        "hsbcDefaultBranchCode": "BRBIDVVN",
        "website": "https://www.bidv.vn:81/iportalweb/iRetail@1",
        "branches": []
      },
      "branch": "Hà Thành",
      "comment": null,
      "productId": 47,
      "agentName": ""
    },
    "owner": {
      "id": 49227,
      "encodeURL": "cong-ty-co-phan-quan-ly-quy-dau-tu-mb_49227",
      "code": "007F528919505",
      "name": "CONG TY CO PHAN QUAN LY QUY DAU TU MB",
      "userId": 49227,
      "userCode": "007F528919505",
      "email": "fincorp012022@gmail.com",
      "email2": "fincorp012022@gmail.com",
      "shortName": "MBCAPITAL",
      "address1": "Tầng 12, Tòa nhà Số 21 Cát Linh, Phường Cát Linh, Quận Đống Đa, Thành phố Hà Nội",
      "phone": "0528919505",
      "phonePostal": "84",
      "website": "https://mbcapital.com.vn/",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/bbd2060b-b191-4eb9-bbf2-23d98e63731a.docx",
      "hsbcCode": "Khong dung",
      "securityDepositoryCenter": {
        "id": 1,
        "code": "VSD",
        "name": "Trung tâm lưu ký VSD"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/e8e832a5-c0a2-4c56-ac1d-ab10ed1e23da.jpg",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 17,
      "name": "Trung bình-Cao"
    },
    "moneyTransferSyntax": {
      "id": 1,
      "name": "[HoTen] [STK] [MaGD] [DLPP]",
      "syntax": "[HoTen] [STK] [MaGD] [DLPP]",
      "weight": 0,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 1,
      "name": "Quỹ cổ phiếu",
      "code": "STOCK"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": -2.89,
      "navToLastYear": -7.45,
      "navToEstablish": 9.25,
      "navTo3Months": -9.01,
      "navTo6Months": -9.46,
      "navTo12Months": 0.85,
      "navTo36Months": 19.67,
      "navToBeginning": 22.1,
      "updateAt": 1652172974980
    },
    "productFeeList": [
      {
        "id": 4088,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 100000000,
        "fee": 1,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4089,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 1,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4090,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 6,
        "fee": 1,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4091,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 6,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 12,
        "fee": 0.75,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4092,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 12,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 18,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 4093,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 18,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3903,
        "type": "TRANSFER",
        "beginRelationalOperatorId": null,
        "beginRelationalOperator": null,
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 100000000,
        "fee": 0.3,
        "destProductId": 48,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3904,
        "type": "TRANSFER",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": null,
        "endRelationalOperator": null,
        "endVolume": null,
        "fee": 0.3,
        "destProductId": 48,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      1,
      2,
      3,
      4,
      5
    ],
    "productTransactionDateModelList": [
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "QUY DAU TU GIA TRI MB CAPITAL",
        "number": "12210002325026",
        "bankId": 6,
        "bank": {
          "id": 6,
          "name": "BIDV",
          "shortName": "BIDV",
          "stockName": "BID",
          "binCode": "970418",
          "swiftCode": null,
          "hsbcCode": "BKBIDV",
          "hsbcDefaultBranchCode": "BRBIDVVN",
          "website": "https://www.bidv.vn:81/iportalweb/iRetail@1",
          "branches": []
        },
        "branch": "Hà Thành",
        "comment": null,
        "productId": 47,
        "agentName": ""
      }
    ],
    "extra": {
      "lastNAV": 17445,
      "currentNAV": 17445,
      "lastNAVDate": 1652115600000
    },
    "isDelete": false
  },
  {
    "id": 46,
    "name": "QUỸ ĐẦU TƯ CỔ PHIẾU TĂNG TRƯỞNG VCBF",
    "shortName": "VCBF-MGF",
    "code": "VCBFMGF",
    "subCode": null,
    "tradeCode": "VCBFMGF",
    "sipCode": "SIP VCBFMGF",
    "price": 10000,
    "nav": 10080.06,
    "lastYearNav": 9995.53,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 5000000,
    "buyMaxValue": null,
    "sellMin": 100,
    "sellMinValue": null,
    "holdingMin": 0,
    "instock": null,
    "holdingVolume": 1280937.16,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1635440400000,
    "approveAt": 1639380185614,
    "endIssueAt": 1814893200000,
    "maturityAt": null,
    "website": "https://www.vcbf.com/quy-mo/cac-quy-mo/quy-dau-tu-co-phieu-hang-dau-vcbf/",
    "websiteURL": "https://www.vcbf.com/quy-mo/cac-quy-mo/quy-dau-tu-co-phieu-hang-dau-vcbf/",
    "customField": "Phí chuyển đổi",
    "customValue": "0%",
    "expectedReturn": 0,
    "managementFee": 1.9,
    "performanceFee": null,
    "closedOrderBookAt": "14:00",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "14:00",
    "productTradingSession": {
      "tradingTime": 1652806800000,
      "closedOrderBookTime": 1652770800000,
      "closedBankNoteTime": 1652770800000,
      "tradingTimeString": "18/05/2022",
      "closedOrderBookTimeString": "14:00 17/05/2022",
      "closedBankNoteTimeString": "14:00 17/05/2022"
    },
    "completeTransactionDuration": 5,
    "description": "VCBF-MGF là quỹ mở cổ phiếu với mục tiêu đầu tư chính của Quỹ là tăng trưởng tài sản đầu tư trong trung và dài hạn.",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "VCBFMGFN001",
    "avgAnnualReturn": 1,
    "isTransferred": true,
    "createAt": 1639379606054,
    "updateAt": 1642960149091,
    "productAssetAllocationList": [
      16,
      3
    ],
    "productAssetAllocationModelList": [
      {
        "id": 16,
        "name": "Cổ phiếu Bluechip"
      },
      {
        "id": 3,
        "name": "Cổ phiếu niêm yết"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 16,
      "name": "Cổ phiếu Bluechip"
    },
    "productAssetAllocationModel2": {
      "id": 3,
      "name": "Cổ phiếu niêm yết"
    },
    "productSupervisoryBankAccount": {
      "name": "Quỹ Đầu tư Cổ phiếu Tăng trưởng VCBF",
      "number": "90435313709",
      "bankId": 14,
      "bank": {
        "id": 14,
        "name": "Standard Chartered",
        "shortName": "Standard Chartered",
        "stockName": "SCB",
        "binCode": "970410",
        "swiftCode": null,
        "hsbcCode": "BKSCVN",
        "hsbcDefaultBranchCode": "BRSCVNVN",
        "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
        "branches": []
      },
      "branch": "Hội sở chính",
      "comment": null,
      "productId": 46,
      "agentName": null
    },
    "owner": {
      "id": 6859,
      "encodeURL": "cong-ty-lien-doanh-quan-ly-quy-dau-tu-chung-khoan-vietcombank_6859",
      "code": "007F907057977",
      "name": "CÔNG TY LIÊN DOANH QUẢN LÝ QUỸ ĐẦU TƯ CHỨNG KHOÁN VIETCOMBANK",
      "userId": 6859,
      "userCode": "007F907057977",
      "email": "fincorp082018@gmail.com",
      "email2": "fincorp.vn@gmail.com",
      "shortName": "VCBF",
      "address1": "Tầng 15, Tòa nhà Vietcombank, 198 Trần Quang Khải, Hoàn Kiếm,  TP. Hà Nội",
      "phone": "0907057977",
      "phonePostal": "84",
      "website": "https://www.vcbf.com/",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/9951d5bd-00cb-48a1-8bbb-1151776bc352.docx",
      "hsbcCode": "vcbf vsd",
      "securityDepositoryCenter": {
        "id": 1,
        "code": "VSD",
        "name": "Trung tâm lưu ký VSD"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/00d8dfc1-c087-420d-991b-b2765052aa6d.png",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 3,
      "name": "Cao"
    },
    "moneyTransferSyntax": {
      "id": 3,
      "name": "[STK] [HoTen] [MaGD] [DLPP]",
      "syntax": "[STK] [HoTen] [MaGD] [DLPP]",
      "weight": 2,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 1,
      "name": "Quỹ cổ phiếu",
      "code": "STOCK"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": 0.89,
      "navToLastYear": 0.85,
      "navToEstablish": 1.51,
      "navTo3Months": 0.31,
      "navTo6Months": 0.8,
      "navTo12Months": null,
      "navTo36Months": null,
      "navToBeginning": 0.8,
      "updateAt": 1652116500660
    },
    "productFeeList": [
      {
        "id": 3654,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 1000000000,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3655,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 1000000000,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 5000000000,
        "fee": 0.3,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3656,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 5000000000,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3657,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 12,
        "fee": 2,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3658,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 12,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": 24,
        "fee": 0.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3659,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 24,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 0,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      3
    ],
    "productTransactionDateModelList": [
      "Thứ tư"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "Quỹ Đầu tư Cổ phiếu Tăng trưởng VCBF",
        "number": "90435313709",
        "bankId": 14,
        "bank": {
          "id": 14,
          "name": "Standard Chartered",
          "shortName": "Standard Chartered",
          "stockName": "SCB",
          "binCode": "970410",
          "swiftCode": null,
          "hsbcCode": "BKSCVN",
          "hsbcDefaultBranchCode": "BRSCVNVN",
          "website": "https://vn.online.standardchartered.com/login/IBank?ser=100&act=MainFrame_VN.jsp&ccode=VN&isSecured=false&countryCode=VN&cntryCode=VN",
          "branches": []
        },
        "branch": "Hội sở chính",
        "comment": null,
        "productId": 46,
        "agentName": null
      }
    ],
    "extra": {
      "lastNAV": 10080.06,
      "currentNAV": 10080.06,
      "lastNAVDate": 1651597200000
    },
    "isDelete": false
  },
  {
    "id": 41,
    "name": "QUỸ ĐẦU TƯ CỔ PHIẾU TĂNG TRƯỞNG BALLAD VIỆT NAM",
    "shortName": "TBLF",
    "code": "TBLF",
    "subCode": null,
    "tradeCode": "nop tien mua TBLF",
    "sipCode": "SIP TBLF",
    "price": 10000,
    "nav": 9248.29,
    "lastYearNav": 10019.98,
    "buyMin": null,
    "buyMax": null,
    "buyMinValue": 10000000,
    "buyMaxValue": null,
    "sellMin": 10,
    "sellMinValue": null,
    "holdingMin": 100,
    "instock": null,
    "holdingVolume": 4117202.03,
    "issueVolume": null,
    "issueValue": null,
    "firstIssueAt": 1632934800000,
    "approveAt": 1633092642089,
    "endIssueAt": 1814893200000,
    "maturityAt": null,
    "website": "https://sgicapital.com.vn/",
    "websiteURL": "https://sgicapital.com.vn/",
    "customField": "",
    "customValue": "",
    "expectedReturn": 0,
    "managementFee": 1.5,
    "performanceFee": 1,
    "closedOrderBookAt": "14:30",
    "closedOrderBookShiftDay": -1,
    "closedBankNote": "14:30",
    "productTradingSession": {
      "tradingTime": 1652720400000,
      "closedOrderBookTime": 1652686200000,
      "closedBankNoteTime": 1652686200000,
      "tradingTimeString": "17/05/2022",
      "closedOrderBookTimeString": "14:30 16/05/2022",
      "closedBankNoteTimeString": "14:30 16/05/2022"
    },
    "completeTransactionDuration": 4,
    "description": "Quỹ Ballad Việt Nam hướng tới mục tiêu lợi nhuận vượt trội nhờ phân bổ tập trung vào những cổ phiếu hàng đầu có lợi thế cạnh tranh mạnh mẽ.",
    "balance": 0,
    "feeBalance": 0,
    "vsdFeeId": "TBLFN001",
    "avgAnnualReturn": -4,
    "isTransferred": true,
    "createAt": 1633092436552,
    "updateAt": 1642960149091,
    "productAssetAllocationList": [
      3
    ],
    "productAssetAllocationModelList": [
      {
        "id": 3,
        "name": "Cổ phiếu niêm yết"
      }
    ],
    "productAssetAllocationModel1": {
      "id": 3,
      "name": "Cổ phiếu niêm yết"
    },
    "productAssetAllocationModel2": null,
    "productSupervisoryBankAccount": {
      "name": "QUY DAU TU CO PHIEU TANG TRUONG BALLAD VIET NAM",
      "number": "11910000498733",
      "bankId": 6,
      "bank": {
        "id": 6,
        "name": "BIDV",
        "shortName": "BIDV",
        "stockName": "BID",
        "binCode": "970418",
        "swiftCode": null,
        "hsbcCode": "BKBIDV",
        "hsbcDefaultBranchCode": "BRBIDVVN",
        "website": "https://www.bidv.vn:81/iportalweb/iRetail@1",
        "branches": []
      },
      "branch": "Nam Kỳ Khởi Nghĩa",
      "comment": null,
      "productId": 41,
      "agentName": null
    },
    "owner": {
      "id": 20030,
      "encodeURL": "cong-ty-co-phan-quan-ly-quy-dau-tu-sgi_20030",
      "code": "007F909053966",
      "name": "CONG TY CO PHAN QUAN LY QUY DAU TU SGI",
      "userId": 20030,
      "userCode": "007F909053966",
      "email": "fincorp032018@gmail.com",
      "email2": "fincorp.vn@gmail.com",
      "shortName": "SGIC",
      "address1": "Tầng 2, Tòa nhà The Terra, 83 Hào Nam, Phường Ô Chợ Dừa, Quận Đống Đa, Hà Nội",
      "phone": "0909053966",
      "phonePostal": "84",
      "website": "https://sgicapital.com.vn/",
      "templateContract": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/admin/c71ae83e-e3b4-4206-b5c2-645504b440ea.docx",
      "hsbcCode": "SGI ",
      "securityDepositoryCenter": {
        "id": 1,
        "code": "VSD",
        "name": "Trung tâm lưu ký VSD"
      },
      "avatarUrl": "https://s3-ap-southeast-1.amazonaws.com/fmarket-upload/pro/temp/d3ec604f-3532-4196-a89b-d40a385649db.png",
      "isEnableEsign": true,
      "userSocials": []
    },
    "type": "TRADING_FUND",
    "status": "PRODUCT_ACTIVE",
    "riskLevel": {
      "id": 17,
      "name": "Trung bình-Cao"
    },
    "moneyTransferSyntax": {
      "id": 1,
      "name": "[HoTen] [STK] [MaGD] [DLPP]",
      "syntax": "[HoTen] [STK] [MaGD] [DLPP]",
      "weight": 0,
      "isEnable": true
    },
    "fundType": {
      "id": 1,
      "name": "Quỹ mở"
    },
    "dataFundAssetType": {
      "id": 1,
      "name": "Quỹ cổ phiếu",
      "code": "STOCK"
    },
    "productBond": null,
    "productCD": null,
    "productNavChange": {
      "navToPrevious": -9.01,
      "navToLastYear": -7.7,
      "navToEstablish": -12.36,
      "navTo3Months": -10.52,
      "navTo6Months": -8.43,
      "navTo12Months": null,
      "navTo36Months": null,
      "navToBeginning": -7.52,
      "updateAt": 1652169901858
    },
    "productFeeList": [
      {
        "id": 3568,
        "type": "BUY",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 100000000,
        "fee": 1.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3569,
        "type": "BUY",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 100000000,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 1.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3570,
        "type": "SELL",
        "beginRelationalOperatorId": 1,
        "beginRelationalOperator": {
          "id": 1,
          "code": ">",
          "name": ">",
          "revertName": "<",
          "direction": 0,
          "symmetry": {
            "id": 4,
            "code": "<=",
            "name": "<=",
            "revertName": ">=",
            "direction": 1,
            "symmetry": null,
            "weight": 3
          },
          "weight": 0
        },
        "beginVolume": 0,
        "endRelationalOperatorId": 2,
        "endRelationalOperator": {
          "id": 2,
          "code": "<",
          "name": "<",
          "revertName": ">",
          "direction": 1,
          "symmetry": {
            "id": 3,
            "code": ">=",
            "name": ">=",
            "revertName": "<=",
            "direction": 0,
            "symmetry": null,
            "weight": 2
          },
          "weight": 1
        },
        "endVolume": 6,
        "fee": 1.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      },
      {
        "id": 3571,
        "type": "SELL",
        "beginRelationalOperatorId": 3,
        "beginRelationalOperator": {
          "id": 3,
          "code": ">=",
          "name": ">=",
          "revertName": "<=",
          "direction": 0,
          "symmetry": {
            "id": 2,
            "code": "<",
            "name": "<",
            "revertName": ">",
            "direction": 1,
            "symmetry": null,
            "weight": 1
          },
          "weight": 2
        },
        "beginVolume": 6,
        "endRelationalOperatorId": 4,
        "endRelationalOperator": {
          "id": 4,
          "code": "<=",
          "name": "<=",
          "revertName": ">=",
          "direction": 1,
          "symmetry": {
            "id": 1,
            "code": ">",
            "name": ">",
            "revertName": "<",
            "direction": 0,
            "symmetry": null,
            "weight": 0
          },
          "weight": 3
        },
        "endVolume": null,
        "fee": 1.5,
        "destProductId": null,
        "fromDate": null,
        "toDate": null,
        "note": null
      }
    ],
    "productFeeDiscountList": [],
    "productTransactionDateList": [
      2
    ],
    "productTransactionDateModelList": [
      "Thứ ba"
    ],
    "productSupervisoryBankAccountList": [
      {
        "name": "QUY DAU TU CO PHIEU TANG TRUONG BALLAD VIET NAM",
        "number": "11910000498733",
        "bankId": 6,
        "bank": {
          "id": 6,
          "name": "BIDV",
          "shortName": "BIDV",
          "stockName": "BID",
          "binCode": "970418",
          "swiftCode": null,
          "hsbcCode": "BKBIDV",
          "hsbcDefaultBranchCode": "BRBIDVVN",
          "website": "https://www.bidv.vn:81/iportalweb/iRetail@1",
          "branches": []
        },
        "branch": "Nam Kỳ Khởi Nghĩa",
        "comment": null,
        "productId": 41,
        "agentName": null
      }
    ],
    "extra": {
      "lastNAV": 9248.29,
      "currentNAV": 9248.29,
      "lastNAVDate": 1652029200000
    },
    "isDelete": false
  }
]

export const locationsPopular = [
  {
    value: 'Hồ Chí Minh',
  },
  {
    value: 'Hà Nội',
  },
  {
    value: 'Đà Nẵng',
  },
  {
    value: 'Bình Dương',
    keywords: 'BD',
  },
  {
    value: 'Đồng Nai',
    keywords: 'DN',
  },
  {
    value: 'Khánh Hòa',
    keywords: 'KH',
  },
  {
    value: 'Hải Phòng',
    keywords: 'HP',
  },
  {
    value: 'Cần Thơ',
    keywords: 'CT',
  },
]

export const locations = [
  {
    value: 'Hồ Chí Minh',
    keywords: 'HCM',
    type: 1,
    isPopular: true,
  },
  {
    value: 'Quận 1',
    keywords: 'Q1',
    type: 2
  },
  {
    value: 'Quận 2',
    keywords: 'Q2',
    type: 2
  },
  {
    value: 'Quận 3',
    keywords: 'Q3',
    type: 2
  },
  {
    value: 'Quận 4',
    keywords: 'Q4',
    type: 2
  },
  {
    value: 'Quận 5',
    keywords: 'Q5',
    type: 2
  },
  {
    value: 'Quận 6',
    keywords: 'Q6',
    type: 2
  },
  {
    value: 'Quận 7',
    keywords: 'Q7',
    type: 2
  },
  {
    value: 'Quận 8',
    keywords: 'Q8',
    type: 2
  },
  {
    value: 'Quận 9',
    keywords: 'Q9',
    type: 2
  },
  {
    value: 'Quận 10',
    keywords: 'Q10',
    type: 2
  },
  {
    value: 'Quận 11',
    keywords: 'Q11',
    type: 2
  },
  {
    value: 'Quận 12',
    keywords: 'Q12',
    type: 2
  },
  {
    value: 'Bình Tân',
    keywords: 'BT',
    type: 2
  },
  {
    value: 'Bình Thạnh',
    keywords: 'BT',
    type: 2
  },
  {
    value: 'Gò Vấp',
    keywords: 'GV',
    type: 2
  },
  {
    value: 'Phú Nhuận',
    keywords: 'PN',
    type: 2
  },
  {
    value: 'Tân Bình',
    keywords: 'TB',
    type: 2
  },
  {
    value: 'Tân Phú',
    keywords: 'TP',
    type: 2
  },
  {
    value: 'Thủ Đức',
    keywords: 'TD',
    type: 2
  },
  {
    value: 'Bình Chánh',
    keywords: 'BC',
    type: 2
  },
  {
    value: 'Cần Giờ',
    keywords: 'CG',
    type: 2
  },
  {
    value: 'Củ Chi',
    keywords: 'CC',
    type: 2
  },
  {
    value: 'Hóc Môn',
    keywords: 'HM',
    type: 2
  },
  {
    value: 'Nhà Bè',
    keywords: 'NB',
    type: 2
  },
  {
    value: 'Hà Nội',
    keywords: 'HN',
    type: 1,
    isPopular: true,
  },
  {
    value: 'Hoàn Kiếm',
    keywords: 'HK',
    type: 2
  },
  {
    value: 'Ba Đình',
    keywords: 'BD',
    type: 2
  },
  {
    value: 'Đống Đa',
    keywords: 'DD',
    type: 2
  },
  {
    value: 'Hai Bà Trưng',
    keywords: 'HBT',
    type: 2
  },
  {
    value: 'Thanh Xuân',
    keywords: 'TX',
    type: 2
  },
  {
    value: 'Tây Hồ',
    keywords: 'TH',
    type: 2
  },
  {
    value: 'Cầu Giấy',
    keywords: 'CG',
    type: 2
  },
  {
    value: 'Hoàng Mai',
    keywords: 'HM',
    type: 2
  },
  {
    value: 'Long Biên',
    keywords: 'LB',
    type: 2
  },
  {
    value: 'Đông Anh',
    keywords: 'DA',
    type: 2
  },
  {
    value: 'Gia Lâm',
    keywords: 'GL',
    type: 2
  },
  {
    value: 'Sóc Sơn',
    keywords: 'SS',
    type: 2
  },
  {
    value: 'Thanh Trì',
    keywords: 'TT',
    type: 2
  },
  {
    value: 'Nam Từ Liêm',
    keywords: 'NTL',
    type: 2
  },
  {
    value: 'Hà Đông',
    keywords: 'HD',
    type: 2
  },
  {
    value: 'Sơn Tây',
    keywords: 'ST',
    type: 2
  },
  {
    value: 'Mê Linh',
    keywords: 'ML',
    type: 2
  },
  {
    value: 'Ba Vì',
    keywords: 'BV',
    type: 2
  },
  {
    value: 'Phúc Thọ',
    keywords: 'PT',
    type: 2
  },
  {
    value: 'Đan Phượng',
    keywords: 'DP',
    type: 2
  },
  {
    value: 'Hoài Đức',
    keywords: 'HD',
    type: 2
  },
  {
    value: 'Quốc Oai',
    keywords: 'QO',
    type: 2
  },
  {
    value: 'Thạch Thất',
    keywords: 'TT',
    type: 2
  },
  {
    value: 'Chương Mỹ',
    keywords: 'CM',
    type: 2
  },
  {
    value: 'Thanh Oai',
    keywords: 'TO',
    type: 2
  },
  {
    value: 'Thường Tín',
    keywords: 'TT',
    type: 2
  },
  {
    value: 'Phú Xuyên',
    keywords: 'PX',
    type: 2
  },
  {
    value: 'Ứng Hòa',
    keywords: 'UH',
    type: 2
  },
  {
    value: 'Mỹ Đức',
    keywords: 'MD',
    type: 2
  },
  {
    value: 'Bắc Từ Liêm',
    keywords: 'BTL',
    type: 2
  },
  {
    value: 'Đà Nẵng',
    keywords: 'DN',
    type: 1,
    isPopular: true,
  },
  {
    value: 'Cẩm Lệ',
    keywords: 'CL',
    type: 2
  },
  {
    value: 'Hải Châu',
    keywords: 'HC',
    type: 2
  },
  {
    value: 'Liên Chiểu',
    keywords: 'LC',
    type: 2
  },
  {
    value: 'Ngũ Hành Sơn',
    keywords: 'NHS',
    type: 2
  },
  {
    value: 'Sơn Trà',
    keywords: 'ST',
    type: 2
  },
  {
    value: 'Thanh Khê',
    keywords: 'TK',
    type: 2
  },
  {
    value: 'Hòa Vang',
    keywords: 'HV',
    type: 2
  },
  {
    value: 'Hoàng Sa',
    keywords: 'HS',
    type: 2
  },
  {
    value: 'Bình Dương',
    keywords: 'BD',
    type: 1,
    isPopular: true,
  },
  {
    value: 'Bến Cát',
    keywords: 'BC',
    type: 2
  },
  {
    value: 'Dầu Tiếng',
    keywords: 'DT',
    type: 2
  },
  {
    value: 'Dĩ An',
    keywords: 'DA',
    type: 2
  },
  {
    value: 'Phú Giáo',
    keywords: 'PG',
    type: 2
  },
  {
    value: 'Tân Uyên',
    keywords: 'TU',
    type: 2
  },
  {
    value: 'Thuận An',
    keywords: 'TA',
    type: 2
  },
  {
    value: 'Thủ Dầu Một',
    keywords: 'TDM',
    type: 2
  },
  {
    value: 'Bàu Bàng',
    keywords: 'BB',
    type: 2
  },
  {
    value: 'Đồng Nai',
    keywords: 'DN',
    type: 1,
    isPopular: true,
  },
  {
    value: 'Cẩm Mỹ',
    keywords: 'CM',
    type: 2
  },
  {
    value: 'Định Quán',
    keywords: 'DQ',
    type: 2
  },
  {
    value: 'Long Thành',
    keywords: 'LT',
    type: 2
  },
  {
    value: 'Nhơn Trạch',
    keywords: 'NT',
    type: 2
  },
  {
    value: 'Tân Phú',
    keywords: 'TP',
    type: 2
  },
  {
    value: 'Thống Nhất',
    keywords: 'TN',
    type: 2
  },
  {
    value: 'Trảng Bom',
    keywords: 'TB',
    type: 2
  },
  {
    value: 'Vĩnh Cửu',
    keywords: 'VC',
    type: 2
  },
  {
    value: 'Xuân Lộc',
    keywords: 'XL',
    type: 2
  },
  {
    value: 'Biên Hòa',
    keywords: 'BH',
    type: 2
  },
  {
    value: 'Long Khánh',
    keywords: 'LK',
    type: 2
  },
  {
    value: 'Khánh Hòa',
    keywords: 'KH',
    type: 1,
    isPopular: true,
  },
  {
    value: 'Cam Lâm',
    keywords: 'CL',
    type: 2
  },
  {
    value: 'Diên Khánh',
    keywords: 'DK',
    type: 2
  },
  {
    value: 'Khánh Sơn',
    keywords: 'KS',
    type: 2
  },
  {
    value: 'Khánh Vĩnh',
    keywords: 'KV',
    type: 2
  },
  {
    value: 'Ninh Hòa',
    keywords: 'NH',
    type: 2
  },
  {
    value: 'Trường Sa',
    keywords: 'TS',
    type: 2
  },
  {
    value: 'Vạn Ninh',
    keywords: 'VN',
    type: 2
  },
  {
    value: 'Nha Trang',
    keywords: 'NT',
    type: 2
  },
  {
    value: 'Cam Ranh',
    keywords: 'CR',
    type: 2
  },
  {
    value: 'Hải Phòng',
    keywords: 'HP',
    type: 1
  },
  {
    value: 'Đồ Sơn',
    keywords: 'DS',
    type: 2
  },
  {
    value: 'Dương Kinh',
    keywords: 'DK',
    type: 2
  },
  {
    value: 'Hải An',
    keywords: 'HA',
    type: 2
  },
  {
    value: 'Hồng Bàng',
    keywords: 'HB',
    type: 2
  },
  {
    value: 'Kiến An',
    keywords: 'KA',
    type: 2
  },
  {
    value: 'Lê Chân',
    keywords: 'LC',
    type: 2
  },
  {
    value: 'Ngô Quyền',
    keywords: 'NQ',
    type: 2
  },
  {
    value: 'An Dương',
    keywords: 'AD',
    type: 2
  },
  {
    value: 'An Lão',
    keywords: 'AL',
    type: 2
  },
  {
    value: 'Bạch Long Vĩ',
    keywords: 'BLV',
    type: 2
  },
  {
    value: 'Cát Hải',
    keywords: 'CH',
    type: 2
  },
  {
    value: 'Kiến Thụy',
    keywords: 'KT',
    type: 2
  },
  {
    value: 'Thủy Nguyên',
    keywords: 'TN',
    type: 2
  },
  {
    value: 'Tiên Lãng',
    keywords: 'TL',
    type: 2
  },
  {
    value: 'Vĩnh Bảo',
    keywords: 'VB',
    type: 2
  },
  {
    value: 'Cần Thơ',
    keywords: 'CT',
    type: 1,
    isPopular: true,
  },
  {
    value: 'Cờ Đỏ',
    keywords: 'CD',
    type: 2
  },
  {
    value: 'Phong Điền',
    keywords: 'PD',
    type: 2
  },
  {
    value: 'Thốt Nốt',
    keywords: 'TN',
    type: 2
  },
  {
    value: 'Vĩnh Thạnh',
    keywords: 'VT',
    type: 2
  },
  {
    value: 'Bình Thủy',
    keywords: 'BT',
    type: 2
  },
  {
    value: 'Cái Răng',
    keywords: 'CR',
    type: 2
  },
  {
    value: 'Ninh Kiều',
    keywords: 'NK',
    type: 2
  },
  {
    value: 'Ô Môn',
    keywords: 'OM',
    type: 2
  },
  {
    value: 'Thới Lai',
    keywords: 'TL',
    type: 2
  },
  {
    value: 'Long An',
    keywords: 'LA',
    type: 1
  },
  {
    value: 'Quảng Nam',
    keywords: 'QN',
    type: 1
  },
  {
    value: 'Bà Rịa Vũng Tàu',
    keywords: 'BRVT',
    type: 1
  },
  {
    value: 'Đắk Lắk',
    keywords: 'DL',
    type: 1
  },
  {
    value: 'Bình Thuận',
    keywords: 'BT',
    type: 1
  },
  {
    value: 'Lâm Đồng',
    keywords: 'LD',
    type: 1
  },
  {
    value: 'Thừa Thiên Huế',
    keywords: 'TTH',
    type: 1
  },
  {
    value: 'Kiên Giang',
    keywords: 'KG',
    type: 1
  },
  {
    value: 'Bắc Ninh',
    keywords: 'BN',
    type: 1
  },
  {
    value: 'Quảng Ninh',
    keywords: 'QN',
    type: 1
  },
  {
    value: 'Thanh Hóa',
    keywords: 'TH',
    type: 1
  },
  {
    value: 'Nghệ An',
    keywords: 'NA',
    type: 1
  },
  {
    value: 'Hải Dương',
    keywords: 'HD',
    type: 1
  },
  {
    value: 'Gia Lai',
    keywords: 'GL',
    type: 1
  },
  {
    value: 'Bình Phước',
    keywords: 'BP',
    type: 1
  },
  {
    value: 'Hưng Yên',
    keywords: 'HY',
    type: 1
  },
  {
    value: 'Bình Định',
    keywords: 'BD',
    type: 1
  },
  {
    value: 'Tiền Giang',
    keywords: 'TG',
    type: 1
  },
  {
    value: 'Thái Bình',
    keywords: 'TB',
    type: 1
  },
  {
    value: 'Bắc Giang',
    keywords: 'BG',
    type: 1
  },
  {
    value: 'Hòa Bình',
    keywords: 'HB',
    type: 1
  },
  {
    value: 'An Giang',
    keywords: 'AG',
    type: 1
  },
  {
    value: 'Vĩnh Phúc',
    keywords: 'VP',
    type: 1
  },
  {
    value: 'Tây Ninh',
    keywords: 'TN',
    type: 1
  },
  {
    value: 'Thái Nguyên',
    keywords: 'TN',
    type: 1
  },
  {
    value: 'Lào Cai',
    keywords: 'LC',
    type: 1
  },
  {
    value: 'Nam Định',
    keywords: 'ND',
    type: 1
  },
  {
    value: 'Quảng Ngãi',
    keywords: 'QN',
    type: 1
  },
  {
    value: 'Bến Tre',
    keywords: 'BT',
    type: 1
  },
  {
    value: 'Đắk Nông',
    keywords: 'DN',
    type: 1
  },
  {
    value: 'Cà Mau',
    keywords: 'CM',
    type: 1
  },
  {
    value: 'Vĩnh Long',
    keywords: 'VL',
    type: 1
  },
  {
    value: 'Ninh Bình',
    keywords: 'NB',
    type: 1
  },
  {
    value: 'Phú Thọ',
    keywords: 'PT',
    type: 1
  },
  {
    value: 'Ninh Thuận',
    keywords: 'NT',
    type: 1
  },
  {
    value: 'Phú Yên',
    keywords: 'PY',
    type: 1
  },
  {
    value: 'Hà Nam',
    keywords: 'HN',
    type: 1
  },
  {
    value: 'Hà Tĩnh',
    keywords: 'HT',
    type: 1
  },
  {
    value: 'Đồng Tháp',
    keywords: 'DT',
    type: 1
  },
  {
    value: 'Sóc Trăng',
    keywords: 'ST',
    type: 1
  },
  {
    value: 'Kon Tum',
    keywords: 'KT',
    type: 1
  },
  {
    value: 'Quảng Bình',
    keywords: 'QB',
    type: 1
  },
  {
    value: 'Quảng Trị',
    keywords: 'QT',
    type: 1
  },
  {
    value: 'Trà Vinh',
    keywords: 'TV',
    type: 1
  },
  {
    value: 'Hậu Giang',
    keywords: 'HG',
    type: 1
  },
  {
    value: 'Sơn La',
    keywords: 'SL',
    type: 1
  },
  {
    value: 'Bạc Liêu',
    keywords: 'BL',
    type: 1
  },
  {
    value: 'Yên Bái',
    keywords: 'YB',
    type: 1
  },
  {
    value: 'Tuyên Quang',
    keywords: 'TQ',
    type: 1
  },
  {
    value: 'Điện Biên',
    keywords: 'DB',
    type: 1
  },
  {
    value: 'Lai Châu',
    keywords: 'LC',
    type: 1
  },
  {
    value: 'Lạng Sơn',
    keywords: 'LS',
    type: 1
  },
  {
    value: 'Hà Giang',
    keywords: 'HG',
    type: 1
  },
  {
    value: 'Bắc Cạn',
    keywords: 'BC',
    type: 1
  },
  {
    value: 'Cao Bằng',
    keywords: 'CB',
    type: 1
  },
]
export const getLocation = (value) => {
  const item = locations.find(item => item.value === value);
  return item;
}

export const keywords = [
  {
    value: 1,
    name: 'Nhân viên kinh doanh',
  },
  {
    value: 2,
    name: 'Bán hàng',
  },
  {
    value: 2,
    name: 'Xây dựng',
  },
  {
    value: 2,
    name: 'Kỹ thuật',
  },
  {
    value: 2,
    name: 'Chế tạo',
  },
  {
    value: 2,
    name: 'Tiếp thị',
  },
  {
    value: 2,
    name: 'Dịch vụ khách hàng',
  },
  {
    value: 2,
    name: 'Tài chính',
  },
  {
    value: 2,
    name: 'Việc làm thêm',
  },
  {
    value: 2,
    name: 'Việc làm bán thời gian',
  },
]

export const whatsIncludedCreates = [
  { 
    href: '/features/online-courses',
    title: 'Online Courses',
    icon: <FontAwesomeIcon
      icon={faVideo}
      size="2x"
      color={process.env.NEXT_PUBLIC_PRIMARY_COLOR}
    />,
    icon1x: <FontAwesomeIcon
      icon={faVideo}
      size="1x"
      color={process.env.NEXT_PUBLIC_PRIMARY_COLOR}
    />,
    description: 'Your knowledge is worth more with online courses',
    titleShort: 'Online Courses',
    descriptionShort: 'Your knowledge is worth more with online courses',
  },
  { 
    href: '/features/coaching',
    title: 'Coaching',
    icon: <FontAwesomeIcon
      icon={faChalkboardTeacher}
      size="2x"
      color={process.env.NEXT_PUBLIC_PRIMARY_COLOR}
    />,
    icon1x: <FontAwesomeIcon
      icon={faChalkboardTeacher}
      size="1x"
      color={process.env.NEXT_PUBLIC_PRIMARY_COLOR}
    />,
    description: 'Coaches earn more with Kajabi’s all-in-one platform',
    titleShort: 'Coaching',
    descriptionShort: 'Coaches earn more with Kajabi’s all-in-one platform',
  },
  { 
    href: '/features/podcasts',
    title: 'Podcasts',
    icon: <FontAwesomeIcon
      icon={faPodcast}
      size="2x"
      color={process.env.NEXT_PUBLIC_PRIMARY_COLOR}
    />,
    icon1x: <FontAwesomeIcon
      icon={faPodcast}
      size="1x"
      color={process.env.NEXT_PUBLIC_PRIMARY_COLOR}
    />,
    description: 'Profitable podcasts made easy',
    titleShort: 'Podcasts',
    descriptionShort: 'Profitable podcasts made easy',
  },
  { 
    href: '/features/membership',
    title: 'Membership',
    icon: <FontAwesomeIcon
      icon={faPeopleCarry}
      size="2x"
      color={process.env.NEXT_PUBLIC_PRIMARY_COLOR}
    />,
    icon1x: <FontAwesomeIcon
      icon={faPeopleCarry}
      size="1x"
      color={process.env.NEXT_PUBLIC_PRIMARY_COLOR}
    />,
    description: 'Membership management software simplified',
    titleShort: 'Membership',
    descriptionShort: 'Membership management software simplified',
  },
  
  { 
    href: '/features/communities',
    title: 'Communities',
    icon: <FontAwesomeIcon
      icon={faUsers}
      size="2x"
      color={process.env.NEXT_PUBLIC_PRIMARY_COLOR}
    />,
    icon1x: <FontAwesomeIcon
      icon={faUsers}
      size="1x"
      color={process.env.NEXT_PUBLIC_PRIMARY_COLOR}
    />,
    description: 'Everything you need to build and monetize a thriving community',
    titleShort: 'Communities',
    descriptionShort: 'Everything you need to build and monetize a thriving community',
  },
  { 
    //href: '/features/sales',
    title: 'Shopping Cart (comming soon)',
    icon: <FontAwesomeIcon
      icon={faRocket}
      size="2x"
      color={process.env.NEXT_PUBLIC_PRIMARY_COLOR}
    />,
    icon1x: <FontAwesomeIcon
      icon={faRocket}
      size="1x"
      color={process.env.NEXT_PUBLIC_PRIMARY_COLOR}
    />,
    description: 'Convert Your Visitors Into Paying Customers and Referral',
    titleShort: 'Sales, Referrals, MLM',
    descriptionShort: 'Convert Your Visitors Into Paying Customers and Referral',
  },
];

export const whatsIncludedManages = [
  { 
    href: '/features/payments',
    title: 'Payments',
    icon: <FontAwesomeIcon
      icon={faMoneyCheck}
      size="2x"
      color={process.env.NEXT_PUBLIC_PRIMARY_COLOR}
    />,
    icon1x: <FontAwesomeIcon
      icon={faMoneyCheck}
      size="1x"
      color={process.env.NEXT_PUBLIC_PRIMARY_COLOR}
    />,
    description: 'Easy payment gateways. Get paid on your terms',
    titleShort: 'Payments',
    descriptionShort: 'Easy payment gateways. Get paid on your terms',
  },
  { 
    href: '/features/contacts',
    title: 'Contacts',
    icon: <FontAwesomeIcon
      icon={faMagnet}
      size="2x"
      color={process.env.NEXT_PUBLIC_PRIMARY_COLOR}
    />,
    icon1x: <FontAwesomeIcon
      icon={faMagnet}
      size="1x"
      color={process.env.NEXT_PUBLIC_PRIMARY_COLOR}
    />,
    description: 'CRM that deepens your customer relationships with less effort',
    titleShort: 'Contacts',
    descriptionShort: 'CRM that deepens your customer relationships with less effort',
  },
  { 
    href: '/features/analytics',
    title: 'Analytics',
    icon: <FontAwesomeIcon
      icon={faChartBar}
      size="2x"
      color={process.env.NEXT_PUBLIC_PRIMARY_COLOR}
    />,
    icon1x: <FontAwesomeIcon
      icon={faChartBar}
      size="1x"
      color={process.env.NEXT_PUBLIC_PRIMARY_COLOR}
    />,
    description: 'Smarter reports, smarter business decisions',
    titleShort: 'Analytics',
    descriptionShort: 'Smarter reports, smarter business decisions',
  },
];

export const whatsIncludedGrows = [
  { 
    href: '/features/funnels',
    title: 'Sales Funnels',
    icon: <FontAwesomeIcon
      icon={faFunnelDollar}
      size="2x"
      color={process.env.NEXT_PUBLIC_PRIMARY_COLOR}
    />,
    icon1x: <FontAwesomeIcon
      icon={faFunnelDollar}
      size="1x"
      color={process.env.NEXT_PUBLIC_PRIMARY_COLOR}
    />,
    description: `Put the “fun” back in funnels. It’s easy to automate and scale with AppFunnel's proven, ready-made Funnels`,
    titleShort: 'Sales Funnels',
    descriptionShort: `Put the “fun” back in funnels`,
  },
  { 
    href: '/features/followup-funnels',
    title: 'Follow-Up Funnels',
    icon: <FontAwesomeIcon
      icon={faCalendarDay}
      size="2x"
      color={process.env.NEXT_PUBLIC_PRIMARY_COLOR}
    />,
    icon1x: <FontAwesomeIcon
      icon={faCalendarDay}
      size="1x"
      color={process.env.NEXT_PUBLIC_PRIMARY_COLOR}
    />,
    description: 'A Follow-Up Funnel can be used to send follow-up sequences to contacts by sent emails & notifications. This will teach you how to set up your first follow-up funnel. ',
    titleShort: 'Follow-Up Funnels',
    descriptionShort: 'A Follow-Up Funnel can be used to send follow-up sequences to contacts',
  },
  { 
    href: '/features/in-app-referral',
    title: 'In-app Referral Program',
    icon: <FontAwesomeIcon
      icon={faBullhorn}
      size="2x"
      color={process.env.NEXT_PUBLIC_PRIMARY_COLOR}
    />,
    icon1x: <FontAwesomeIcon
      icon={faBullhorn}
      size="1x"
      color={process.env.NEXT_PUBLIC_PRIMARY_COLOR}
    />,
    description: 'Fully loaded Referral Marketing program with the power of analytics personalization and optimization capabilities; available for web and mobile',
    titleShort: 'In-app Referral Program',
    descriptionShort: 'Referral Marketing program is available for web and mobile',
  },
];