/*!
 * theme-toggle.js — 白天/黑夜主题切换
 *
 * 功能：
 *  - 在导航栏注入 ☀/🌙 切换按钮（smzhbook 主题 base.html 未预留导航插槽，
 *    故用 JS 插入 .vp-nav-bar-content）
 *  - 点击切换 html.dark 类，选择持久化到 localStorage（key: smzh-theme）
 *  - 首次访问跟随系统 prefers-color-scheme
 *  - 脚本同步执行于 <head>：首屏渲染前应用主题，避免闪烁
 *
 * 配合：developer-dark.css（html.dark 下的暗色变量覆盖）
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'smzh-theme';
  var root = document.documentElement;
  var btn = null;

  // ---------- 主题读取 ----------
  function getSavedTheme() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) { /* localStorage 不可用（隐私模式等）时忽略 */ }
    return null;
  }

  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  // ---------- 应用主题 ----------
  function applyTheme(theme, save) {
    root.classList.toggle('dark', theme === 'dark');

    if (btn) {
      var label = theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式';
      btn.title = label;
      btn.setAttribute('aria-label', label);
    }

    if (save) {
      try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
    }
  }

  // ---------- 注入切换按钮 ----------
  function createButton() {
    var container = document.querySelector('.vp-nav-bar-content') || document.querySelector('.vp-nav-bar');
    if (!container || btn) return;

    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'vp-theme-toggle';
    btn.innerHTML =
      '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>' +
      '</svg>' +
      '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<circle cx="12" cy="12" r="5"/>' +
        '<line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>' +
        '<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>' +
        '<line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>' +
        '<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>' +
      '</svg>';

    btn.addEventListener('click', function () {
      applyTheme(root.classList.contains('dark') ? 'light' : 'dark', true);
    });

    container.appendChild(btn);
    applyTheme(root.classList.contains('dark') ? 'dark' : 'light');
  }

  // 同步执行：首屏渲染前确定主题，避免闪烁
  applyTheme(getSavedTheme() || getSystemTheme(), false);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createButton);
  } else {
    createButton();
  }
})();
