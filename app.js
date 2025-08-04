
// Responsive detection that updates on resize
function getDeviceInfo() {
    const width = window.innerWidth;
    return {
        isExtraSmallMobile: width <= 320,
        isSmallMobile: width <= 460,
        isMobile: width <= 768,
        isTablet: width <= 1024,
        width: width
    };
}

let deviceInfo = getDeviceInfo();

document.addEventListener('DOMContentLoaded', function() {
        const sectionsContainer = document.getElementById('sections-container');
        const sections = document.querySelectorAll('.section');
        const navDotsContainer = document.getElementById('nav-dots');
        let currentIndex = 0;
        let isWheeling = false;
        const totalSections = sections.length;
        
        console.log(`Found ${totalSections} sections:`, sections);

        for (let i = 0; i < totalSections; i++) {
            const dot = document.createElement('button');
            dot.setAttribute('aria-label', `Go to section ${i + 1}`);
            dot.addEventListener('click', () => goToSection(i));
            navDotsContainer.appendChild(dot);
        }
        const navDots = navDotsContainer.querySelectorAll('button');
        
        const heroSection = document.querySelector('.section:first-child');
        if (heroSection) {
            setTimeout(() => {
                heroSection.classList.add('active');
            }, 100);
        }
        
        // Initialize pricing section animation if it's visible on load
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
            setTimeout(() => {
                // Check if pricing section is in view on load
                const rect = pricingSection.getBoundingClientRect();
                if (rect.top >= 0 && rect.top <= window.innerHeight) {
                    pricingSection.classList.add('active');
                }
            }, 100);
        }

        function updateNavDots() {
            navDots.forEach((dot, i) => {
                if (i === currentIndex) {
                    dot.classList.add('bg-white');
                } else {
                    dot.classList.remove('bg-white');
                }
            });
        }

        function goToSection(index) {
            if (index < 0 || index >= totalSections) return;
            console.log(`Navigation: Going from section ${currentIndex} to section ${index}`);
            const previousIndex = currentIndex;
            currentIndex = index;
            
            // Use dynamic viewport height for better mobile support
            const vh = window.innerHeight;
            sectionsContainer.style.transform = `translateY(-${currentIndex * vh}px)`;
            console.log(`Applied transform: translateY(-${currentIndex * vh}px)`);
            updateNavDots();
            
            
            const heroSection = document.querySelector('.section:first-child');
            const heroSectionIndex = 0;
            
            if (heroSection) {
                if (currentIndex === heroSectionIndex) {
                    heroSection.classList.remove('scroll-out');
                    heroSection.classList.add('active');
                }
                else if (previousIndex === heroSectionIndex && currentIndex !== heroSectionIndex) {
                    heroSection.classList.add('scroll-out');
                    heroSection.classList.remove('active');
                }
                else if (currentIndex !== heroSectionIndex) {
                    heroSection.classList.remove('active');
                }
            }
            
            const philosophySection = document.getElementById('philosophy');
            const philosophySectionIndex = 2;
            
            if (philosophySection) {
                if (currentIndex === philosophySectionIndex) {
                    philosophySection.classList.remove('scroll-out');
                    philosophySection.classList.add('active');
                }
                else if (previousIndex === philosophySectionIndex && currentIndex !== philosophySectionIndex) {
                    philosophySection.classList.add('scroll-out');
                    philosophySection.classList.remove('active');
                }
                else if (previousIndex < philosophySectionIndex && currentIndex > philosophySectionIndex) {
                    philosophySection.classList.add('scroll-out');
                    philosophySection.classList.remove('active');
                }
                else if (currentIndex !== philosophySectionIndex) {
                    philosophySection.classList.remove('active');
                }
            }
            
            const servicesSection = document.getElementById('services');
            const servicesSectionIndex = 4;
            
            if (servicesSection) {
                if (currentIndex === servicesSectionIndex) {
                    servicesSection.classList.remove('scroll-out');
                    servicesSection.classList.add('active');
                }
                else if (previousIndex === servicesSectionIndex && currentIndex !== servicesSectionIndex) {
                    servicesSection.classList.add('scroll-out');
                    servicesSection.classList.remove('active');
                }
                else if (previousIndex < servicesSectionIndex && currentIndex > servicesSectionIndex) {
                    servicesSection.classList.add('scroll-out');
                    servicesSection.classList.remove('active');
                }
                else if (currentIndex !== servicesSectionIndex) {
                    servicesSection.classList.remove('active');
                }
            }
            
            const pricingSection = document.getElementById('pricing');
            const pricingSectionIndex = 5;
            
            if (pricingSection) {
                if (currentIndex === pricingSectionIndex) {
                    pricingSection.classList.remove('scroll-out');
                    pricingSection.classList.add('active');
                }
                else if (previousIndex === pricingSectionIndex && currentIndex !== pricingSectionIndex) {
                    pricingSection.classList.add('scroll-out');
                    pricingSection.classList.remove('active');
                }
                else if (previousIndex < pricingSectionIndex && currentIndex > pricingSectionIndex) {
                    pricingSection.classList.add('scroll-out');
                    pricingSection.classList.remove('active');
                }
                else if (currentIndex !== pricingSectionIndex) {
                    pricingSection.classList.remove('active');
                }
            }
            
            const storySection = document.getElementById('story');
            const storySectionIndex = 3;
            
            if (storySection) {
                if (currentIndex === storySectionIndex) {
                    storySection.classList.remove('scroll-out');
                    storySection.classList.add('active');
                }
                else if (previousIndex === storySectionIndex && currentIndex !== storySectionIndex) {
                    storySection.classList.add('scroll-out');
                    storySection.classList.remove('active');
                }
                else if (previousIndex < storySectionIndex && currentIndex > storySectionIndex) {
                    storySection.classList.add('scroll-out');
                    storySection.classList.remove('active');
                }
                else if (currentIndex !== storySectionIndex) {
                    storySection.classList.remove('active');
                }
            }
        }

        window.addEventListener('wheel', event => {
            event.preventDefault();
            if (isWheeling) return;

            if (Math.abs(event.deltaY) > 50) {
                isWheeling = true;
                const direction = event.deltaY > 0 ? 1 : -1;
                goToSection(currentIndex + direction);

                setTimeout(() => { isWheeling = false; }, 1500);
            }
        }, { passive: false });

        let touchStartY = 0;
        let touchEndY = 0;
        let touchStartTime = 0;
        let isTouching = false;

        window.addEventListener('touchstart', e => {
            touchStartY = e.changedTouches[0].screenY;
            touchStartTime = Date.now();
            isTouching = false;
        }, { passive: true });

        window.addEventListener('touchmove', e => {
            if (Math.abs(e.changedTouches[0].screenY - touchStartY) > 20) {
                e.preventDefault();
            }
        }, { passive: false });

        window.addEventListener('touchend', e => {
            if (isTouching) return;
            
            touchEndY = e.changedTouches[0].screenY;
            const touchDiff = touchStartY - touchEndY;
            const touchTime = Date.now() - touchStartTime;
            
            const minSwipeDistance = 30;
            const maxSwipeTime = 800;
            
            if (Math.abs(touchDiff) > minSwipeDistance && touchTime < maxSwipeTime) {
                isTouching = true;
                const direction = touchDiff > 0 ? 1 : -1;
                goToSection(currentIndex + direction);
                
                setTimeout(() => { isTouching = false; }, 800);
            }
        }, { passive: true });

        window.addEventListener('keydown', e => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                goToSection(currentIndex + 1);
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                goToSection(currentIndex - 1);
            } else if (e.key === 'Home') {
                e.preventDefault();
                goToSection(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                goToSection(totalSections - 1);
            }
        });
        
        
        window.addEventListener('resize', () => {
            // Update device info on resize
            deviceInfo = getDeviceInfo();
            
            // Recalculate section positions
            goToSection(currentIndex);
            
            // Update mobile video sources if needed
            setupMobileVideos();
            
            // Handle contact form responsiveness
            handleContactFormResize();
        });
        
        updateNavDots();
});

