import { IMovieResult } from "../types/IMovieResult"
import { IResult } from "../types/IResult"

export enum ACTION_TYPE {
    FETCHING_SEARCH = 'MOVIES:FETCHING',
    FETCHING_MORE_RESULTS = 'MOVIES:FETCHING_MORE_RESULTS',
    LOADED_SEARCH = 'MOVIES:LOADED',
    LOADED_MORE_RESULTS = 'MOVIES:LOADED_MORE_RESULTS',
}

export const fetchingAction = (keyword:string) => ({
    type: ACTION_TYPE.FETCHING_SEARCH,
    keyword:keyword
})

export const loadedAction = (result:IResult | undefined) => ({
    type: ACTION_TYPE.LOADED_SEARCH,
    result: result
})

export const fetchingMoreAction = () => ({
    type: ACTION_TYPE.FETCHING_MORE_RESULTS,
})

export const loadedMoreAction = (movies:IMovieResult[] | undefined) => ({
    type: ACTION_TYPE.LOADED_MORE_RESULTS,
    movies: movies
})
