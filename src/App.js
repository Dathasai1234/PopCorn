import { useState } from "react";

// NavBar
import NavBar from "./Components/NavBar/NavBar";
import Search from "./Components/NavBar/Search";
import NumResults from "./Components/NavBar/NumResults";

// LeftBox
import MovieList from "./Components/LeftBox/MovieList";

// RightBox
import MovieDetails from "./Components/RightBox/MovieDetails";
import WatchedSummary from "./Components/RightBox/WatchedSummary";
import WatchedMovieList from "./Components/RightBox/WatchedMovieList";

// presentational-Components
import Main from "./Components/Views/Main";
import Box from "./Components/Views/Box";
import Loader from "./Components/Views/Loader";
import ErrorMessage from "./Components/Views/ErrorMessage";

// Custom hooks
import { useMovies } from "./Custom-Hooks/useMovies";
import { useLocalStorageState } from "./Custom-Hooks/useLocalStorageState";

// TODO FRAGMENT-OVER--------------------------------------------------

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);

  // TODO FRAGMENT-OVER--------------------------------------------------
  // Custom hook

  const [watched, setWatched] = useLocalStorageState([], "watched");

  // TODO FRAGMENT-OVER--------------------------------------------------

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  // TODO FRAGMENT-OVER--------------------------------------------------

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectedMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

// TODO FRAGMENT-OVER--------------------------------------------------

// const WatchedBox = () => {
//   const [watched, setWatched] = useState(tempWatchedData);

//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//         >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched = {watched}/>
//           <WatchedMovieList watched = {watched}/>
//         </>
//       )}
//     </div>
//   )
//  }
