<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- All editable copy, photo paths, captions and the music path live in `src/config/experiencia.ts`; components only read from it, so the owner can personalize everything in one file.
- Photos are `src: null` until a real file exists in `public/images/`; `Fotografia` renders an elegant placeholder instead, so no broken images or 404s appear.
- The experience is one narrative route (`/`) with section anchors, because the brief asks for a continuous story rather than separate pages.
- Visitor progress (hearts found, letter opened) is kept only in localStorage via `src/lib/progresso.ts`; no backend, no personal data collected.
- Animations are CSS + IntersectionObserver (no animation library) and every one is neutralized under `prefers-reduced-motion`.
