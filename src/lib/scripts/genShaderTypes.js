import fs from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const shaders = fs.readdirSync(resolve(__dirname, "../shaders"));

let outString = `/**
    * @typedef  {(${shaders.map((s) => `'${s}'`).join("|")})} Shaders
    */
   
   /** @type {Shaders} */
   export default ""; `;

fs.writeFileSync(resolve(__dirname, "../types/shaders.d.js"), outString);
