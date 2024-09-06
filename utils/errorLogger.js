import { randomUUID } from "node:crypto";
import { writeFileSync, readFileSync, existsSync } from "node:fs";

const errorLogger = (error, path) => {
  try {
    const exists = existsSync(path);

    if (!exists) {
      writeFileSync(path, JSON.stringify([]));
      throw new Error("CREATE LOG FILE");
    }

    const dbError = JSON.parse(readFileSync(path));

    const newError = {
      id: randomUUID(),
      type: error.message,
      date: new Date().toISOString(),
    };

    dbError.push(newError);

    writeFileSync(path, JSON.stringify(dbError));

  } catch (error) {
    errorLogger(error, path);
    return error.message;
  }
};

export { errorLogger };
