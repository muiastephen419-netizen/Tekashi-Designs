(function () {
  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mobileNav");
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", function () {
      const open = mobileNav.classList.toggle("open");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menuBtn.textContent = open ? "✕" : "☰";
    });
  }

  document.querySelectorAll("[data-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const cat = btn.getAttribute("data-filter");
      document.querySelectorAll("[data-filter]").forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });
      document.querySelectorAll("[data-cat]").forEach(function (card) {
        const c = card.getAttribute("data-cat");
        card.style.display = cat === "all" || c === cat ? "" : "none";
      });
    });
  });

  document.querySelectorAll(".faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      const item = q.parentElement;
      const open = item.classList.contains("open");
      document.querySelectorAll(".faq").forEach(function (f) {
        f.classList.remove("open");
      });
      if (!open) item.classList.add("open");
    });
  });

  document.querySelectorAll("[data-budget]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll("[data-budget]").forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      const hidden = document.getElementById("budgetValue");
      if (hidden) hidden.value = btn.getAttribute("data-budget");
    });
  });

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      if (!name) return;
      const lines = [
        "Hi Stephen — new project inquiry from " + name + ".",
        data.get("phone") ? "Phone: " + data.get("phone") : "",
        data.get("email") ? "Email: " + data.get("email") : "",
        data.get("type") ? "Type: " + data.get("type") : "",
        data.get("budget") ? "Budget: " + data.get("budget") : "",
        data.get("details") ? "Details: " + data.get("details") : "",
      ].filter(Boolean);
      window.open(
        "https://wa.me/254793755230?text=" + encodeURIComponent(lines.join("\n")),
        "_blank",
        "noopener,noreferrer"
      );
      const ok = document.getElementById("formOk");
      if (ok) ok.style.display = "block";
    });
  }

  const reviewForm = document.getElementById("reviewForm");
  if (reviewForm) {
    reviewForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const ok = document.getElementById("reviewOk");
      if (ok) ok.style.display = "block";
    });
  }
})();
