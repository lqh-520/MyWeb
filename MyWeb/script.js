/* =========================================================
   紫罗兰永恒花园主题网站 · 交互脚本
   MyWeb/script.js  ——  滚动出场动画 + 图集灯箱
   ========================================================= */
(function () {
  'use strict';

  /* ---------- 静态快照模式：?nofx 关闭入场动画（便于截图 / 整页导出） ---------- */
  var NOFX = location.search.indexOf('nofx') > -1;
  if (NOFX) document.documentElement.classList.add('nofx');

  /* ---------- 滚动出场动画 ---------- */
  var revealTargets = document.querySelectorAll('.reveal');
  if (revealTargets.length) {
    if (NOFX) {
      revealTargets.forEach(function (el) { el.classList.add('in'); });
    } else if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealTargets.forEach(function (el) { io.observe(el); });
    } else {
      revealTargets.forEach(function (el) { el.classList.add('in'); });
    }
  }

  /* ---------- 图集灯箱 ---------- */
  var lb = document.getElementById('lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('.lb-cap');

    document.querySelectorAll('[data-lb]').forEach(function (fig) {
      fig.addEventListener('click', function () {
        var src = fig.getAttribute('data-lb');
        var cap = fig.getAttribute('data-cap') || '';
        lbImg.src = src;
        lbCap.textContent = cap;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLb() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
    }
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('lb-close')) closeLb();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.classList.contains('open')) closeLb();
    });
  }

  /* ---------- 顶部小字：当前年份 ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