function setupMobileVideos() {
    const { isMobile, isSmallMobile, isExtraSmallMobile } = deviceInfo;
    
    // Setup hero video based on device type - only load one video
    setupHeroVideo(isMobile || isSmallMobile || isExtraSmallMobile);
    
    // Setup pricing video based on device type
    setupPricingVideo(isMobile || isSmallMobile || isExtraSmallMobile);
    
    if (isMobile || isSmallMobile || isExtraSmallMobile) {
        const whyUsVideo = document.querySelector('#why-us video source');
        if (whyUsVideo && !whyUsVideo.src.includes('Boxing-mobile.mp4')) {
            whyUsVideo.src = './assets/Boxing-mobile.mp4';
            const videoElement = whyUsVideo.parentElement;
            videoElement.load();
        }

        const finalCtaVideo = document.querySelector('#final-cta video source');
        if (finalCtaVideo && !finalCtaVideo.src.includes('services-mobile.mp4')) {
            finalCtaVideo.src = './assets/services-mobile.mp4';
            const videoElement = finalCtaVideo.parentElement;
            videoElement.load();
        }
    }

    const servicesVideo = document.querySelector('#services video source');
    if (servicesVideo && !servicesVideo.src.includes('servicesBG.mp4')) {
        servicesVideo.src = './assets/servicesBG.mp4';
        const videoElement = servicesVideo.parentElement;
        videoElement.load();
    }
}

