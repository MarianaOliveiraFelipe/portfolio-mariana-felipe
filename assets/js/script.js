'use strict';


/**
 * Add eventListener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};


/**
 * PRELOADER
 */

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});


/**
 * HEADER
 * Carrega o header externo
 */

fetch('./header.html')
  .then(response => response.text())
  .then(data => {

    document.getElementById('header-container').innerHTML = data;

    /**
     * MOBILE NAV TOGGLE
     */

    const navbar = document.querySelector("[data-navbar]");
    const navToggler = document.querySelector("[data-nav-toggler]");

    if (navbar && navToggler) {
      navToggler.addEventListener("click", function () {
        navbar.classList.toggle("active");
      });
    }


    /**
     * HEADER SCROLL
     */

    const header = document.querySelector("[data-header]");

    const activeHeader = function () {
      if (window.scrollY > 50) {
        header.classList.add("active");
      } else {
        header.classList.remove("active");
      }
    };

    window.addEventListener("scroll", activeHeader);

    activeHeader();


    /**
     * MENU ATIVO AUTOMÁTICO
     */

    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".navbar-link").forEach(link => {

      link.classList.remove("active");

      const href = link.getAttribute("href")
        .replace("./", "")
        .replace("/", "");

      if (href === currentPage) {
        link.classList.add("active");
      }
    });

  })
  .catch(error => {
    console.error('Erro ao carregar o header:', error);
  });