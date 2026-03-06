import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Kirisame's Unofficial Music Wiki",
  tagline: "Scales, Chords, etc",
  favicon: "img/image_logo.png",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://wiki.kirisame.jp.net/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "kirisame-ame", // Usually your GitHub org/user name.
  projectName: "music-wiki", // Usually your repo name.

  onBrokenLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.

          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/image_logo.png",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Home",
      logo: {
        alt: "My Site Logo",
        src: "img/image_logo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Music Theory",
        },
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://lit.link/kirisameame",
          label: "VocaP Profile",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Subjects",
          items: [
            {
              label: "Intro",
              to: "/docs/intro",
            },
            {
              label: "Chords",
              to: "/docs/chords/intro",
            },
          ],
        },
        {
          title: "My Socials",
          items: [
            {
              label: "Youtube",
              href: "https://www.youtube.com/@Kirisame.amefuri",
            },
            {
              label: "X (twitter)",
              href: "https://x.com/Kirisameamefuri",
            },
            {
              label: "Instagram",
              href: "https://instagram.com/kirisame_ame",
            },
          ],
        },
        {
          title: "Stream my music!",
          items: [
            {
              label: "Spotify",
              href: "https://open.spotify.com/artist/1dJ95RetZNmck5ab3IdWOL?si=ar5VJ8OtTqa2MHYyz08WPw",
            },
            {
              label: "Apple Music",
              href: "https://music.apple.com/id/artist/kirisame/1756134648",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Kirisame-ame. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
