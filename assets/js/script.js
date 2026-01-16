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
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 3,
    spaceBetween: 30,
    coverflowEffect: {
        rotate: 0,  // Ângulo de rotação dos cards laterais (em graus)
        stretch: 0,  // Esticamento dos slides (0 = sem esticar)
        depth: 300,  // Profundidade 3D (distância entre slides)
        modifier: 2,  // Multiplicador do efeito coverflow
        slideShadows: true,  // Sombra nos slides
    },
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    on: {
        slideChange: function () {
            // Esconde todas as legendas primeiro
            const allSlides = this.slides;
            allSlides.forEach(slide => {
                const description = slide.querySelector('.slide-description');
                if (description) {
                    description.style.opacity = '0';
                    description.style.transform = 'translateY(30px)';
                }
            });

            // Mostra a legenda apenas do slide ativo
            const activeSlide = this.slides[this.activeIndex];
            if (activeSlide) {
                const description = activeSlide.querySelector('.slide-description');
                if (description) {
                    setTimeout(() => {
                        description.style.opacity = '1';
                        description.style.transform = 'translateY(0)';
                    }, 100);
                }
            }
        }
    },
    breakpoints: {
        400: {
            slidesPerView: 1,
            effect: 'slide',
            spaceBetween: 10
        },
        768: {
            slidesPerView: 3,
            effect: 'coverflow',
            spaceBetween: 20,
            coverflowEffect: {
                rotate: 15,  // Ângulo de rotação
                stretch: 0,
                depth: 150,  // Menos profundidade em tablets
                modifier: 1.3,
                slideShadows: true,
            }
        },
        1024: {
            slidesPerView: 3,
            effect: 'coverflow',
            spaceBetween: 30,
            coverflowEffect: {
                rotate: 15,  // Ângulo de rotação
                stretch: 0,
                depth: 200,  // Mais profundidade em desktop
                modifier: 1.5,
                slideShadows: true,
            }
        }
    }
});
