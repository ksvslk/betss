import { AppState, AppActions, Loaded, Fetching, LoadedMore } from "./types"
import { ACTION_TYPE } from "./actions"
import { IMovieResult } from "../types/IMovieResult"
import { IResult } from "../types/IResult"

export const initialState: AppState = {
    loadingSearch: false,
    loadingMoreResults: false,
    loadingDetails: false,
    moviesSearchResult: [],
    detailPageState: undefined,
    currentSearchPageNumber: 1,
    currentSearchKeyWord: '',
    totalPagesCount: 0,
}

export const appState = (
    state: AppState = initialState,
    action: AppActions,
) => {

    const updatedState: AppState = {
        loadingSearch: state.loadingSearch,
        loadingMoreResults: state.loadingMoreResults,
        loadingDetails: state.loadingDetails,
        moviesSearchResult: state.moviesSearchResult,
        detailPageState: state.detailPageState,
        currentSearchPageNumber: state.currentSearchPageNumber,
        currentSearchKeyWord: state.currentSearchKeyWord,
        totalPagesCount: state.totalPagesCount,
    }

    switch (action.type) {
        case ACTION_TYPE.FETCHING_SEARCH:
            updatedState.currentSearchKeyWord = (action as Fetching).keyword
            updatedState.loadingSearch = true
            return updatedState
        case ACTION_TYPE.LOADED_SEARCH:
            updatedState.loadingSearch = false
            const result:IResult | undefined = (action as Loaded).result
            updatedState.totalPagesCount = 0
            updatedState.moviesSearchResult = result?.movies
            updatedState.totalPagesCount = result?.count !== undefined ? Math.ceil(result.count / 10) - 1 : 0
            updatedState.currentSearchPageNumber = 2
            return updatedState
        case ACTION_TYPE.FETCHING_MORE_RESULTS:
            updatedState.currentSearchPageNumber++
            updatedState.loadingMoreResults = true
            return updatedState
        case ACTION_TYPE.LOADED_MORE_RESULTS:
            updatedState.loadingMoreResults = false
            const arr: IMovieResult[] | undefined = (action as LoadedMore).movies
            updatedState.moviesSearchResult?.push(...arr ?? [])
            return updatedState
        default:
            return state
    }
}