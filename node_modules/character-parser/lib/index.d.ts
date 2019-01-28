export declare enum TOKEN_TYPES {
    LINE_COMMENT = "LINE_COMMENT",
    BLOCK_COMMENT = "BLOCK_COMMENT",
    SINGLE_QUOTE = "SINGLE_QUOTE",
    DOUBLE_QUOTE = "DOUBLE_QUOTE",
    TEMPLATE_QUOTE = "TEMPLATE_QUOTE",
    REGEXP = "REGEXP",
    ROUND_BRACKET = "ROUND_BRACKET",
    CURLY_BRACKET = "CURLY_BRACKET",
    SQUARE_BRACKET = "SQUARE_BRACKET",
}
export declare class State {
    stack: Array<TOKEN_TYPES>;
    regexpStart: boolean;
    escaped: boolean;
    hasDollar: boolean;
    src: string;
    history: string;
    lastChar: string;
    current(): TOKEN_TYPES;
    isString(): boolean;
    isComment(): boolean;
    isNesting(opts?: {
        readonly ignoreLineComment?: boolean;
    }): boolean;
}
export declare function defaultState(): State;
export declare function parse(src: string, state?: State, options?: {
    readonly start?: number;
    readonly end?: number;
}): State;
export default parse;
export declare function parseUntil(src: string, delimiter: string | RegExp, options?: {
    readonly start?: number;
    readonly end?: number;
    readonly ignoreLineComment?: boolean;
    readonly ignoreNesting?: boolean;
}): {
    start: number;
    end: number;
    src: string;
};
export declare function parseChar(character: string, state?: State): State;
export declare function isPunctuator(c: string): boolean;
export declare function isKeyword(id: string): boolean;
