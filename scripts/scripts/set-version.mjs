import fs from "fs";
const cfg = JSON.parse(fs.readFileSync("app.config.json", "utf8"));
const f = "android/app/build.gradle";
let g = fs.readFileSync(f, "utf8");
g = g.replace(/versionCode\s+\d+/, `versionCode ${cfg.versionCode}`)
     .replace(/versionName\s+"[^"]*"/, `versionName "${cfg.versionName}"`);
fs.writeFileSync(f, g);
