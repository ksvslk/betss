import { IMovieResult } from "../types/IMovieResult"
import { IMovieDetail } from "../types/IMovieDetail"

// biggest state object we handle
export type AppState = {
    detailPageState?: IMovieDetail
    searchResultsState?: IMovieResult[]
}

// action typess
export type SearchMoviesAction = {
    type: string
    keyword: string
    pageNumber: number
}

export type GetMovieDetailsAction = {
    type: string
    imdbId: string
}

// combined type of Actions
export type AppMoviesActions = SearchMoviesAction | GetMovieDetailsAction;
