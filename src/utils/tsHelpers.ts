export type Unpack<T> = T extends (infer R)[] ? R : unknown;
