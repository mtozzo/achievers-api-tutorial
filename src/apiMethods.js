import buildUrl from 'build-url';

function fetchModules(accessToken) {
  const url = buildUrl(process.env.REACT_APP_API_DOMAIN, {
    path: '/api/v5/recognitions',
  });

  return fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      method: 'OPTIONS',
    }).then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res;
      }

      const err = new Error(res.statusText);
      err.res = res;
      throw err;
    }).then(res => res.json())
    .then(res => {
      res.items = res.items.filter(item => item.moduleType === 'FREE' && !item.name.includes('Email'));
      return res;
    });
}

function doUserSearch(accessToken, q = '') {
  const url = buildUrl(process.env.REACT_APP_API_DOMAIN, {
    path: '/api/v5/users',
    queryParams: { q },
  });

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  }).then(res => {
    if (res.status >= 200 && res.status < 300) {
      return res;
    }

    const err = new Error(res.statusText);
    err.res = res;
    throw err;
  }).then(res => res.json());
}

export {
  fetchModules,
  doUserSearch,
};
