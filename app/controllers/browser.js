exports.browser = (req, result) => {
  const UAParser = require('ua-parser-js');
  const parser = new UAParser();
  const ua = req.headers['user-agent'];
  const browserName = parser.setUA(ua).getBrowser().name;

  if (browserName === 'Chrome' || browserName === 'Firefox' || browserName === 'IE' ||
          browserName === 'Canary' || browserName === 'Opera' ||
          browserName === 'Safari') {
    result(null, { kind: 'browser' });
  } else result(null, { kind: 'non_browser' });
};
