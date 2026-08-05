/**
 * 📖 沉浸式阅读器 — 浮动目录按钮
 * Immersive Reader — Floating TOC Button & Popup
 *
 * 独立运行，与现有 theme.js 无冲突。
 */

(function () {
  'use strict';

  var floatingBtn = null;
  var tocPopup = null;

  // ========== 初始化 ==========
  function init() {
    var outlineRoot = document.querySelector('.vp-outline-root');
    // 页面没有目录（无标题）→ 不显示按钮
    if (!outlineRoot || !outlineRoot.children.length) return;

    createFloatingButton();
    createTocPopup(outlineRoot);
    bindEvents();
    initTitleObserver();
  }

  // ========== 创建浮动按钮 ==========
  function createFloatingButton() {
    floatingBtn = document.createElement('button');
    floatingBtn.className = 'vp-toc-floating-btn';
    floatingBtn.setAttribute('aria-label', '打开目录');
    floatingBtn.setAttribute('title', '目录');
    // 列表图标 ≡
    floatingBtn.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<line x1="8" y1="6" x2="21" y2="6"></line>' +
      '<line x1="8" y1="12" x2="21" y2="12"></line>' +
      '<line x1="8" y1="18" x2="21" y2="18"></line>' +
      '<line x1="3" y1="6" x2="3.01" y2="6"></line>' +
      '<line x1="3" y1="12" x2="3.01" y2="12"></line>' +
      '<line x1="3" y1="18" x2="3.01" y2="18"></line>' +
      '</svg>';
    document.body.appendChild(floatingBtn);
  }

  // ========== 创建 TOC 弹出面板 ==========
  function createTocPopup(outlineRoot) {
    // 克隆原始目录结构
    var clonedRoot = outlineRoot.cloneNode(true);

    // 包装在弹出面板中
    tocPopup = document.createElement('div');
    tocPopup.className = 'vp-toc-popup';
    tocPopup.setAttribute('role', 'dialog');
    tocPopup.setAttribute('aria-label', '页面目录');

    tocPopup.innerHTML =
      '<div class="vp-toc-popup-header">' +
      '<span class="vp-toc-popup-title">目录</span>' +
      '<button class="vp-toc-popup-close" aria-label="关闭目录">&times;</button>' +
      '</div>';

    tocPopup.appendChild(clonedRoot);
    document.body.appendChild(tocPopup);
  }

  // ========== 事件绑定 ==========
  function bindEvents() {
    // 按钮点击 → 切换弹出面板
    floatingBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      togglePopup();
    });

    // 关闭按钮
    var closeBtn = tocPopup.querySelector('.vp-toc-popup-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        closePopup();
      });
    }

    // 点击弹出面板内部链接 → 滚动到锚点 + 关闭面板
    var links = tocPopup.querySelectorAll('.vp-outline-link');
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (!href || href === '#') return;

        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var navHeight = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue('--vp-nav-height') || '56',
            10
          );
          var targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
          // 更新 URL hash
          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }
        closePopup();
      });
    });

    // 点击外部 → 关闭
    document.addEventListener('click', function (e) {
      if (!tocPopup.classList.contains('open')) return;
      if (
        !tocPopup.contains(e.target) &&
        !floatingBtn.contains(e.target)
      ) {
        closePopup();
      }
    });

    // ESC → 关闭
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && tocPopup.classList.contains('open')) {
        closePopup();
      }
    });
  }

  // ========== 切换弹出面板 ==========
  function togglePopup() {
    if (tocPopup.classList.contains('open')) {
      closePopup();
    } else {
      openPopup();
    }
  }

  function openPopup() {
    tocPopup.classList.add('open');
    floatingBtn.classList.add('active');
    // 同步当前高亮
    syncTocHighlight();
  }

  function closePopup() {
    tocPopup.classList.remove('open');
    floatingBtn.classList.remove('active');
  }

  // ========== 同步目录高亮 ==========
  function syncTocHighlight() {
    var popupLinks = tocPopup.querySelectorAll('.vp-outline-link');
    if (!popupLinks.length) return;

    // 找到页面上当前 active 的原始链接
    var activeOrig = document.querySelector('.vp-outline-link.active');
    var activeHref = activeOrig ? activeOrig.getAttribute('href') : null;

    // 清除弹出面板中所有 active
    popupLinks.forEach(function (link) {
      link.classList.remove('active');
    });

    // 高亮匹配的
    if (activeHref) {
      popupLinks.forEach(function (link) {
        if (link.getAttribute('href') === activeHref) {
          link.classList.add('active');
        }
      });
    }
  }

  // ========== 监听页面标题变化（滚动时 theme.js 更新 active 类）==========
  function initTitleObserver() {
    // 使用 MutationObserver 监听原始 .vp-outline-link 上的 active 类变化
    var origOutline = document.querySelector('.vp-outline-root');
    if (!origOutline) return;

    var observer = new MutationObserver(function () {
      if (tocPopup && tocPopup.classList.contains('open')) {
        syncTocHighlight();
      }
    });

    observer.observe(origOutline, {
      attributes: true,
      attributeFilter: ['class'],
      subtree: true
    });

    // 同时也监听 scroll（作为后备）
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!tocPopup || !tocPopup.classList.contains('open')) return;
      if (!ticking) {
        requestAnimationFrame(function () {
          syncTocHighlight();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ========== 启动 ==========
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
