import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import s from "../../Views/Views.module.css";

function MovieList({ movies }) {
  const history = useHistory();

  return (
    <div>
      <ul className={s.movieList}>
        {movies.map((movie) => {
          return (
            <li key={movie.id} className={s.movieCard}>
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: {
                    url: history.location.pathname,
                    query: history.location.search,
                  },
                }}
              >
                <div className={s.movieBody}>
                  {console.log(movie.poster_path)}
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                      className={s.movieImg}
                    />
                  ) : (
                    <img
                      src={`https://thumbs.dfs.ivi.ru/storage8/contents/f/7/cfcdd5d1df26f7b771e2ff7be7c4c6.jpg`}
                      alt={movie.title}
                      className={s.movieImg}
                    />
                  )}
                </div>
                <h3>{movie.title}</h3>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape),
};

export { MovieList };
