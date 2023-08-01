const fs = require("fs");
const path = require("path");

const { translate } = require("bing-translate-api");

async function main() {
  const commitMessagePath = path.resolve(".git", "COMMIT_EDITMSG");
  const commitMessage = fs.readFileSync(commitMessagePath, "utf8");

  await translate(String(commitMessage), null, "en")
    .then((res) => {
      console.log("Tradução:", res.translation);
      fs.writeFileSync(
        commitMessagePath,
        res.translation.toLocaleLowerCase(),
        "utf8"
      );
    })
    .catch((err) => {
      console.error("Erro ao traduzir mensagem:", err);
    });
}

main();
