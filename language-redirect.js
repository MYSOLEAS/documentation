(function () {
  var STORAGE_KEY = "mysoleas-docs-language";
  var EN_PREFIX = "/en";
  var ASSET_PATTERN = /\.(css|js|json|png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf|eot|mp4|webm|mp3|wav|pdf)$/i;

  function normalizePath(pathname) {
    if (!pathname || pathname === "") {
      return "/";
    }
    return pathname;
  }

  function isEnglishPath(pathname) {
    return pathname === EN_PREFIX || pathname.indexOf(EN_PREFIX + "/") === 0;
  }

  function toEnglish(pathname) {
    if (isEnglishPath(pathname)) {
      return pathname;
    }
    return EN_PREFIX + (pathname === "/" ? "" : pathname);
  }

  function toFrench(pathname) {
    if (!isEnglishPath(pathname)) {
      return pathname;
    }
    return pathname.slice(EN_PREFIX.length) || "/";
  }

  function browserPrefersFrench() {
    var languages = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || ""];

    return languages.some(function (language) {
      return String(language).toLowerCase().indexOf("fr") === 0;
    });
  }

  function readStoredLanguage() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function storeLanguage(language) {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      return;
    }
  }

  function shortenLanguageLabels(root) {
    var labels = {
      English: "EN",
      French: "FR",
      Francais: "FR",
      "Français": "FR"
    };
    var nodes = root.querySelectorAll
      ? root.querySelectorAll(
          "#localization-select-trigger span, #localization-select-content span, #localization-select-content a, #localization-select-content button"
        )
      : [];

    Array.prototype.forEach.call(nodes, function (node) {
      var text = node.textContent && node.textContent.trim();

      if (labels[text]) {
        node.textContent = labels[text];
      }
    });
  }

  function watchLanguageLabels() {
    shortenLanguageLabels(document);

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        shortenLanguageLabels(mutation.target);
      });
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  function redirectToPreferredLanguage() {
    var pathname = normalizePath(window.location.pathname);

    if (ASSET_PATTERN.test(pathname) || readStoredLanguage()) {
      return;
    }

    var targetPath = browserPrefersFrench() ? toFrench(pathname) : toEnglish(pathname);

    if (targetPath !== pathname) {
      window.location.replace(targetPath + window.location.search + window.location.hash);
    }
  }

  function rememberManualLanguageChoice(event) {
    var selectContent = event.target.closest && event.target.closest("#localization-select-content");
    var link = event.target.closest && event.target.closest("a[href]");

    if (!selectContent || !link) {
      return;
    }

    var url = new URL(link.getAttribute("href"), window.location.href);

    if (url.origin !== window.location.origin) {
      return;
    }

    storeLanguage(isEnglishPath(url.pathname) ? "en" : "fr");
  }

  redirectToPreferredLanguage();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", watchLanguageLabels);
  } else {
    watchLanguageLabels();
  }
  window.addEventListener("click", rememberManualLanguageChoice, true);
})();
