<template>
  <div>2</div>
</template>

<script>
// import 'highlight.js/styles/github.css';
import hljs from 'highlight.js';
import ClipboardJS from 'clipboard';
import { IconsNamesMinix } from './icon-render';

function getIconName(name) {
  return name.replace('Heroicons', '').replace(/(Outline|Solid)$/, '');
}

export default {
  filters: {
    formatIconName: getIconName,
  },
  mixins: [ IconsNamesMinix ],
  data() {
    return {
      darkMode: false,
      hasSolid: false,
      keywords: '',
    };
  },
  computed: {
    solidIcons() {
      return this.icons.filter(name => new RegExp(/^Heroicons(\w+)(Solid)$/).test(name));
    },
    outlineIcons() {
      return this.icons.filter(name => new RegExp(/^Heroicons(\w+)(Outline)$/).test(name));
    },
    selectedIcons() {
      let icons = this.hasSolid ? this.solidIcons : this.outlineIcons;
      if (!!this.keywords) {
        return icons.filter(name => {
          return getIconName(name).toLowerCase().search(this.keywords.toLowerCase()) >= 0;
        });
      }

      return icons;
    },
    themeIcon() {
      let iconName = 'Moon';
      const hours = new Date().getHours() - 12;
      if (hours >= -6 && hours < 6) {
        iconName = 'Sun';
      }
      if (this.hasSolid) {
        return 'Heroicons' + iconName + 'Solid';
      }

      return 'Heroicons' + iconName + 'Outline';
    }
  },
  watch: {
    darkMode(useDark) {
      document.body.classList.add('dark-mode-transition');
      setTimeout(() => {
        document.body.classList.remove('dark-mode-transition');
      }, 1e3);
      if (useDark) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  },
  mounted() {
    const clipboard = new ClipboardJS('#clipboard-copy-action');
    clipboard.on('success', function (e) {
      e.clearSelection();
      const tip = e.trigger.querySelector('#clipboard-tip');
      if (!tip) {
        return;
      }
      const value = tip.textContent;
      tip.textContent = "Copied!";
      setTimeout(() => {
        tip.textContent = value;
      }, 1500);
    });
    hljs.initHighlightingOnLoad();

    if (window.matchMedia) {
      const media = window.matchMedia("(prefers-color-scheme: dark)")
      const handler = () => {
        this.darkMode = media.matches;
      }
      media.addListener(handler);
      handler();
    } else {
      const hours = new Date().getHours() - 12;
      this.darkMode = !(hours >= -6 && hours < 6);
    }
  },
  methods: {
    onToggleTheme() {
      this.darkMode = !this.darkMode;
    },
    onToggleSolid() {
      if (this.hasSolid) {
        this.hasSolid = false;
        return;
      }
      this.hasSolid = true;
    }
  }
}
</script>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

.dark-mode-transition .transition {
	transition-duration: 300ms !important;
	/* transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important; */
}

.emoji {
	vertical-align: -10%;
	font-size: 120%;
	line-height: 1;
}

.-text-px { font-size: 0.9375rem; } /* 15px */
.text-px  { font-size: 1.0625rem; } /* 17px */

.hljs {
  /* background-color: transparent; */
  @apply bg-transparent;
  @apply text-gray-300;
}
.hljs-keyword {
  @apply text-red-500;
}
.hljs-string {
  @apply text-yellow-800;
}
</style>