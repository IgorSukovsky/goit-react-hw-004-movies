import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import movieAPI from "../../MovieApi/MovieApi";

import s from "../../Views/Views.module.css";

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    movieAPI
      .fetchMovieCredits(movieId)
      .then((movie) => {
        setCast(movie.cast);
      })
      .catch((error) => console.log(error));
  }, [movieId]);

  return (
    <div>
      {cast && (
        <div>
          <h3>Cast:</h3>
          <ul className={s.listActors}>
            {cast.map((photoActor) => (
              <li key={photoActor.id} className={s.actorCard}>
                <div>
                  {photoActor.profile_path ? (
                    <img
                      src={
                        photoActor.profile_path
                          ? `https://image.tmdb.org/t/p/w500/${photoActor.profile_path}`
                          : null
                      }
                      alt={`${photoActor.name}`}
                      className={s.castImg}
                    />
                  ) : (
                    <img
                      src={`https://static6.depositphotos.com/1002881/580/i/950/depositphotos_5804811-stock-photo-error-404.jpg`}
                      alt={photoActor.name}
                      className={s.castImg}
                    />
                  )}
                  <h3>{photoActor.original_name}</h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
