import { NFA } from "./NFA/NFA";
export { Regex };
class Regex {
    input: string;
    pattern: string;
    mode: 1 | 2;
    minimize: boolean;
    constructor(
        input: string,
        pattern: string,
        mode: 1 | 2 = 1,
        minimize = true
    ) {
        this.input = input;
        this.pattern = pattern;
        this.mode = mode;
        this.minimize = minimize;
    }
    set_input(input: string) {
        this.input = input;
    }
    match(): boolean {
        let nfa_start_state = NFA.create_nfa_by_pattern(this.pattern);
        return NFA.match(this.input, nfa_start_state);
    }
}
