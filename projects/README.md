# Project write-ups & assets

Each shipped product can have:

1. **Markdown** — short case-study copy for the site (`.md`). Write for visitors, not file inventories.
2. **Screenshots** — put images under `public/projects/<slug>/` and embed in markdown, e.g. `![Checkout flow](/projects/cafe-jafn/checkout.png)`.

## Wire a project to the site

1. Add or reuse a folder here (e.g. `WIMS/`, `Cafe Jaf'n Kampala/`).
2. In `src/content/projects.ts`, set **`detailMd`** to the path **relative to this `projects/` directory**, for example:
   - `WIMS/PORTFOLIO_WIMS_FACEMATCH.md`
   - `Cafe Jaf'n Kampala/portfolio-cafe-jafn-mobile.md`
3. Ensure **`slug`** in `projects.ts` matches the URL (`/work/cafe-jafn`, `/work/wims-facematch`).

The case study page strips the **first `#` heading** from the markdown so it doesn’t repeat the page title.

## Current files

| Project slug | Markdown source |
|--------------|-------------------|
| `wire24` | `Wire24/PORTFOLIO-WIRE24.md` |
| `cafe-jafn` | `Cafe Jaf'n Kampala/portfolio-cafe-jafn-mobile.md` |
| `tuwe` | `Tuwe/PORTFOLIO_PROJECT_BRIEF.md` |
| `glam-n-go` | `Glam n' Go/PORTFOLIO_glam_n_go.md` |
| `easy-gas` | `EasyGas/portfolio-easygas-job-search.md` |
| `ncpwd-access` | `NCPWD/portfolio-ncpwd-access-app.md` |
| `justknow` | `Justknow/PORTFOLIO.md` |
| `wims-facematch` | `WIMS/PORTFOLIO_WIMS_FACEMATCH.md` |

`harvest-monitor` has no `detailMd` yet—add a folder + file when ready.

### Web project thumbnails

Put marketing screenshots in **`projects/websites/`** using the **project slug** as the filename, e.g. `space4climate.png`, `masifa.png`. They are served at **`/site-assets/websites/<slug>.png`** and wired via the **`image`** field in `src/content/projects.ts`. If `image` is omitted for a web project, the UI can fall back to an automatic preview of the live URL.

Web projects usually have no `detailMd`, so they do **not** use `/project-files/...` for thumbnails.

## Images next to your `.md` file

If screenshots live in the **same directory** as your markdown (e.g. `projects/Cafe Jaf'n Kampala/*.jpg`), reference them with:

`/project-files/<project-slug>/<filename>`

**Mobile apps:** add **at least three** portrait screenshots to that folder and list them in **`gallery`** in `src/content/projects.ts`. The work index shows a three-up screenshot strip; the case study page scrolls through **all** listed shots horizontally.

Example (slug must match `src/content/projects.ts`):

```md
![](/project-files/cafe-jafn/1755162313506.jpg)
```

Alternatively, put copies under `public/projects/<slug>/` and use `/projects/<slug>/file.png` (static hosting, no route).
