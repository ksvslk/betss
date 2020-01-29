import { IMovieResult } from "../types/IMovieResult";
import { IResult } from "../types/IResult";

export interface IMovieRepository {
    getSearchResults (keyword: string, pageNumber: number): Promise<IResult | undefined>;
    getMovieDetailsByImdbId (imdbID: string): Promise<IMovieResult | undefined>;
}