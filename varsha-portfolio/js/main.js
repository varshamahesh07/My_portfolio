(function () {
  "use strict";

  document.documentElement.classList.add("js-ready");
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Cursor spotlight on the grid */
  if (!reduce) {
    var raf = 0, px = 0, py = 0;
    window.addEventListener("pointermove", function (e) {
      px = e.clientX; py = e.clientY;
      if (!raf) raf = requestAnimationFrame(function () {
        root.style.setProperty("--mx", px + "px");
        root.style.setProperty("--my", py + "px");
        raf = 0;
      });
    }, { passive: true });
  }

  /* Scroll progress bar in the header */
  function setProgress() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    root.style.setProperty("--progress", max > 0 ? (window.scrollY / max).toFixed(3) : 0);
  }
  window.addEventListener("scroll", setProgress, { passive: true });
  setProgress();

  /* Section headers draw in once */
  var heads = document.querySelectorAll(".sec-head");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    heads.forEach(function (h) { io.observe(h); });
  } else {
    heads.forEach(function (h) { h.classList.add("is-in"); });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".nav-toggle-text").textContent = open ? "Close" : "Menu";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(!nav.classList.contains("is-open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Highlight the current section in the nav ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".site-nav ul a"));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  function updateActive() {
    var marker = window.scrollY + 140;
    var current = null;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= marker) current = sec.id;
    });
    links.forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("href") === "#" + current);
    });
  }
  window.addEventListener("scroll", updateActive, { passive: true });
  updateActive();

  /* ---------- CivicFix status flow (concept preview) ---------- */
  var stages = [
    "Reported: the citizen submits the complaint and it appears in the authority dashboard queue.",
    "In progress: the authority accepts the complaint, and the citizen sees the new status.",
    "Solved: the authority closes the complaint, and the citizen sees it as solved."
  ];
  var stepEls = document.querySelectorAll("#tracker-steps li");
  var noteEl = document.getElementById("tracker-note");
  var btn = document.getElementById("tracker-btn");
  var stage = 0;

  function renderTracker() {
    stepEls.forEach(function (li, i) {
      li.classList.toggle("is-done", i < stage);
      li.classList.toggle("is-current", i === stage);
    });
    noteEl.textContent = stages[stage];
    btn.textContent = stage === stages.length - 1 ? "Start over" : "Move to next status";
  }

  if (btn && noteEl && stepEls.length) {
    btn.addEventListener("click", function () {
      stage = stage === stages.length - 1 ? 0 : stage + 1;
      renderTracker();
    });
    renderTracker();
  }

  /* ---------- Copy email ---------- */
  var copyBtn = document.getElementById("copy-email");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var email = copyBtn.getAttribute("data-email");
      var done = function () {
        copyBtn.textContent = "Copied";
        setTimeout(function () { copyBtn.textContent = "Copy"; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done, function () {
          window.location.href = "mailto:" + email;
        });
      } else {
        window.location.href = "mailto:" + email;
      }
    });
  }
})();
