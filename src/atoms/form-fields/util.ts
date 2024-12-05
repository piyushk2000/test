export const callAll =
    (...fns: (Function | undefined)[]) =>
        (...args: any[]) =>
            fns.forEach((fn) => fn && fn(...args));
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

