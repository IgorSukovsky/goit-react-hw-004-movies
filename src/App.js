import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
//react-loader-spinner
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
//Navigation
import { Navigation } from "./components/Navigation/Navigation";
import "./App.css";

//Views
const HomeViews = lazy(() =>
  import("./Views/HomeViews.jsx" /* webpackChunkName: "home" */)
);
const MovieViews = lazy(() =>
  import("./Views/MovieViews.jsx" /* webpackChunkName: "movie" */)
);
const MovieDetailsPageViews = lazy(() =>
  import(
    "./Views/MovieDetailsPageViews.jsx" /* webpackChunkName: "movie-details" */
  )
);

// const NotFound = lazy(() =>
//   import("./Views/NotFound/NotFound.jsx" /* webpackChunkName: "not-found" */)
// );

function App() {
  const {
    location: { pathname },
  } = useHistory();
  console.log();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <div className="App">
      <Navigation />
      <hr />
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
          <Route path="/" exact>
            <HomeViews />
          </Route>

          <Route path="/movies" exact>
            <MovieViews />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPageViews />
          </Route>

          <Route component={() => <h2>notFound</h2>} />

          <Redirect to="/movies/:movieId/<h2>notFound</h2>" />
          {/* <NotFound /> */}
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
