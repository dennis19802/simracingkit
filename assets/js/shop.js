/*
 * SimRacingKit Shop – Rendering
 * Baut die Produktkarten ausschließlich über DOM-APIs (textContent),
 * kein innerHTML → kein XSS über die Konfiguration möglich.
 */
(function () {
  "use strict";

  var cfg = window.SRK_SHOP;
  var root = document.getElementById("products");
  var consentBox = document.getElementById("consent");
  if (!cfg || !root) return;

  var fmt = new Intl.NumberFormat(cfg.locale || "de-DE", {
    style: "currency",
    currency: cfg.currency || "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });

  var byId = {};
  cfg.products.forEach(function (p) { byId[p.id] = p; });

  /* Streichpreis des Bundles = Summe aller Einzelprodukte */
  var sumSingles = cfg.products
    .filter(function (p) { return p.type !== "bundle"; })
    .reduce(function (a, p) { return a + (p.price || 0); }, 0);

  /* Nur https-Links auf erlaubte Checkout-Hosts zulassen */
  function safeCheckoutUrl(url) {
    if (!url) return null;
    try {
      var u = new URL(url);
      if (u.protocol !== "https:") return null;
      var ok = (cfg.allowedCheckoutHosts || []).some(function (h) {
        return u.hostname === h || u.hostname.slice(-(h.length + 1)) === "." + h;
      });
      return ok ? u.href : null;
    } catch (e) {
      return null;
    }
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  var buyButtons = [];

  function render(p) {
    var card = el("article", "product" + (p.featured ? " featured" : ""));
    card.id = "product-" + p.id;

    var tagText = { core: "CORE", addon: "ADD-ON", bundle: "BUNDLE" }[p.type] || "";
    var tagCls = { core: "core", addon: "core", bundle: "bundle" }[p.type] || "core";
    var url = p.status === "available" ? safeCheckoutUrl(p.checkoutUrl) : null;

    var tags = el("div");
    tags.appendChild(el("span", "tag " + tagCls, tagText));
    if (!url) {
      tags.appendChild(document.createTextNode(" "));
      tags.appendChild(el("span", "tag soon", "COMING SOON"));
    }
    card.appendChild(tags);

    card.appendChild(el("h3", null, p.name));
    card.appendChild(el("p", "tagline", p.tagline));

    var price = el("p", "price", fmt.format(p.price));
    var compareAt = p.type === "bundle" ? (p.compareAt || sumSingles) : p.compareAt;
    if (compareAt && compareAt > p.price) {
      price.appendChild(el("span", "old", fmt.format(compareAt)));
    }
    card.appendChild(price);
    card.appendChild(el("p", "price-note",
      (cfg.pricesIncludeVat ? "incl. VAT" : "plus VAT") + " · one-time payment · per seat"));

    if (p.requires && p.requires.length) {
      var names = p.requires.map(function (r) { return byId[r] ? byId[r].name : r; });
      card.appendChild(el("p", "requires", "Requires: " + names.join(" + ")));
    }

    var ul = el("ul");
    (p.features || []).forEach(function (f) { ul.appendChild(el("li", null, f)); });
    card.appendChild(ul);

    var btn = el("a", "btn" + (p.featured || p.type === "core" ? " primary" : ""));
    if (url) {
      btn.textContent = "Buy " + p.name;
      btn.dataset.href = url;
      btn.setAttribute("rel", "noopener noreferrer");
      btn.setAttribute("target", "_blank");
      buyButtons.push(btn);
    } else {
      btn.textContent = "Notify me on Discord";
      btn.href = "https://discord.gg/hZpCrPHmDp";
      btn.setAttribute("rel", "noopener noreferrer");
      btn.setAttribute("target", "_blank");
    }
    card.appendChild(btn);

    return card;
  }

  /* Reihenfolge: Bundle, Core, Add-ons */
  var order = { bundle: 0, core: 1, addon: 2 };
  cfg.products
    .slice()
    .sort(function (a, b) { return order[a.type] - order[b.type]; })
    .forEach(function (p) { root.appendChild(render(p)); });

  /* Kauf-Buttons erst nach Zustimmung (AGB + Widerruf digitale Inhalte) aktiv */
  function updateButtons() {
    var ok = !consentBox || consentBox.checked;
    buyButtons.forEach(function (b) {
      if (ok) {
        b.href = b.dataset.href;
        b.removeAttribute("aria-disabled");
        b.removeAttribute("title");
      } else {
        b.removeAttribute("href");
        b.setAttribute("aria-disabled", "true");
        b.title = "Please accept the terms above first.";
      }
    });
  }
  if (consentBox) consentBox.addEventListener("change", updateButtons);
  updateButtons();

  /* Zustimmungs-Block ausblenden, wenn noch nichts kaufbar ist */
  var consentWrap = document.getElementById("consent-wrap");
  if (consentWrap && buyButtons.length === 0) consentWrap.hidden = true;
})();
