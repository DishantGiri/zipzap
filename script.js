/* =========================================================
   ZAP ZONE DEFENDER — Script
   Light enhancements: no dependencies, no frameworks
   ========================================================= */
(function () {
  'use strict';

  /* -- Smooth feature icon entrance on load -- */
  var feats = document.querySelectorAll('.hero__feat');
  if (feats.length && 'IntersectionObserver' in window) {
    feats.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity 0.45s ease ' + (0.08 * i) + 's, transform 0.45s ease ' + (0.08 * i) + 's';
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    feats.forEach(function (el) { io.observe(el); });
  }

  /* -- CTA ripple on click -- */
  var ctaBtn = document.getElementById('hero-cta-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var ripple = document.createElement('span');
      ripple.style.cssText = [
        'position:absolute',
        'border-radius:50%',
        'background:rgba(255,255,255,0.25)',
        'width:6px','height:6px',
        'transform:scale(0)',
        'animation:ripple-out 0.55s ease forwards',
        'left:' + (e.offsetX - 3) + 'px',
        'top:' + (e.offsetY - 3) + 'px',
        'pointer-events:none'
      ].join(';');
      ctaBtn.appendChild(ripple);
      setTimeout(function () { if (ripple.parentNode) ripple.parentNode.removeChild(ripple); }, 600);
    });
  }

  /* -- Inject ripple keyframe -- */
  var style = document.createElement('style');
  style.textContent = '@keyframes ripple-out{to{transform:scale(60);opacity:0}}';
  document.head.appendChild(style);

})();
