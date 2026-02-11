export interface Movie {
    id: number;
    poster_path: string;
    backdrop_path: string;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
}

export interface MovieServiceProps {
    query: string;
    include_adult?: boolean;
    language?: string;
    primary_release_year?: string;
    page?: number;
    region?: string;
    year?: string;
}
