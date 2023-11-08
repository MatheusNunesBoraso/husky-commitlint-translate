/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */

const fs = require("fs");
const path = require("path");

const { translate } = require("bing-translate-api");

async function main() {
  const commitMessagePath = path.resolve(".git", "COMMIT_EDITMSG");
  const commitMessage = fs.readFileSync(commitMessagePath, "utf8");

  // Lista de palavras-chave a serem evitadas na tradução
  const keywordsToAvoid = [
    "feat",
    "fix",
    "docs",
    "style",
    "refactor",
    "perf",
    "test",
    "build",
    "ci",
    "chore",
    "revert",
  ];

  // Verifique se a mensagem de commit começa com uma das palavras-chave a serem evitadas
  let cleanedCommitMessage = commitMessage;
  let prefix = "";
  for (const keyword of keywordsToAvoid) {
    const regex = new RegExp(`^${keyword}:\\s+`, "i");
    if (regex.test(cleanedCommitMessage)) {
      prefix = cleanedCommitMessage.match(regex)[0];
      cleanedCommitMessage = cleanedCommitMessage.replace(regex, "");
      break;
    }
  }

  await translate(cleanedCommitMessage, null, "en")
    .then((res) => {
      const translatedMessage = prefix + res.translation;
      console.log("");
      console.log("ⓘ   original: ", commitMessage);
      console.log("✔   translation: ", translatedMessage);
      console.log("");
      fs.writeFileSync(
        commitMessagePath,
        translatedMessage.toLocaleLowerCase(),
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
