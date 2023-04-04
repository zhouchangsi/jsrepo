import { Lexer, Token } from "../lexer/lexer";
export { EDGE_TYPE, NFA, NfaPair };

enum EDGE_TYPE {
    // 任意字符
    ANY = -1,
    // 字符集合
    CCL = -2,
    // 非接受字符集合
    NCCL = -3,
    // 不接受
    NANY = -4,
    // null
    EMPTY = -5,
    // 两条空边
    EPSLON = -6,
}
class NFA {
    // 对应的节点有两个出去的ε边
    public static readonly EPSLON = -1;
    //  边对应的是字符的集合
    public static readonly CCL = -2;
    // 一条ε边
    public static readonly EMPTY = -3;
    public static readonly ANY = -4;

    public static readonly ASCII_SET = [
        "\x00",
        "\x01",
        "\x02",
        "\x03",
        "\x04",
        "\x05",
        "\x06",
        "\x07",
        "\b",
        "\t",
        "\n",
        "\x0B",
        "\f",
        "\r",
        "\x0E",
        "\x0F",
        "\x10",
        "\x11",
        "\x12",
        "\x13",
        "\x14",
        "\x15",
        "\x16",
        "\x17",
        "\x18",
        "\x19",
        "\x1A",
        "\x1B",
        "\x1C",
        "\x1D",
        "\x1E",
        "\x1F",
        " ",
        "!",
        '"',
        "#",
        "$",
        "%",
        "&",
        "'",
        "(",
        ")",
        "*",
        "+",
        ",",
        "-",
        ".",
        "/",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        ":",
        ";",
        "<",
        "=",
        ">",
        "?",
        "@",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "[",
        "\\",
        "]",
        "^",
        "_",
        "`",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "{",
        "|",
        "}",
        "~",
        "\x7F",
    ];
    public static MAX_STATUS_ID: number = 0;

    edge_type: number | string = EDGE_TYPE.EPSLON;
    next_1: NFA | null;
    next_2: NFA | null;
    visited: boolean;
    input_set: Set<string>;
    input_expel: Set<string>;
    status_id: number;

    constructor() {
        this.edge_type = null;
        this.next_1 = null;
        this.next_2 = null;
        this.visited = false;
        this.set_status_id();
        this.input_set = new Set<string>();
        this.input_expel = new Set<string>();
    }

    transition: {};
    add_transition(symbol: string, to: NFA) {
        this.transition[symbol] = to;
    }
    set_status_id(): void {
        this.status_id = NFA.MAX_STATUS_ID;
        NFA.MAX_STATUS_ID++;
    }
    add_input(ch: string) {
        this.input_set.add(ch);
    }
    add_no_input(ch: string) {
        this.input_expel.add(ch);
    }

    add_ascii_input_set(): void {
        this.edge_type = NFA.CCL;
        this.input_set = new Set<string>();
        for (let i = 0; i < 128; i++) {
            this.input_set.add(String.fromCharCode(i));
        }
        console.log(this.input_set);
    }
    // iterator a-z
    public static *range_of_ascii(a: string, b: string) {
        let start = a.charCodeAt(0),
            end = b.charCodeAt(0);
        for (let i = start; i <= end; i++) {
            yield String.fromCharCode(i);
        }
    }
    // [^...input_set]
    public input_set_inversion() {
        let origin = this.input_set;
        this.input_set = new Set(NFA.ASCII_SET);

        for (const val of origin.values()) {
            this.input_set.delete(val);
        }
    }
    public set_input_range(a: string, b: string) {
        for (const ch of NFA.range_of_ascii(a, b)) {
            this.input_set.add(ch);
        }
    }
    public is_in_input_set(ch: string): boolean {
        return this.input_set.has(ch);
    }
}
namespace NFA {
    enum EDGE_TYPE {
        ANY = -1,
        CCL = -2,
        NCCL = -3,
        NANY = -4,
        EMPTY = -5,
        EPSLON = -6,
    }
}

