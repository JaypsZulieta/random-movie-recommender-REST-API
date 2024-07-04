import { MovieBuilder } from "../src/movie";
import {
  MovieData,
  PaginatedMovieData,
  TheMovieDatabaseLoadingStrategy,
} from "../src/movie-loading-strategy";

describe("TheMovieDatabaseLoadingStrategy", () => {
  test("Should call the specific API uri and return an array of Movie objects", () => {
    const apiKey = "someAPIKey";
    const uri =
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=8&vote_count.gte=50";

    const options = {
      headers: { Authorization: `Bearer ${apiKey}`, accept: "application/json" },
    } satisfies RequestInit<RequestInitCfProperties>;

    const movieData = [
      {
        id: 1,
        title: "Spider Man",
        overview: "Kid gains spider powers",
        release_date: "2002-05-03",
        original_language: "en",
        poster_path: null,
        backdrop_path: null,
      },
      {
        id: 2,
        title: "Spider Man 2",
        overview: "Spiderman loses his spider powers",
        release_date: "2004-06-30",
        original_language: "en",
        poster_path: null,
        backdrop_path: null,
      },
      {
        id: 3,
        title: "Spider Man 3",
        overview: "Spiderman meets Venom",
        release_date: "2007-05-04",
        original_language: "en",
        poster_path: null,
        backdrop_path: null,
      },
    ] satisfies MovieData[];

    const paginatedMovieData = {
      results: movieData,
      total_pages: 1,
    } satisfies PaginatedMovieData;

    globalThis.fetch = jest.fn().mockResolvedValue({ json: async () => paginatedMovieData });

    const expectedMoviesReturned = movieData.map((data) =>
      new MovieBuilder()
        .id(data.id)
        .title(data.title)
        .overview(data.overview)
        .releaseDate(new Date(data.release_date))
        .orginalLanguage(data.original_language)
        .backDropURL(data.backdrop_path)
        .posterURL(data.poster_path)
        .build()
    );

    const movieLoadingStrategy = new TheMovieDatabaseLoadingStrategy(apiKey);
    const movies = movieLoadingStrategy.load();

    expect(movies).resolves.toEqual(expectedMoviesReturned);
    expect(globalThis.fetch).toHaveBeenCalledWith(uri, options);
  });
});
