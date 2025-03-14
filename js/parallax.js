document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todas as seções com efeito parallax
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    // Função para aplicar o efeito de animação nas caixas de conteúdo
    function applyContentBoxAnimation() {
        parallaxSections.forEach(section => {
            // Verifica se a seção está visível na viewport
            const rect = section.getBoundingClientRect();
            const isVisible = (
                rect.top < window.innerHeight &&
                rect.bottom > 0
            );
            
            if (isVisible) {
                // Adiciona classe para animar a caixa de conteúdo
                const contentBox = section.querySelector('.content-box');
                if (contentBox) {
                    contentBox.classList.add('visible');
                }
            }
        });
    }
    
    // Aplica a animação no carregamento da página
    applyContentBoxAnimation();
    
    // Aplica a animação durante o scroll
    window.addEventListener('scroll', applyContentBoxAnimation);
    
    // Adiciona navegação suave para os links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Adiciona botões de navegação para avançar/retroceder entre seções
    const sections = document.querySelectorAll('.parallax-section');
    
    sections.forEach((section, index) => {
        // Cria botões de navegação
        const navButtons = document.createElement('div');
        navButtons.className = 'section-nav';
        
        // Botão para seção anterior
        if (index > 0) {
            const prevButton = document.createElement('button');
            prevButton.className = 'nav-btn prev-btn';
            prevButton.innerHTML = '&uarr;';
            prevButton.setAttribute('aria-label', 'Seção anterior');
            prevButton.addEventListener('click', () => {
                window.scrollTo({
                    top: sections[index - 1].offsetTop,
                    behavior: 'smooth'
                });
            });
            navButtons.appendChild(prevButton);
        }
        
        // Botão para próxima seção
        if (index < sections.length - 1) {
            const nextButton = document.createElement('button');
            nextButton.className = 'nav-btn next-btn';
            nextButton.innerHTML = '&darr;';
            nextButton.setAttribute('aria-label', 'Próxima seção');
            nextButton.addEventListener('click', () => {
                window.scrollTo({
                    top: sections[index + 1].offsetTop,
                    behavior: 'smooth'
                });
            });
            navButtons.appendChild(nextButton);
        }
        
        section.appendChild(navButtons);
    });
    
    // Adiciona efeito de revelação ao rolar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.content-box').forEach(box => {
        observer.observe(box);
    });
}); 