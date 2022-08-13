import queryString from 'query-string';

export function formatUrl(url: string, params = {}) {
  const queryParams = queryString.stringify(params);

  return `${url}${queryParams ? `?${queryParams}` : ''}`;
}

export async function fetchData(url: string, params = {}) {
  const response = await fetch(formatUrl(url, params), {
  }).catch((error) => {
    throw Error(error);
  });

  if (!response.ok) {
    throw Error(`${response.status} (${response.statusText})`);
  }

  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
