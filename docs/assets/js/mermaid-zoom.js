/*!
 * mermaid-zoom.js — Mermaid 图表点击放大弹窗
 *
 * 点击页面中的 mermaid 图，弹出全屏弹窗放大查看：
 *  - 滚轮缩放（1~4 倍，指针位置锚定）
 *  - 拖拽平移（放大后，鼠标/触摸）
 *  - Esc / 点击遮罩 / 关闭按钮三种方式关闭
 *
 * 依赖：无。与 mermaid 渲染时序解耦：mermaid.run() 异步注入 SVG，
 * 本脚本用 document 级事件委托，点击发生时 SVG 必然已存在。
 *
 * 缩放实现：直接设置 SVG 的显式宽度（矢量图任意缩放均清晰），
 * 配合 .mz-scaled 类放开 CSS max-width 限制，滚动条随之扩展。
 */
(function () {
  'use strict';

  var MIN_SCALE = 1;
  var MAX_SCALE = 4;
  var ZOOM_STEP = 1.15;
  var DBL_SCALE = 2.5;

  var modal, backdrop, closeBtn, stage, stageInner;
  var currentSvg = null;   // 弹窗中的 svg
  var currentHost = null;  // svg 的原宿主 .mermaid
  var savedFocus = null;
  var scale = 1;
  var baseWidth = 0;       // scale=1 时 svg 在弹窗内的宽度（缩放基准）

  // 拖拽状态
  var dragging = false;
  var dragStartX = 0, dragStartY = 0;
  var dragScrollLeft = 0, dragScrollTop = 0;

  function buildModal() {
    if (modal) return;

    modal = document.createElement('div');
    modal.className = 'mz-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', '图表放大查看');

    backdrop = document.createElement('div');
    backdrop.className = 'mz-modal-backdrop';

    var panel = document.createElement('div');
    panel.className = 'mz-modal-panel';

    closeBtn = document.createElement('button');
    closeBtn.className = 'mz-modal-close';
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', '关闭');
    closeBtn.textContent = '✕';

    stage = document.createElement('div');
    stage.className = 'mz-stage';
    stage.tabIndex = -1;

    stageInner = document.createElement('div');
    stageInner.className = 'mz-stage-inner';
    stage.appendChild(stageInner);

    panel.appendChild(closeBtn);
    panel.appendChild(stage);
    modal.appendChild(backdrop);
    modal.appendChild(panel);
    document.body.appendChild(modal);

    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) closeModal();
    });
    closeBtn.addEventListener('click', closeModal);
    stage.addEventListener('wheel', onWheel, { passive: false });
    stage.addEventListener('pointerdown', onPointerDown);
    stage.addEventListener('pointermove', onPointerMove);
    stage.addEventListener('pointerup', onPointerUp);
    stage.addEventListener('pointercancel', onPointerUp);
    stage.addEventListener('dblclick', onDblClick);
  }

  function openModal(svg) {
    if (currentSvg) return; // 已打开
    currentHost = svg.closest('.mermaid');
    buildModal();

    savedFocus = document.activeElement;
    currentSvg = svg;
    scale = 1;
    stage.scrollLeft = 0;
    stage.scrollTop = 0;
    stage.classList.remove('mz-scaled');
    stageInner.appendChild(svg); // 移动而非克隆：SVG 内部 id 保持唯一
    baseWidth = svg.getBoundingClientRect().width; // 弹窗内自适应后的基准宽度

    if (currentHost) currentHost.classList.add('mz-hidden');
    modal.classList.add('mz-open');
    document.documentElement.classList.add('mz-lock'); // 锁背景滚动
    stage.focus();
  }

  function closeModal() {
    if (!currentSvg) return;
    stage.classList.remove('mz-scaled');
    currentSvg.style.width = ''; // 还原内联宽度
    if (currentHost) {
      currentHost.appendChild(currentSvg); // 移回原位
      currentHost.classList.remove('mz-hidden');
    }
    currentSvg = null;
    currentHost = null;
    modal.classList.remove('mz-open');
    document.documentElement.classList.remove('mz-lock');
    if (savedFocus && savedFocus.focus) savedFocus.focus(); // 恢复焦点
    savedFocus = null;
  }

  // 应用缩放：显式设置 svg 宽度，>1 时放开 max-width 限制让滚动条扩展
  function setScale(next) {
    if (next === scale) return;
    if (next > 1) {
      stage.classList.add('mz-scaled');
      currentSvg.style.width = Math.round(baseWidth * next) + 'px';
    } else {
      stage.classList.remove('mz-scaled');
      currentSvg.style.width = '';
    }
    scale = next;
  }

  // 滚轮缩放：指针位置锚定，缩放前后光标下的内容点保持不动
  function onWheel(e) {
    if (!currentSvg) return;
    e.preventDefault();
    var factor = e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP;
    var next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale * factor));
    if (next === scale) return;

    var rect = stage.getBoundingClientRect();
    var mx = e.clientX - rect.left;
    var my = e.clientY - rect.top;
    setScale(next);
    stage.scrollLeft = ((mx + stage.scrollLeft) * next / scale) - mx;
    stage.scrollTop = ((my + stage.scrollTop) * next / scale) - my;
  }

  // 拖拽平移（仅放大后启用）：直接改 scrollLeft/Top，与滚动条同源
  function onPointerDown(e) {
    if (!currentSvg || scale <= 1) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    dragScrollLeft = stage.scrollLeft;
    dragScrollTop = stage.scrollTop;
    stage.classList.add('mz-dragging');
    if (stage.setPointerCapture) stage.setPointerCapture(e.pointerId);
    e.preventDefault();
  }

  function onPointerMove(e) {
    if (!dragging) return;
    stage.scrollLeft = dragScrollLeft - (e.clientX - dragStartX);
    stage.scrollTop = dragScrollTop - (e.clientY - dragStartY);
  }

  function onPointerUp(e) {
    if (!dragging) return;
    dragging = false;
    stage.classList.remove('mz-dragging');
    if (stage.releasePointerCapture) stage.releasePointerCapture(e.pointerId);
  }

  // 触摸设备：双击在 1x 与 2.5x 间切换（滚轮的替代交互）
  function onDblClick(e) {
    if (!currentSvg) return;
    e.preventDefault();
    var next = scale > 1 ? MIN_SCALE : DBL_SCALE;
    var rect = stage.getBoundingClientRect();
    var cx = rect.width / 2;
    var cy = rect.height / 2;
    setScale(next);
    stage.scrollLeft = ((cx + stage.scrollLeft) * next / scale) - cx;
    stage.scrollTop = ((cy + stage.scrollTop) * next / scale) - cy;
  }

  /* ---------- 全局委托：点击打开（mermaid 异步渲染后依然有效） ---------- */
  document.addEventListener('click', function (e) {
    if (currentSvg) return;                    // 弹窗已开
    var target = e.target;
    if (!target.closest) return;
    if (target.closest('.mz-modal')) return;   // 弹窗内部
    var svg = target.closest('.mermaid svg');
    if (!svg) return;
    if (svg.closest('a')) return;              // 图内链接交给浏览器
    e.preventDefault();
    openModal(svg);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && currentSvg) closeModal();
  });
})();
