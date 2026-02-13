import './App.module.css'
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

/*API fetch*/
import fetchMovies from '../../services/movieService';

/*components*/
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

/*types*/
import type { Movie } from '../../types/movie';
import type { MovieServiceProps } from '../../services/movieService';


export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isError, setIsError] = useState(false);

  const handleAction = async (query: string) => {
    setIsError(false);
    setIsLoading(true);
    setMovies([]);
    try {
      const params: MovieServiceProps = { query };
      const moviesData = await fetchMovies(params);
      if (moviesData.length === 0) {
        toast.error('No movies found for your request.', { style: { fontFamily: 'Montserrat', } });
      } else {
        setMovies(moviesData);
      }
    }
    catch {
      setIsError(true);
    }
    finally {
      setIsLoading(false);
    }
  };

  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const handleSelect = (movie: Movie) => {
    setCurrentMovie(movie);
  }

  const closeModal = () => {
    setCurrentMovie(null);
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleAction} />
      {isLoading ? <Loader /> : isError ? <ErrorMessage /> : <MovieGrid movies={movies} onSelect={handleSelect} />}
      {currentMovie !== null && <MovieModal movie={currentMovie} onClose={closeModal}/>}
    </>
  )
};