function setupHeroVideo(isMobileDevice) {
    const heroVideoContainer = document.getElementById('hero-video-container');
    const desktopVideoContainer = document.querySelector('.hero-video-container');
    
    // Clear existing videos to ensure only one loads
    if (heroVideoContainer) heroVideoContainer.innerHTML = '';
    if (desktopVideoContainer) desktopVideoContainer.innerHTML = '';
    
    if (isMobileDevice) {
        // Create mobile full-screen video only
        const mobileVideo = document.createElement('video');
        mobileVideo.autoplay = true;
        mobileVideo.loop = true;
        mobileVideo.muted = true;
        mobileVideo.playsInline = true;
        mobileVideo.className = 'hero-mobile-video absolute inset-0 w-full h-full object-cover';
        
        const mobileSource = document.createElement('source');
        mobileSource.src = './assets/Hero-mobile.mp4';
        mobileSource.type = 'video/mp4';
        
        mobileVideo.appendChild(mobileSource);
        if (heroVideoContainer) heroVideoContainer.appendChild(mobileVideo);
    } else {
        // Create desktop split-layout video only
        const desktopVideo = document.createElement('video');
        desktopVideo.autoplay = true;
        desktopVideo.loop = true;
        desktopVideo.muted = true;
        desktopVideo.playsInline = true;
        desktopVideo.className = 'hero-desktop-video';
        
        const desktopSource = document.createElement('source');
        desktopSource.src = './assets/PowerRhythmSoul.mp4';
        desktopSource.type = 'video/mp4';
        
        desktopVideo.appendChild(desktopSource);
        if (desktopVideoContainer) desktopVideoContainer.appendChild(desktopVideo);
    }
}

function setupPricingVideo(isMobileDevice) {
    const pricingVideoContainer = document.getElementById('pricing-video-container');
    const desktopPricingVideoContainer = document.querySelector('.pricing-video-container');
    
    // Clear existing videos to ensure only one loads
    if (pricingVideoContainer) pricingVideoContainer.innerHTML = '';
    if (desktopPricingVideoContainer) desktopPricingVideoContainer.innerHTML = '';
    
    if (isMobileDevice) {
        // Create mobile full-screen background video
        const mobileVideo = document.createElement('video');
        mobileVideo.autoplay = true;
        mobileVideo.loop = true;
        mobileVideo.muted = true;
        mobileVideo.playsInline = true;
        mobileVideo.className = 'pricing-mobile-video absolute inset-0 w-full h-full object-cover';
        
        const mobileSource = document.createElement('source');
        mobileSource.src = './assets/SwitchLogo.mp4';
        mobileSource.type = 'video/mp4';
        
        mobileVideo.appendChild(mobileSource);
        if (pricingVideoContainer) pricingVideoContainer.appendChild(mobileVideo);
    } else {
        // Create desktop split-layout video
        const desktopVideo = document.createElement('video');
        desktopVideo.autoplay = true;
        desktopVideo.loop = true;
        desktopVideo.muted = true;
        desktopVideo.playsInline = true;
        desktopVideo.className = 'pricing-desktop-video';
        
        const desktopSource = document.createElement('source');
        desktopSource.src = './assets/SwitchLogo.mp4';
        desktopSource.type = 'video/mp4';
        
        desktopVideo.appendChild(desktopSource);
        if (desktopPricingVideoContainer) desktopPricingVideoContainer.appendChild(desktopVideo);
    }
}


