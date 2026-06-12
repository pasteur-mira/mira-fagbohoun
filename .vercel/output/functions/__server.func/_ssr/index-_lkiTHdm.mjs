const API_BASE = "https://api.mirafagbohoun.com/api";
const TOKEN_KEY = "admin_token";
function getToken() {
  return typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
}
function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}
function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}
async function apiFetch(path, options = {}) {
  const token = getToken();
  const isFormData = options.body instanceof FormData;
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...!isFormData ? { "Content-Type": "application/json" } : {},
      ...token ? { Authorization: `Bearer ${token}` } : {},
      ...options.headers ?? {}
    }
  });
  const json = await res.json().catch(() => ({ message: `HTTP ${res.status}` }));
  if (!res.ok) {
    const err = new Error(json.message ?? `HTTP ${res.status}`);
    if (json.errors) err.errors = json.errors;
    throw err;
  }
  return json;
}
const contactApi = {
  send: (payload) => apiFetch("/contact", {
    method: "POST",
    body: JSON.stringify(payload)
  })
};
const adminContactApi = {
  list: () => apiFetch("/admin/contacts"),
  get: (id) => apiFetch(`/admin/contacts/${id}`),
  delete: (id) => apiFetch(`/admin/contacts/${id}`, { method: "DELETE" })
};
const agendaApi = {
  list: () => apiFetch("/agenda")
};
const adminAgendaApi = {
  list: () => apiFetch("/admin/agenda"),
  create: (payload) => apiFetch("/admin/agenda", {
    method: "POST",
    body: JSON.stringify(payload)
  }),
  update: (id, payload) => apiFetch(`/admin/agenda/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  }),
  togglePublish: (id) => apiFetch(`/admin/agenda/${id}/publish`, { method: "PATCH" }),
  delete: (id) => apiFetch(`/admin/agenda/${id}`, { method: "DELETE" })
};
function extractYoutubeId(url) {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}
function getYoutubeThumbnail(url) {
  const id = extractYoutubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}
const predicationsApi = {
  list: () => apiFetch("/predications")
};
const adminPredicationsApi = {
  list: () => apiFetch("/admin/predications"),
  create: (payload) => apiFetch("/admin/predications", {
    method: "POST",
    body: JSON.stringify(payload)
  }),
  update: (id, payload) => apiFetch(`/admin/predications/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  }),
  togglePublish: (id) => apiFetch(`/admin/predications/${id}/publish`, { method: "PATCH" }),
  delete: (id) => apiFetch(`/admin/predications/${id}`, { method: "DELETE" })
};
function formatSize(bytes) {
  if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} Mo`;
  return `${Math.round(bytes / 1024)} Ko`;
}
const ordersApi = {
  create: (payload) => apiFetch("/orders", {
    method: "POST",
    body: JSON.stringify(payload)
  })
};
const adminOrdersApi = {
  list: (page = 1, perPage = 15) => apiFetch(`/admin/orders?page=${page}&per_page=${perPage}`),
  get: (id) => apiFetch(`/admin/orders/${id}`),
  updateStatus: (id, status) => apiFetch(`/admin/orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status })
  })
};
const notesApi = {
  list: () => apiFetch("/notes")
};
const adminNotesApi = {
  list: () => apiFetch("/admin/notes"),
  create: (formData) => apiFetch("/admin/notes", { method: "POST", body: formData }),
  update: (id, payload) => apiFetch(`/admin/notes/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  }),
  togglePublish: (id) => apiFetch(`/admin/notes/${id}/publish`, { method: "PATCH" }),
  delete: (id) => apiFetch(`/admin/notes/${id}`, { method: "DELETE" })
};
const recurringEventsApi = {
  list: () => apiFetch("/recurring-events")
};
const adminRecurringEventsApi = {
  list: () => apiFetch("/admin/recurring-events"),
  create: (payload) => apiFetch("/admin/recurring-events", {
    method: "POST",
    body: JSON.stringify(payload)
  }),
  update: (id, payload) => apiFetch(`/admin/recurring-events/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  }),
  togglePublish: (id) => apiFetch(`/admin/recurring-events/${id}/publish`, { method: "PATCH" }),
  delete: (id) => apiFetch(`/admin/recurring-events/${id}`, { method: "DELETE" })
};
const bannersApi = {
  list: () => apiFetch("/banners")
};
const adminBannersApi = {
  list: () => apiFetch("/admin/banners"),
  upload: (files) => {
    const fd = new FormData();
    files.forEach((f) => fd.append("images[]", f));
    return apiFetch("/admin/banners", {
      method: "POST",
      body: fd
    });
  },
  toggle: (id) => apiFetch(`/admin/banners/${id}/toggle`, { method: "PATCH" }),
  delete: (id) => apiFetch(`/admin/banners/${id}`, { method: "DELETE" })
};
const authApi = {
  login: (email, password) => apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  }),
  logout: () => apiFetch("/auth/logout", { method: "POST" }),
  me: () => apiFetch("/auth/me")
};
export {
  agendaApi as a,
  getToken as b,
  contactApi as c,
  authApi as d,
  clearToken as e,
  formatSize as f,
  getYoutubeThumbnail as g,
  adminContactApi as h,
  adminAgendaApi as i,
  adminPredicationsApi as j,
  adminNotesApi as k,
  adminOrdersApi as l,
  adminBannersApi as m,
  notesApi as n,
  ordersApi as o,
  predicationsApi as p,
  adminRecurringEventsApi as q,
  recurringEventsApi as r,
  setToken as s,
  bannersApi as t
};
