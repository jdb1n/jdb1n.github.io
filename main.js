const works = window.worksData || [];

const galleryRoot = document.querySelector("#gallery");
const indexRoot = document.querySelector("#sidebar-index-list");

const createGalleryCard = (work) => {
  const article = document.createElement("article");
  article.className = "card";

  article.innerHTML = `
    <a class="card__link" href="${work.href}" aria-label="${work.title} 상세 페이지로 이동">
      <div class="thumbnail">
        <img src="${work.image}" alt="${work.title}" decoding="async" />
      </div>
    </a>
    <div class="card__meta">
      <h2 class="card__title">${work.title}</h2>
      <p class="card__year">${work.year}</p>
    </div>
  `;

  return article;
};

const createIndexRow = (work, index) => {
  const li = document.createElement("li");
  li.className = "sidebar__index-row";
  const displayNumber = works.length - index;

  li.innerHTML = `
    <span class="sidebar__index-number">${displayNumber}</span>
    <a class="sidebar__index-title" href="${work.href}">
      <span class="sidebar__index-title-text">${work.title}</span>
    </a>
    <span class="sidebar__index-type">${work.type}</span>
    <span class="sidebar__index-year">${work.year}</span>
  `;

  return li;
};

const bindOverflowTitles = () => {
  const titleLinks = document.querySelectorAll(".sidebar__index-title");

  titleLinks.forEach((link) => {
    const text = link.querySelector(".sidebar__index-title-text");

    if (!text) {
      return;
    }

    const overflowAmount = text.scrollWidth - link.clientWidth;

    if (overflowAmount > 4) {
      link.classList.add("is-overflowing");
      link.style.setProperty("--marquee-shift", `${-overflowAmount - 12}px`);
    }
  });
};

const prefetchDocument = (() => {
  const prefetched = new Set();

  return (href) => {
    if (!href || prefetched.has(href)) {
      return;
    }

    prefetched.add(href);

    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = href;
    document.head.appendChild(link);
  };
})();

const bindPageTransitions = () => {
  const workLinks = document.querySelectorAll(".card__link, .sidebar__index-title");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  workLinks.forEach((link) => {
    prefetchDocument(link.href);

    link.addEventListener("mouseenter", () => {
      prefetchDocument(link.href);
    });

    link.addEventListener("focus", () => {
      prefetchDocument(link.href);
    });

    link.addEventListener("click", (event) => {
      if (
        reduceMotion.matches ||
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }

      event.preventDefault();
      document.body.classList.add("is-transitioning");

      window.setTimeout(() => {
        window.location.href = link.href;
      }, 340);
    });
  });
};

if (galleryRoot) {
  works.forEach((work) => {
    galleryRoot.appendChild(createGalleryCard(work));
  });
}

if (indexRoot) {
  works.forEach((work, index) => {
    indexRoot.appendChild(createIndexRow(work, index));
  });
}

bindOverflowTitles();
bindPageTransitions();
