const detailWorks = window.worksData || [];

const normalizeDetailPath = (path = "") => path.replace(/^\.\//, "../");

const workId = document.body.dataset.workId;
const work = detailWorks.find((item) => item.id === workId);

if (work) {
  document.title = work.title;

  const topbarTitle = document.querySelector("[data-work-title]");
  const topbarYear = document.querySelector("[data-work-year]");
  const infoTitle = document.querySelector(".work-info__title");
  const gallery = document.querySelector(".work-gallery");

  if (topbarTitle) {
    topbarTitle.textContent = work.title;
  }

  if (topbarYear) {
    topbarYear.textContent = work.year;
  }

  if (infoTitle) {
    infoTitle.textContent = work.title;
  }

  if (gallery) {
    gallery.setAttribute("aria-label", `${work.title} 이미지`);
    gallery.innerHTML = "";

    const images = work.gallery && work.gallery.length ? work.gallery : [work.image];

    images.forEach((src, index) => {
      const figure = document.createElement("figure");
      figure.className = "work-figure";

      const img = document.createElement("img");
      img.src = normalizeDetailPath(src);
      img.alt = index === 0 ? `${work.title} 대표 이미지` : `${work.title} 이미지 ${index}`;

      if (index > 1) {
        img.loading = "lazy";
      } else {
        img.fetchPriority = "high";
      }

      figure.appendChild(img);
      gallery.appendChild(figure);
    });
  }
}
