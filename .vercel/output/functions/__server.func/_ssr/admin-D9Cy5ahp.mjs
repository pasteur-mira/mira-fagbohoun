import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as getToken, d as authApi, e as clearToken, s as setToken, g as getYoutubeThumbnail, f as formatSize, h as adminContactApi, i as adminAgendaApi, j as adminPredicationsApi, k as adminNotesApi, l as adminOrdersApi, m as adminBannersApi, q as adminRecurringEventsApi } from "./index-_lkiTHdm.mjs";
import { i as MessageSquare, j as CalendarDays, k as MicVocal, B as BookOpen, l as ShoppingBag, m as Image, R as Repeat, n as ChevronRight, M as Menu, o as RefreshCw, T as Trash2, X, p as CirclePlus, E as Eye, q as EyeOff, r as Pencil, c as FileText, U as Upload, s as ChevronLeft, t as ExternalLink, u as ChevronDown, v as ImagePlus } from "../_libs/lucide-react.mjs";
function Spinner() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-30 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" }) });
}
function SectionContacts() {
  const [messages, setMessages] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [selected, setSelected] = reactExports.useState(null);
  const [deletingId, setDeletingId] = reactExports.useState(null);
  async function load() {
    setLoading(true);
    try {
      const res = await adminContactApi.list();
      setMessages(res.data);
    } catch {
    } finally {
      setLoading(false);
    }
  }
  reactExports.useEffect(() => {
    load();
  }, []);
  async function handleDelete(id) {
    if (!confirm("Supprimer ce message ?")) return;
    setDeletingId(id);
    try {
      await adminContactApi.delete(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch {
    } finally {
      setDeletingId(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "eyebrow", children: [
        "Messages (",
        messages.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: load,
          disabled: loading,
          className: "inline-flex items-center gap-2 border border-border px-3 py-2 font-display text-[10px] tracking-[0.18em] text-foreground hover:bg-card disabled:opacity-40 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `size-3 ${loading ? "animate-spin" : ""}` }),
            " ACTUALISER"
          ]
        }
      )
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-40 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}) }) : messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border bg-card p-10 text-center text-sm text-muted-foreground", children: "Aucun message pour le moment." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left eyebrow text-[10px]", children: "Nom" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "hidden px-4 py-3 text-left eyebrow text-[10px] md:table-cell", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "hidden px-4 py-3 text-left eyebrow text-[10px] lg:table-cell", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right eyebrow text-[10px]", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: messages.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-card transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelected(m), className: "hover:text-primary text-left", children: m.full_name }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "hidden px-4 py-3 text-muted-foreground md:table-cell", children: m.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "hidden px-4 py-3 text-muted-foreground lg:table-cell", children: new Date(m.created_at).toLocaleDateString("fr-FR") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setSelected(m),
              className: "px-3 py-1 font-display text-[9px] tracking-[0.18em] border border-border hover:bg-card transition-colors",
              children: "VOIR"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => handleDelete(m.id),
              disabled: deletingId === m.id,
              className: "p-1.5 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-40",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" })
            }
          )
        ] }) })
      ] }, m.id)) })
    ] }) }),
    selected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg border border-border bg-background p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg text-foreground", children: selected.full_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: selected.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: new Date(selected.created_at).toLocaleString("fr-FR") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelected(null), className: "shrink-0 text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap text-sm text-foreground leading-relaxed border-t border-border pt-4", children: selected.message }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => handleDelete(selected.id),
            disabled: deletingId === selected.id,
            className: "inline-flex items-center gap-2 border border-destructive px-4 py-2 font-display text-[10px] tracking-[0.18em] text-destructive hover:bg-destructive hover:text-white transition-colors disabled:opacity-40",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3" }),
              " SUPPRIMER"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setSelected(null),
            className: "border border-border px-4 py-2 font-display text-[10px] tracking-[0.18em] text-foreground hover:bg-card transition-colors",
            children: "FERMER"
          }
        )
      ] })
    ] }) })
  ] });
}
const TYPE_OPTIONS$1 = [
  { value: "culte", label: "Culte" },
  { value: "conference", label: "Conférence" },
  { value: "retraite", label: "Retraite" },
  { value: "evenement", label: "Événement" },
  { value: "reseau_icc", label: "Réseau ICC" }
];
const EMPTY_FORM$1 = { date: "", time: "", title: "", type: "culte", place: "", is_published: false };
const inputCls$3 = "mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none";
const labelCls$3 = "eyebrow block text-[10px]";
function SectionAgenda() {
  const [events, setEvents] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [saving, setSaving] = reactExports.useState(false);
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const [togglingId, setTogglingId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM$1);
  const [formError, setFormError] = reactExports.useState("");
  async function load() {
    setLoading(true);
    try {
      const res = await adminAgendaApi.list();
      setEvents(res.data);
    } catch {
    } finally {
      setLoading(false);
    }
  }
  reactExports.useEffect(() => {
    load();
  }, []);
  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM$1);
    setFormError("");
    setShowForm(true);
  }
  function openEdit(e) {
    setEditing(e);
    setForm({ date: e.date, time: e.time, title: e.title, type: e.type, place: e.place, is_published: e.is_published });
    setFormError("");
    setShowForm(true);
  }
  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setFormError("");
    try {
      if (editing) {
        const res = await adminAgendaApi.update(editing.id, form);
        setEvents((prev) => prev.map((ev) => ev.id === editing.id ? res.data : ev));
      } else {
        const res = await adminAgendaApi.create(form);
        setEvents((prev) => [res.data, ...prev]);
      }
      setShowForm(false);
    } catch (err) {
      setFormError(err.message ?? "Erreur lors de la sauvegarde.");
    } finally {
      setSaving(false);
    }
  }
  async function handleToggle(id) {
    setTogglingId(id);
    try {
      const res = await adminAgendaApi.togglePublish(id);
      setEvents((prev) => prev.map((ev) => ev.id === id ? res.data : ev));
    } catch {
    } finally {
      setTogglingId(null);
    }
  }
  async function handleDelete(id) {
    if (!confirm("Supprimer cet événement ?")) return;
    setDeletingId(id);
    try {
      await adminAgendaApi.delete(id);
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
    } catch {
    } finally {
      setDeletingId(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "eyebrow", children: [
        "Agenda (",
        events.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: load,
            disabled: loading,
            className: "inline-flex items-center gap-2 border border-border px-3 py-2 font-display text-[10px] tracking-[0.18em] text-foreground hover:bg-card disabled:opacity-40 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `size-3 ${loading ? "animate-spin" : ""}` }),
              " ACTUALISER"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: openCreate,
            className: "inline-flex items-center gap-2 bg-primary px-3 py-2 font-display text-[10px] tracking-[0.18em] text-primary-foreground hover:opacity-90 transition-opacity",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "size-3" }),
              " AJOUTER"
            ]
          }
        )
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-40 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}) }) : events.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border bg-card p-10 text-center text-sm text-muted-foreground", children: "Aucun événement. Cliquez sur AJOUTER pour créer le premier." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left eyebrow text-[10px]", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left eyebrow text-[10px]", children: "Titre" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "hidden px-4 py-3 text-left eyebrow text-[10px] md:table-cell", children: "Lieu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-center eyebrow text-[10px]", children: "Statut" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right eyebrow text-[10px]", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: events.map((ev) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-card transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground whitespace-nowrap", children: ev.date_label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: ev.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "hidden px-4 py-3 text-muted-foreground md:table-cell", children: ev.place }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleToggle(ev.id),
            disabled: togglingId === ev.id,
            title: ev.is_published ? "Masquer" : "Publier",
            className: `inline-flex items-center gap-1 rounded-full border px-2 py-1 font-display text-[10px] tracking-[0.14em] transition-colors disabled:opacity-40
                        ${ev.is_published ? "border-green-500/40 text-green-600 hover:bg-green-50" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`,
            children: ev.is_published ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-3" }),
              " PUBLIÉ"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "size-3" }),
              " MASQUÉ"
            ] })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => openEdit(ev),
              className: "p-1.5 text-muted-foreground hover:text-foreground transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => handleDelete(ev.id),
              disabled: deletingId === ev.id,
              className: "p-1.5 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-40",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" })
            }
          )
        ] }) })
      ] }, ev.id)) })
    ] }) }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg border border-border bg-background p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base text-foreground", children: editing ? "MODIFIER L'ÉVÉNEMENT" : "NOUVEL ÉVÉNEMENT" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowForm(false), className: "text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-5" }) })
      ] }),
      formError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 bg-destructive/10 px-4 py-3 text-sm text-destructive", children: formError }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls$3, children: "Titre *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              required: true,
              value: form.title,
              onChange: (e) => setForm({ ...form, title: e.target.value }),
              className: inputCls$3,
              placeholder: "Culte du dimanche"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls$3, children: "Date * (AAAA-MM-JJ)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              required: true,
              type: "date",
              value: form.date,
              onChange: (e) => setForm({ ...form, date: e.target.value }),
              className: inputCls$3
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls$3, children: "Heure / Période *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              required: true,
              value: form.time,
              onChange: (e) => setForm({ ...form, time: e.target.value }),
              className: inputCls$3,
              placeholder: "10h00"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls$3, children: "Type *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              required: true,
              value: form.type,
              onChange: (e) => setForm({ ...form, type: e.target.value }),
              className: inputCls$3,
              children: TYPE_OPTIONS$1.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, children: o.label }, o.value))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls$3, children: "Lieu *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              required: true,
              value: form.place,
              onChange: (e) => setForm({ ...form, place: e.target.value }),
              className: inputCls$3,
              placeholder: "ICC Occitanie, Toulouse"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              id: "is_published",
              checked: !!form.is_published,
              onChange: (e) => setForm({ ...form, is_published: e.target.checked }),
              className: "h-4 w-4 accent-primary"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "is_published", className: "text-sm text-foreground cursor-pointer", children: "Publier immédiatement" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 flex justify-end gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowForm(false),
              className: "border border-border px-5 py-2.5 font-display text-[10px] tracking-[0.18em] text-foreground hover:bg-card transition-colors",
              children: "ANNULER"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: saving,
              className: "bg-primary px-5 py-2.5 font-display text-[10px] tracking-[0.18em] text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity",
              children: saving ? "SAUVEGARDE..." : editing ? "ENREGISTRER" : "CRÉER"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
