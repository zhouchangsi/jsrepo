import inquirer from "inquirer";

import packageName from "./packageName";
import { templates } from "./framework";

function askQuestions() {
  return inquirer.prompt([packageName(), ...templates()]);
}

export default askQuestions;
