import { next } from '@vercel/edge';

const fetchApi = async (req) => {
  const baseUrl = 'https://opendata.resas-portal.go.jp';
  const [path] = req.url.match(/\/api\/v1\/(.*)/);
  const response = await fetch(`${baseUrl}/${path}`, {
    headers: { 'X-API-KEY': process.env.VERCEL_API_KEY },
  }).then((res) => res.blob());
  return new Response(response);
};

export default async (req) => {
  // Basic Auth
  const authorizationHeader = req.headers.get('authorization');
  if (authorizationHeader) {
    const basicAuth = authorizationHeader.split(' ')[1];
    const [user, password] = atob(basicAuth).toString().split(':');
    if (user === process.env.BASIC_AUTH_USER && password === process.env.BASIC_AUTH_PASSWORD) {
      if (req.url.includes('/api')) {
        return fetchApi(req);
      }
      return next();
    }
  }

  return new Response('Basic Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
};

export const config = {
  matcher: ['/(.*)', '/', '/index.html'],
};
