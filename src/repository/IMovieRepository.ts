import { IMovieResult } from "../types/IMovieResult";
import { IResult } from "../types/IResult";
import { IMovieDetail } from "../types/IMovieDetail";

export interface IMovieRepository {
    getSearchResults (keyword: string, pageNumber: number): Promise<IResult | undefined>;
    getMovieDetailsByImdbId (imdbID: string): Promise<IMovieDetail | undefined>;
}