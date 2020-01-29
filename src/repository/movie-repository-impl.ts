import { IMovieResult } from "../types/IMovieResult"
import api from "../api/Api"
import { IMovieRepository } from "./IMovieRepository"
import { injectable } from "inversify-props"
import { IResult } from "../types/IResult"

@injectable()
export default class MovieRepositoryImpl implements IMovieRepository {

  getMovieDetailsByImdbId(imdbID: string): Promise<IMovieResult | undefined> {
    throw new Error("Method not implemented.")
  }

  async getSearchResults(keyword: string, pageNumber: number): Promise<IResult | undefined> {
    try {
      const response = await api.get(`&s=${keyword}&page=${pageNumber}`)
      if (response.status === 200) {
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