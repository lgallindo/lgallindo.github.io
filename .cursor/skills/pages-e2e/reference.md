# pages-e2e selector / path reference

| Target | Locator / path |
| :--- | :--- |
| Theme radios | `input[name="mode"]` values `phosphor` \| `modem` \| `utilitarian` |
| Plain stylesheet | `#plain-theme-css` (`HTMLLinkElement.disabled`) |
| Document mode | `html[data-mode]` |
| Sixel deck | `.sixel-deck` |
| Sixel frames | `.sixel-frame` |
| Banner images | `.sixel-frame__img[src*="github-readme.png"]`; wordmark via `src$="/readme.png"` (avoid substring match on github-readme) |
| Theme labels | `label.mode-switch__option` (click label — input is pointer-blocked by span) |
| Bundled CSS | `link[rel=stylesheet][href*="/_astro/"]` |
| Locales | `/`, `/en_US/`, `/pt_BR/` |
| Project H1 | role heading level 1 name `ArclengthContinuation` |
| Config | `playwright.config.ts` |
| Specs | `e2e/*.spec.ts` |
