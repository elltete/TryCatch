import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { errorLogger } from "./utils/errorLogger.js";
import { randomUUID } from "node:crypto";
import "dotenv/config";

const _DATA_MOVIES = process.env.DATA_MOVIES;
const _LOG_FILE = process.env.LOG_FILE;

const getMovies = () => {
  try {
    const exists = existsSync(_DATA_MOVIES);

    if (!exists) {
      writeFileSync(_DATA_MOVIES, JSON.stringify([]));
      throw new Error("CREATE MOVIE FILE");
    }

    const movies = JSON.parse(readFileSync(_DATA_MOVIES));

    return movies;

  } catch (error) {
    errorLogger(error, _LOG_FILE);
    return error.message;
  }
};

const getMovieById = (id) => {
  try {
    if (!id) {
      throw new Error("ID IS MISSING IN GETMOVIEBYID");
    }

    const dataMovies = getMovies();

    const foundMovie = dataMovies.find((movie) => movie.id === id);

    if (!foundMovie) {
      throw new Error("MOVIE ID NOT FOUND");
    }

    return foundMovie;

  } catch (error) {
    errorLogger(error, _LOG_FILE);
    return error.message;
  }
};

const addMovie = (args) => {
  try {
    if (args.length != 7) {
      throw new Error("INVALID ARGUMENTS in ADDMOVIE");
    }

    const dataMovies = getMovies();

    const existsMovie = dataMovies.find((movie) => movie.title == args[1].toUpperCase());

    if(existsMovie) {
      throw new Error("EXISTS MOVIE TITLE IN DATAMOVIES");
    }

    const newMovie = {
      id: randomUUID(),
      title: args[1].toUpperCase(),
      genre: args[2].toUpperCase(),
      director: args[3].toUpperCase(),
      releaseDate: args[4],
      rating: Number(args[5]),
      isFeatured: args[6].toUpperCase(),
    };

    dataMovies.push(newMovie);

    writeFileSync(_DATA_MOVIES, JSON.stringify(dataMovies));

    errorLogger(new Error("ADDED NEW MOVIE"), _LOG_FILE);

    return {
        id: newMovie.id,
        name: newMovie.title,
    };

  } catch (error) {
    errorLogger(error, _LOG_FILE);
    return error.message;
  }
};

const updateMovie = (args) => {
  try {
    if (args.length != 8) {
      throw new Error("INVALID ARGUMENTS in UPDATEMOVIE");
    }

    const dataMovies = getMovies();

    //const existsMovie = getMovieById(id);

    const existsMovie = dataMovies.find((movie) => movie.id === args[1]);

    if(!existsMovie) {
      throw new Error("DOESN'T EXISTS MOVIE TITLE IN DATAMOVIES");
    }

    existsMovie.title = args[2].toUpperCase();
    existsMovie.genre = args[3].toUpperCase();
    existsMovie.director = args[4].toUpperCase();
    existsMovie.releaseDate = args[5];
    existsMovie.rating = Number(args[6]);
    existsMovie.isFeatured = args[7].toUpperCase();

    writeFileSync(_DATA_MOVIES, JSON.stringify(dataMovies));

    errorLogger(new Error("MOVIE UPDATED"), _LOG_FILE);

    return {
        id: existsMovie.id,
        name: existsMovie.title,
    };

  } catch (error) {
    errorLogger(error, _LOG_FILE);
    return error.message;
  }
};

const deleteMovie = (id) => {

console.log(id)

  try {
    if (!id) {
      throw new Error("INVALID ARGUMENTS in DELETEMOVIE");
    }

    const dataMovies = getMovies();

    const existsMovie = dataMovies.find((movie) => movie.id === id);

    if(!existsMovie) {
      throw new Error("ID MOVIE NOT EXISTS IN DATAMOVIES");
    }

    const newMovies = dataMovies.filter((movie) => movie.id !== id);

    writeFileSync(_DATA_MOVIES, JSON.stringify(newMovies));

    errorLogger(new Error("MOVIE DELETED"), _LOG_FILE);

    return existsMovie; 

  } catch (error) {
    errorLogger(error, _LOG_FILE);
    return error.message;
  }
};

export { getMovies, getMovieById, addMovie, updateMovie, deleteMovie };
