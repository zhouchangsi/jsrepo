import {
  IAbstractExpression,
  Add,
  Numeral,
  Subtract,
} from "@/bahavioral/interpreter";
import { describe, it, expect } from "vitest";

describe("Interpreter Pattern", () => {
  it("work", () => {
    // The Client
    // The sentence complies with a simple grammar of
    // Number -> Operator -> Number -> etc,
    const SENTENCE = "5 + 4 - 3 + 7 - 2";
    console.log("SENTENCE: \t", SENTENCE);

    // Split the sentence into individual expressions that will be added to
    // an Abstract Syntax Tree(AST) as Terminal and Non - Terminal expressions
    const TOKENS = SENTENCE.split(" ");
    console.log("TOKENS: \t", JSON.stringify(TOKENS));

    // Manually Creating an Abstract Syntax Tree from the tokens
    const AST: IAbstractExpression[] = []; // An array of AbstractExpressions
    AST.push(new Add(new Numeral(TOKENS[0]), new Numeral(TOKENS[2]))); // 5 + 4
    AST.push(new Subtract(AST[0], new Numeral(TOKENS[4]))); // ^ - 3
    AST.push(new Add(AST[1], new Numeral(TOKENS[6]))); // ^ + 7
    AST.push(new Subtract(AST[2], new Numeral(TOKENS[8]))); // ^ - 2

    // Use the final AST row as the root node.
    const AST_ROOT = AST.pop();

    // Interpret recursively through the full AST starting from the root.
    const result = (AST_ROOT as IAbstractExpression).interpret();
    expect(result).toBe(5 + 4 - 3 + 7 - 2);

    // Print out a representation of the AST_ROOT
    console.dir(AST_ROOT, { depth: null });
  });
});