const EMPTY_PRED = { title: "", category: "", date: "", youtube_url: "", is_published: false };
const inputCls$2 = "mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none";
const labelCls$2 = "eyebrow block text-[10px]";
function SectionPredications() {
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [saving, setSaving] = reactExports.useState(false);
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const [togglingId, setTogglingId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_PRED);
  const [formError, setFormError] = reactExports.useState("");
  async function load() {
    setLoading(true);
    try {
      const res = await adminPredicationsApi.list();
      setItems(res.data);
    } catch {
    } finally {
      setLoading(false);
    }
  }
  reactExports.useEffect(() => {
    load();
  }, []);
  function openCreate() {
    setEditing(null);
    setForm(EMPTY_PRED);
    setFormError("");
    setShowForm(true);
  }
  function openEdit(p) {
    setEditing(p);
    setForm({ title: p.title, category: p.category, date: p.date, youtube_url: p.youtube_url ?? "", is_published: p.is_published });
    setFormError("");
    setShowForm(true);
  }
  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setFormError("");
    const payload = { ...form, youtube_url: form.youtube_url || null };
    try {
      if (editing) {
        const res = await adminPredicationsApi.update(editing.id, payload);
        setItems((prev) => prev.map((p) => p.id === editing.id ? res.data : p));
      } else {
        const res = await adminPredicationsApi.create(payload);
        setItems((prev) => [res.data, ...prev]);
      }
      setShowForm(false);
    } catch (err) {
      setFormError(err.message ?? "Erreur lors de la sauvegarde.");
    } finally {
      setSaving(false);
    }
  }
  async function handleToggle(id) {
    setTogglingId(id);
    try {
      const res = await adminPredicationsApi.togglePublish(id);
      setItems((prev) => prev.map((p) => p.id === id ? res.data : p));
    } catch {
    } finally {
      setTogglingId(null);
    }
  }
  async function handleDelete(id) {
    if (!confirm("Supprimer cette prédication ?")) return;
    setDeletingId(id);
    try {
      await adminPredicationsApi.delete(id);
      setItems((prev) => prev.filter((p) => p.id !== id));
    } catch {
    } finally {
      setDeletingId(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "eyebrow", children: [
        "Prédications (",
        items.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: load,
            disabled: loading,
            className: "inline-flex items-center gap-2 border border-border px-3 py-2 font-display text-[10px] tracking-[0.18em] text-foreground hover:bg-card disabled:opacity-40 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `size-3 ${loading ? "animate-spin" : ""}` }),
              " ACTUALISER"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: openCreate,
            className: "inline-flex items-center gap-2 bg-primary px-3 py-2 font-display text-[10px] tracking-[0.18em] text-primary-foreground hover:opacity-90",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "size-3" }),
              " AJOUTER"
            ]
          }
        )
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-40 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}) }) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border bg-card p-10 text-center text-sm text-muted-foreground", children: "Aucune prédication. Cliquez sur AJOUTER pour commencer." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left eyebrow text-[10px]", children: "Titre" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "hidden px-4 py-3 text-left eyebrow text-[10px] md:table-cell", children: "Catégorie" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "hidden px-4 py-3 text-left eyebrow text-[10px] lg:table-cell", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-center eyebrow text-[10px]", children: "Statut" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right eyebrow text-[10px]", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: items.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-card transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground max-w-[200px] truncate", children: p.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "hidden px-4 py-3 text-muted-foreground md:table-cell", children: p.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "hidden px-4 py-3 text-muted-foreground lg:table-cell", children: p.date_label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleToggle(p.id),
            disabled: togglingId === p.id,
            className: `inline-flex items-center gap-1 rounded-full border px-2 py-1 font-display text-[10px] tracking-[0.14em] transition-colors disabled:opacity-40
                        ${p.is_published ? "border-green-500/40 text-green-600 hover:bg-green-50" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`,
            children: p.is_published ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-3" }),
              " PUBLIÉ"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "size-3" }),
              " MASQUÉ"
            ] })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => openEdit(p), className: "p-1.5 text-muted-foreground hover:text-foreground transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => handleDelete(p.id),
              disabled: deletingId === p.id,
              className: "p-1.5 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-40",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" })
            }
          )
        ] }) })
      ] }, p.id)) })
    ] }) }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg border border-border bg-background p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base text-foreground", children: editing ? "MODIFIER LA PRÉDICATION" : "NOUVELLE PRÉDICATION" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowForm(false), className: "text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-5" }) })
      ] }),
      formError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 bg-destructive/10 px-4 py-3 text-sm text-destructive", children: formError }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls$2, children: "Titre *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              required: true,
              value: form.title,
              onChange: (e) => setForm({ ...form, title: e.target.value }),
              className: inputCls$2,
              placeholder: "L'autorité spirituelle aujourd'hui"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls$2, children: "Catégorie *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              required: true,
              value: form.category,
              onChange: (e) => setForm({ ...form, category: e.target.value }),
              className: inputCls$2,
              placeholder: "Enseignement"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls$2, children: "Date * (AAAA-MM-JJ)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              required: true,
              type: "date",
              value: form.date,
              onChange: (e) => setForm({ ...form, date: e.target.value }),
              className: inputCls$2
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls$2, children: "Lien YouTube" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "url",
              value: form.youtube_url ?? "",
              onChange: (e) => setForm({ ...form, youtube_url: e.target.value }),
              className: inputCls$2,
              placeholder: "https://youtu.be/xxxxx"
            }
          ),
          form.youtube_url && getYoutubeThumbnail(form.youtube_url) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-1 text-[9px] text-muted-foreground", children: "APERÇU MINIATURE" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getYoutubeThumbnail(form.youtube_url), alt: "Aperçu miniature", className: "h-28 w-48 object-cover border border-border" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              id: "pred_published",
              checked: !!form.is_published,
              onChange: (e) => setForm({ ...form, is_published: e.target.checked }),
              className: "h-4 w-4 accent-primary"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "pred_published", className: "text-sm text-foreground cursor-pointer", children: "Publier immédiatement" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 flex justify-end gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowForm(false),
              className: "border border-border px-5 py-2.5 font-display text-[10px] tracking-[0.18em] text-foreground hover:bg-card transition-colors",
              children: "ANNULER"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: saving,
              className: "bg-primary px-5 py-2.5 font-display text-[10px] tracking-[0.18em] text-primary-foreground hover:opacity-90 disabled:opacity-50",
              children: saving ? "SAUVEGARDE..." : editing ? "ENREGISTRER" : "CRÉER"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
