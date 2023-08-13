export type Method = "GET" | "POST" | "PUT" | "DELETE";
export type Headers = {} | undefined;
export type Body = BodyInit | {} | null | undefined;

function tryMakeRequest(
  url: string,
  method: Method,
  body: Body,
  headers: Headers
): Promise<any> | Error | any {
  try {
    return fetchRequest(url, method, body, headers);
  } catch (error) {
    return error;
  }
}
function fetchRequest(
  url: string,
  method: Method,
  body: Body,
  headers: Headers
) {
  return fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: getHeaders(headers),
  }).then((res) => res.json());
}
function getHeaders(headers: Headers) {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...headers,
  };
}

export async function makeRequest(
  url: string,
  method: Method,
  body?: Body,
  headers?: Headers
) {
  return await tryMakeRequest(url, method, body, headers);
}

export default {
  get: async (url: string, headers?: Headers) => {
    return await tryMakeRequest(url, "GET", undefined, headers);
  },
  post: async (url: string, body: Body, headers?: Headers) => {
    return await tryMakeRequest(url, "POST", body, headers);
  },
  put: async (url: string, body: Body, headers?: Headers) => {
    return await tryMakeRequest(url, "PUT", body, headers);
  },
  delete: async (url: string, headers?: Headers) => {
    return await tryMakeRequest(url, "DELETE", undefined, headers);
  },
};
