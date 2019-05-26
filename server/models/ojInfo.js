const fourDigits = '^\\d{4}$';
const capitalAlphaNumeric = '^[A-Z0-9_]+$';
const normal = '^[A-Za-z0-9_\\-.]+$';
const digitsOnly = '^\\d+$';

const data = {
  atc: {
    name: 'atc',
    displayName: 'AtCoder',
    format: '^[a-z0-9_]+_[a-z]$',
    usernamePattern: normal,
    profileLink: 'https://atcoder.jp/users/$$$$$',
  },
  cc: {
    name: 'cc',
    displayName: 'CodeChef',
    format: capitalAlphaNumeric,
    usernamePattern: normal,
    profileLink: 'https://www.codechef.com/users/$$$$$',
  },
  cf: {
    name: 'cf',
    displayName: 'Codeforces',
    format: '^\\d+[A-Z]$',
    usernamePattern: normal,
    profileLink: 'http://codeforces.com/profile/$$$$$',
  },
  csa: {
    name: 'csa',
    displayName: 'CSAcademy',
    format: normal,
    usernamePattern: normal,
    profileLink: 'https://csacademy.com/user/$$$$$',
  },
  hdu: {
    name: 'hdu',
    displayName: 'HDU',
    format: fourDigits,
    usernamePattern: normal,
    profileLink: 'http://acm.hdu.edu.cn/userstatus.php?user=$$$$$',
  },
  loj: {
    name: 'loj',
    displayName: 'LightOJ',
    format: fourDigits,
    usernamePattern: digitsOnly,
    profileLink: 'http://www.lightoj.com/volume_userstat.php?user_id=$$$$$',
  },
  poj: {
    name: 'poj',
    displayName: 'POJ',
    format: fourDigits,
    usernamePattern: normal,
    profileLink: 'http://poj.org/userstatus?user_id=$$$$$',
  },
  spoj: {
    name: 'spoj',
    displayName: 'SPOJ',
    format: capitalAlphaNumeric,
    usernamePattern: normal,
    profileLink: 'http://www.spoj.com/users/$$$$$',
  },
  uva: {
    name: 'uva',
    displayName: 'UVa Online Judge',
    format: '^\\d{3,5}$', // 3 to 5 digits
    usernamePattern: normal,
    profileLink: 'http://uhunt.onlinejudge.org/u/$$$$$',
  },
  vjudge: {
    name: 'vjudge',
    displayName: 'VJudge',
    profileLink: 'https://vjudge.net/user/$$$$$',
  },
};

const ojnamesOnly = Object.keys(data);

module.exports = {
  data,
  ojnamesOnly,
};