const EMPTY_FORM = {
  title: "",
  category: "",
  date: "",
  description: "",
  is_published: false
};
const inputCls$1 = "mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none";
const labelCls$1 = "eyebrow block text-[10px]";
function SectionNotes() {
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [saving, setSaving] = reactExports.useState(false);
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const [togglingId, setTogglingId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({ ...EMPTY_FORM });
  const [file, setFile] = reactExports.useState(null);
  const [formError, setFormError] = reactExports.useState("");
  const fileRef = reactExports.useRef(null);
  async function load() {
    setLoading(true);
    try {
      const res = await adminNotesApi.list();
      setItems(res.data);
    } catch {
    } finally {
      setLoading(false);
    }
  }
  reactExports.useEffect(() => {
    load();
  }, []);
  function openCreate() {
    setEditing(null);
    setForm({ ...EMPTY_FORM });
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
    setFormError("");
    setShowForm(true);
  }
  function openEdit(n) {
    setEditing(n);
    setForm({ title: n.title, category: n.category, date: n.date, description: n.description ?? "", is_published: n.is_published });
    setFile(null);
    setFormError("");
    setShowForm(true);
  }
  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setFormError("");
    try {
      if (editing) {
        const res = await adminNotesApi.update(editing.id, form);
        setItems((prev) => prev.map((n) => n.id === editing.id ? res.data : n));
      } else {
        if (!file) {
          setFormError("Veuillez sélectionner un fichier PDF.");
          setSaving(false);
          return;
        }
        const fd = new FormData();
        fd.append("file", file);
        fd.append("title", form.title ?? "");
        fd.append("category", form.category ?? "");
        fd.append("date", form.date ?? "");
        if (form.description) fd.append("description", form.description);
        fd.append("is_published", form.is_published ? "1" : "0");
        const res = await adminNotesApi.create(fd);
        setItems((prev) => [res.data, ...prev]);
      }
      setShowForm(false);
    } catch (err) {
      setFormError(err.message ?? "Erreur lors de la sauvegarde.");
    } finally {
      setSaving(false);
    }
  }
  async function handleToggle(id) {
    setTogglingId(id);
    try {
      const res = await adminNotesApi.togglePublish(id);
      setItems((prev) => prev.map((n) => n.id === id ? res.data : n));
    } catch {
    } finally {
      setTogglingId(null);
    }
  }
  async function handleDelete(id) {
    if (!confirm("Supprimer cette note et son fichier PDF ?")) return;
    setDeletingId(id);
    try {
      await adminNotesApi.delete(id);
      setItems((prev) => prev.filter((n) => n.id !== id));
    } catch {
    } finally {
      setDeletingId(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "eyebrow", children: [
        "Notes & Études (",
        items.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: load,
            disabled: loading,
            className: "inline-flex items-center gap-2 border border-border px-3 py-2 font-display text-[10px] tracking-[0.18em] text-foreground hover:bg-card disabled:opacity-40 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `size-3 ${loading ? "animate-spin" : ""}` }),
              " ACTUALISER"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: openCreate,
            className: "inline-flex items-center gap-2 bg-primary px-3 py-2 font-display text-[10px] tracking-[0.18em] text-primary-foreground hover:opacity-90 transition-opacity",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "size-3" }),
              " AJOUTER"
            ]
          }
        )
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-40 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}) }) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border bg-card p-10 text-center text-sm text-muted-foreground", children: "Aucune note. Cliquez sur AJOUTER pour uploader le premier PDF." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left eyebrow text-[10px]", children: "Titre" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "hidden px-4 py-3 text-left eyebrow text-[10px] md:table-cell", children: "Catégorie" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "hidden px-4 py-3 text-left eyebrow text-[10px] lg:table-cell", children: "Taille" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-center eyebrow text-[10px]", children: "Statut" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right eyebrow text-[10px]", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: items.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-card transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-4 shrink-0 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground max-w-[180px] truncate", children: n.title })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "hidden px-4 py-3 text-muted-foreground md:table-cell", children: n.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "hidden px-4 py-3 text-muted-foreground lg:table-cell", children: formatSize(n.file_size) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleToggle(n.id),
            disabled: togglingId === n.id,
            className: `inline-flex items-center gap-1 rounded-full border px-2 py-1 font-display text-[10px] tracking-[0.14em] transition-colors disabled:opacity-40
                        ${n.is_published ? "border-green-500/40 text-green-600 hover:bg-green-50" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`,
            children: n.is_published ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-3" }),
              " PUBLIÉ"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "size-3" }),
              " MASQUÉ"
            ] })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => openEdit(n), className: "p-1.5 text-muted-foreground hover:text-foreground transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => handleDelete(n.id),
              disabled: deletingId === n.id,
              className: "p-1.5 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-40",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" })
            }
          )
        ] }) })
      ] }, n.id)) })
    ] }) }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg border border-border bg-background p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base text-foreground", children: editing ? "MODIFIER LA NOTE" : "NOUVELLE NOTE" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowForm(false), className: "text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-5" }) })
      ] }),
      formError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 bg-destructive/10 px-4 py-3 text-sm text-destructive", children: formError }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls$1, children: "Titre *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              required: true,
              value: form.title ?? "",
              onChange: (e) => setForm({ ...form, title: e.target.value }),
              className: inputCls$1,
              placeholder: "Étude sur la grâce"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls$1, children: "Catégorie *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              required: true,
              value: form.category ?? "",
              onChange: (e) => setForm({ ...form, category: e.target.value }),
              className: inputCls$1,
              placeholder: "Étude biblique"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls$1, children: "Date * (AAAA-MM-JJ)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              required: true,
              type: "date",
              value: form.date ?? "",
              onChange: (e) => setForm({ ...form, date: e.target.value }),
              className: inputCls$1
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls$1, children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: form.description ?? "",
              onChange: (e) => setForm({ ...form, description: e.target.value }),
              rows: 3,
              className: inputCls$1,
              placeholder: "Courte description du contenu..."
            }
          )
        ] }),
        !editing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls$1, children: "Fichier PDF *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center gap-3 border border-dashed border-border bg-background px-4 py-4 hover:border-primary transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "size-5 shrink-0 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: file ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm text-foreground", children: file.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatSize(file.size) })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Cliquer pour sélectionner un PDF (max 20 Mo)" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileRef,
                type: "file",
                accept: ".pdf,application/pdf",
                className: "sr-only",
                onChange: (e) => setFile(e.target.files?.[0] ?? null)
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              id: "note_published",
              checked: !!form.is_published,
              onChange: (e) => setForm({ ...form, is_published: e.target.checked }),
              className: "h-4 w-4 accent-primary"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "note_published", className: "text-sm text-foreground cursor-pointer", children: "Publier immédiatement" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 flex justify-end gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowForm(false),
              className: "border border-border px-5 py-2.5 font-display text-[10px] tracking-[0.18em] text-foreground hover:bg-card transition-colors",
              children: "ANNULER"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: saving,
              className: "bg-primary px-5 py-2.5 font-display text-[10px] tracking-[0.18em] text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity",
              children: saving ? "SAUVEGARDE..." : editing ? "ENREGISTRER" : "UPLOADER"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
