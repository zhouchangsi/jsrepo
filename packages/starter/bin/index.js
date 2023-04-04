Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const questions_1 = tslib_1.__importDefault(require("@/questions"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
const file_1 = require("./utils/file");
const minimist_1 = tslib_1.__importDefault(require("minimist"));
const argv = (0, minimist_1.default)(process.argv.slice(2), { string: ["_"] });
main();
function main() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const anwser = yield (0, questions_1.default)();
        // create template
        const { packageName = "cook-project", overwrite = false, template = "dom-js", } = anwser;
        if (!isValidPackageName(packageName)) {
            console.error("is not a valid package name");
        }
        const templateDir = (0, file_1.cwd) `templates/${template}`;
        const argvDir = argv._[0].trim().replace(/\/+$/g, "");
        const targetDir = argvDir ? (0, file_1.cwd) `${argvDir}` : (0, file_1.cwd) `${template}`;
        if (overwrite) {
            yield fs_extra_1.default.rmdir(targetDir);
        }
        yield fs_extra_1.default.copy(templateDir, targetDir);
        // write package name
        const packageJsonPath = path_1.default.join(targetDir, "package.json");
        const packageJsonFile = yield fs_extra_1.default.readFile(packageJsonPath, "utf-8");
        const packageJson = JSON.parse(packageJsonFile);
        packageJson.name = packageName;
        yield fs_extra_1.default.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log("done!");
        function isValidPackageName(packageName) {
            return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(packageName);
        }
    });
}
//# sourceMappingURL=index.js.map
