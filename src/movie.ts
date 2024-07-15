class Movie {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly overview: string,
    readonly releaseDate: Date,
    readonly originalLanguage: string,
    readonly backDropURL: string | null,
    readonly posterURL: string | null
  ) {
    this.backDropURL = !backDropURL ? null : `https://image.tmdb.org/t/p/original${backDropURL}`;
    this.posterURL = !posterURL ? null : `https://image.tmdb.org/t/p/original${posterURL}`;
  }
}

class MovieBuilder {
  private idToSet = 0;
  private titleToSet = "John Smith - The Movie";
  private overviewToSet = "The life story of the legendary John Smith.";
  private releaseDateToSet = new Date("2003-12-20");
  private originalLanguageToSet = "en";
  private backDropURLToSet: string | null = null;
  private posterURLToSet: string | null = null;

  id(id: number): MovieBuilder {
    this.idToSet = id;
    return this;
  }

  title(title: string): MovieBuilder {
    this.titleToSet = title;
    return this;
  }

  overview(overview: string): MovieBuilder {
    this.overviewToSet = overview;
    return this;
  }

  releaseDate(date: Date): MovieBuilder {
    this.releaseDateToSet = date;
    return this;
  }

  originalLanguage(originalLanguage: string): MovieBuilder {
    this.originalLanguageToSet = originalLanguage;
    return this;
  }

  backDropURL(backDropURL: string | null): MovieBuilder {
    this.backDropURLToSet = backDropURL;
    return this;
  }

  posterURL(posterURL: string | null): MovieBuilder {
    this.posterURLToSet = posterURL;
    return this;
  }

  build(): Movie {
    return new Movie(
      this.idToSet,
      this.titleToSet,
      this.overviewToSet,
      this.releaseDateToSet,
      this.originalLanguageToSet,
      this.backDropURLToSet,
      this.posterURLToSet
    );
  }
}

export { type Movie, MovieBuilder };
