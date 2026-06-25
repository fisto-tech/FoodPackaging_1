document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  const preloader = document.getElementById('preloader');
  const loadingBar = document.getElementById('loading-bar');
  const loadingText = document.getElementById('loading-percentage');

  let progress = 0;
  const loadingInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 10) + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);
      setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => {
          document.body.classList.add('preloader-done');
          if (currentIndex === 0 && ingredientsContainer.innerHTML !== '') {
            ingredientsContainer.classList.add('ingredients-enter');
          }
        }, 1500);
      }, 500);
    }
    loadingBar.style.width = `${progress}%`;
    loadingText.innerText = `${progress}%`;
  }, 100);

  // Products Data (9 items as requested)
  const products = [
    {
      number: "01",
      titleTop: "Potato",
      titleBottom: "Chips",
      description: "Crispy and thinly sliced<br>potato chips that deliver<br>a classic savory crunch.",
      color: "#FECD02",
      image: "images/potato-chips/potato-chips-image.png",
      bgSvg: "images/potato-chips/background-ingredients.svg"
    },
    {
      number: "02",
      titleTop: "Kerala",
      titleBottom: "Banana",
      description: "Authentic, crunchy banana<br>chips carefully fried in<br>pure coconut oil.",
      color: "#6D0109",
      image: "images/kerala-banana-chips/kerala-banana-chips-image.png",
      bgSvg: "images/kerala-banana-chips/background-ingredients.svg"
    },
    {
      number: "03",
      titleTop: "Nacho",
      titleBottom: "Chips",
      description: "Crunchy corn tortilla chips<br>loaded with bold<br>and zesty flavors.",
      color: "#301D11",
      image: "images/nacho-chips/nacho-chips.png",
      bgSvg: "images/nacho-chips/background-ingredients.svg"
    },
    {
      number: "04",
      titleTop: "Premium",
      titleBottom: "Popcorn",
      description: "High-Quality Flexible Packaging<br>Solutions For Snacks That<br>Stand Out On Every Shelf.",
      color: "#3690D3",
      image: "images/popcorn-chips/popcorn-chips-image.webp",
      bgSvg: "images/popcorn-chips/background-ingredients.svg"
    },
    {
      number: "05",
      titleTop: "Pudina",
      titleBottom: "Blast",
      description: "Light & Crunchy Corn Puffs<br>Seasoned With Refreshing Mint<br>For A Bold Experience.",
      color: "#752988",
      image: "images/corn-puff-chips/corn-puff-image.png",
      bgSvg: "images/corn-puff-chips/background-ingredients.svg"
    },
    {
      number: "06",
      titleTop: "Grain",
      titleBottom: "Waves",
      description: "Delicious multi-grain chips<br>packed with wholesome goodness<br>and irresistible taste.",
      color: "#0766C3",
      image: "images/grain-waves-chips/grain-waves-image.png",
      bgSvg: "images/grain-waves-chips/background-ingredients.svg"
    },
    {
      number: "07",
      titleTop: "Boondhi",
      titleBottom: "Mix",
      description: "A traditional spicy mix<br>perfect for tea time<br>and festive snacking.",
      color: "#232321",
      image: "images/boondhi-mix/boondhi-mix-chips-image.png",
      bgSvg: "images/boondhi-mix/background-ingredients.svg"
    },
    {
      number: "08",
      titleTop: "Premium",
      titleBottom: "Almond",
      description: "Carefully selected premium<br>roasted almonds for<br>a healthy energy boost.",
      color: "#172A6B",
      image: "images/almond/almond-image.webp",
      bgSvg: "images/almond/background-ingredients.svg"
    },
    {
      number: "09",
      titleTop: "Potato",
      titleBottom: "Crisps",
      description: "Thick cut, gourmet<br>potato crisps seasoned<br>with premium spices.",
      color: "#569517",
      image: "images/potato-crips/potato-crips.png",
      bgSvg: "images/potato-crips/background-ingredients.svg"
    }
  ];

  let currentIndex = 0;
  let isAnimating = false;
  let autoSlideInterval;

  // DOM Elements
  const bgCard = document.getElementById('background-card');
  const productTitle = document.getElementById('product-title');
  const productDesc = document.getElementById('product-description');
  const largeNumber = document.getElementById('large-number');
  const mainImage = document.getElementById('main-product-image');
  const ctaButton = document.querySelector('.cta-button');
  const categoryText = document.querySelector('.category-text');
  const dots = document.querySelectorAll('.dot');

  // Containers for dynamic generation
  const sliderDotsContainer = document.getElementById('slider-dots');
  const pageNumbersContainer = document.getElementById('page-numbers');
  const ingredientsContainer = document.getElementById('ingredients-container');

  // Generate Pagination and Dots Dynamically
  products.forEach((prod, i) => {
    // Generate slider dot
    const dot = document.createElement('span');
    dot.className = 'slider-dot';
    dot.dataset.index = i;
    sliderDotsContainer.appendChild(dot);

    // Generate page number
    const pageNum = document.createElement('div');
    pageNum.className = 'page-num';
    pageNum.dataset.index = i;
    pageNum.innerText = i + 1;
    // Set initial custom dist prop
    pageNum.dataset.dist = i;
    pageNumbersContainer.appendChild(pageNum);
  });

  const pageNums = document.querySelectorAll('.page-num');
  const sliderDots = document.querySelectorAll('.slider-dot');

  function updateActiveStates(index) {
    pageNums.forEach((num, i) => {
      let dist = i - index;

      // Calculate shortest distance on a circle of 9
      if (dist < -4) dist += 9;
      if (dist > 4) dist -= 9;

      let prevDist = parseFloat(num.dataset.dist);

      // If jumping from one end of the hidden wheel to the other, disable transition momentarily
      if (Math.abs(dist - prevDist) > 2) {
        num.classList.add('no-transition');
      } else {
        num.classList.remove('no-transition');
      }

      // Force reflow
      void num.offsetWidth;

      num.dataset.dist = dist;
      num.style.setProperty('--dist', dist);

      if (dist === 0) {
        num.classList.add('active');
        num.style.borderColor = products[index].color;
        num.style.color = products[index].color;
        num.style.boxShadow = `0 0 15px ${products[index].color}33`; // 20% opacity hex
        num.style.opacity = '1';
        num.style.visibility = 'visible';
      } else {
        num.classList.remove('active');
        num.style.borderColor = 'transparent';
        num.style.color = 'var(--text-dark)';
        num.style.boxShadow = 'none';
        if (Math.abs(dist) <= 2) {
          num.style.opacity = '0.4';
          num.style.visibility = 'visible';
        } else {
          num.style.opacity = '0';
          num.style.visibility = 'hidden';
        }
      }
    });

    sliderDots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
        dot.style.backgroundColor = products[index].color;
        dot.style.borderColor = products[index].color;
      } else {
        dot.classList.remove('active');
        dot.style.backgroundColor = 'transparent';
        dot.style.borderColor = '#a0a0a0';
      }
    });
  }

  function changeProduct(newIndex) {
    if (isAnimating || currentIndex === newIndex) return;
    isAnimating = true;

    const prod = products[newIndex];

    // Image Animation Out
    mainImage.parentElement.classList.add('slide-exit');
    ingredientsContainer.classList.remove('ingredients-enter');
    ingredientsContainer.classList.add('ingredients-exit');

    // Text Animation Restart
    productTitle.classList.remove('fade-up-text');
    productDesc.classList.remove('fade-up-text');
    void productTitle.offsetWidth;

    setTimeout(() => {
      // Update Text
      productTitle.innerHTML = `<span class="highlight" style="color: ${prod.color}">${prod.titleTop}</span><br>${prod.titleBottom}`;
      productDesc.innerHTML = prod.description;
      largeNumber.innerText = prod.number;

      // Update Colors
      bgCard.style.backgroundColor = prod.color;
      ctaButton.style.backgroundColor = prod.color;
      ctaButton.style.boxShadow = `0 10px 20px ${prod.color}66`;
      // categoryText.style.color = prod.color; // User wants this to always be black

      dots.forEach(dot => {
        dot.style.backgroundColor = prod.color;
      });

      // Update Main Image
      mainImage.src = prod.image;
      mainImage.alt = `${prod.titleTop} ${prod.titleBottom}`;
      mainImage.style.filter = `drop-shadow(0 30px 40px rgba(0,0,0,0.25))`; // remove hue-rotate since we use real images

      // Update Ingredients SVG
      ingredientsContainer.innerHTML = '';
      if (prod.bgSvg) {
        fetch(prod.bgSvg)
          .then(res => res.text())
          .then(svgText => {
            // Only update if we are still on the same slide
            if (currentIndex !== newIndex && !isAnimating) return;

            ingredientsContainer.innerHTML = svgText;
            const svgElement = ingredientsContainer.querySelector('svg');
            if (svgElement) {
              svgElement.classList.add('ingredient-bg-inline');

              let visualElements = [];
              const extractShapes = (node) => {
                if (!node || !node.tagName) return;
                const tag = node.tagName.toLowerCase();
                if (['defs', 'style', 'title', 'clippath'].includes(tag)) return;
                if (tag === 'g') {
                  Array.from(node.children).forEach(extractShapes);
                } else if (['rect', 'path', 'circle', 'polygon', 'ellipse', 'use', 'image'].includes(tag)) {
                  const fillAttr = node.getAttribute('fill');
                  if (tag === 'use' || tag === 'image' || (fillAttr && fillAttr.startsWith('url('))) {
                    visualElements.push(node);
                  }
                }
              };
              Array.from(svgElement.children).forEach(extractShapes);

              for (let i = 0; i < visualElements.length; i++) {
                const el = visualElements[i];

                // Assign random animation values
                const duration = Math.random() * 5 + 8; // 8s to 13s
                const delay = Math.random() * -10; // offset start
                const distanceY = (Math.random() * 30 + 10) * (Math.random() > 0.5 ? 1 : -1);
                const distanceX = (Math.random() * 20 + 5) * (Math.random() > 0.5 ? 1 : -1);
                const rotation = (Math.random() * 20 - 10);

                const wrapper = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                el.parentNode.insertBefore(wrapper, el);
                wrapper.appendChild(el);

                wrapper.style.setProperty('--dur', `${duration}s`);
                wrapper.style.animation = `floatElement var(--dur) ease-in-out ${delay}s infinite`;
                wrapper.style.setProperty('--distY', `${distanceY}px`);
                wrapper.style.setProperty('--distX', `${distanceX}px`);
                wrapper.style.setProperty('--rot', `${rotation}deg`);
                wrapper.style.transformOrigin = 'center center';
                wrapper.style.transformBox = 'fill-box';
              }
            }
          })
          .catch(err => console.error("Error loading SVG:", err));
      }

      // Animate In
      mainImage.parentElement.classList.remove('slide-exit');
      mainImage.parentElement.classList.remove('is-floating');
      mainImage.parentElement.classList.add('slide-enter');
      productTitle.classList.add('fade-up-text');
      productDesc.classList.add('fade-up-text');

      setTimeout(() => {
        ingredientsContainer.classList.remove('ingredients-exit');
        ingredientsContainer.classList.add('ingredients-enter');
      }, 1500);

      updateActiveStates(newIndex);
      currentIndex = newIndex;

      setTimeout(() => {
        mainImage.parentElement.classList.remove('slide-enter');
        mainImage.parentElement.classList.add('is-floating');
        isAnimating = false;
      }, 1000);

    }, 400);
  }

  function nextProduct() {
    let newIndex = (currentIndex + 1) % products.length;
    changeProduct(newIndex);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextProduct, 6000);
  }

  // Event Listeners
  pageNums.forEach(num => {
    num.addEventListener('click', (e) => {
      const index = parseInt(e.currentTarget.dataset.index);
      changeProduct(index);
      resetAutoSlide();
    });
  });

  sliderDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const index = parseInt(e.currentTarget.dataset.index);
      changeProduct(index);
      resetAutoSlide();
    });
  });

  // Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  mobileToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    if (navLinks.style.display === 'flex') {
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = '#fff';
      navLinks.style.flexDirection = 'column';
      navLinks.style.padding = '20px';
      navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
    }
  });

  // Initialize
  // Inject the first product's ingredients SVG on load
  if (products[0].bgSvg) {
    fetch(products[0].bgSvg)
      .then(res => res.text())
      .then(svgText => {
        ingredientsContainer.innerHTML = svgText;
        const svgElement = ingredientsContainer.querySelector('svg');
        if (svgElement) {
          svgElement.classList.add('ingredient-bg-inline');
          let visualElements = [];
          const extractShapes = (node) => {
            if (!node || !node.tagName) return;
            const tag = node.tagName.toLowerCase();
            if (['defs', 'style', 'title', 'clippath'].includes(tag)) return;
            if (tag === 'g') {
              Array.from(node.children).forEach(extractShapes);
            } else if (['rect', 'path', 'circle', 'polygon', 'ellipse', 'use'].includes(tag)) {
              visualElements.push(node);
            }
          };
          Array.from(svgElement.children).forEach(extractShapes);

          for (let i = 0; i < visualElements.length; i++) {
            const el = visualElements[i];

            const duration = Math.random() * 5 + 8;
            const delay = Math.random() * -10;
            const distanceY = (Math.random() * 30 + 10) * (Math.random() > 0.5 ? 1 : -1);
            const distanceX = (Math.random() * 20 + 5) * (Math.random() > 0.5 ? 1 : -1);
            const rotation = (Math.random() * 20 - 10);

            const wrapper = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            el.parentNode.insertBefore(wrapper, el);
            wrapper.appendChild(el);

            wrapper.style.setProperty('--dur', `${duration}s`);
            wrapper.style.animation = `floatElement var(--dur) ease-in-out ${delay}s infinite`;
            wrapper.style.setProperty('--distY', `${distanceY}px`);
            wrapper.style.setProperty('--distX', `${distanceX}px`);
            wrapper.style.setProperty('--rot', `${rotation}deg`);
            wrapper.style.transformOrigin = 'center center';
            wrapper.style.transformBox = 'fill-box';
          }
        }
        if (document.body.classList.contains('preloader-done')) {
          ingredientsContainer.classList.add('ingredients-enter');
        }
      });
  }
  updateActiveStates(0);
  resetAutoSlide();

  // Scroll Animation Observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // Trigger when 20% of the section is visible
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('out-view');
        entry.target.classList.add('in-view');
      } else {
        if (entry.target.classList.contains('in-view')) {
          entry.target.classList.remove('in-view');
          entry.target.classList.add('out-view');
        }
      }
    });
  }, observerOptions);

  const aboutSection = document.querySelector('.about-us');
  if (aboutSection) {
    scrollObserver.observe(aboutSection);
  }

  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  const heroSection = document.querySelector('.hero');
  
  window.addEventListener('scroll', () => {
    if (heroSection && navbar) {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      const navbarHeight = navbar.offsetHeight;
      
      if (heroBottom <= navbarHeight) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // 3D Parallax Hover Effect on Product Image
  const productImageContainer = document.querySelector('.product-image-container');
  const productImage = productImageContainer.querySelector('img');

  productImageContainer.addEventListener('mousemove', (e) => {
    // Suspend floating animation while hovering
    productImageContainer.classList.remove('is-floating');
    
    const rect = productImageContainer.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top; 
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation angles (max 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -20; 
    const rotateY = ((x - centerX) / centerX) * 20;
    
    // Apply 3D transform
    productImage.style.transform = `perspective(1000px) scale(1.05) translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  productImageContainer.addEventListener('mouseleave', () => {
    // Reset transform smoothly
    productImage.style.transform = '';
    
    // Resume floating animation if not currently sliding
    if (!isAnimating) {
      productImageContainer.classList.add('is-floating');
    }
  });

  // --- Scrollable Products Section Initialization ---
  function initializePanelCarousels() {
    const scrollContainers = document.querySelectorAll(".scroll-container");

    scrollContainers.forEach((scrollContainer) => {
      const panels = scrollContainer.querySelectorAll(".panel");
      const stickyHeading = scrollContainer
        .closest(".scroll-container-parent")
        ?.querySelector(".sticky-heading");

      function calculateCardTransform(panel, index) {
        const referenceWidth = 1900;
        const panelRect = panel.getBoundingClientRect();

        // Calculate normalized position (0 to 1) based on screen width
        const normalizedPosition = (panelRect.left + panelRect.width / 2) / referenceWidth;

        // Determine card rotation based on position
        const positionType = (() => {
          if (normalizedPosition <= 0.3) return 'leftEdge';
          if (normalizedPosition >= 0.7) return 'rightEdge';
          return 'center';
        })();

        const getRotation = () => {
          switch(positionType) {
            case 'leftEdge':
              return -10 * (1 - normalizedPosition * 3);
            case 'rightEdge':
              return 10 * ((normalizedPosition - 0.7) * 3.33);
            default:
              return 0;
          }
        };

        const rotation = getRotation();
        const smoothRotation = Math.round(rotation * 100) / 100;
        
        // Cards share the exact same vertical alignment
        const yOffset = 0;

        return `translateY(${yOffset}px) rotate(${smoothRotation}deg)`;
      }

      function handleScroll() {
        const scrollContainerParent = scrollContainer.closest(
          ".scroll-container-parent"
        );
        const parentRect = scrollContainerParent.getBoundingClientRect();
        const parentTop = window.pageYOffset + parentRect.top;
        const parentHeight = parentRect.height;
        const viewportHeight = window.innerHeight;

        const scrollTop = window.scrollY;
        const scrollProgress =
          (scrollTop - parentTop) / (parentHeight - viewportHeight);
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));



        // Sticky heading opacity management
        if (stickyHeading) {
          const headingOpacity = 1 - Math.min(1, clampedProgress * 2);
          stickyHeading.style.opacity = headingOpacity;
        }

        // First stage: slide in cards from right
        if (clampedProgress > 0 && clampedProgress <= 0.5) {
          scrollContainer.style.right = "0";
          scrollContainer.style.transform = "translateY(-50%) translateX(0)";

          panels.forEach((panel, index) => {
            const individualProgress = Math.max(
              0,
              Math.min(1, clampedProgress * 2)
            );

            panel.style.opacity = 1;

            panel.style.transform = `
                            translateX(${(1 - individualProgress) * 100}vw) 
                            ${calculateCardTransform(panel, index)}
                        `;
          });
        }

        // Second stage: slide cards to the left
        if (clampedProgress > 0.5) {
          // The exact amount of overflow that needs to be scrolled
          const maxTranslate = scrollContainer.scrollWidth - window.innerWidth;
          
          // normalized progress from 0 to 1 for the second half of the scroll
          const progress = (clampedProgress - 0.5) * 2;
          
          // Easing function for smoother stop
          const easeProgress = progress * (2 - progress); 
          const smoothedTranslateX = -maxTranslate * easeProgress;

          scrollContainer.style.transform = `translateY(-50%) translateX(${smoothedTranslateX}px)`;

          panels.forEach((panel, index) => {
            const leftScrollProgress = (clampedProgress - 0.5) * 2;
            const staggerDelay = index * 0.1;
            const panelProgress = Math.max(
              0,
              Math.min(1, leftScrollProgress - staggerDelay)
            );

            const scale = 1 - panelProgress * 0.05;
            const opacity = 1 - panelProgress * 0.2;

            panel.style.transform = `
                            scale(${scale}) 
                            ${calculateCardTransform(panel, index)}
                        `;
            panel.style.opacity = opacity;
          });

          // Heading opacity restoration
          if (stickyHeading) {
            const opacityProgress = (clampedProgress - 0.5) * 2;
            const restoredOpacity = 1 - Math.pow(1 - opacityProgress, 3);
            stickyHeading.style.opacity = Math.max(0, restoredOpacity);
          }
        }

        // Reset state when scroll progress is 0
        if (clampedProgress === 0) {
          scrollContainer.style.right = "-100%";
          scrollContainer.style.transform = "translateY(-50%) translateX(0)";

          if (stickyHeading) {
            stickyHeading.style.opacity = 1;
          }

          panels.forEach((panel, index) => {
            panel.style.transform = calculateCardTransform(panel, index);
            panel.style.opacity = 1;
          });
        }

        // Sticky heading and scroll container positioning logic
        if (parentRect.top <= 0 && parentRect.bottom > viewportHeight) {
          if (stickyHeading) {
            stickyHeading.style.position = "fixed";
            stickyHeading.style.top = "50%";
          }
          scrollContainer.style.position = "fixed";
          scrollContainer.style.top = "50%";
        } else {
          if (stickyHeading) {
            stickyHeading.style.position = "absolute";
          }
          scrollContainer.style.position = "absolute";
          
          if (parentRect.top > 0) {
            if (stickyHeading) stickyHeading.style.top = "50vh";
            scrollContainer.style.top = "50vh";
          } else {
            if (stickyHeading) stickyHeading.style.top = `${parentHeight - (viewportHeight / 2)}px`;
            scrollContainer.style.top = `${parentHeight - (viewportHeight / 2)}px`;
          }
        }
      }

      // Initialize panels
      panels.forEach((panel, index) => {
        panel.style.transform = calculateCardTransform(panel, index);
      });

      // Attach scroll event
      window.addEventListener("scroll", handleScroll);

      // Initial call to set up initial state
      handleScroll();
    });
  }

  // Call initialization function
  initializePanelCarousels();

  // --- Products Background Video (Scroll Canvas) ---
  function initializeProductsScrollVideo() {
    const section = document.getElementById("products");
    const canvas = document.getElementById("products-bg-canvas");
    if (!section || !canvas) return;

    const context = canvas.getContext("2d");
    const frameCount = 144;
    const images = [];
    
    canvas.width = 1920;
    canvas.height = 1080;
    
    // Set initial opacity to 0
    canvas.style.opacity = 0;
    // Add transition for smooth fade
    canvas.style.transition = "opacity 0.3s ease";
    
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `images/products/background-new-images/${(i + 1).toString().padStart(5, '0')}.webp`;
      images.push(img);
    }

    function handleScroll() {
      const parentRect = section.getBoundingClientRect();
      const parentTop = window.pageYOffset + parentRect.top;
      const parentHeight = parentRect.height;
      const viewportHeight = window.innerHeight;

      const scrollTop = window.scrollY;
      const scrollProgress = (scrollTop - parentTop) / (parentHeight - viewportHeight);
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

      // Fade in the canvas after scrolling starts (e.g., after 5% scroll)
      if (scrollProgress > 0.05) {
        canvas.style.opacity = 1;
      } else {
        canvas.style.opacity = 0;
      }

      if (images.length > 0) {
        const frameIndex = Math.min(frameCount - 1, Math.floor(clampedProgress * frameCount));
        const img = images[frameIndex];
        if (img && img.complete) {
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      }
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
  }

  initializeProductsScrollVideo();

  // --- Scroll Video Section Initialization ---
  function initializeScrollVideo() {
    const section = document.getElementById("scroll-video");
    const canvas = document.getElementById("bg-canvas");
    if (!section || !canvas) return;

    const context = canvas.getContext("2d");
    const frameCount = 192;
    const images = [];
    
    canvas.width = 1920;
    canvas.height = 1080;
    
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `images/products/webp-folder/${(i + 1).toString().padStart(5, '0')}.webp`;
      images.push(img);
      if (i === 0) {
        img.onload = () => {
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      }
    }

    function handleScroll() {
      const parentRect = section.getBoundingClientRect();
      const parentTop = window.pageYOffset + parentRect.top;
      const parentHeight = parentRect.height;
      const viewportHeight = window.innerHeight;

      const scrollTop = window.scrollY;
      const scrollProgress = (scrollTop - parentTop) / (parentHeight - viewportHeight);
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

      if (images.length > 0) {
        const frameIndex = Math.min(frameCount - 1, Math.floor(clampedProgress * frameCount));
        const img = images[frameIndex];
        if (img && img.complete) {
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      }

      const text1 = section.querySelector('.video-text-1');
      const text2 = section.querySelector('.video-text-2');

      function updateText(element, progress, start, end, entranceDir) {
        if (!element) return;
        const duration = end - start;
        const localProgress = (progress - start) / duration;

        if (localProgress < 0 || localProgress > 1) {
          element.style.opacity = 0;
          element.style.transform = `translateY(-50%) translateX(${entranceDir * 100}px)`;
          return;
        }

        let opacity = 1;
        let translateX = 0;

        if (localProgress < 0.2) {
          opacity = localProgress / 0.2;
          translateX = entranceDir * 100 * (1 - opacity);
        } else if (localProgress > 0.8) {
          opacity = (1 - localProgress) / 0.2;
          translateX = -entranceDir * 100 * (1 - opacity);
        }

        element.style.opacity = opacity;
        element.style.transform = `translateY(-50%) translateX(${translateX}px)`;
      }

      updateText(text1, clampedProgress, 0.0, 0.55, 1);
      updateText(text2, clampedProgress, 0.45, 1.0, -1);
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    // Initial draw trigger will happen naturally or via onload, but call once to be safe
    handleScroll();
  }

  initializeScrollVideo();

  // Reinitialize on window resize
  window.addEventListener("resize", initializePanelCarousels);

  // --- Interactive Benefits Section (aat.js) ---
  function initBenefitsCards() {
    if (typeof aat === 'undefined') return;
    const { ScrollObserver, valueAtPercentage } = aat;

    const cardsContainer = document.querySelector('.cards');
    const cards = document.querySelectorAll('.card');
    
    if (!cardsContainer || cards.length === 0) return;

    cardsContainer.style.setProperty('--cards-count', cards.length);
    // Use a robust way to set card height after CSS is applied
    setTimeout(() => {
      cardsContainer.style.setProperty('--card-height', `${cards[0].clientHeight}px`);
    }, 100);
    
    Array.from(cards).forEach((card, index) => {
      const offsetTop = 20 + index * 20;
      card.style.paddingTop = `${offsetTop}px`;
      if (index === cards.length - 1) {
        return;
      }
      const toScale = 1 - (cards.length - 1 - index) * 0.1;
      const nextCard = cards[index + 1];
      const cardInner = card.querySelector('.card__inner');
      ScrollObserver.Element(nextCard, {
        offsetTop,
        offsetBottom: window.innerHeight - card.clientHeight
      }).onScroll(({ percentageY }) => {
        cardInner.style.scale = valueAtPercentage({
          from: 1,
          to: toScale,
          percentage: percentageY
        });
        cardInner.style.filter = `brightness(${valueAtPercentage({
          from: 1,
          to: 0.6,
          percentage: percentageY
        })})`;
      });
    });
  }
  
  setTimeout(initBenefitsCards, 300);

  // --- ScrollSpy Navigation ---
  function initScrollSpy() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id], main[id]');

    function updateScrollSpy() {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Use a viewport-based threshold instead of section height
        // to prevent massive sections (like 1000vh) from triggering early.
        if (window.scrollY >= (sectionTop - window.innerHeight / 2)) {
          const id = section.getAttribute('id');
          // Check if there's an actual nav link for this ID
          if (document.querySelector(`.nav-links a[href="#${id}"]`)) {
            current = id;
          }
        }
      });

      if (current) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
          }
        });
      }
    }

    window.addEventListener('scroll', updateScrollSpy);
    window.addEventListener('resize', updateScrollSpy);
    // Initialize state on load
    updateScrollSpy();
  }
  initScrollSpy();

  // --- Scroll Reveal Animations ---
  function initScrollReveal() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    revealElements.forEach(el => revealObserver.observe(el));
  }
  initScrollReveal();
});
