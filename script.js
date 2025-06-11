document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const menuMobile = document.querySelector('.menu-mobile');
    const menu = document.querySelector('.menu ul');
    
    menuMobile.addEventListener('click', function() {
        menu.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // Fechar menu ao clicar em um link
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
            menuMobile.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animação ao rolar
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .gallery-item, .about-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configuração inicial para elementos animados
    const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .about-image');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executa uma vez ao carregar a página
    
    // Validação do formulário
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação simples
            const nome = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const mensagem = this.querySelector('textarea').value;
            
            if (nome.trim() === '' || email.trim() === '' || mensagem.trim() === '') {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Simulação de envio
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
        });
    }
    
    // Galeria lightbox (simplificado)
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const lightbox = document.createElement('div');
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.backgroundColor = 'rgba(0,0,0,0.9)';
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightbox.style.zIndex = '10000';
            lightbox.style.cursor = 'zoom-out';
            
            const img = document.createElement('img');
            img.src = imgSrc;
            img.style.maxWidth = '90%';
            img.style.maxHeight = '90%';
            img.style.objectFit = 'contain';
            
            lightbox.appendChild(img);
            document.body.appendChild(lightbox);
            
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
        });
    });

    // Carrossel automático para a seção "Por que Contratar" - MOVIDO PARA DENTRO DO MESMO EVENT LISTENER
    const carrossel = {
        init: function() {
            this.slides = document.querySelectorAll('.carousel-slide');
            if (this.slides.length === 0) return; // Adicionei esta verificação
            
            this.currentSlide = 0;
            this.interval = null;
            this.startCarousel();
            this.setupEventListeners();
        },
        
        startCarousel: function() {
            // Garante que há slides antes de iniciar
            if (this.slides.length === 0) return;
            
            // Ativa o primeiro slide se nenhum estiver ativo
            const activeSlide = document.querySelector('.carousel-slide.active');
            if (!activeSlide && this.slides.length > 0) {
                this.slides[0].classList.add('active');
            }
            
            this.interval = setInterval(() => {
                this.nextSlide();
            }, 2000); // 2 segundos
        },
        
        nextSlide: function() {
            this.slides[this.currentSlide].classList.remove('active');
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            this.slides[this.currentSlide].classList.add('active');
        },
        
        pauseCarousel: function() {
            clearInterval(this.interval);
        },
        
        resumeCarousel: function() {
            this.startCarousel();
        },
        
        setupEventListeners: function() {
            const carouselContainer = document.querySelector('.image-carousel');
            
            if (carouselContainer) {
                carouselContainer.addEventListener('mouseenter', () => {
                    this.pauseCarousel();
                });
                
                carouselContainer.addEventListener('mouseleave', () => {
                    this.resumeCarousel();
                });
            }
        }
    };
    
    carrossel.init();
});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fecha outros itens abertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alterna o item atual
            item.classList.toggle('active');
        });
    });
    
    // Abre o primeiro item por padrão
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
});
// Adicione este código ao seu arquivo JS existente
document.addEventListener('DOMContentLoaded', function() {
    // Animação dos cards de informação
    const infoCards = document.querySelectorAll('.info-card');
    
    const animateCards = () => {
        infoCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 * index);
        });
    };
    
    // Observador de interseção para animação quando a seção é visualizada
    const locationSection = document.querySelector('.location');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCards();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(locationSection);
    
    // Inicializa os cards com estilo inicial para animação
    infoCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
});