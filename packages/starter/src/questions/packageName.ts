import { table } from "console";

const packageName = () => ({
  type: "input",
  name: "packageName",
  message: "set package name",
  validate(val: string) {
    if (val) return true;
    return "Please enter package name";
  },
});

export default packageName;
