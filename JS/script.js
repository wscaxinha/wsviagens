// Seleciona os elementos
const hamburgerButton = document.querySelector("#hamburgerButton");
const navLinks = document.querySelector("#navLinks");
const closeButton = document.createElement("button");

// Cria o botão de fechar
closeButton.innerHTML = '<i class="fas fa-times"></i>';
closeButton.classList.add("close-button");
closeButton.setAttribute("aria-label", "Fechar menu");
navLinks.appendChild(closeButton);

// Função para abrir o menu
hamburgerButton.addEventListener("click", function () {
    navLinks.classList.add("active", "show");
});

// Função para fechar o menu
closeButton.addEventListener("click", function () {
    navLinks.classList.remove("show");
    setTimeout(() => {
        navLinks.classList.remove("active");
    }, 300); // Tempo da transição
});

// Interatividade do Banner
const bannerButton = document.getElementById("bannerButton");

bannerButton.addEventListener("click", function () {
    alert("Explore nossos destinos incríveis!");
});