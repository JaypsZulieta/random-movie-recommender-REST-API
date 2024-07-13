import { Context, Hono } from "hono";
import { RandomMovieRecommender } from "./movie-recommender";
import { TheMovieDatabaseLoadingStrategy } from "./movie-loading-strategy";
import { cors } from "hono/cors";

type Bindings = {
  API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    allowMethods: ["GET"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
  })
);

app.get("/", (context: Context) => {
  return context.text(
    'This is the Random Movie Recommender REST API by Jaypee Zulieta.\nPlease go to "https://movie-recommender.jaypee-zulieta.workers.dev/recommendation" to view the recommended movie.'
  );
});

app.get("/recommendation", async (context: Context) => {
  const apiKey = context.env.API_KEY;
  const movieLoadingStrategy = new TheMovieDatabaseLoadingStrategy(apiKey);
  const movieRecommender = new RandomMovieRecommender(movieLoadingStrategy);
  return context.json(await movieRecommender.recommend());
});

export default app;
