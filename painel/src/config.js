let names = {
  name: 'Virtual Store',
  domain: 'virtualstore.com',
  protocol: 'http',
  url: 'localhost:3000',
  fullUrl: 'http://localhost:3000/',
  color: "#71228b"
};
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
  names.domain = 'sindsep-es.com',
  names.protocol = 'https';
  names.url = 'api.sindsep-es.com';
  names.fullUrl = 'https://api.sindsep-es.com/';
} 


export const NAMES = names;


export const CookieDomain = (process.env.NODE_ENV === 'production')
  ? `.${names.domain}`
  : '';

