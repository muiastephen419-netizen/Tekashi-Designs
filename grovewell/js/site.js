const LEAF = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4c6 3 11 9 12 16-5 1-10-1-14-5-1 5-1 10 2 14-7-2-12-8-13-15 5-1 9 1 13 5 1-5 1-10 0-15Z" fill="currentColor"/></svg>';

function searchForm(location, type) {
  const options = ['<option value="">Any home type</option>']
    .concat(GROVEWELL.types.map((t) => '<option value="' + t + '"' + (type === t ? " selected" : "") + ">" + t + "</option>"))
    .join("");
  return (
    '<form class="search-bar" action="listings.html" method="get">' +
      '<div class="search-inner">' +
        '<label class="sr-only" for="search-location">Location</label>' +
        '<input id="search-location" name="location" placeholder="Region or town" value="' + (location || "") + '"/>' +
        '<span class="search-divider"></span>' +
        '<label class="sr-only" for="search-type">Home type</label>' +
        '<select id="search-type" name="type">' + options + "</select>" +
      "</div>" +
      '<button class="btn" type="submit"><span>Search</span></button>' +
    "</form>"
  );
}

function mountChrome(page) {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (header) {
    header.innerHTML =
      '<div class="nav-bar">' +
        '<a class="logo" href="index.html"><span class="logo-mark">' + LEAF + "</span>Grovewell</a>" +
        '<ul class="nav-links">' +
          '<li><a href="index.html"' + (page === "home" ? ' class="active"' : "") + ">Home</a></li>" +
          '<li><a href="listings.html"' + (page === "listings" ? ' class="active"' : "") + ">Listings</a></li>" +
          '<li><a href="residences.html"' + (page === "residences" ? ' class="active"' : "") + ">Residences</a></li>" +
          '<li><a href="about.html"' + (page === "about" ? ' class="active"' : "") + ">About</a></li>" +
        "</ul>" +
        '<div class="nav-actions">' +
          '<a class="icon-btn" href="listings.html" aria-label="Search listings">⌕</a>' +
          '<a class="btn btn-get" href="contact.html">Get started</a>' +
          '<button class="icon-btn menu-btn" type="button" aria-label="Open menu">☰</button>' +
        "</div>" +
      "</div>" +
      '<div class="mobile-menu" id="mobile-menu">' +
        '<a href="index.html">Home</a><a href="listings.html">Listings</a>' +
        '<a href="residences.html">Residences</a><a href="about.html">About</a>' +
        '<a class="btn" href="contact.html">Get started</a>' +
      "</div>";
    header.querySelector(".menu-btn").addEventListener("click", () => {
      document.getElementById("mobile-menu").classList.toggle("open");
    });
  }
  if (footer) {
    footer.innerHTML =
      '<div class="footer-grid">' +
        '<div><div class="brand">Grovewell</div><p>A quiet brokerage for houses that belong to the land they sit on.</p></div>' +
        "<div><h4>Explore</h4><ul><li><a href=\"listings.html\">All listings</a></li><li><a href=\"residences.html\">Residences</a></li><li><a href=\"about.html\">Our story</a></li></ul></div>" +
        "<div><h4>Visit</h4><ul><li><a href=\"contact.html\">Portland atelier</a></li><li><a href=\"contact.html\">Book a walkthrough</a></li></ul></div>" +
        "<div><h4>Atelier</h4><p>412 SE Division Street<br>Portland, Oregon 97202<br><a href=\"mailto:hello@grovewell.homes\">hello@grovewell.homes</a></p></div>" +
      "</div>" +
      '<p class="footer-copy">Grovewell Homes · A Tekashi Designs sample · Homes shown are illustrative.</p>';
  }
}

function card(p) {
  return (
    '<article class="card">' +
      '<a href="property.html?slug=' + p.slug + '"><img src="' + p.image + '" alt="' + p.name + '"/></a>' +
      '<div class="card-body">' +
        '<p class="card-loc">' + p.location + "</p>" +
        "<h3>" + p.name + "</h3>" +
        "<p>" + p.blurb + "</p>" +
        '<div class="card-foot"><span class="price">' + formatPrice(p.price) + '</span>' +
        '<a class="btn" href="property.html?slug=' + p.slug + '">View home</a></div>' +
      "</div></article>"
  );
}

