import { filterEmpty } from '../arrays';

describe('arrays', () => {
  it('filterEmpty should filter null and undefined values', () => {
    expect(filterEmpty([1, 2, 3])).toEqual([1, 2, 3]);
    expect(filterEmpty([1, null, 3])).toEqual([1, 3]);
    expect(filterEmpty([1, undefined, 3])).toEqual([1, 3]);
    expect(filterEmpty([1, null, undefined, 3])).toEqual([1, 3]);
    expect(filterEmpty([null, undefined])).toEqual([]);
    expect(filterEmpty(['TEST', null, undefined, 12])).toEqual(['TEST', 12]);
  });
});
