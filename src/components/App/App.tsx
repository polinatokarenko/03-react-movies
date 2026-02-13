import './App.module.css'
import fetchMovies from '../../services/movieService';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import type { MovieServiceProps } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import { useState } from 'react';
import type { Movie } from '../../types/movie';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleAction = async (query: string) => {
    const params: MovieServiceProps = { query };
    const moviesData = await fetchMovies(params);
    if (moviesData.length === 0) {
      toast.error('No movies found for your request.', { style: { fontFamily: 'Montserrat', } });
    } else {
      setMovies(moviesData);
    }
  };


  return (
    <>
      <Toaster />
      <SearchBar action={handleAction} />
      <MovieGrid movies={movies} />
    </>
  )
};
