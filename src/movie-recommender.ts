import { Movie } from "./movie";
import { MovieLoadingStrategy } from "./movie-loading-strategy";
import { getRandomNumberBetween } from "./random";

export interface MovieRecommender {
  recommend(): Promise<Movie>;
}

export class RandomMovieRecommender implements MovieRecommender {
  constructor(private strategy: MovieLoadingStrategy) {}

  async recommend(): Promise<Movie> {
    const movies = await this.strategy.load();
    const randomIndex = getRandomNumberBetween(0, movies.length - 1);
    return movies[randomIndex];
  }
}
