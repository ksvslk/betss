import { IMovieResult } from "../types/IMovieResult"
import { IMovieDetail } from "../types/IMovieDetail"
import { IResult } from "../types/IResult"

// biggest state object we handle
export type AppState = {
    loadingSearch: boolean
    loadingMoreResults: boolean
    loadingDetails: boolean
    detailPageState?: IMovieDetail
    detailMovieID: string
    moviesSearchResult?: IMovieResult[]
    currentSearchPageNumber: number
    currentSearchKeyWord: string
    totalPagesCount: number
}

// action typess
export type Fetching = {
    type:string,
    keyword:string
}
export type FetchingMore = {
    type:string,
}
export type FetchingDetails = {
    type:string,
    imdbID:string
}
export type Loaded = {
    type:string,
    result:IResult | undefined
}
export type LoadedMore = {
    type:string,
    movies:IMovieResult[] | undefined
}
export type LoadedDetails = {
    type:string,
    details:IMovieDetail | undefined
}

// combined type of Actions
export type AppActions = Fetching | FetchingMore | FetchingDetails | Loaded | LoadedMore | LoadedDetails;
