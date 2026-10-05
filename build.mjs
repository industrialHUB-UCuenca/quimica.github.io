import { cp, mkdir, rm } from "node:fs/promises";

await mkdir("dist", { recursive: true });
await mkdir("dist/assets", { recursive: true });

for (const file of ["index.html", "docente.html", "malla.html", "silabos.html", "styles.css", "malla-data.js", "malla.js", "docente-data.js", "docente.js", "syllabi-data.js", "syllabi.js"]) {
  await cp(file, `dist/${file}`);
}

await cp("assets", "dist/assets", { recursive: true });
await rm("dist/assets/silabos", { recursive: true, force: true });
