# Wiki source (`docs/wiki`)

These files feed the [GitHub Wiki](https://github.com/Aahilmak786/ErgoFund-Labs/wiki).

## Automatic sync

Workflow **Wiki sync** (`.github/workflows/wiki-sync.yml`) runs on **every push to `main`** and on **workflow_dispatch**. Add a repository secret:

- **`WIKI_PUSH_TOKEN`** — GitHub PAT with **wiki** write access (or classic `repo` scope). The workflow clones `https://github.com/Aahilmak786/ErgoFund-Labs.wiki.git` and copies all `*.md` here except this `README.md`.

Enable **Wikis** under repo **Settings → General → Features**.

## Pages

| File | Wiki tab |
| --- | --- |
| `Home.md` | Home |
| `_Sidebar.md` | Sidebar |
| `Project-layout.md`, `Working-output-and-smoke-tests.md`, … | Linked from Home / sidebar |

Use `[[Page-name]]` links (matches filename without `.md`).
