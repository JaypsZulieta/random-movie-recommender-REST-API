import { MovieBuilder } from "../src/movie";

describe("Movie", () => {
  test("Should set backDropURL to null if the backdropPath passed in the constructor is null", () => {
    const movie = new MovieBuilder().backDropURL(null).build();
    expect(movie.backDropURL).toBeNull();
  });

  test("Should set posterURL to null if the posterPath passed in the constructor is null", () => {
    const movie = new MovieBuilder().posterURL(null).build();
    expect(movie.posterURL).toBeNull();
  });
});
