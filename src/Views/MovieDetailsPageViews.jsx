import { useState, useEffect, lazy, Suspense } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import {
  useParams,
  Switch,
  Route,
  NavLink,
  useHistory,
  Link,
} from 'react-router-dom';

import movieAPI from '../components/MovieApi/MovieApi';
import s from './Views.module.css';


//Views
const Cast = lazy(() =>
  import('../Views/Cast/Cast.jsx' /* webpackChunkName: "cast" */),
);
const Reviews = lazy(() =>
  import('../Views/Reviews/Reviews.jsx' /* webpackChunkName: "reviews" */),
);

export default function MovieDetailsPageViews() {
  const { movieId } = useParams();
  const [moviePage, setMoviesPage] = useState([]);
  const history = useHistory();
  const { state } = history.location;
  const prevLink = `${state.url}${state.query}`;

  console.log(state.query);
  useEffect(() => {
    movieAPI.fetchMovieById(movieId).then(movie => {
      setMoviesPage(movie);
    });
  }, [movieId]);

  //! console.log(movieId);

  return (
    <div className={s.container}>
      <Link type="button" to={prevLink} className={s.btn}>
        Go back
      </Link>

      <div className={s.movieDetailsPage}>
        <img
          src={
            moviePage.backdrop_path
              ? `https://image.tmdb.org/t/p/w500/${moviePage.poster_path}`
              : null
          }
          
          alt={moviePage.title}
          width="300"
          height="250"
          className={s.imgDetails}
        />
        <div className={s.movieDescription}>
          <ul className={s.list}>
            <li>
              <h2 className={s.title}>{moviePage.title}</h2>
            </li>
            <li className={s.listDescription}>
              <p className={s.text}>Release date:</p>
              <span className={s.release}>{` ${moviePage.release_date}`}</span>
            </li>
            <li className={s.listDescription}>
              <span>{`Popularity: ${moviePage.popularity}%`}</span>
            </li>
            <li className={s.listDescription}>
              <span
                className={s.overview}
              >{`Overview: ${moviePage.overview}`}</span>
            </li>
          </ul>
        </div>
      </div>

      
      {moviePage && (
        <div>
          <ul>
            <li className={s.description}>
              <NavLink
                
                to={{
                  pathname: `/movies/${movieId}/cast`,
                  state: {
                    url: state.url,
                    query: state.query,
                  },
                }}
                activeClassName={s.activeLink}
              >
                Cast
              </NavLink>
            </li>
            <li className={s.description}>
              <NavLink
                
                to={{
                  pathname: `/movies/${movieId}/reviews`,
                  state: {
                    url: state.url,
                    query: state.query,
                  },
                }}
                activeClassName={s.activeLink}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      
      <Suspense
        fallback={
          <div>
            <Loader
              type="MutatingDots"
              
              color="#00BFFF"
              height={80}
              width={80}
              timeout={3000}
            />
          </div>
        }
      >
        <Switch>
          <Route path="/movies/:movieId/cast">
            <Cast>{moviePage && <Cast movieId={movieId} />}</Cast>
          </Route>
          <Route path="/movies/:movieId/reviews">
            <Reviews movieId={movieId} />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}
