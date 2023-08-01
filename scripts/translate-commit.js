const fs = require("fs");
const path = require("path");

const { translate } = require("bing-translate-api");

async function main() {
  const commitMessagePath = path.resolve(".git", "COMMIT_EDITMSG");
  const commitMessage = fs.readFileSync(commitMessagePath, "utf8");

  await translate(String(commitMessage), null, "en")
    .then((res) => {
      console.log("");
      console.log("ⓘ   original: ", commitMessage);
      console.log("✔   translation: ", res.translation);
      console.log("");
      fs.writeFileSync(
        commitMessagePath,
        res.translation.toLocaleLowerCase(),
        "utf8"
      );
    })
    .catch((err) => {
      console.log("");
      console.error("✖   error:", err);
      console.log("");
    });
}

main();
