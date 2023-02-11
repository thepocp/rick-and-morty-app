export const filterEmpty = <T>(value: Array<T | null | undefined>): T[] =>
  value?.filter(item => item !== null && item !== undefined) as T[];
