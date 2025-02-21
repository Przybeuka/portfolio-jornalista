document.querySelector('.hamburgerMenu').addEventListener('click', () => {
    document.querySelector('.container').classList.toggle('show-menu');
});

// 2) Inicializa o Swiper
var swiper = new Swiper('.mySwiper', {
    slidesPerView: 2,
    spaceBetween: 20,
    slidesPerGroup: 2,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

const btnProjetos = document.getElementById('btnProjetos');
btnProjetos.addEventListener('click', () => {
    document.querySelector('#sobre-mim').scrollIntoView({
        behavior: 'smooth'
    });
});

// ...
fetch('data.json')
    .then(res => res.json())
    .then(data => {

        // 1) INSERE PROJETOS
        const projectGrid = document.querySelector('.project-grid'); // <-- CORRETO
        data.projetos.forEach(proj => {
            const card = document.createElement('div');
            card.classList.add('project-card');
            card.innerHTML = `
        <img src=${proj.imagem} alt="Posts" />
        <h3>${proj.titulo}</h3>
        <p>${proj['descrição']}</p>
        <a href="${proj.link}" target="_blank">Saiba Mais</a>
      `;
            projectGrid.appendChild(card);
        });

        // 2) INSERE EXPERIÊNCIAS
        const barraXp = document.querySelector('.experience-grid');
        data.experiencias.forEach(exp => {
            const div = document.createElement('div');
            div.classList.add('exp-item');
            div.innerHTML = `
                <h3>${exp.local}</h3>
                <p>${exp.texto}</p>
              `;
            barraXp.appendChild(div);
        });
    })
    .catch(err => console.error('Erro ao carregar data.json:', err));

// Caso use esse Swiper para galeria
var swiperGallery = new Swiper('.mySwiperGallery', {
    slidesPerView: 2,
    spaceBetween: 10,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    // Responsivo
    breakpoints: {
        768: {
            slidesPerView: 3
        },
        1024: {
            slidesPerView: 4
        }
    }
});
