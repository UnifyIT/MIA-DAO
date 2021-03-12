import fs from "fs";

const writeFileSync = (filename: any, write: any): void => {
  fs.writeFileSync(filename, write, console.log("file has been created") as any);
}

export default {
  writeFileSync,
}