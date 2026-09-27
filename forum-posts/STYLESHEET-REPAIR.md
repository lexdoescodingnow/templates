# Standalone stylesheet delivery repair

27 September 2026

53 stylesheets across 47 collections were moved to fresh, import-free CSS files served from `@main`. This extends the Bingsu delivery change to Boba and other collections with commit-pinned loaders or CSS import dependencies. A matching pattern is not proof that every listed collection failed on the forum.

Template HTML, names, GIFs, writing, member-colour rules and explicit light/dark rules are preserved. Imported local and historical styles are expanded in place; Google Fonts CSS is replaced with its font-face definitions. Font files remain external and use their existing display setting. Working Banana and the corrected Bingsu Thaw setup are unchanged.

| Collection | Stylesheet files | Designs using those files |
| --- | ---: | ---: |
| boba | 1 | 15 |
| bread | 2 | 27 |
| brown-sugar | 1 | 15 |
| champagne | 1 | 15 |
| cheese | 1 | 15 |
| cherry | 1 | 15 |
| cinnamon | 1 | 15 |
| citron | 1 | 15 |
| clementine | 2 | 30 |
| cocktail | 1 | 15 |
| coconut | 1 | 15 |
| cream | 1 | 15 |
| delight | 1 | 15 |
| espresso | 1 | 15 |
| fiery | 1 | 15 |
| fudge | 1 | 15 |
| gateau | 1 | 15 |
| gin | 1 | 15 |
| ginger | 1 | 15 |
| honey | 1 | 15 |
| italian-cuisine | 1 | 15 |
| lavender | 2 | 16 |
| lemon | 1 | 15 |
| macadamia | 1 | 15 |
| mango | 1 | 15 |
| marmalade | 1 | 15 |
| mocha-latte | 1 | 15 |
| nectarine | 1 | 15 |
| nuts | 1 | 15 |
| oats | 2 | 30 |
| passionfruit | 1 | 15 |
| plum | 1 | 15 |
| popcorn | 1 | 15 |
| portuguese-cuisine | 1 | 15 |
| praline | 1 | 15 |
| pumpkin | 1 | 15 |
| raspberry | 1 | 15 |
| sake | 3 | 21 |
| sesame | 1 | 15 |
| sour | 1 | 15 |
| spiced | 1 | 15 |
| sultana | 1 | 15 |
| sweet-potato | 1 | 12 |
| toffee | 1 | 15 |
| tropical | 1 | 15 |
| wine | 1 | 15 |
| yuzu | 1 | 15 |

The source mapping and cached font definitions are in `tools/standalone-styles.json` and `tools/standalone-fonts.json`. Run the standalone compiler after individual collection builds; the forum builder also runs it automatically.

Validation compares every posting block before and after the URL replacement, checks CSS and JavaScript syntax, checks preview/copy agreement and verifies the published stylesheet responses. Live rendering inside the members-only forum remains outside these checks.
