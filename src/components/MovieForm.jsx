import { useState, useEffect } from "react";

function MovieForm({ onSave, onClose, editMovie }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [cast, setCast] = useState("");
  const [genres, setGenres] = useState("");
  const [thumb, setThumb] = useState("");

  useEffect(() => {
    if (editMovie) {
      setTitle(editMovie.title);
      setYear(editMovie.year);
      setCast(editMovie.cast.join(", "));
      setGenres(editMovie.genres.join(", "));
      setThumb(editMovie.thumbnail);
    }
  }, [editMovie]);

  const save = () => {
    const movie = {
      title,
      year: Number(year),
      cast: cast.split(",").map((c) => c.trim()),
      genres: genres.split(",").map((g) => g.trim()),
      thumbnail: thumb,
    };

    onSave(movie);
  };

  return (
    <>
    <div className="popup">
      <div className="popup-content p-4">
        <h4 className="mb-3">{editMovie ? "Edit Movie" : "Add Movie"}</h4>

        <input className="form-control mb-2" type="text"  placeholder="Movie Title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <input className="form-control mb-2" type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)}  />

        <input className="form-control mb-2" type="text" placeholder="Cast (comma separated)" value={cast} onChange={(e) => setCast(e.target.value)} />

        <input className="form-control mb-2" type="text" placeholder="Genres (comma separated)" value={genres} onChange={(e) => setGenres(e.target.value)} />

        <input className="form-control mb-3" type="text" placeholder="Thumbnail URL" value={thumb}  onChange={(e) => setThumb(e.target.value)} />

        <button className="btn btn-success me-2" onClick={save}> Save </button>

        <button className="btn btn-danger" onClick={onClose}> Cancel </button>
      </div>
    </div>
    </>
  );
}

export default MovieForm;
