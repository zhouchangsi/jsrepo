import { NFA } from "../NFA";
export { Parser };
interface parserInterface {
    match(input: string, nfa: NFA): boolean;
    /**
     * @param nfaArray: set of NFA states;
     * @returns Set of NFA states reachable from some NFA states in set T on eplison transitions alone
     */
    closure(nfaArray: NFA[]): NFA[];
    /**
     *
     * @param nfa_states
     * @param input_symbol
     * @return Set of NFA states which is transition on input symbol from a state in T
     */
    move(nfa_states: NFA[], input_symbol: string): NFA[];
    /**
     *
     * @param nfa_states
     * @return accepted state represent a state which not include any transition from itseft;
     */
    hasAcceptedState(nfa_states: NFA[]): boolean;
}
class Parser implements parserInterface {
    match(input: string, nfa: NFA): boolean {
        let start_state: NFA = nfa;
        let currentNFAs: NFA[] = [start_state];
        let nextNFAs: NFA[] = this.closure(currentNFAs);

        for (let i = 0; i < input.length; i++) {
            currentNFAs = this.move(nextNFAs, input[i]);
            nextNFAs = this.closure(currentNFAs);
            if (nextNFAs === []) {
                return false;
            }
            if (this.hasAcceptedState(nextNFAs) && i === input.length) {
                return true;
            }
        }
        return false;
    }
    closure(nfa_states: NFA[]): NFA[] | null {
        if (nfa_states.length <= 0) {
            return null;
        }
        let stack: NFA[] = [...nfa_states];
        while (stack.length > 0) {
            let current_state = stack.pop();
            if (
                current_state.next_1 &&
                current_state.edge_type === NFA.EPSLON &&
                !nfa_states.includes(current_state.next_1)
            ) {
                nfa_states.push(current_state.next_1);
                stack.push(current_state.next_1);
            }

            if (
                current_state.next_2 &&
                current_state.edge_type === NFA.EPSLON &&
                !nfa_states.includes(current_state.next_2)
            ) {
                nfa_states.push(current_state.next_2);
                stack.push(current_state.next_2);
            }
        }
        return nfa_states;
    }
    move(nfa_states: NFA[], input_symbol: string) {
        let result: NFA[] = [];
        for (const state of nfa_states) {
            if (
                state.edge_type === input_symbol ||
                state.edge_type === NFA.CCL ||
                NFA.ASCII_SET.includes(input_symbol)
            ) {
                result.push(state.next_1);
            }
        }
        return result;
    }
    hasAcceptedState(nfa_states: NFA[]): boolean {
        for (const state of nfa_states) {
            if (!state.next_1 && !state.next_2) {
                return true;
            }
        }
        return false;
    }
}
