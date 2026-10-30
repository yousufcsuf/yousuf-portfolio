# Adding project screenshots

1. Create `docuflow-ai/` or `reliantops-nexus/` here and add your PNG, JPG, or WebP screenshots.
2. Open `data/projects.ts` and fill the matching project's `screenshots` array:

```ts
screenshots: [
  {
    src: "/screenshots/docuflow-ai/overview.png",
    alt: "Describe what is visible in this screenshot.",
    caption: "Overview",
  },
  {
    src: "/screenshots/docuflow-ai/detail.png",
    alt: "Describe the second screenshot.",
    caption: "A closer look",
  },
],
```

Use paths beginning with `/screenshots/`, without `public/`. List only files that exist.
Images appear in array order, fitted inside the browser without cropping. For a
consistent appearance, use landscape images of similar dimensions (around 1600px wide).

Real screenshots automatically replace the labelled concept studies. Arrow and dot
controls appear when there is more than one image. Visitors can also use Left/Right,
Home/End, or swipe on touchscreens. Slides never advance automatically.
