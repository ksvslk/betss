import api from "../api/Api"
import { IMovieRepository } from "./IMovieRepository"
import { injectable } from "inversify-props"
import { IResult } from "../types/IResult"
import { IMovieDetail } from "../types/IMovieDetail"

@injectable()
export default class MovieRepositoryImpl implements IMovieRepository {

  async getMovieDetailsByImdbId(imdbID: string): Promise<IMovieDetail | undefined> {
    try {
      const response = await api.get(`&i=${imdbID}`)
      if (response.status === 200) {
        const movieDetails: IMovieDetail =  {
          Title: response.data.Title,
          Year: response.data.Year,
          Type: response.data.Type,
          Poster: response.data.Poster,
          Plot: response.data.Plot,
          imdbRating: response.data.imdbRating,
          Runtime: response.data.Runtime,
          Genre: response.data.Genre,
        }
        return movieDetails
      } else {
        throw new Error(`Status code: '${response.status}'`)
      }
    } catch (error) {
      throw new Error(`Movie details request failed: '${error}'`)
    }
  }

  async getSearchResults(keyword: string, pageNumber: number): Promise<IResult | undefined> {
    try {
      const response = await api.get(`&s=${keyword}&page=${pageNumber}`)
      if (response.status === 200) {
        console.log(response)
        const result: IResult = {
          movies: response.data.Search,
          count: response.data.totalResults as number
        }
        return result
      } else {
        throw new Error(`Status code: '${response.status}'`)
      }
    } catch (error) {
      throw new Error(`Search request failed: '${error}'`)
    }
  }
}