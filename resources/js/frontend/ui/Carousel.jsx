import React, { useState, useEffect } from 'react';
import image1 from '@/assets/images/slider-image/background.jpg';
import image2 from '@/assets/images/slider-image/ladies.jpg';
import image3 from '@/assets/images/slider-image/office.jpg';
import '../../../css/carousel.css';


const Carousel = () => {
    const [carouselData, setCarouselData] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
  
    useEffect(() => {
      const fetchedData = [
        { id: 1, image: image1, title: 'Slide 1', description: 'Description 1' },
        { id: 2, image: image2, title: 'Slide 2', description: 'Description 2' },
        { id: 3, image: image3, title: 'Slide 3', description: 'Description 3' },
      ];
      setCarouselData(fetchedData);
  
      // Auto-slide every 5 seconds (adjust the timing as needed)
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) =>
          prevSlide === carouselData.length - 1 ? 0 : prevSlide + 1
        );
      }, 5000);
  
      return () => clearInterval(interval); // Clear interval on component unmount
    }, [carouselData.length]);
  
    const goToSlide = (index) => {
      setCurrentSlide(index);
    };
  
    const nextSlide = () => {
      setCurrentSlide((prevSlide) =>
        prevSlide === carouselData.length - 1 ? 0 : prevSlide + 1
      );
    };
  
    const prevSlide = () => {
      setCurrentSlide((prevSlide) =>
        prevSlide === 0 ? carouselData.length - 1 : prevSlide - 1
      );
    };
  
    return (
      <div className="carousel-container">
        <div className="carousel">
          {carouselData.map((slide, index) => (
            <div
              key={slide.id}
              className={index === currentSlide ? 'slide active' : 'slide'}
              style={{ backgroundImage: `url(${slide.image})` }}
              onClick={() => goToSlide(index)}
            >
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          ))}
          <button className="prev" onClick={prevSlide}>
            &#10094;
          </button>
          <button className="next" onClick={nextSlide}>
            &#10095;
          </button>
        </div>
        <div className="indicators">
          {carouselData.map((_, index) => (
            <span
              key={index}
              className={index === currentSlide ? 'indicator active' : 'indicator'}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </div>
    );
  };
  
  export default Carousel;
