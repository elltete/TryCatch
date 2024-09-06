import {getMovies, getMovieById, addMovie, updateMovie, deleteMovie } from "./models.js"
import { errorLogger } from "./utils/errorLogger.js";
import 'dotenv/config';

const _LOG_FILE = process.env.LOG_FILE;

const args = process.argv.splice(2);

const input = args[0].toLowerCase();

switch (input) {
    case "getmovies":
        console.log(getMovies())
    break;
    case "getmoviebyid":
        console.log(getMovieById(args[1]));
    break;
    case "addmovie":
        console.log(addMovie(args));
    break;
    case "updatemovie":
        console.log(updateMovie(args));
    break;
    case "deletemovie":
        console.log(deleteMovie(args[1]));
    break;
    default:
        errorLogger(new Error("INVALID ARGUMENTS in INDEX"), _LOG_FILE);
        console.log("INVALID ARGUMENTS in INDEX")
}