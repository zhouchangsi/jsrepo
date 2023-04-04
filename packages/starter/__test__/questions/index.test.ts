import askQuestions from "../../src/questions";
import { test, expect, vi } from "vitest";
import { QuestionCollection } from "inquirer";
import { table } from "console";

const questions: QuestionCollection<any> = [];

interface Assertion {
  type: string;
  name: string;
  message?: string | AssertionFN;
  default?: string | number | boolean | any[] | AssertionFN;
  choices?: any[] | AssertionFN;
  validate?: AssertionFN;
  filter?: AssertionFN;
  transformer?: AssertionFN;
  when?: boolean | AssertionFN;
  pageSize?: number;
  prefix?: string;
  suffix?: string;
  loop?: boolean;
  waitUserInput?: boolean;
}

interface Answer {
  [x: Assertion["name"]]: boolean | string | number | any[];
}

/**
 * @param answer current inquirer session answer
 */
type AssertionFN<T = any> = (...args: any[]) => T;

let pendingAssertions: Assertion[] | null;
const expectPrompts = (assertions: Assertion[]): void => {
  pendingAssertions = assertions;
};

export const prompt = (prompts: Assertion[]) => {
  table(prompt);

  if (!pendingAssertions) {
    throw new Error(
      `inquirer was mocked and used without pending assertions: ${prompts}`
    );
  }

  const answers = {};
  let skipped = 0;

  prompts.forEach((prompt, i) => {
    if (
      prompt.when &&
      typeof prompt.when === "function" &&
      !prompt.when(answers)
    ) {
      skipped++;
      return;
    }

    const setAnswerOfCurrentPrompt = (val: any) => {
      if (prompt.validate) {
        const res = prompt.validate(val);
        if (res !== true) {
          throw new Error(`validation failed for prompt: ${prompt}`);
        }
      }
      answers[prompt.name] = prompt.filter ? prompt.filter(val) : val;
    };

    const pengdingAssertion = pendingAssertions![i - skipped];

    if (pengdingAssertion.message) {
      const message =
        typeof prompt.message === "function"
          ? prompt.message(answers)
          : prompt.message;
      expect(message).toContain(pengdingAssertion.message);
    }

    if (pengdingAssertion.choices) {
      expect(prompt.choices.length).toBe(pengdingAssertion.choices.length);
      pengdingAssertion.choices.forEach((_c, i) => {
        const expected = pengdingAssertion.choices[i];
        if (expected) {
          expect(prompt.choices[i].name).toContain(expected);
        }
      });
    }

    if (pengdingAssertion.input != null) {
      expect(prompt.type).toBe("input");
      setAnswerOfCurrentPrompt(pengdingAssertion.input);
    }

    if (pengdingAssertion.choose != null) {
      expect(prompt.type).toBe("list");
      setAnswerOfCurrentPrompt(prompt.choices[pengdingAssertion.choose].value);
    }

    if (pengdingAssertion.check != null) {
      expect(prompt.type).toBe("checkbox");
      setAnswerOfCurrentPrompt(
        pengdingAssertion.check.map((i) => prompt.choices[i].value)
      );
    }

    if (pengdingAssertion.confirm != null) {
      expect(prompt.type).toBe("confirm");
      setAnswerOfCurrentPrompt(pengdingAssertion.confirm);
    }

    if (pengdingAssertion.useDefault) {
      expect("default" in prompt).toBe(true);
      setAnswerOfCurrentPrompt(
        typeof prompt.default === "function"
          ? prompt.default(answers)
          : prompt.default
      );
    }
  });

  expect(prompts.length).toBe(pendingAssertions.length + skipped);

  pendingAssertions = null;

  return Promise.resolve(answers);
};
