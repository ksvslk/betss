import { AppState, AppMoviesActions, SearchMoviesAction } from "./types";
import { ACTION_TYPE } from "./actions";
import { IMovieRepository } from "../repository/IMovieRepository";
import { container } from "inversify-props";

export const initialState: AppState = {
    searchResultsState: [],
    detailPageState: undefined
}

export const appState = (
    state: AppState = initialState,
    action: AppMoviesActions,
) => {
    
    const updatedState: AppState = {
        searchResultsState: state.searchResultsState,
        detailPageState: state.detailPageState
    }    

    switch (action.type) {
        case ACTION_TYPE.SEARCH:
            // TODO: get results from search and return new state
            const typedAction: SearchMoviesAction = action as SearchMoviesAction
            const repository = container.get<IMovieRepository>('MovieRepository')
            repository.getSearchResults(typedAction.keyword, 1).then(
                    (m) =>  {
                        updatedState.searchResultsState = m 
                        console.table(updatedState.searchResultsState)
                        return updatedState
                    }
            )
            return updatedState;
        case ACTION_TYPE.GET_DETAILS:
            // TODO: get detailed movie result and return new state
            return state
        default:
            return state
    }
}