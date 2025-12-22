// https://vitepress.dev/guide/custom-theme
import type { EnhanceAppContext, Theme } from 'vitepress';

import { NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client';
import { ElementPlusContainer } from '@vitepress-demo-preview/component';
import ElementPlus from 'element-plus';
import PortalVue from 'portal-vue';
import DefaultTheme from 'vitepress/theme';

import SiteLayout from './components/site-layout.vue';
import VbenContributors from './components/vben-contributors.vue';
import { initHmPlugin } from './plugins/hm';

import './styles';

import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import '@vitepress-demo-preview/component/dist/style.css';
import 'virtual:group-icons.css';
import '@nolebase/vitepress-plugin-git-changelog/client/style.css';

export default {
  async enhanceApp(ctx: EnhanceAppContext) {
    const { app } = ctx;
    app.use(ElementPlus);
    app.use(PortalVue);
    app.component('VbenContributors', VbenContributors);
    app.component('DemoPreview', ElementPlusContainer);
    app.use(NolebaseGitChangelogPlugin);

    // 百度统计
    initHmPlugin();
  },
  extends: DefaultTheme,
  Layout: SiteLayout,
} satisfies Theme;