let n = new NFA();
n.set_input_range("A", "F");
n.input_set_inversion();
console.log(n.input_set);

class NfaPair {
    start_state: NFA | null;
    end_state: NFA | null;
    constructor() {
        this.start_state = new NFA();
        this.end_state = new NFA();
        this.start_state.next_1 = this.end_state;
    }
    connect(to_connect: NfaPair | NFA) {
        if (to_connect instanceof NfaPair) {
            this.end_state.next_1 = to_connect.start_state;
            this.end_state = to_connect.end_state;
        } else {
            this.end_state.next_1 = to_connect;
            this.end_state = to_connect;
        }
    }

    /**
     * 1-->2, 3->4
     *   1-->2
     *  /     \
     * 0       5
     *  \     /
     *   3-->4
     * @param to_group
     */
    comb(to_group: NfaPair) {
        let start = new NFA();
        start.next_1 = to_group.start_state;
        start.next_2 = this.start_state;
        this.start_state = start;

        let end = new NFA();
        to_group.end_state.next_1 = end;
        this.end_state.next_2 = end;
        this.end_state = end;
    }
    // a
    nfa_single_char(char: string): NfaPair {
        let pair = new NfaPair();
        pair.start_state.edge_type = char;
        return pair;
    }
    // [a-z], (a|b|c)
    nfa_multiple_char(...ch: string[]): NfaPair {
        let pair = new NfaPair();
        pair.start_state.edge_type = EDGE_TYPE.CCL;
        for (const c of ch) {
            pair.start_state.add_input(c);
        }
        return pair;
    }
    // .
    nfa_dot_char(): NfaPair {
        let pair = new NfaPair();
        pair.start_state.edge_type = EDGE_TYPE.ANY;
        return pair;
    }
    // [^a] [^ab] [^ab-c]
    nfa_expel_char(...ch: string[]): NfaPair {
        let pair = new NfaPair();
        pair.start_state.edge_type = EDGE_TYPE.NCCL;
        for (const c of ch) {
            pair.start_state.add_no_input(c);
        }
        return pair;
    }
}
class NFA_construction {
    // group ::= ("(" expr ")")*
    // expr ::= factor_conn ("|" factor_conn)*
    // factor_conn ::= factor | factor factor*
    // factor ::= (term | term ("*" | "+" | "?"))*
    // term ::= char | "[" char "-" char "]" | .
    lexer: Lexer;
    constructor(pattern: string) {
        this.lexer = new Lexer(pattern);
    }

