// Lightweight bilingual (EN/TR) loader for the Jadoo site.
// Content lives in content.json; this script applies it based on the
// selected language and remembers the choice. If content.json cannot be
// loaded, the English text already in index.html stays as a fallback.

(function () {
  "use strict";

  var SUPPORTED = ["en", "tr"];
  var DEFAULT_LANG = "en";
  var STORAGE_KEY = "jadoo_lang";

  var dict = null; // full content.json once loaded

  function getStored() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStored(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* storage unavailable — ignore, language just won't persist */
    }
  }

  function detectLang() {
    var stored = getStored();
    if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    var nav = (navigator.language || "en").toLowerCase();
    if (nav.indexOf("tr") === 0) return "tr";
    return DEFAULT_LANG;
  }

  // Resolve a dotted key path like "hero.title" against an object.
  function resolve(obj, path) {
    return path.split(".").reduce(function (acc, key) {
      return acc == null ? undefined : acc[key];
    }, obj);
  }

  function apply(lang) {
    if (!dict || !dict[lang]) return;
    var data = dict[lang];

    document.documentElement.lang = lang;

    var title = resolve(data, "meta.title");
    if (title) document.title = title;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var val = resolve(data, el.getAttribute("data-i18n"));
      if (val != null) el.textContent = val;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var val = resolve(data, el.getAttribute("data-i18n-placeholder"));
      if (val != null) el.setAttribute("placeholder", val);
    });

    document.querySelectorAll("[data-i18n-value]").forEach(function (el) {
      var val = resolve(data, el.getAttribute("data-i18n-value"));
      if (val != null) el.setAttribute("value", val);
    });

    var select = document.getElementById("lang-select");
    if (select) select.value = lang;
  }

  function init() {
    var lang = detectLang();

    var select = document.getElementById("lang-select");
    if (select) {
      select.value = lang; // reflect detected language immediately
      select.addEventListener("change", function (e) {
        var next = e.target.value;
        if (SUPPORTED.indexOf(next) === -1) return;
        setStored(next);
        apply(next);
      });
    }

    fetch("./content.json")
      .then(function (res) {
        if (!res.ok) throw new Error("content.json " + res.status);
        return res.json();
      })
      .then(function (json) {
        dict = json;
        apply(lang);
      })
      .catch(function (err) {
        // Keep the built-in English markup as a fallback.
        console.warn("i18n: could not load content.json — showing default text.", err);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
