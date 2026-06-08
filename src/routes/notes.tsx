import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Download, BookOpen } from "lucide-react";
import { notesApi, formatSize, type Note } from "@/lib/api";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Notes & Études Bibliques · Pasteur Mira Fagbohoun" },
      { name: "description", content: "Téléchargez les notes d'études bibliques et supports de messages du Pasteur Mira Fagbohoun." },
      { property: "og:title", content: "Notes & Études Bibliques · Pasteur Mira Fagbohoun" },
      { property: "og:description", content: "Des ressources pour approfondir votre foi." },
    ],
  }),
  component: Notes,
});

function Notes() {
  const [notes,   setNotes]   = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  useEffect(() => {
    notesApi.list()
      .then((res) => setNotes(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44">
        <p className="eyebrow">Ressources</p>
        <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.9] text-foreground md:text-6xl font-semibold">
          NOTES &<br /><span className="text-primary">ÉTUDES BIBLIQUES.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-base text-muted-foreground md:text-lg">
          Supports de messages, études approfondies, notes de culte — des ressources conçues
          pour nourrir votre foi et approfondir votre connaissance de la Parole.
        </p>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-36">
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : error ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Impossible de charger les ressources pour le moment.
          </p>
        ) : notes.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <BookOpen className="size-10 text-muted-foreground/40" />
            <p className="mt-4 text-sm text-muted-foreground">Aucune ressource disponible pour le moment.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {notes.map((note) => (
              <article key={note.id} className="group flex flex-col border border-border bg-card overflow-hidden transition-colors hover:border-primary/40">

                {/* Aperçu PDF */}
                <div className="relative h-30 w-full overflow-hidden bg-muted border-b border-border">
                  <iframe
                    src={`${note.file_url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH&page=1`}
                    title={`Aperçu : ${note.title}`}
                    loading="lazy"
                    scrolling="no"
                    className="absolute top-0 left-0 border-0 pointer-events-none"
                    style={{ width: "calc(100% + 20px)", height: "calc(100% + 20px)" }}
                  />
                  {/* Overlay pour bloquer l'interaction et afficher le clic */}
                  <a
                    href={note.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity"
                    aria-label={`Ouvrir ${note.title}`}
                  >
                    <span className="rounded-full border border-white px-4 py-2 font-display text-[10px] tracking-[0.18em] text-white">
                      OUVRIR
                    </span>
                  </a>
                </div>

                {/* Infos */}
                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="eyebrow text-[10px] text-foreground">{note.category.toUpperCase()}</p>
                    <span className="eyebrow text-[9px] text-muted-foreground">{note.date_label}</span>
                  </div>

                  <h3 className="font-display text-base leading-tight text-accent">{note.title.toUpperCase()}</h3>

                  {note.description && (
                    <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {note.description}
                    </p>
                  )}

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-xs text-muted-foreground">{formatSize(note.file_size)}</span>
                    <a
                      href={note.file_url}
                      download={note.file_name}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 font-display text-[10px] tracking-[0.18em] text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      <Download className="size-3" /> TÉLÉCHARGER
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
