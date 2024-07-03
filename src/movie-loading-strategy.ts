import { Movie, MovieBuilder } from "./movie";
import { getRandomNumberBetween } from "./random";

export interface MovieLoadingStrategy {
  load(): Promise<Movie[]>;
}

type MovieData = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  backdrop_path: string;
  poster_path: string;
};

type PaginatedMovieData = {
  results: MovieData[];
  total_pages: number;
};

export class TheMovieDatabaseLoadingStrategy implements MovieLoadingStrategy {
  constructor(private apiKey: string) {}

  async load(): Promise<Movie[]> {
    const totalPages = await this.getTotalPages();
    const randomPage = getRandomNumberBetween(1, totalPages);
    const movieResults = await this.getMovieResultsByPage(randomPage);
    return movieResults.results.map((data) =>
      new MovieBuilder()
        .id(data.id)
        .title(data.title)
        .overview(data.overview)
        .releaseDate(new Date(data.release_date))
        .backDropURL(data.backdrop_path)
        .posterURL(data.poster_path)
        .build()
    );
  }

  private async getTotalPages(): Promise<number> {
    return (await this.getMovieResultsByPage(1)).total_pages;
  }

  private async getMovieResultsByPage(pageNumber: number): Promise<PaginatedMovieData> {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc&vote_average.gte=8&vote_count.gte=50`;
    const options = {
      headers: { Authorization: `Bearer ${this.apiKey}`, accept: "application/json" },
    } satisfies RequestInit<RequestInitCfProperties>;
    return (await fetch(url, options).then((data) => data.json())) as PaginatedMovieData;
  }
}
