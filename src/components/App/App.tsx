import './App.module.css'
import fetchMovies from '../../services/movieService';
import { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import type { MovieServiceProps } from '../../types/movie';

export default function App() {
  const handleAction = (query: string) => {
    const params: MovieServiceProps = { query };
    fetchMovies(params);
  };


  return (
    <>
      <Toaster />
      <SearchBar action={handleAction} />
    </>
  )
};
