import fs from "fs";
import path from "path";

const cfg = JSON.parse(fs.readFileSync("app.config.json", "utf8"));
if (!fs.existsSync("html/index.html")) {
  console.error("ERROR: html/index.html not found");
  process.exit(1);
}

fs.rmSync("www", { recursive: true, force: true });
fs.cpSync("html", "www", { recursive: true });

fs.writeFileSync(
  "capacitor.config.json",
  JSON.stringify(
    {
      appId: cfg.appId,
      appName: cfg.appName,
      webDir: "www",
      android: { allowMixedContent: true },
    },
    null,
    2
  )
);

if (fs.existsSync("icon.png")) {
  fs.mkdirSync("assets", { recursive: true });
  fs.copyFileSync("icon.png", path.join("assets", "icon.png"));
  console.log("icon.png found -> will generate icons");
}
console.log("Prepared:", cfg.appName, cfg.appId);