    get_accepted_next(nfa: NFA): NFA[] {
        switch (nfa.edge_type) {
            case EDGE_TYPE.ANY:
                return [nfa.next_1];
            case EDGE_TYPE.CCL:
                if (nfa.input_set.has(this.lexer.lexeme)) {
                    return [nfa.next_1];
                } else {
                    return null;
                }
            case EDGE_TYPE.EMPTY:
                return [];
            case EDGE_TYPE.EPSLON:
                return [nfa.next_1, nfa.next_2];
            case EDGE_TYPE.NANY:
                return [];
            case EDGE_TYPE.NCCL:
                if (nfa.input_expel.has(this.lexer.lexeme)) {
                    return [];
                } else {
                    return [nfa.next_1];
                }
            default:
                if (nfa.edge_type === this.lexer.lexeme) {
                    return [nfa.next_1];
                }
                break;
        }
    }
    public create_nfa_by_pattern(pattern: string): NFA {
        this.lexer.advance();
        let nfa_pair = new NfaPair();
        this.group(nfa_pair);
        return nfa_pair.start_state;
    }
    public static match(input: string, nfa_start_state) {
        return false;
    }
    group(pair_out: NfaPair) {
        if (this.lexer.match(Token.OPEN_PAREN)) {
            this.lexer.advance();
            this.expression(pair_out);
            if (this.lexer.match(Token.CLOSE_PAREN)) {
                this.lexer.advance();
            }
        } else if (this.lexer.match(Token.EOS)) {
            return false;
        } else {
            this.expression(pair_out);
        }

        while (true) {
            let pair = new NfaPair();
            if (this.lexer.match(Token.OPEN_PAREN)) {
                this.lexer.advance();
                this.expression(pair);
                pair_out.connect(pair);
                if (this.lexer.match(Token.CLOSE_PAREN)) {
                    this.lexer.advance();
                }
            } else if (this.lexer.match(Token.EOS)) {
                return false;
            } else {
                this.expression(pair);
                pair_out.connect(pair);
            }
        }
    }
    expression(pair_out: NfaPair) {
        this.factor_conn(pair_out);
        let pair = new NfaPair();
        while (this.lexer.match(Token.OR)) {
            this.lexer.advance();
            this.factor_conn(pair);
            pair_out.comb(pair);
        }
        return true;
    }
    /**
     * there are multiple factors, just connect their head and tail nodes
     * @param pair_out
     */
    factor_conn(pair_out: NfaPair) {
        if (this.is_conn(this.lexer.currentToken)) {
            this.factor(pair_out);
        }

        while (this.is_conn(this.lexer.currentToken)) {
            let temp_pair = new NfaPair();
            this.factor(temp_pair);
            pair_out.connect(temp_pair);
        }
    }
    is_conn(token: Token): boolean {
        let nc = [
            Token.OPEN_PAREN,
            Token.CLOSE_PAREN,
            Token.AT_EOL,
            Token.EOS,
            Token.CLOSURE,
            Token.PLUS_CLOSE,
            Token.CCL_END,
            Token.AT_BOL,
            Token.OR,
        ];
        return nc.includes(token);
    }
    factor(pair_out: NfaPair) {
        this.term(pair_out);
        if (this.lexer.match(Token.CLOSE_PAREN)) {
            this.nfa_star_closure(pair_out);
        } else if (this.lexer.match(Token.PLUS_CLOSE)) {
            this.nfa_plus_closure(pair_out);
        } else if (this.lexer.match(Token.OPTIONAL)) {
            this.nfa_option_closure(pair_out);
        }
    }
    nfa_star_closure(pair_out: NfaPair) {
        if (!this.lexer.match(Token.CLOSURE)) {
            return false;
        }

        // connect to epsilon edge for handle star closure
        let start = new NFA();
        let end = new NFA();
        start.next_1 = pair_out.start_state;
        start.next_2 = end;

        pair_out.end_state.next_1 = pair_out.start_state;
        pair_out.end_state.next_2 = end;

        pair_out.start_state = start;
        pair_out.end_state = end;

        this.lexer.advance();
        return true;
    }
    nfa_plus_closure(pair_out) {}
    nfa_option_closure(pair_out) {}
    term(pair_out: NfaPair) {
        if (this.lexer.match(Token.LETTER)) {
            this.nfa_single_char(pair_out);
        } else if (this.lexer.match(Token.ANY)) {
            this.nfa_dot_char(pair_out);
        } else if (this.lexer.match(Token.CCL_START)) {
            this.nfa_set_nege_char(pair_out);
        }
    }
    nfa_single_char(pair_out: NfaPair) {
        if (!this.lexer.match(Token.LETTER)) {
            return false;
        }
        // start = pair_out.start_node = Nfa()
        // pair_out.end_node = pair_out.start_node.next_1 = Nfa()
        // start.edge = lexer.lexeme

        let pair = new NfaPair();
        pair.start_state = new NFA();
        pair.end_state = new NFA();
        pair.start_state.edge_type = this.lexer.lexeme;
        pair.start_state.next_1 = pair.end_state;
        return true;
    }

    nfa_dot_char(pair_out) {
        // start = pair_out.start_node = Nfa()
        // pair_out.end_node = pair_out.start_node.next_1 = Nfa()
        // start.edge = CCL
        // start.set_input_set()
    }
    nfa_set_nege_char(pair_out: NfaPair) {
        if (!this.lexer.match(Token.CCL_START)) {
            return false;
        }
    }
}
