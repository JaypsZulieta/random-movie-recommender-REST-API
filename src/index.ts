import { Context, Hono } from "hono";
import { RandomMovieRecommender } from "./movie-recommender";
import { TheMovieDatabaseLoadingStrategy } from "./movie-loading-strategy";

type Bindings = {
  API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (context: Context) => {
  return context.text(
    'This is the Random Movie Recommender REST API by Jaypee Zulieta.\nPlease go to "/recommendation" to view the recommended movie.'
  );
});

app.get("/recommendation", async (context: Context) => {
  const apiKey = context.env.API_KEY;
  const movieLoadingStrategy = new TheMovieDatabaseLoadingStrategy(apiKey);
  const movieRecommender = new RandomMovieRecommender(movieLoadingStrategy);
  return context.json(await movieRecommender.recommend());
});

export default app;
