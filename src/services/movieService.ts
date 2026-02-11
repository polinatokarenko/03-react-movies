import axios from "axios";
import type { Movie } from "../types/movie"
import type { MovieServiceProps } from "../types/movie";

interface FetchMoviesResult {
    page: number,
    results: Movie[],
    total_pages: number,
    total_results: number,
}

const myKey = import.meta.env.VITE_TMDB_TOKEN;

export default async function fetchMovies(params: MovieServiceProps): Promise<FetchMoviesResult> {
    const response = await axios.get<FetchMoviesResult>("https://api.themoviedb.org/3/search/movie", {
        params,
        headers: {
            Authorization: `Bearer ${myKey}`,
        }
    }
    );
    return response.data;
};