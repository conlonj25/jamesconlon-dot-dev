/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      typography: () => ({
        markdown: {
          css: {
            "--tw-prose-body": "#f2f2f2",
            "--tw-prose-headings": "#f2f2f2",
            "--tw-prose-lead": "#f2f2f2",
            "--tw-prose-links": "#f2f2f2",
            "--tw-prose-bold": "#f2f2f2",
            "--tw-prose-counters": "#f2f2f2",
            "--tw-prose-bullets": "#f2f2f2",
            "--tw-prose-hr": "#a3a3a3",
            "--tw-prose-quotes": "#a3a3a3",
            "--tw-prose-quote-borders": "#a3a3a3",
            "--tw-prose-captions": "#a3a3a3",
            "--tw-prose-code": "#a3a3a3",
            "--tw-prose-pre-code": "#a3a3a3",
            "--tw-prose-pre-bg": "#a3a3a3",
            "--tw-prose-th-borders": "#3f3f46",
            "--tw-prose-td-borders": "#3f3f46",
          },
        },
      }),
      colors: {
        background: "#27272a",
        foreground: "#f2f2f2",
        card: "#18181b",
        "card-foreground": "#f2f2f2",
        popover: "#09090b",
        "popover-foreground": "#f2f2f2",
        primary: "#f6b17a",
        "primary-foreground": "#fffbf8",
        secondary: "#3f3f46",
        "secondary-foreground": "#f2f2f2",
        muted: "#52525b",
        "muted-foreground": "#a3a3a3",
        accent: "#2e4c26",
        "accent-foreground": "#f2f2f2",
        destructive: "#9c4c26",
        "destructive-foreground": "#f5d8f8",
        border: "#3f3f46",
        input: "#3f3f46",
        ring: "#f6b17a",
        "accent-gradient":
          "linear-gradient(45deg, var(--primary), transparent 100%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
