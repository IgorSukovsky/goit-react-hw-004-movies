import { useState, useEffect, lazy, Suspense } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import {
  useParams,
  Switch,
  Route,
  NavLink,
  useHistory,
  Link,
  Redirect,
} from "react-router-dom";

import movieAPI from "../MovieApi/MovieApi";
import s from "./Views.module.css";

const Cast = lazy(() =>
  import("../components/Cast/Cast.jsx" /* webpackChunkName: "cast" */)
);
const Reviews = lazy(() =>
  import("../components/Reviews/Reviews.jsx" /* webpackChunkName: "reviews" */)
);

export default function MovieDetailsPageViews() {
  const { movieId } = useParams();
  const [moviePage, setMoviesPage] = useState([]);
  const history = useHistory();
  const { state } = history.location;

  const prevLink = state ? `${state.url}${state.query}` : "/";
  console.log(prevLink);

  useEffect(() => {
    movieAPI
      .fetchMovieById(movieId)
      .then((movie) => {
        setMoviesPage(movie);
      })
      .catch((error) => console.log(error));
  }, [movieId]);

  return (
    <div className={s.container}>
      <Link type="button" to={prevLink} className={s.btn}>
        Go back
      </Link>

      <div className={s.movieDetailsPage}>
        {moviePage.poster_path ? (
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
        ) : (
          <img
            src={`https://thumbs.dfs.ivi.ru/storage8/contents/f/7/cfcdd5d1df26f7b771e2ff7be7c4c6.jpg`}
            alt={moviePage.title}
            width="300"
            height="250"
            className={s.imgDetails}
          />
        )}
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
                    url: state ? state.url : "/",
                    query: state ? state.query : "",
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
                    url: state ? state.url : "/",
                    query: state ? state.query : "",
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

          {/* <Redirect to={`/movies/${movieId}`} /> */}
          <Redirect
            to={{
              pathname: `/movies/${movieId}/`,
              state: {
                url: state ? state.url : "/",
                query: state ? state.query : "",
              },
            }}
          />
        </Switch>
      </Suspense>
    </div>
  );
}
