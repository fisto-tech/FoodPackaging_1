const fs = require('fs');

const cssOverrides = `
/* --- About Us Image Swapper CSS --- */
@media (max-width: 991px) {
    .about-img-top, .about-img-bottom {
        display: none !important;
    }
    .about-images {
        display: block !important;
        height: auto !important;
    }
    .about-img-main {
        width: 100%;
        height: auto;
    }
}
.about-images img {
    cursor: pointer;
}
`;

fs.appendFileSync('style.css', cssOverrides, 'utf8');

const jsCode = `
  // --- About Us Image Swapper ---
  const mainImgEl = document.querySelector('.about-img-main img');
  const topImgEl = document.querySelector('.about-img-top img');
  const bottomImgEl = document.querySelector('.about-img-bottom img');

  if (mainImgEl && topImgEl && bottomImgEl) {
    const swapImages = (clickedImgEl) => {
      mainImgEl.style.opacity = 0;
      clickedImgEl.style.opacity = 0;
      
      setTimeout(() => {
        const tempSrc = mainImgEl.src;
        const tempAlt = mainImgEl.alt;
        mainImgEl.src = clickedImgEl.src;
        mainImgEl.alt = clickedImgEl.alt;
        clickedImgEl.src = tempSrc;
        clickedImgEl.alt = tempAlt;
        
        mainImgEl.style.opacity = 1;
        clickedImgEl.style.opacity = 1;
      }, 200);
    };
    
    mainImgEl.style.transition = 'opacity 0.2s ease, transform 0.5s ease';
    topImgEl.style.transition = 'opacity 0.2s ease, transform 0.5s ease';
    bottomImgEl.style.transition = 'opacity 0.2s ease, transform 0.5s ease';
    
    topImgEl.addEventListener('click', () => swapImages(topImgEl));
    bottomImgEl.addEventListener('click', () => swapImages(bottomImgEl));
  }
`;

fs.appendFileSync('script.js', jsCode, 'utf8');
console.log("About Us logic applied.");
