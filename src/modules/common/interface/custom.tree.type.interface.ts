export interface CustomTreeTypeInterface {
    toSql: () => string;
    toString: () => string;
    stringify: (value: unknown, options?: object) => string;
    key: string;
    dialectTypes: string;
}
