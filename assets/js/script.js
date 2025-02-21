document.querySelector('.hamburgerMenu').addEventListener('click', () => {
    document.querySelector('.container').classList.toggle('show-menu');
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
    slidesPerView: 1,
    spaceBetween: 0,
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
        400: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 4
        }
    }
});
