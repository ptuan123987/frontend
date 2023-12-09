import { useEffect } from 'react';

export function useSlide() {
  useEffect(() => {
    const slideContainers = document.querySelectorAll("[data-slide-container]");
    const slideDistance = window.screen.availWidth; 

    slideContainers.forEach((container) => {
      let containerMotion = container.parentElement.getAttribute("data-slide-motion");
      let totalSlides = container.querySelectorAll("[data-slide]").length;
      let currentSlide = 0;

      if (containerMotion === "slide") {
        const autoSlide = () => {
          container.scrollLeft += slideDistance;

          if (++currentSlide === totalSlides) {
            container.scrollLeft = 0;
            currentSlide = 0;
          }

          setTimeout(autoSlide, 5000); 
        };

        setTimeout(autoSlide, 5000); 
      }

      let nextButton = container.querySelector("[data-slide-next]");
      let previousButton = container.querySelector("[data-slide-previous]");

      if (nextButton) {
        nextButton.addEventListener("click", () => {
          container.scrollLeft += slideDistance;

          if (++currentSlide === totalSlides) {
            container.scrollLeft = 0;
            currentSlide = 0;
          }
        });
      }

      if (previousButton) {
        previousButton.addEventListener("click", () => {
          container.scrollLeft -= slideDistance;

          if (--currentSlide < 0) {
            container.scrollLeft = slideDistance * (totalSlides - 1);
            currentSlide = totalSlides - 1;
          }
        });
      }
    });
  }, []);
}
