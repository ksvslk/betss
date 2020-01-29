import { IMovieResult } from "../types/IMovieResult";

export interface IMovieRepository {
    getSearchResults (keyword: string, pageNumber: number): Promise<IMovieResult[] | undefined>;
    getMovieDetailsByImdbId (imdbID: string): Promise<IMovieResult | undefined>;
}