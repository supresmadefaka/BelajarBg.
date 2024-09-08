const slider = document.querySelector(".slider");
const list = document.querySelector(".list");
const thumbnail = document.querySelector(".thumbnail");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");

let canChange = true; // Variabel untuk melacak apakah slider dapat diubah
let autoPlayInterval; // Interval untuk auto play
let currentIndex = 0; // Menyimpan indeks saat ini dari slide

const startAutoPlay = () => {
  autoPlayInterval = setInterval(() => {
    if (canChange) {
      next.click();
    }
  }, 7000); // Jeda 7 detik
};

const stopAutoPlay = () => {
  clearInterval(autoPlayInterval);
};

startAutoPlay();

next.addEventListener("click", () => {
  if (canChange) {
    initSlider("next");
  }
});

prev.addEventListener("click", () => {
  if (canChange) {
    initSlider("prev");
  }
});

thumbnail.querySelectorAll(".item").forEach((item, index) => {
  item.addEventListener("click", () => {
    if (canChange) {
      stopAutoPlay(); // Hentikan auto play saat thumbnail diklik
      goToItem(index);
      startAutoPlay(); // Mulai auto play kembali setelah pergeseran
    }
  });
});

const initSlider = (type) => {
  const sliderItems = list.querySelectorAll(".item");
  const thumbnails = thumbnail.querySelectorAll(".item");

  if (type === "next") {
    list.appendChild(sliderItems[0]);
    thumbnail.appendChild(thumbnails[0]);
    currentIndex = (currentIndex + 1) % sliderItems.length;
  } else if (type === "prev") {
    const lastItemPosition = sliderItems.length - 1;
    list.prepend(sliderItems[lastItemPosition]);
    thumbnail.prepend(thumbnails[lastItemPosition]);
    currentIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
  }

  canChange = false;

  setTimeout(() => {
    slider.classList.remove("next");
    slider.classList.remove("prev");
    setTimeout(() => {
      canChange = true;
    }, 2000); // Jeda 2 detik sebelum bisa mengubah slider lagi
  }, 800);

  stopAutoPlay();
  startAutoPlay();
};

const goToItem = (index) => {
  const sliderItems = list.querySelectorAll(".item");
  const thumbnails = thumbnail.querySelectorAll(".item");

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  while (thumbnail.firstChild) {
    thumbnail.removeChild(thumbnail.firstChild);
  }

  for (let i = index; i < sliderItems.length; i++) {
    list.appendChild(sliderItems[i]);
    thumbnail.appendChild(thumbnails[i]);
  }

  for (let i = 0; i < index; i++) {
    list.appendChild(sliderItems[i]);
    thumbnail.appendChild(thumbnails[i]);
  }

  slider.classList.add("next");

  canChange = false;

  setTimeout(() => {
    slider.classList.remove("next");
    slider.classList.remove("prev");
    setTimeout(() => {
      canChange = true;
    }, 2000); // Jeda 2 detik sebelum bisa mengubah slider lagi
  }, 800);
};
