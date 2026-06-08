export const API_BASE = "http://localhost:8000/api";

const TOKEN_KEY = "admin_token";

export function getToken(): string | null {
  return typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
}
export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const isFormData = options.body instanceof FormData;
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(!isFormData ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  const json = await res.json().catch(() => ({ message: `HTTP ${res.status}` }));
  if (!res.ok) throw new Error(json.message ?? `HTTP ${res.status}`);
  return json as T;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export interface LoginResponse {
  message: string;
  data: { user: User; token: string };
}

export interface ContactMessage {
  id: number;
  full_name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface ContactResponse {
  message: string;
  data: ContactMessage;
}

export interface ContactsListResponse {
  data: ContactMessage[];
}

export const contactApi = {
  send: (payload: { full_name: string; email: string; message: string }) =>
    apiFetch<ContactResponse>("/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

export const adminContactApi = {
  list: () =>
    apiFetch<ContactsListResponse>("/admin/contacts"),

  get: (id: number) =>
    apiFetch<{ data: ContactMessage }>(`/admin/contacts/${id}`),

  delete: (id: number) =>
    apiFetch<{ message: string }>(`/admin/contacts/${id}`, { method: "DELETE" }),
};

export type AgendaType = "culte" | "conference" | "retraite" | "evenement" | "reseau_icc";

export interface AgendaEvent {
  id: number;
  date: string;
  date_label: string;
  time: string;
  title: string;
  type: AgendaType;
  place: string;
  is_published: boolean;
}

export interface AgendaEventPayload {
  date: string;
  time: string;
  title: string;
  type: AgendaType;
  place: string;
  is_published?: boolean;
}

export const agendaApi = {
  list: () =>
    apiFetch<{ data: AgendaEvent[] }>("/agenda"),
};

export const adminAgendaApi = {
  list: () =>
    apiFetch<{ data: AgendaEvent[] }>("/admin/agenda"),

  create: (payload: AgendaEventPayload) =>
    apiFetch<{ data: AgendaEvent }>("/admin/agenda", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  update: (id: number, payload: Partial<AgendaEventPayload>) =>
    apiFetch<{ data: AgendaEvent }>(`/admin/agenda/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),

  togglePublish: (id: number) =>
    apiFetch<{ data: AgendaEvent }>(`/admin/agenda/${id}/publish`, { method: "PATCH" }),

  delete: (id: number) =>
    apiFetch<{ message: string }>(`/admin/agenda/${id}`, { method: "DELETE" }),
};

export function extractYoutubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export function getYoutubeThumbnail(url: string): string | null {
  const id = extractYoutubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

export interface Predication {
  id: number;
  title: string;
  category: string;
  date: string;
  date_label: string;
  youtube_url: string | null;
  thumbnail_url: string | null;
  is_published: boolean;
}

export interface PredicationPayload {
  title: string;
  category: string;
  date: string;
  youtube_url?: string | null;
  is_published?: boolean;
}

export const predicationsApi = {
  list: () =>
    apiFetch<{ data: Predication[] }>("/predications"),
};

export const adminPredicationsApi = {
  list: () =>
    apiFetch<{ data: Predication[] }>("/admin/predications"),

  create: (payload: PredicationPayload) =>
    apiFetch<{ data: Predication }>("/admin/predications", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  update: (id: number, payload: Partial<PredicationPayload>) =>
    apiFetch<{ data: Predication }>(`/admin/predications/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),

  togglePublish: (id: number) =>
    apiFetch<{ data: Predication }>(`/admin/predications/${id}/publish`, { method: "PATCH" }),

  delete: (id: number) =>
    apiFetch<{ message: string }>(`/admin/predications/${id}`, { method: "DELETE" }),
};

export interface Note {
  id: number;
  title: string;
  description: string | null;
  category: string;
  date: string;
  date_label: string;
  file_url: string;
  file_name: string;
  file_size: number;
  is_published: boolean;
  created_at: string;
}

export interface NotePayload {
  title?: string;
  category?: string;
  date?: string;
  description?: string | null;
  is_published?: boolean;
}

export function formatSize(bytes: number): string {
  if (bytes >= 1_048_576) return `${(bytes / 1_048_576).toFixed(1)} Mo`;
  return `${Math.round(bytes / 1024)} Ko`;
}

export const notesApi = {
  list: () => apiFetch<{ data: Note[] }>("/notes"),
};

export const adminNotesApi = {
  list: () =>
    apiFetch<{ data: Note[] }>("/admin/notes"),

  create: (formData: FormData) =>
    apiFetch<{ data: Note }>("/admin/notes", { method: "POST", body: formData }),

  update: (id: number, payload: NotePayload) =>
    apiFetch<{ data: Note }>(`/admin/notes/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),

  togglePublish: (id: number) =>
    apiFetch<{ data: Note }>(`/admin/notes/${id}/publish`, { method: "PATCH" }),

  delete: (id: number) =>
    apiFetch<{ message: string }>(`/admin/notes/${id}`, { method: "DELETE" }),
};

export const authApi = {
  login: (email: string, password: string) =>
    apiFetch<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    apiFetch<{ message: string }>("/auth/logout", { method: "POST" }),

  me: () =>
    apiFetch<{ data: User }>("/auth/me"),
};