setupMobileVideos();

// Handle contact form responsive behavior
function handleContactFormResize() {
    const contactSection = document.getElementById('contact');
    const contactContainer = document.querySelector('.contact-container');
    
    if (contactSection && contactContainer) {
        const { isMobile, isSmallMobile } = deviceInfo;
        
        // Adjust contact section height for better mobile experience
        if (isMobile) {
            contactSection.style.minHeight = `${window.innerHeight}px`;
            if (isSmallMobile) {
                contactContainer.style.padding = '1rem 0.5rem';
            } else {
                contactContainer.style.padding = '1.5rem 1rem';
            }
        } else {
            contactSection.style.minHeight = '100vh';
            contactContainer.style.padding = '';
        }
    }
}

// Mobile-specific touch improvements
function initMobileTouchHandlers() {
    const { isMobile } = deviceInfo;
    
    if (isMobile) {
        // Prevent zoom on form inputs
        const inputs = document.querySelectorAll('.contact-input, .contact-select, .contact-textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                if (this.style.fontSize !== '16px') {
                    this.style.fontSize = '16px';
                }
            });
        });
        
        // Improve touch targets
        const buttons = document.querySelectorAll('.contact-submit-button, .contact-alt-button');
        buttons.forEach(button => {
            button.style.minHeight = '48px';
            button.style.minWidth = '48px';
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const servicesVideo = document.getElementById('services-video');
    let hasPlayedOnce = false;
    
    if (servicesVideo) {
        // Remove loop attribute and don't auto-replay
        servicesVideo.removeAttribute('loop');
        servicesVideo.pause();
        
        // Create intersection observer to play video once when section is visible
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasPlayedOnce) {
                    servicesVideo.currentTime = 0;
                    servicesVideo.play().catch(e => console.log('Video play failed:', e));
                    hasPlayedOnce = true;
                }
            });
        }, {
            threshold: 0.5 // Play when 50% of the section is visible
        });
        
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            videoObserver.observe(servicesSection);
        }
    }
});

function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
}

if (localStorage.getItem('highContrast') === 'true') {
    document.body.classList.add('high-contrast');
}

let currentFontSize = 16;

function increaseFontSize() {
    if (currentFontSize < 24) {
        currentFontSize += 2;
        document.documentElement.style.fontSize = currentFontSize + 'px';
        localStorage.setItem('fontSize', currentFontSize);
    }
}

function decreaseFontSize() {
    if (currentFontSize > 12) {
        currentFontSize -= 2;
        document.documentElement.style.fontSize = currentFontSize + 'px';
        localStorage.setItem('fontSize', currentFontSize);
    }
}

const savedFontSize = localStorage.getItem('fontSize');
if (savedFontSize) {
    currentFontSize = parseInt(savedFontSize);
    document.documentElement.style.fontSize = currentFontSize + 'px';
}

const style = document.createElement('style');
style.innerHTML = `
.high-contrast {
    background: #000 !important;
    color: #fff !important;
}
.high-contrast * {
    background: #000 !important;
    color: #fff !important;
    border-color: #fff !important;
}
.high-contrast a, 
.high-contrast .btn {
    color: #000 !important;
    background: #fff !important;
    border: 2px solid #fff !important;
}
.high-contrast input, 
.high-contrast textarea, 
.high-contrast select {
    background: #111 !important;
    color: #fff !important;
    border: 2px solid #fff !important;
}
`;
document.head.appendChild(style);

document.querySelectorAll('video').forEach(video => {
    video.addEventListener('click', function() {
        if (this.paused) {
            this.play();
        } else {
            this.pause();
        }
    });
});

window.toggleHighContrast = toggleHighContrast;
window.increaseFontSize = increaseFontSize;
window.decreaseFontSize = decreaseFontSize;

