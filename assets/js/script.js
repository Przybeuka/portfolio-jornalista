document.querySelector('.hamburgerMenu').addEventListener('click', () => {
    document.querySelector('.container').classList.toggle('show-menu');
});

const btnProjetos = document.getElementById('btnProjetos');
btnProjetos.addEventListener('click', () => {
    document.querySelector('#sobre-mim').scrollIntoView({
        behavior: 'smooth'
    });
});

fetch('data.json')
    .then(res => res.json())
    .then(data => {

        // 1) INSERE PROJETOS
        const projectGrid = document.querySelector('.project-grid');
        data.projetos.forEach(proj => {
            const card = document.createElement('div');
            card.classList.add('bg-background-light', 'dark:bg-background-dark', 'rounded-xl', 'shadow-md', 'overflow-hidden', 'flex', 'flex-col');
            card.innerHTML = `
        <img src="${proj.imagem}" alt="${proj.titulo}" class="w-full h-48 object-cover rounded-t-xl" />
        <div class="p-6 flex flex-col flex-grow">
          <div class="h-20 flex items-center justify-center mb-4">
            <h3 class="font-bold text-base text-slate-800 dark:text-slate-200 uppercase tracking-wide text-center">${proj.titulo}</h3>
          </div>
          <div class="mb-4 flex-grow">
            <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed text-justify">${proj['descrição']}</p>
          </div>
          <a href="${proj.link}" target="_blank" class="block w-full text-center bg-slate-700 dark:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-500 transition-colors duration-300">SAIBA MAIS</a>
        </div>
      `;
            projectGrid.appendChild(card);
        });

        // 2) INSERE EXPERIÊNCIAS
        const barraXp = document.querySelector('.experience-grid');
        data.experiencias.forEach(exp => {
            const div = document.createElement('div');
            div.classList.add('bg-background-light', 'dark:bg-background-dark', 'p-6', 'rounded-lg', 'shadow-md');
            div.innerHTML = `
                <h3 class="text-xl font-semibold text-slate-900 dark:text-white text-center">${exp.local}</h3>
                <p class="mt-2 text-slate-600 dark:text-slate-400 text-justify">${exp.texto}</p>
              `;
            barraXp.appendChild(div);
        });
    })
    .catch(err => console.error('Erro ao carregar data.json:', err));

var swiperGallery = new Swiper('.mySwiperGallery', {
    // Configuração Padrão (Mobile First - Telas < 640px)
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto", // Importante: deixa o CSS controlar a largura base
    initialSlide: 1, // Começa no segundo slide para estética
    loop: true,
    speed: 600, // Transição mais suave

    // Efeito 3D ajustado para não quebrar no mobile
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: true,
    },

    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true, // Bolinhas dinâmicas ocupam menos espaço
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },

    // Breakpoints (Pontos de quebra)
    breakpoints: {
        // Quando a tela for >= 640px (Tablet pequeno)
        640: {
            slidesPerView: 2,
            coverflowEffect: {
                depth: 150,
                modifier: 1.5,
            }
        },
        // Quando a tela for >= 1024px (Desktop)
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
            coverflowEffect: {
                rotate: 5, // Gira um pouco apenas no desktop
                depth: 300,
                modifier: 1,
            }
        }
    },

    // Eventos para legenda (Mantido sua lógica, apenas limpa)
    on: {
        slideChangeTransitionStart: function () {
            // Oculta legendas ao começar a mover
            document.querySelectorAll('.slide-description').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
            });
        },
        slideChangeTransitionEnd: function () {
            // Mostra legenda do ativo ao parar
            const activeSlide = this.slides[this.activeIndex];
            const desc = activeSlide.querySelector('.slide-description');
            if (desc) {
                desc.style.opacity = '1';
                desc.style.transform = 'translateY(0)';
            }
        }
    }
});
