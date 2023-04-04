import askQuestions from "@/questions";
import fs from "fs-extra";
import path from "path";
import { cwd } from "./utils/file";

import minimist from "minimist";

const argv = minimist(process.argv.slice(2), { string: ["_"] });

main();
async function main() {
  const anwser = await askQuestions();

  // create template
  const {
    packageName = "cook-project",
    overwrite = false,
    template = "dom-js",
  } = anwser;

  if (!isValidPackageName(packageName)) {
    console.error("is not a valid package name");
  }

  const templateDir = cwd`templates/${template}`;
  const argvDir = argv._[0].trim().replace(/\/+$/g, "");
  const targetDir = argvDir ? cwd`${argvDir}` : cwd`${template}`;

  if (overwrite) {
    await fs.rmdir(targetDir);
  }
  await fs.copy(templateDir, targetDir);

  // write package name
  const packageJsonPath = path.join(targetDir, "package.json");
  const packageJsonFile = await fs.readFile(packageJsonPath, "utf-8");
  const packageJson = JSON.parse(packageJsonFile);
  packageJson.name = packageName;
  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log("done!");

  function isValidPackageName(packageName: string): boolean {
    return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
      packageName
    );
  }
}

function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, "");
}
