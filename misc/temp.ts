<div id="carouselExample" class="carousel slide" data-ride="carousel">
  <!-- Carousel indicators -->
  <ol class="carousel-indicators">
    <li data-target="#carouselExample" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExample" data-slide-to="1"></li>
    <li data-target="#carouselExample" data-slide-to="2"></li>
  </ol>

  <!-- Carousel items -->
  <div class="carousel-inner">
    <!-- Slide 1 -->
    <div class="carousel-item active">
      <div class="d-flex flex-row align-items-center">
        <!-- Section 1: Banner Image -->
        <div class="col-6">
          <img
            src="assets/banner1.jpg"
            class="d-block w-100"
            alt="Banner Image"
          />
        </div>
        <!-- Section 2: Content -->
        <div class="col-6 d-flex flex-column justify-content-center">
          <h3>Structured Query Language</h3>
          <p>
            Structured query language is now available, a computer language used
            to build databases and to access, view, and manipulate.
          </p>
          <p>
            <strong>Starting July 12, 2024</strong><br />
            6 weeks &middot; 12 seats left
          </p>
          <button class="btn btn-primary">Learn more</button>
        </div>
      </div>
    </div>

    <!-- Add more slides as needed -->
    <div class="carousel-item">
      <div class="d-flex flex-row align-items-center">
        <div class="col-6">
          <img
            src="assets/banner2.jpg"
            class="d-block w-100"
            alt="Banner Image 2"
          />
        </div>
        <div class="col-6 d-flex flex-column justify-content-center">
          <h3>Another Course Title</h3>
          <p>
            Learn another topic with engaging content and hands-on exercises.
          </p>
          <p>
            <strong>Starting August 1, 2024</strong><br />
            8 weeks &middot; 15 seats left
          </p>
          <button class="btn btn-primary">Discover more</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Carousel controls -->
  <a
    class="carousel-control-prev"
    href="#carouselExample"
    role="button"
    data-slide="prev"
  >
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a
    class="carousel-control-next"
    href="#carouselExample"
    role="button"
    data-slide="next"
  >
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>



.carousel-item {
  height: 400px;
  display: flex;
  align-items: center;
}

.carousel-item img {
  height: 100%;
  object-fit: cover;
}