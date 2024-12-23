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
