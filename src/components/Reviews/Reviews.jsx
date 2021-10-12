import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import movieAPI from "../../MovieApi/MovieApi";

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    movieAPI
      .fetchMovieReviews(movieId)
      .then((movie) => {
        setReviews(movie.results);
      })
      .catch((error) => console.log(error));
  }, [movieId]);

  return (
    <div>
      {reviews.length > 0 ? (
        <div>
          <h3>Reviews:</h3>
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <p>{`Author: ${review.author}`}</p>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h3>Reviews:</h3>
          <p>Not found any reviews</p>
        </div>
      )}
    </div>
  );
}
