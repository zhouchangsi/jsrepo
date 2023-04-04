export default function main(...args: any[]) {}
function $(selectors: string) {
  return document.querySelector(selectors);
}
$("#app").innerHTML = `
    <div>this is main</div>
`;
