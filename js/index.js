"use strict";
import gallery from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  modal: document.querySelector(".js-lightbox"),
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
  modalImage: document.querySelector(".lightbox__image"),
  overlay: document.querySelector(".lightbox__overlay"),
};

function createGallery(gallery) {
  const makeThree = gallery.map((image) => {
    const galleryItem = document.createElement("li");
    galleryItem.classList.add("gallery__item");

    const galleryLink = document.createElement("a");
    galleryLink.classList.add("gallery__link");
    galleryLink.href = image.original;

    const galleryImg = document.createElement("img");
    galleryImg.classList.add("gallery__image");
    galleryImg.src = image.preview;
    galleryImg.dataset.source = image.original;
    galleryImg.alt = image.description;

    galleryLink.appendChild(galleryImg);
    galleryItem.appendChild(galleryLink);

    return galleryItem;
  });

  refs.gallery.append(...makeThree);
}
createGallery(gallery);

refs.gallery.addEventListener("click", onGallaryClick);
refs.closeModalBtn.addEventListener("click", onCloseModal);

function onGallaryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }

  const bigImage = event.target.dataset.source;
  onOpenModal(bigImage);
}

function onOpenModal(url) {
  refs.overlay.addEventListener("click", (event) => {
    if (event.target.nodeName !== "IMG") {
      onCloseModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      onCloseModal();
    }
  });

  refs.modal.classList.add("is-open");
  refs.modalImage.src = url;
}

function onCloseModal() {
  refs.modal.classList.remove("is-open");
  refs.modalImage.src = "";
}
