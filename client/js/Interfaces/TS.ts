export type Dict<T> = { [key: string]: T };
export type SDict<K extends string, T> = { [key in K]: T };
export type Class<T> = { new (...args: any[]): T };
export type Returns<T> = T extends () => infer x ? x : never;
