function MovieTable({ movies, onEdit, onDelete }) {
  return (
   <>
   <div className="container-fluid mt-3">
     <table className="table table-bordered table-hover">
      <thead className="table-dark  text-center">
        <tr >
          <th>Id</th>
          <th>Thumbnail</th>
          <th>Title</th>
          <th>Year</th>
          <th>Cast</th>
          <th>Genres</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody className="table-success">
        {movies.map((movie) => (
          <tr key={movie.id} >
            <td>{movie.id}</td>
            <td>
              <img src={movie.thumbnail} alt="image not found" width="60" height="80" className="rounded"/>
            </td>

            <td>{movie.title}</td>
            <td>{movie.year}</td>
            <td>{movie.cast.join(", ")}</td>
            <td>{movie.genres.join(", ")}</td>
            <td>
              <button className="btn btn-warning btn me-4 mb-3" onClick={() => onEdit(movie)}>Edit</button> <br />

              <button className="btn btn-danger btn-ms-2" onClick={() => onDelete(movie.id)}>Delete</button>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
   </div>
   
   
   
   </>
  );
}

export default MovieTable;
