
<!-- Navigation Buttons (Previous and Next) -->
  <button class="carousel-control-prev" type="button" data-bs-target="#trainingCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#trainingCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>

  <!-- Custom Position for Indicators (Moved to the Bottom) -->
  <div class="carousel-indicators-container">
    <button class="carousel-control-prev" type="button" data-bs-target="#trainingCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    </button>
    <ol class="carousel-indicators">
      <li data-bs-target="#trainingCarousel" data-bs-slide-to="0" class="active"></li>
      <li data-bs-target="#trainingCarousel" data-bs-slide-to="1"></li>
      <li data-bs-target="#trainingCarousel" data-bs-slide-to="2"></li>
    </ol>
    <button class="carousel-control-next" type="button" data-bs-target="#trainingCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
    </button>
  </div>



/* Ensure the carousel indicators are at the bottom */
.carousel-indicators-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 10px;
  width: 100%;
  z-index: 10;
}

.carousel-indicators {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
}

.carousel-indicators li {
  width: 15px;
  height: 15px;
  margin: 0 5px;
  background-color: #fff;
  border-radius: 50%; /* Makes the indicators circular */
  border: 2px solid #000; /* Adds a border to the circle */
  transition: background-color 0.3s, transform 0.3s;
}

.carousel-indicators .active {
  background-color: #007bff; /* Active indicator color */
}

.carousel-indicators li:hover {
  transform: scale(1.2); /* Enlarge the indicator on hover */
}

/* Positioning the carousel control buttons beside the indicators */
.carousel-control-prev,
.carousel-control-next {
  background-color: transparent;
  border: none;
  color: #000;
  font-size: 24px;
  position: relative;
  z-index: 15;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  font-size: 30px;
  color: #007bff; /* Change color to match active state */
}

/* Adjust the buttons' positioning to align them next to the indicators */
.carousel-control-prev {
  position: absolute;
  left: 0;
}

.carousel-control-next {
  position: absolute;
  right: 0;
}
