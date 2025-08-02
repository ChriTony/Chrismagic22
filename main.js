document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Dropdown Menu Functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        // For desktop - hover
        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                dropdown.classList.add('active');
            }
        });
        
        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                dropdown.classList.remove('active');
            }
        });
        
        // For mobile - click
        if (link) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                }
            });
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's a dropdown toggle on mobile
            if (href === '#' || (window.innerWidth <= 768 && this.closest('.dropdown'))) {
                return;
            }
            
            // If it's an anchor link on the same page
            if (href.startsWith('#') && document.querySelector(href)) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
                
                // Scroll to section
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, href);
            }
        });
    });
    
    // Highlight current page in navigation
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        // Remove active class from all links
        link.classList.remove('active');
        
        // Add active class to current page link
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
        
        // Special case for index.html which might be just '/'
        if (currentPage === '/' && linkPage === 'index.html') {
            link.classList.add('active');
        }
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Grazie per il tuo messaggio! Ti risponderemo al più presto.');
            this.reset();
        });
    }
    
    // Gallery lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        // Create lightbox container
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.display = 'none';
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0,0,0,0.9)';
        lightbox.style.zIndex = '10000';
        lightbox.style.display = 'flex';
        lightbox.style.alignItems = 'center';
        lightbox.style.justifyContent = 'center';
        lightbox.style.opacity = '0';
        lightbox.style.transition = 'opacity 0.3s ease';
        
        // Create lightbox content
        const lightboxContent = document.createElement('div');
        lightboxContent.style.position = 'relative';
        lightboxContent.style.maxWidth = '90%';
        lightboxContent.style.maxHeight = '90%';
        
        const lightboxImg = document.createElement('img');
        lightboxImg.style.maxWidth = '100%';
        lightboxImg.style.maxHeight = '90vh';
        lightboxImg.style.borderRadius = '5px';
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '-40px';
        closeBtn.style.right = '0';
        closeBtn.style.background = 'transparent';
        closeBtn.style.border = 'none';
        closeBtn.style.color = 'white';
        closeBtn.style.fontSize = '1.5rem';
        closeBtn.style.cursor = 'pointer';
        
        lightboxContent.appendChild(lightboxImg);
        lightboxContent.appendChild(closeBtn);
        lightbox.appendChild(lightboxContent);
        document.body.appendChild(lightbox);
        
        // Add click events to gallery items
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                lightboxImg.src = imgSrc;
                lightbox.style.opacity = '1';
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close lightbox
        closeBtn.addEventListener('click', () => {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                document.body.style.overflow = 'auto';
            }, 300);
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        });
    }
});