export enum ACTION_TYPE {
    SEARCH = 'MOVIES:SEARCH',
    GET_DETAILS = 'MOVIES:GET_DETAILS',
    REFRESH_MAIN = 'MOVIES:REFRESH_MAIN',
}

// action creators
export const getSearchResultsAction = (keyword: string, pageNumber: number) => ({
    type: ACTION_TYPE.SEARCH,
    keyword: keyword,
    pageNumber: pageNumber
})

export const getMovieDetailsAction = (imdbId: string) => ({
    type: ACTION_TYPE.GET_DETAILS,
    imdbId: imdbId
})

export const refreshMainAction = () => ({
    type: ACTION_TYPE.REFRESH_MAIN,
})