document.addEventListener('DOMContentLoaded', function() {
    const accessibilityBtn = document.getElementById('accessibility-btn');
    const accessibilityPanel = document.getElementById('accessibility-panel');
    const closeAccessibilityBtn = document.getElementById('close-accessibility');

    if (accessibilityBtn && accessibilityPanel) {
        accessibilityBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            accessibilityPanel.classList.toggle('active');
        });

        if (closeAccessibilityBtn) {
            closeAccessibilityBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                accessibilityPanel.classList.remove('active');
            });
        }

        document.addEventListener('click', function(e) {
            if (!accessibilityPanel.contains(e.target) && !accessibilityBtn.contains(e.target)) {
                accessibilityPanel.classList.remove('active');
            }
        });

        accessibilityPanel.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        accessibilityBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                accessibilityPanel.classList.toggle('active');
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && accessibilityPanel.classList.contains('active')) {
                accessibilityPanel.classList.remove('active');
                accessibilityBtn.focus();
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('testimonials-carousel');
    const slides = carousel.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('testimonials-prev');
    const nextBtn = document.getElementById('testimonials-next');
    const dots = document.querySelectorAll('.carousel-dot');
    
    let currentSlide = 0;
    let isTransitioning = false;
    
    let autoAdvanceInterval;
    
    function startAutoAdvance() {
        autoAdvanceInterval = setInterval(() => {
            if (!isTransitioning) {
                nextSlide();
            }
        }, 4000);
    }
    
    function stopAutoAdvance() {
        clearInterval(autoAdvanceInterval);
    }
    
    function showSlide(slideIndex) {
        if (isTransitioning || slideIndex === currentSlide) return;
        
        isTransitioning = true;
        
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        slides[currentSlide].classList.add('prev');
        
        currentSlide = slideIndex;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        setTimeout(() => {
            slides.forEach(slide => {
                if (!slide.classList.contains('active')) {
                    slide.classList.remove('prev');
                }
            });
            isTransitioning = false;
        }, 600);
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoAdvance();
            nextSlide();
            startAutoAdvance();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoAdvance();
            prevSlide();
            startAutoAdvance();
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoAdvance();
            showSlide(index);
            startAutoAdvance();
        });
    });
    
    document.addEventListener('keydown', (e) => {
        const testimonialsSection = document.getElementById('testimonials');
        const currentSection = document.querySelector('.section');
        
        if (testimonialsSection && e.target === document.body) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                stopAutoAdvance();
                nextSlide();
                startAutoAdvance();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                stopAutoAdvance();
                prevSlide();
                startAutoAdvance();
            }
        }
    });
    
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let touchStartTime = 0;
    let isSwiping = false;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        touchStartTime = Date.now();
        isSwiping = false;
        
        stopAutoAdvance();
    }, { passive: true });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!touchStartX) return;
        
        const touchCurrentX = e.changedTouches[0].screenX;
        const touchCurrentY = e.changedTouches[0].screenY;
        
        const diffX = Math.abs(touchCurrentX - touchStartX);
        const diffY = Math.abs(touchCurrentY - touchStartY);
        
        if (diffX > diffY && diffX > 10) {
            e.preventDefault();
            isSwiping = true;
        }
    }, { passive: false });
    
    carousel.addEventListener('touchend', (e) => {
        if (!touchStartX) return;
        
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        
        handleSwipe();
        
        touchStartX = 0;
        touchStartY = 0;
        touchEndX = 0;
        touchEndY = 0;
        isSwiping = false;
        
        setTimeout(() => {
            startAutoAdvance();
        }, 1000);
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 30;
        const swipeDistance = touchStartX - touchEndX;
        const verticalDistance = Math.abs(touchStartY - touchEndY);
        const swipeTime = Date.now() - touchStartTime;
        
        if (Math.abs(swipeDistance) > swipeThreshold && 
            Math.abs(swipeDistance) > verticalDistance && 
            swipeTime < 500) {
            
            if (swipeDistance > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    if (!isMobile) {
        carousel.addEventListener('mouseenter', stopAutoAdvance);
        carousel.addEventListener('mouseleave', startAutoAdvance);
    }
    
    startAutoAdvance();
    
    function announceSlideChange() {
        const announcement = `המלצה ${currentSlide + 1} מתוך ${slides.length}`;
        
        let liveRegion = document.getElementById('carousel-live-region');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'carousel-live-region';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.style.position = 'absolute';
            liveRegion.style.left = '-10000px';
            liveRegion.style.width = '1px';
            liveRegion.style.height = '1px';
            liveRegion.style.overflow = 'hidden';
            document.body.appendChild(liveRegion);
        }
        
        liveRegion.textContent = announcement;
    }
    
    const originalShowSlide = showSlide;
    showSlide = function(slideIndex) {
        originalShowSlide(slideIndex);
        setTimeout(announceSlideChange, 100);
    };
});

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');
    
    document.querySelectorAll('.scroll-to-contact').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            const contactSectionIndex = Array.from(document.querySelectorAll('.section')).indexOf(contactSection);
            
            if (contactSectionIndex !== -1) {
                goToSection(contactSectionIndex);
            }
        });
    });
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'שולח...';
            submitBtn.classList.add('loading');
            formStatus.className = 'contact-form-status';
            formStatus.textContent = '';
            
            const formData = new FormData(contactForm);
            
            const name = formData.get('name').trim();
            const phone = formData.get('phone').trim();
            
            if (!name || !phone) {
                showFormStatus('error', 'אנא מלא את השדות החובה (שם וטלפון)');
                resetSubmitButton();
                return;
            }
            
            const phoneRegex = /^0\d{1,2}-?\d{7}$|^05\d-?\d{7}$/;
            if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                showFormStatus('error', 'אנא הכנס מספר טלפון תקין');
                resetSubmitButton();
                return;
            }
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showFormStatus('success', 'תודה! ההודעה נשלחה בהצלחה. נחזור אליך בהקדם');
                    contactForm.reset();
                    
                    setTimeout(() => {
                        const whatsappMessage = encodeURIComponent(`שלום! שלחתי טופס יצירת קשר באתר. שמי ${name} והטלפון שלי ${phone}`);
                        const whatsappUrl = `https://wa.me/972508447575?text=${whatsappMessage}`;
                        window.open(whatsappUrl, '_blank');
                    }, 2000);
                    
                } else {
                    const errorData = await response.json();
                    if (errorData.errors) {
                        showFormStatus('error', 'שגיאה בשליחת הטופס. אנא נסה שוב או צור קשר ישירות');
                    } else {
                        showFormStatus('error', 'שגיאה בשליחת הטופס. אנא נסה שוב');
                    }
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showFormStatus('error', 'שגיאת רשת. אנא בדק את החיבור שלך ונסה שוב');
            }
            
            resetSubmitButton();
        });
    }
    
    function showFormStatus(type, message) {
        formStatus.className = `contact-form-status ${type}`;
        formStatus.textContent = message;
    }
    
    function resetSubmitButton() {
        submitBtn.disabled = false;
        submitBtn.textContent = 'שלח הודעה';
        submitBtn.classList.remove('loading');
    }
    
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            if (this.value.trim().length < 2) {
                this.style.borderColor = '#f44336';
            } else {
                this.style.borderColor = '#4CAF50';
            }
        });
        
        nameInput.addEventListener('input', function() {
            if (this.value.trim().length >= 2) {
                this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            const phoneRegex = /^0\d{1,2}-?\d{7}$|^05\d-?\d{7}$/;
            if (!phoneRegex.test(this.value.replace(/\s/g, ''))) {
                this.style.borderColor = '#f44336';
            } else {
                this.style.borderColor = '#4CAF50';
            }
        });
        
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.startsWith('972')) {
                value = '0' + value.substring(3);
            }
            if (value.length > 3 && !value.includes('-')) {
                if (value.startsWith('05')) {
                    value = value.substring(0, 3) + '-' + value.substring(3);
                } else if (value.startsWith('0')) {
                    value = value.substring(0, 2) + '-' + value.substring(2);
                }
            }
            this.value = value;
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !this.value.includes('@')) {
                this.style.borderColor = '#f44336';
            } else if (this.value) {
                this.style.borderColor = '#4CAF50';
            } else {
                this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
        });
    }
    
    // Initialize mobile touch handlers and responsive adjustments
    initMobileTouchHandlers();
    handleContactFormResize();
    
    // Handle viewport height changes (important for mobile)
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
});