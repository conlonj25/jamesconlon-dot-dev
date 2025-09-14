# jamesconlon-dot-dev

<p align="center"><img src="/public/favicon-js.svg" alt="jamesconlon.dev icon" width="250"/></p>

## Project Structure

Blog posts all follow the hierarchy below. Everything is written in plain markdown.

```text
/
├── src/
│   ├── content/
│   │   └── posts/
│   │       └── controversial-post/
│   │           └── index.md
```

Feel free to create a pull request if you notice any errors.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

