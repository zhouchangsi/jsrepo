import path from "path";

/**
 * ```javascript
 * const indexJs = cwd`src/${path}/index.js`
 * ```
 * @param strings
 * @param expressions 
 * @returns The path that is relative to the CWD
 */
export function cwd(
  strings?: TemplateStringsArray,
  ...expressions: string[]
): string {
  return path.join(process.cwd(), ...(strings || ""), ...expressions);
}