function saveInquiry(payload) {
  const existing = JSON.parse(localStorage.getItem("grovewell-inquiries") || "[]");
  existing.unshift(payload);
  localStorage.setItem("grovewell-inquiries", JSON.stringify(existing.slice(0, 20)));
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page || "";
  mountChrome(page);

  if (page === "home") {
    const searchSlot = document.getElementById("hero-search");
    if (searchSlot) searchSlot.innerHTML = searchForm("", "");
    let pageIndex = 0;
    const pages = [GROVEWELL.properties.slice(0, 3), GROVEWELL.properties.slice(3, 6)];
    const grid = document.getElementById("featured-grid");
    function renderFeatured() {
      grid.innerHTML = pages[pageIndex].map(card).join("");
      document.querySelectorAll(".dot").forEach((d, i) => d.classList.toggle("on", i === pageIndex));
    }
    document.getElementById("prev-homes").addEventListener("click", () => {
      pageIndex = pageIndex === 0 ? pages.length - 1 : pageIndex - 1;
      renderFeatured();
    });
    document.getElementById("next-homes").addEventListener("click", () => {
      pageIndex = (pageIndex + 1) % pages.length;
      renderFeatured();
    });
    document.querySelectorAll(".dot").forEach((d, i) => d.addEventListener("click", () => { pageIndex = i; renderFeatured(); }));
    renderFeatured();
  }

  if (page === "listings") {
    const loc = qs("location");
    const type = qs("type");
    const collection = qs("collection");
    document.getElementById("listings-search").innerHTML = searchForm(loc, type);
    const results = filterHomes();
    const col = GROVEWELL.collections.find((c) => c.id === collection);
    document.getElementById("listings-count").textContent =
      results.length + (results.length === 1 ? " home" : " homes") +
      (loc ? ' near “' + loc + "”" : "") +
      (type ? " · " + type : "") +
      (col ? " · " + col.title : "");
    const chips = ['<a class="chip' + (!type && !collection ? " on" : "") + '" href="listings.html">All homes</a>']
      .concat(GROVEWELL.types.map((t) => {
        const p = new URLSearchParams(location.search);
        if (type === t) p.delete("type"); else p.set("type", t);
        return '<a class="chip' + (type === t ? " on" : "") + '" href="listings.html?' + p.toString() + '">' + t + "</a>";
      }))
      .concat(GROVEWELL.collections.map((c) => {
        const p = new URLSearchParams(location.search);
        if (collection === c.id) p.delete("collection"); else p.set("collection", c.id);
        return '<a class="chip' + (collection === c.id ? " on" : "") + '" href="listings.html?' + p.toString() + '">' + c.title.replace(" Homes", "") + "</a>";
      }));
    document.getElementById("chips").innerHTML = chips.join("");
    document.getElementById("listings-grid").innerHTML = results.length
      ? results.map(card).join("")
      : '<p class="success">Nothing in the book matches that search. Try a broader region, or clear the filters.</p>';
  }

  if (page === "property") {
    const home = GROVEWELL.properties.find((p) => p.slug === qs("slug"));
    const root = document.getElementById("property-root");
    if (!home) {
      root.innerHTML = '<div class="page"><h1>Home not in the book</h1><p class="lede">That listing has been withdrawn, or the link is incomplete.</p><p><a class="btn" href="listings.html">Back to listings</a></p></div>';
      return;
    }
    const others = GROVEWELL.properties.filter((p) => p.slug !== home.slug).slice(0, 3);
    root.innerHTML =
      '<div class="page">' +
        '<a class="back" href="listings.html">← All listings</a>' +
        '<div class="gallery" style="margin-top:1.25rem">' +
          '<img class="main" id="main-photo" src="' + home.gallery[0] + '" alt="' + home.name + '"/>' +
          '<div class="thumbs">' + home.gallery.map((g, i) => '<button type="button" class="' + (i === 0 ? "on" : "") + '" data-src="' + g + '"><img src="' + g + '" alt=""/></button>').join("") + "</div>" +
        "</div>" +
        '<div class="detail">' +
          "<div>" +
            '<p class="kicker">' + home.region + " · " + home.type + "</p>" +
            "<h1>" + home.name + "</h1>" +
            '<p class="lede">' + home.location + "</p>" +
            '<p class="price" style="font-size:1.75rem;margin-top:1.25rem">' + formatPrice(home.price) + "</p>" +
            '<dl class="stats">' +
              "<div class=\"stat\"><b>" + home.beds + "</b><span>Beds</span></div>" +
              "<div class=\"stat\"><b>" + home.baths + "</b><span>Baths</span></div>" +
              "<div class=\"stat\"><b>" + home.sqft.toLocaleString() + "</b><span>Square feet</span></div>" +
              "<div class=\"stat\"><b>" + home.acres + "</b><span>Acres</span></div>" +
            "</dl>" +
            "<p>" + home.story + "</p>" +
            "<h2 style=\"margin-top:2rem\">On the land</h2>" +
            "<ul class=\"features\">" + home.features.map((f) => "<li>" + f + "</li>").join("") + "</ul>" +
          "</div>" +
          '<aside class="aside" id="inquiry">' +
            "<h2>Request a walkthrough</h2>" +
            "<p class=\"lede\">We arrange private visits — never a crowd, never a Sunday open house.</p>" +
            '<form class="form" id="inquiry-form">' +
              '<label><span>Name</span><input name="name" required></label>' +
              '<label><span>Email</span><input name="email" type="email" required></label>' +
              '<label><span>Note</span><textarea name="note" placeholder="Timing, household, questions about the land…"></textarea></label>' +
              '<button class="btn btn-lg" type="submit">Send inquiry</button>' +
            "</form>" +
          "</aside>" +
        "</div>" +
        "<h2 style=\"margin-top:3rem\">Also in the book</h2>" +
        '<div class="cards cards-3" style="margin-top:1.25rem">' + others.map((p) =>
          '<a class="card" href="property.html?slug=' + p.slug + '"><img src="' + p.image + '" alt="' + p.name + '"/><div class="card-body"><h3>' + p.name + '</h3><p>' + formatPrice(p.price) + "</p></div></a>"
        ).join("") + "</div>" +
      "</div>";
    root.querySelectorAll(".thumbs button").forEach((btn) => {
      btn.addEventListener("click", () => {
        root.querySelector("#main-photo").src = btn.dataset.src;
        root.querySelectorAll(".thumbs button").forEach((b) => b.classList.remove("on"));
        btn.classList.add("on");
      });
    });
    document.getElementById("inquiry-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      saveInquiry({ home: home.name, name: data.get("name"), email: data.get("email"), note: data.get("note"), at: new Date().toISOString() });
      document.getElementById("inquiry").innerHTML = "<h2>Request a walkthrough</h2><p class=\"success\">Thank you. A Grovewell associate will write within two working days about " + home.name + ".</p>";
    });
  }

  if (page === "residences") {
    document.getElementById("residences-root").innerHTML = GROVEWELL.collections.map((c) => {
      const homes = GROVEWELL.properties.filter((p) => p.collection === c.id);
      return (
        '<section class="collection" id="' + c.id + '">' +
          '<div class="collection-hero">' +
            '<img src="' + c.image + '" alt="' + c.title + '"/>' +
            "<div><h2>" + c.title + "</h2><p class=\"lede\">" + c.blurb + "</p>" +
            '<p style="margin-top:1.5rem"><a class="btn" href="listings.html?collection=' + c.id + '">View these homes</a></p></div>' +
          "</div>" +
          '<div class="cards" style="margin-top:1.5rem">' + homes.map((p) =>
            '<a class="mini" href="property.html?slug=' + p.slug + '"><img src="' + p.image + '" alt=""/><span><strong>' + p.name + "</strong><br><span style=\"color:var(--ink-muted);font-size:.9rem\">" + p.location + "</span><br><span style=\"color:var(--forest);font-weight:600\">" + formatPrice(p.price) + "</span></span></a>"
          ).join("") + "</div>" +
        "</section>"
      );
    }).join("");
  }

  if (page === "contact") {
    document.getElementById("contact-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      saveInquiry({
        name: data.get("name"), email: data.get("email"), phone: data.get("phone"),
        region: data.get("region"), type: data.get("type"), note: data.get("note"),
        at: new Date().toISOString()
      });
      document.getElementById("contact-card").innerHTML = "<h2>We have the note.</h2><p class=\"lede\">Expect a reply from the desk within two working days. If you asked after a specific home, we will include the file.</p>";
    });
  }
});
