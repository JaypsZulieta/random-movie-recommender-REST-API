import { MovieLoadingStrategy } from "../src/movie-loading-strategy";
import { mock, mockClear } from "jest-mock-extended";
import * as Random from "../src/random";
import { MovieBuilder } from "../src/movie";
import { RandomMovieRecommender } from "../src/movie-recommender";

describe("RandomMovieRecommender", () => {
  let movieLoadingStrategy: jest.Mocked<MovieLoadingStrategy>;

  beforeEach(() => {
    movieLoadingStrategy = mock<MovieLoadingStrategy>();
  });

  afterEach(() => {
    mockClear(movieLoadingStrategy);
  });

  test("Should pick a movie from the movies loaded based on a random index that was generated", () => {
    const movie1 = new MovieBuilder().title("Iron Man").build();
    const movie2 = new MovieBuilder().title("The incredible Hulk").build();
    const movie3 = new MovieBuilder().title("Iron Man 2").build();
    const movie4 = new MovieBuilder().title("Thor").build();
    const movie5 = new MovieBuilder().title("Captain Americe: The First Avenger").build();
    const movie6 = new MovieBuilder().title("The Avengers").build();

    const mockMoviesLoaded = [movie1, movie2, movie3, movie4, movie5, movie6];
    movieLoadingStrategy.load.mockResolvedValue(mockMoviesLoaded);
    jest.spyOn(Random, "getRandomNumberBetween").mockReturnValue(3);

    const movieRecommender = new RandomMovieRecommender(movieLoadingStrategy);

    const movieRecommended = movieRecommender.recommend();

    expect(movieRecommended).resolves.toEqual(movie4);
  });
});
