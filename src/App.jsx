import { useEffect, useState } from "react";
import MovieTable from "./components/MovieTable";
import MovieForm from "./components/MovieForm";
import './App.css'
const apidata =
  "https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json";

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [editMovie, setEditMovie] = useState(null);

  
  useEffect(() => {
    const localData = localStorage.getItem("movies");

   if (localData) {
  let data = JSON.parse(localData);

  data = data.map((m, index) => ({
    ...m,
    id: m.id ? m.id : index + 1, 
  }));

  setMovies(data);
  setFilteredMovies(data);
  extractGenres(data);
}
else {
      fetch(apidata) .then((res) => res.json())
        .then((data) => {
          const list = data.slice(0, 50);
          const moviesWithId = list.map((movielist, index) => ({ ...movielist, id: index + 1, }));
          setMovies(moviesWithId);
          setFilteredMovies(moviesWithId);
          extractGenres(moviesWithId);
          localStorage.setItem("movies", JSON.stringify(moviesWithId));
        });
    }
  }, []);

  const extractGenres = (data) => {
    const setOfGenres = new Set();
    data.forEach((movie) => movie.genres.forEach((gen) => setOfGenres.add(gen)));
    setGenres([...setOfGenres]); };

  useEffect(() => {
    let list = [...movies];
    if (titleFilter.trim()) {
      list = list.filter((mov) =>
        mov.title.toLowerCase().includes(titleFilter.toLowerCase()));}
    if (genreFilter.length > 0) {
      list = list.filter((movi) =>
        movi.genres.some((genres) => genreFilter.includes(genres))
      );
    }
    setFilteredMovies(list);
  }, [titleFilter, genreFilter, movies]);

  const saveMovie = (movie) => {
    let updated;
    if (editMovie) {
      updated = movies.map((movie) =>
        movie.title === editMovie.title ? movie : movie
      );
    } else {
      updated = [...movies, movie];
    }

    setMovies(updated);
    localStorage.setItem("movies", JSON.stringify(updated));
    setShowPopup(false);
    setEditMovie(null);
  };

  
  const deleteMovie = (id) => {
  const updated = movies.filter((m) => m.id !== id);
  setMovies(updated);
  localStorage.setItem("movies", JSON.stringify(updated));
};


  return (
    <>
      <nav className="navbar bg-dark">
         <h3 className="text-dark ms-2">  🎬 Movie details</h3>
          <div className="col-3 me-5">
          <input type="text" className="form-control me-5" placeholder="Search by movie title" value={titleFilter} onChange={(e) => setTitleFilter(e.target.value)}  /></div>
        <button className="btn btn-primary me-5"  onClick={() => setShowPopup(true)}> Add Movie</button>
      </nav>

      
      {/* <div className="row m-4"> */}
        <div className="col-md-4 mt-3 mb-2 ms-5">
          <select  multiple className="form-control" value={genreFilter} onChange={(e) => setGenreFilter([...e.target.selectedOptions].map((o) => o.value)) }>
            {genres.map((gen) => (
              <option key={gen} value={gen}>
                {gen}
              </option>
            ))}
          </select>
        </div>
      {/* </div> */}
      <MovieTable movies={filteredMovies}onEdit={(m) => {setEditMovie(m);setShowPopup(true);}}onDelete={deleteMovie} />
      {showPopup && (
        <MovieForm editMovie={editMovie} onSave={saveMovie} onClose={() => { setShowPopup(false); setEditMovie(null); }} />
      )}
    </>
  );
}

export default App;
