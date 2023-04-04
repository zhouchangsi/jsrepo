export { Token, Tokens, Lexer };
enum Token {
    EOS = 0,
    ANY = 1,
    AT_BOL = 2,
    AT_EOL = 3,
    CCL_END = 4,
    CCL_START = 5,
    CLOSE_CURLY = 6,
    CLOSE_PAREN = 7,
    CLOSURE = 8,
    DASH = 9,
    END_OF_INPUT = 10,
    LETTER = 11,
    OPEN_CURLY = 12,
    OPEN_PAREN = 13,
    OPTIONAL = 14,
    OR = 15,
    PLUS_CLOSE = 16,
}
const Tokens = {
    ".": Token.ANY,
    "^": Token.AT_BOL,
    $: Token.AT_EOL,
    "]": Token.CCL_END,
    "[": Token.CCL_START,
    "}": Token.CLOSE_CURLY,
    ")": Token.CLOSE_PAREN,
    "*": Token.CLOSURE,
    "-": Token.DASH,
    "{": Token.OPEN_CURLY,
    "(": Token.OPEN_PAREN,
    "?": Token.OPTIONAL,
    "|": Token.OR,
    "+": Token.PLUS_CLOSE,
};

class Lexer {
    pattern: string;
    lexeme: string;
    pointer: number;
    isEscape: boolean;
    currentToken: Token;

    constructor(pattern: string) {
        this.pattern = pattern;
        this.pointer = -1;
        this.lexeme = "";
        this.currentToken = null;
        this.advance();
    }
    match(token: Token): boolean {
        return this.currentToken === token;
    }
    advance(): Token {
        if (this.pointer >= this.pattern.length) {
            this.currentToken = Token.EOS;
            return Token.EOS;
        }
        this.pointer++;
        this.lexeme = this.pattern[this.pointer];

        if (Tokens[this.lexeme]) {
            return (this.currentToken = Tokens[this.lexeme]);
        } else if (this.lexeme !== "\\") {
            return (this.currentToken = Token.LETTER);
        } else {
            this.pointer++;
            this.lexeme = this.pattern[this.pointer];
            return (this.currentToken = Token.LETTER);
        }
    }
    get_current_token() {
        return `<text: ${this.lexeme} , id: ${this.currentToken}>`;
    }
}