const STATUS_STYLES = {
  pending: "border-yellow-500/40 bg-yellow-500/10 text-yellow-600",
  paid: "border-green-500/40 bg-green-500/10 text-green-600",
  failed: "border-destructive/40 bg-destructive/10 text-destructive",
  cancelled: "border-border bg-muted text-muted-foreground",
  delivered: "border-accent/40 bg-accent/10 text-accent"
};
const STATUS_OPTIONS = [
  { value: "delivered", label: "Livré" },
  { value: "cancelled", label: "Annulé" }
];
function StatusDropdown({ order, onUpdated }) {
  const [open, setOpen] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!open) return;
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);
  async function pick(status) {
    if (status === order.status) {
      setOpen(false);
      return;
    }
    setSaving(true);
    try {
      const res = await adminOrdersApi.updateStatus(order.id, status);
      onUpdated(res.data);
    } catch {
    } finally {
      setSaving(false);
      setOpen(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref, className: "relative inline-flex items-center gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center rounded-full border px-2 py-0.5 font-display text-[10px] tracking-[0.12em] ${STATUS_STYLES[order.status]}`, children: order.status_label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setOpen((o) => !o),
        disabled: saving,
        className: "rounded p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors",
        title: "Changer le statut",
        children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-3" })
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-full z-50 mt-1 min-w-32.5 border border-border bg-background shadow-lg", children: STATUS_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => pick(opt.value),
        className: `flex w-full items-center gap-2 px-3 py-2 text-left font-display text-[10px] tracking-[0.12em] transition-colors hover:bg-card
                ${opt.value === order.status ? "text-foreground font-semibold" : "text-muted-foreground"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `size-2 rounded-full border ${STATUS_STYLES[opt.value]}` }),
          opt.label,
          opt.value === order.status && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-primary", children: "✓" })
        ]
      },
      opt.value
    )) })
  ] });
}
function SectionOrders() {
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [page, setPage] = reactExports.useState(1);
  const [lastPage, setLastPage] = reactExports.useState(1);
  const [total, setTotal] = reactExports.useState(0);
  const [selected, setSelected] = reactExports.useState(null);
  const [detailLoading, setDetailLoading] = reactExports.useState(false);
  async function load(p = page) {
    setLoading(true);
    try {
      const res = await adminOrdersApi.list(p, 15);
      setItems(res.data);
      setPage(res.current_page);
      setLastPage(res.last_page);
      setTotal(res.total);
    } catch {
    } finally {
      setLoading(false);
    }
  }
  reactExports.useEffect(() => {
    load(1);
  }, []);
  function updateItem(updated) {
    setItems((prev) => prev.map((o) => o.id === updated.id ? updated : o));
    if (selected?.id === updated.id) setSelected(updated);
  }
  async function openDetail(order) {
    setSelected(order);
    setDetailLoading(true);
    try {
      const res = await adminOrdersApi.get(order.id);
      setSelected(res.data);
    } catch {
    } finally {
      setDetailLoading(false);
    }
  }
  const paid = items.filter((o) => o.status === "paid" || o.status === "delivered").length;
  const revenue = items.filter((o) => o.status === "paid" || o.status === "delivered").reduce((sum, o) => sum + parseFloat(o.amount), 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "eyebrow", children: [
        "Commandes (",
        total,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => load(page),
          disabled: loading,
          className: "inline-flex items-center gap-2 border border-border px-3 py-2 font-display text-[10px] tracking-[0.18em] text-foreground hover:bg-card disabled:opacity-40 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `size-3 ${loading ? "animate-spin" : ""}` }),
            " ACTUALISER"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-[10px]", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-display text-2xl text-foreground", children: total })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-[10px]", children: "Payées / Livrées" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-display text-2xl text-green-600", children: paid })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-[10px]", children: "Revenus (page)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 font-display text-2xl text-foreground", children: [
          revenue.toFixed(2),
          " €"
        ] })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-40 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}) }) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border bg-card p-10 text-center text-sm text-muted-foreground", children: "Aucune commande pour le moment." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left eyebrow text-[10px]", children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left eyebrow text-[10px]", children: "Client" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "hidden px-4 py-3 text-left eyebrow text-[10px] md:table-cell", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right eyebrow text-[10px]", children: "Montant" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-center eyebrow text-[10px]", children: "Statut" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "hidden px-4 py-3 text-left eyebrow text-[10px] lg:table-cell", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right eyebrow text-[10px]", children: "Détail" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: items.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-card transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-muted-foreground text-xs", children: [
            "#",
            o.id
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground max-w-40 truncate", children: o.full_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "hidden px-4 py-3 text-muted-foreground md:table-cell max-w-45 truncate", children: o.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-medium text-foreground tabular-nums", children: [
            parseFloat(o.amount).toFixed(2),
            " ",
            o.currency
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDropdown, { order: o, onUpdated: updateItem }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "hidden px-4 py-3 text-muted-foreground text-xs lg:table-cell", children: new Date(o.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => openDetail(o),
              className: "p-1.5 text-muted-foreground hover:text-foreground transition-colors",
              title: "Voir le détail",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-4" })
            }
          ) })
        ] }, o.id)) })
      ] }) }),
      lastPage > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Page ",
          page,
          " / ",
          lastPage
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => load(page - 1),
              disabled: page <= 1 || loading,
              className: "inline-flex items-center gap-1 border border-border px-3 py-2 font-display text-[10px] tracking-[0.14em] text-foreground hover:bg-card disabled:opacity-40 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-3" }),
                " PRÉC."
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => load(page + 1),
              disabled: page >= lastPage || loading,
              className: "inline-flex items-center gap-1 border border-border px-3 py-2 font-display text-[10px] tracking-[0.14em] text-foreground hover:bg-card disabled:opacity-40 transition-colors",
              children: [
                "SUIV. ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-3" })
              ]
            }
          )
        ] })
      ] })
    ] }),
    selected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/50 backdrop-blur-sm", onClick: () => setSelected(null) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md border border-border bg-background shadow-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-6 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-base text-foreground", children: [
            "COMMANDE #",
            selected.id
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelected(null), className: "text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-5" }) })
        ] }),
        detailLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-40 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Nom", value: selected.full_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Email", value: selected.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Montant", value: `${parseFloat(selected.amount).toFixed(2)} ${selected.currency}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Statut", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center rounded-full border px-2 py-0.5 font-display text-[10px] tracking-[0.12em] ${STATUS_STYLES[selected.status]}`, children: selected.status_label }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Réf. Mollie", value: selected.mollie_payment_id, mono: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Date", value: new Date(selected.created_at).toLocaleString("fr-FR") }),
          selected.checkout_url && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow text-[10px] text-muted-foreground", children: "Lien paiement" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: selected.checkout_url,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "inline-flex items-center gap-1.5 font-display text-[10px] tracking-[0.14em] text-accent hover:underline",
                children: [
                  "MOLLIE ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "size-3" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setSelected(null),
            className: "w-full border border-border py-2.5 font-display text-[10px] tracking-[0.18em] text-foreground hover:bg-card transition-colors",
            children: "FERMER"
          }
        ) })
      ] })
    ] })
  ] });
}
function Row({ label, value, mono, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-3 gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow text-[10px] text-muted-foreground shrink-0", children: label }),
    children ?? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm text-foreground text-right truncate ${mono ? "font-mono text-xs" : ""}`, children: value })
  ] });
}
function SectionBanners() {
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [uploading, setUploading] = reactExports.useState(false);
  const [togglingId, setTogglingId] = reactExports.useState(null);
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const [uploadErr, setUploadErr] = reactExports.useState("");
  const inputRef = reactExports.useRef(null);
  async function load() {
    setLoading(true);
    try {
      const res = await adminBannersApi.list();
      setItems(res.data);
    } catch {
    } finally {
      setLoading(false);
    }
  }
  reactExports.useEffect(() => {
    load();
  }, []);
  async function handleFiles(files) {
    if (!files || files.length === 0) return;
    setUploadErr("");
    setUploading(true);
    try {
      const res = await adminBannersApi.upload(Array.from(files));
      setItems((prev) => [...prev, ...res.data]);
    } catch (err) {
      setUploadErr(err.message ?? "Erreur lors de l'upload.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }
  async function handleToggle(id) {
    setTogglingId(id);
    try {
      const res = await adminBannersApi.toggle(id);
      setItems((prev) => prev.map((b) => b.id === id ? res.data : b));
    } catch {
    } finally {
      setTogglingId(null);
    }
  }
  async function handleDelete(id) {
    if (!confirm("Supprimer cette bannière ?")) return;
    setDeletingId(id);
    try {
      await adminBannersApi.delete(id);
      setItems((prev) => prev.filter((b) => b.id !== id));
    } catch {
    } finally {
      setDeletingId(null);
    }
  }
  const active = items.filter((b) => b.is_active).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "eyebrow", children: [
        "Bannières hero (",
        items.length,
        " · ",
        active,
        " actives)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: load,
            disabled: loading,
            className: "inline-flex items-center gap-2 border border-border px-3 py-2 font-display text-[10px] tracking-[0.18em] text-foreground hover:bg-card disabled:opacity-40 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `size-3 ${loading ? "animate-spin" : ""}` }),
              " ACTUALISER"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => inputRef.current?.click(),
            disabled: uploading,
            className: "inline-flex items-center gap-2 bg-primary px-3 py-2 font-display text-[10px] tracking-[0.18em] text-primary-foreground hover:opacity-90 disabled:opacity-50",
            children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-3 animate-spin" }),
              " UPLOAD..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "size-3" }),
              " AJOUTER DES IMAGES"
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: inputRef,
            type: "file",
            accept: "image/jpeg,image/png,image/webp",
            multiple: true,
            className: "hidden",
            onChange: (e) => handleFiles(e.target.files)
          }
        )
      ] })
    ] }),
    uploadErr && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 bg-destructive/10 px-4 py-3 text-sm text-destructive", children: uploadErr }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DropZone, { onFiles: handleFiles, uploading, onClick: () => inputRef.current?.click() }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-40 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}) }) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 border border-border bg-card p-10 text-center text-sm text-muted-foreground", children: "Aucune bannière. Cliquez sur AJOUTER ou déposez des images ci-dessus." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: items.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `group relative overflow-hidden border ${b.is_active ? "border-border" : "border-border/50 opacity-60"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: b.image_url,
          alt: b.title ?? `Bannière #${b.id}`,
          className: "h-44 w-full object-cover"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-2 top-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full border px-2 py-0.5 font-display text-[10px] tracking-[0.12em] ${b.is_active ? "border-green-500/40 bg-green-500/80 text-white" : "border-border bg-black/60 text-white/70"}`, children: b.is_active ? "ACTIVE" : "INACTIVE" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-2 top-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-black/60 px-2 py-0.5 font-display text-[10px] text-white/80", children: [
        "#",
        b.order
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-border bg-card px-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground max-w-[140px]", children: b.title ?? `Bannière ${b.id}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => handleToggle(b.id),
              disabled: togglingId === b.id,
              className: "p-1.5 text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors",
              title: b.is_active ? "Désactiver" : "Activer",
              children: b.is_active ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => handleDelete(b.id),
              disabled: deletingId === b.id,
              className: "p-1.5 text-muted-foreground hover:text-destructive disabled:opacity-40 transition-colors",
              title: "Supprimer",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" })
            }
          )
        ] })
      ] })
    ] }, b.id)) })
  ] });
}
function DropZone({ onFiles, uploading, onClick }) {
  const [over, setOver] = reactExports.useState(false);
  function onDrop(e) {
    e.preventDefault();
    setOver(false);
    if (e.dataTransfer.files.length) onFiles(e.dataTransfer.files);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onClick,
      onDragOver: (e) => {
        e.preventDefault();
        setOver(true);
      },
      onDragLeave: () => setOver(false),
      onDrop,
      className: `mb-2 flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed py-8 transition-colors ${over ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-card"} ${uploading ? "pointer-events-none opacity-50" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "size-6 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Cliquez ou glissez-déposez vos images ici" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60", children: "JPG · PNG · WebP · max 5 Mo par image" })
      ]
    }
  );
}
const DAY_OPTIONS = [
  { value: "monday", label: "Lundi" },
  { value: "tuesday", label: "Mardi" },
  { value: "wednesday", label: "Mercredi" },
  { value: "thursday", label: "Jeudi" },
  { value: "friday", label: "Vendredi" },
  { value: "saturday", label: "Samedi" },
  { value: "sunday", label: "Dimanche" }
];
const TYPE_OPTIONS = [
  { value: "culte", label: "Culte" },
  { value: "priere", label: "Prière" },
  { value: "conference", label: "Conférence" },
  { value: "jeune", label: "Jeûne" },
  { value: "evenement", label: "Événement" }
];
const EMPTY = {
  title: "",
  day_of_week: "sunday",
  times: [""],
  time_end: "",
  place: "",
  address: "",
  type: "culte",
  order: 0,
  is_published: false
};
const inputCls = "mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none";
const labelCls = "eyebrow block text-[10px]";
function SectionRecurringEvents() {
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [saving, setSaving] = reactExports.useState(false);
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const [togglingId, setTogglingId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY);
  const [formError, setFormError] = reactExports.useState("");
  async function load() {
    setLoading(true);
    try {
      const res = await adminRecurringEventsApi.list();
      setItems(res.data);
    } catch {
    } finally {
      setLoading(false);
    }
  }
  reactExports.useEffect(() => {
    load();
  }, []);
  function openCreate() {
    setEditing(null);
    setForm(EMPTY);
    setFormError("");
    setShowForm(true);
  }
  function openEdit(r) {
    setEditing(r);
    setForm({
      title: r.title,
      day_of_week: r.day_of_week,
      times: r.times.length > 0 ? r.times : [""],
      time_end: r.time_end ?? "",
      place: r.place,
      address: r.address ?? "",
      type: r.type,
      order: r.order,
      is_published: r.is_published
    });
    setFormError("");
    setShowForm(true);
  }
  function setTime(idx, val) {
    setForm((f) => {
      const times = [...f.times];
      times[idx] = val;
      return { ...f, times };
    });
  }
  function addTime() {
    setForm((f) => ({ ...f, times: [...f.times, ""] }));
  }
  function removeTime(idx) {
    setForm((f) => ({ ...f, times: f.times.filter((_, i) => i !== idx) }));
  }
  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setFormError("");
    const payload = {
      ...form,
      times: form.times.map((t) => t.trim()).filter(Boolean),
      time_end: form.time_end || null,
      address: form.address || void 0
    };
    try {
      if (editing) {
        const res = await adminRecurringEventsApi.update(editing.id, payload);
        setItems((prev) => prev.map((r) => r.id === editing.id ? res.data : r));
      } else {
        const res = await adminRecurringEventsApi.create(payload);
        setItems((prev) => [...prev, res.data]);
      }
      setShowForm(false);
    } catch (err) {
      setFormError(err.message ?? "Erreur lors de la sauvegarde.");
    } finally {
      setSaving(false);
    }
  }
  async function handleToggle(id) {
    setTogglingId(id);
    try {
      const res = await adminRecurringEventsApi.togglePublish(id);
      setItems((prev) => prev.map((r) => r.id === id ? res.data : r));
    } catch {
    } finally {
      setTogglingId(null);
    }
  }
  async function handleDelete(id) {
    if (!confirm("Supprimer cet événement récurrent ?")) return;
    setDeletingId(id);
    try {
      await adminRecurringEventsApi.delete(id);
      setItems((prev) => prev.filter((r) => r.id !== id));
    } catch {
    } finally {
      setDeletingId(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "eyebrow", children: [
        "Programme hebdomadaire (",
        items.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: load,
            disabled: loading,
            className: "inline-flex items-center gap-2 border border-border px-3 py-2 font-display text-[10px] tracking-[0.18em] text-foreground hover:bg-card disabled:opacity-40 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `size-3 ${loading ? "animate-spin" : ""}` }),
              " ACTUALISER"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: openCreate,
            className: "inline-flex items-center gap-2 bg-primary px-3 py-2 font-display text-[10px] tracking-[0.18em] text-primary-foreground hover:opacity-90",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "size-3" }),
              " AJOUTER"
            ]
          }
        )
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-40 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}) }) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border bg-card p-10 text-center text-sm text-muted-foreground", children: "Aucun événement récurrent. Cliquez sur AJOUTER pour commencer." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left eyebrow text-[10px]", children: "Titre" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "hidden px-4 py-3 text-left eyebrow text-[10px] md:table-cell", children: "Jour" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "hidden px-4 py-3 text-left eyebrow text-[10px] lg:table-cell", children: "Horaires" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "hidden px-4 py-3 text-left eyebrow text-[10px] lg:table-cell", children: "Lieu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-center eyebrow text-[10px]", children: "Statut" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right eyebrow text-[10px]", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: items.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-card transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground max-w-40 truncate", children: r.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "hidden px-4 py-3 text-muted-foreground md:table-cell", children: r.day_label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "hidden px-4 py-3 text-muted-foreground lg:table-cell", children: r.times_label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "hidden px-4 py-3 text-muted-foreground lg:table-cell max-w-40 truncate", children: r.place }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleToggle(r.id),
            disabled: togglingId === r.id,
            className: `inline-flex items-center gap-1 rounded-full border px-2 py-1 font-display text-[10px] tracking-[0.14em] transition-colors disabled:opacity-40
                        ${r.is_published ? "border-green-500/40 text-green-600 hover:bg-green-50" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`,
            children: r.is_published ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-3" }),
              " PUBLIÉ"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "size-3" }),
              " MASQUÉ"
            ] })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => openEdit(r), className: "p-1.5 text-muted-foreground hover:text-foreground transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => handleDelete(r.id),
              disabled: deletingId === r.id,
              className: "p-1.5 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-40",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" })
            }
          )
        ] }) })
      ] }, r.id)) })
    ] }) }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg border border-border bg-background p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base text-foreground", children: editing ? "MODIFIER L'ÉVÉNEMENT" : "NOUVEL ÉVÉNEMENT RÉCURRENT" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowForm(false), className: "text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-5" }) })
      ] }),
      formError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 bg-destructive/10 px-4 py-3 text-sm text-destructive", children: formError }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Titre *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              required: true,
              value: form.title,
              onChange: (e) => setForm({ ...form, title: e.target.value }),
              className: inputCls,
              placeholder: "Cultes de Célébration"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Jour *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              required: true,
              value: form.day_of_week,
              onChange: (e) => setForm({ ...form, day_of_week: e.target.value }),
              className: inputCls,
              children: DAY_OPTIONS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d.value, children: d.label }, d.value))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Type *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              required: true,
              value: form.type,
              onChange: (e) => setForm({ ...form, type: e.target.value }),
              className: inputCls,
              children: TYPE_OPTIONS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t.value, children: t.label }, t.value))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Horaires de début *" }),
          form.times.map((t, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: t,
                onChange: (e) => setTime(idx, e.target.value),
                className: "flex-1 border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none",
                placeholder: "9h00"
              }
            ),
            form.times.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => removeTime(idx),
                className: "p-1.5 text-muted-foreground hover:text-destructive transition-colors",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" })
              }
            )
          ] }, idx)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: addTime,
              className: "mt-2 inline-flex items-center gap-1.5 text-xs text-accent hover:underline",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "size-3" }),
                " Ajouter un horaire"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Heure de fin (optionnel)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: form.time_end ?? "",
              onChange: (e) => setForm({ ...form, time_end: e.target.value }),
              className: inputCls,
              placeholder: "21h00"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Ordre d'affichage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              min: 0,
              value: form.order ?? 0,
              onChange: (e) => setForm({ ...form, order: Number(e.target.value) }),
              className: inputCls
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Lieu *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              required: true,
              value: form.place,
              onChange: (e) => setForm({ ...form, place: e.target.value }),
              className: inputCls,
              placeholder: "Impact Centre Chrétien"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: labelCls, children: "Adresse (optionnel)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: form.address ?? "",
              onChange: (e) => setForm({ ...form, address: e.target.value }),
              className: inputCls,
              placeholder: "22 rue Théron de Montaugé, 31200"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              id: "rec_published",
              checked: !!form.is_published,
              onChange: (e) => setForm({ ...form, is_published: e.target.checked }),
              className: "h-4 w-4 accent-primary"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "rec_published", className: "text-sm text-foreground cursor-pointer", children: "Publier immédiatement" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 flex justify-end gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowForm(false),
              className: "border border-border px-5 py-2.5 font-display text-[10px] tracking-[0.18em] text-foreground hover:bg-card transition-colors",
              children: "ANNULER"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: saving,
              className: "bg-primary px-5 py-2.5 font-display text-[10px] tracking-[0.18em] text-primary-foreground hover:opacity-90 disabled:opacity-50",
              children: saving ? "SAUVEGARDE..." : editing ? "ENREGISTRER" : "CRÉER"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
const NAV_ITEMS = [{
  id: "contacts",
  label: "Messages",
  icon: MessageSquare
}, {
  id: "agenda",
  label: "Agenda",
  icon: CalendarDays
}, {
  id: "predications",
  label: "Prédications",
  icon: MicVocal
}, {
  id: "notes",
  label: "Notes & Études",
  icon: BookOpen
}, {
  id: "orders",
  label: "Commandes",
  icon: ShoppingBag
}, {
  id: "banners",
  label: "Bannières Hero",
  icon: Image
}, {
  id: "recurring",
  label: "Programme hebdo",
  icon: Repeat
}];
function Admin() {
  const [user, setUser] = reactExports.useState(null);
  const [checking, setChecking] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (!getToken()) {
      setChecking(false);
      return;
    }
    authApi.me().then((res) => setUser(res.data)).catch(() => clearToken()).finally(() => setChecking(false));
  }, []);
  if (checking) return /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {});
  if (!user) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoginPage, { onSuccess: setUser });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminShell, { user, onLogout: () => {
    clearToken();
    setUser(null);
  } });
}
function AdminShell({
  user,
  onLogout
}) {
  const [section, setSection] = reactExports.useState("contacts");
  const [sideOpen, setSideOpen] = reactExports.useState(false);
  async function handleLogout() {
    try {
      await authApi.logout();
    } catch {
    }
    onLogout();
  }
  const active = NAV_ITEMS.find((n) => n.id === section);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen bg-background", children: [
    sideOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-30 bg-black/40 lg:hidden", onClick: () => setSideOpen(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: `
        fixed top-0 left-0 z-40 flex h-full w-64 flex-col border-r border-border bg-card
        transition-transform duration-200
        ${sideOpen ? "translate-x-0" : "-translate-x-full"}
        lg:static lg:translate-x-0 lg:z-auto
      `, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border px-6 py-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-1", children: "Back-office" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base text-foreground leading-tight", children: "MIRA FAGBOHOUN" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 overflow-y-auto px-3 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: NAV_ITEMS.map(({
        id,
        label,
        icon: Icon
      }) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        setSection(id);
        setSideOpen(false);
      }, className: `
                    w-full flex items-center gap-3 rounded px-3 py-2.5 text-sm transition-colors text-left
                    ${section === id ? "bg-primary/10 text-foreground font-medium" : "text-muted-foreground hover:bg-background hover:text-foreground"}
                  `, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `size-4 shrink-0 ${section === id ? "text-primary" : ""}` }),
        label,
        section === id && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-auto size-3 text-primary" })
      ] }) }, id)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border px-4 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: user.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate", children: user.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleLogout, className: "mt-3 w-full border border-border py-2 font-display text-[10px] tracking-[0.18em] text-foreground hover:bg-foreground hover:text-background transition-colors", children: "DÉCONNEXION" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center gap-4 border-b border-border bg-card px-6 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSideOpen(true), className: "lg:hidden text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "size-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base text-foreground", children: active.label.toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto hidden sm:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "Connecté en tant que ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-medium", children: user.role })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 overflow-y-auto p-6 md:p-10", children: [
        section === "contacts" && /* @__PURE__ */ jsxRuntimeExports.jsx(SectionContacts, {}),
        section === "agenda" && /* @__PURE__ */ jsxRuntimeExports.jsx(SectionAgenda, {}),
        section === "predications" && /* @__PURE__ */ jsxRuntimeExports.jsx(SectionPredications, {}),
        section === "notes" && /* @__PURE__ */ jsxRuntimeExports.jsx(SectionNotes, {}),
        section === "orders" && /* @__PURE__ */ jsxRuntimeExports.jsx(SectionOrders, {}),
        section === "banners" && /* @__PURE__ */ jsxRuntimeExports.jsx(SectionBanners, {}),
        section === "recurring" && /* @__PURE__ */ jsxRuntimeExports.jsx(SectionRecurringEvents, {})
      ] })
    ] })
  ] });
}
function LoginPage({
  onSuccess
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await authApi.login(fd.get("email"), fd.get("password"));
      setToken(res.data.token);
      onSuccess(res.data.user);
    } catch (err) {
      setError(err.message ?? "Identifiants invalides.");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-2", children: "Back-office" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-foreground", children: "ADMINISTRATION" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border bg-card p-8", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-5 bg-destructive/10 px-4 py-3 text-sm text-destructive", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "flex flex-col gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow block", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "email", type: "email", required: true, autoComplete: "email", className: "mt-3 w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow block", children: "Mot de passe" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "password", type: "password", required: true, autoComplete: "current-password", className: "mt-3 w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: loading, className: "mt-2 w-full bg-primary px-6 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground hover:opacity-90 disabled:opacity-50", children: loading ? "CONNEXION..." : "SE CONNECTER" })
      ] })
    ] })
  ] }) });
}
export {
  Admin as component
};
