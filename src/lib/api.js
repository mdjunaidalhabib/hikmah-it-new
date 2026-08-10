const JSON_HEADERS = { "Content-Type": "application/json" };

async function handleResponse(res) {
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : null;
  if (!res.ok) {
    throw new Error(data?.message || `Request failed (${res.status})`);
  }
  return data;
}

export function apiGet(path) {
  return fetch(`/api${path}`, { credentials: "include" }).then(handleResponse);
}

export function apiPost(path, body) {
  return fetch(`/api${path}`, {
    method: "POST",
    headers: JSON_HEADERS,
    credentials: "include",
    body: JSON.stringify(body),
  }).then(handleResponse);
}

export function apiPut(path, body) {
  return fetch(`/api${path}`, {
    method: "PUT",
    headers: JSON_HEADERS,
    credentials: "include",
    body: JSON.stringify(body),
  }).then(handleResponse);
}

export function apiPatch(path, body) {
  return fetch(`/api${path}`, {
    method: "PATCH",
    headers: JSON_HEADERS,
    credentials: "include",
    body: JSON.stringify(body),
  }).then(handleResponse);
}

export function apiDelete(path) {
  return fetch(`/api${path}`, { method: "DELETE", credentials: "include" }).then(handleResponse);
}

export function apiUpload(file, preset = "image") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("preset", preset);
  return fetch("/api/admin/upload", {
    method: "POST",
    credentials: "include",
    body: formData,
  }).then(handleResponse);
}

export function apiDeleteUpload(url) {
  return fetch("/api/admin/upload/delete", {
    method: "POST",
    headers: JSON_HEADERS,
    credentials: "include",
    body: JSON.stringify({ url }),
  }).then(handleResponse);
}
