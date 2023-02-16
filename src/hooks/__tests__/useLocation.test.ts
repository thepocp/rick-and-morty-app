import { act, renderHook } from '@testing-library/react';

import { useLocation } from '../useLocation';

const setLocationMock = jest.fn();

jest.mock('wouter/use-location', () => ({
  default: (): unknown => [null, setLocationMock],
}));

describe('useLocation', () => {
  it('setQueryParams should call setLocationFn with the correct query if no params are passed', () => {
    const { result } = renderHook(() => useLocation());

    act(() => {
      result.current.setQueryParams({});
    });

    expect(setLocationMock).toHaveBeenCalledWith('/?page=1');
  });

  it('setQueryParams should call setLocationFn with the correct query if page is passed', () => {
    const { result } = renderHook(() => useLocation());

    act(() => {
      result.current.setQueryParams({ page: 2 });
    });

    expect(setLocationMock).toHaveBeenCalledWith('/?page=2');
  });

  it('setQueryParams should call setLocationFn with the correct query if filters are passed', () => {
    const { result } = renderHook(() => useLocation());

    act(() => {
      result.current.setQueryParams({ filters: { name: 'Rick' } });
    });

    expect(setLocationMock).toHaveBeenCalledWith(
      '/?page=1&filters={"name":"Rick"}'
    );
  });

  it('setQueryParams should call setLocationFn with the correct query if characterId is passed', () => {
    const { result } = renderHook(() => useLocation());

    act(() => {
      result.current.setQueryParams({ characterId: '1' });
    });

    expect(setLocationMock).toHaveBeenCalledWith('/?page=1&characterId=1');
  });

  it('setQueryParams should call setLocationFn with the correct query if all params are passed', () => {
    const { result } = renderHook(() => useLocation());

    act(() => {
      result.current.setQueryParams({
        page: 2,
        filters: { name: 'Rick' },
        characterId: '1',
      });
    });

    expect(setLocationMock).toHaveBeenCalledWith(
      '/?page=2&filters={"name":"Rick"}&characterId=1'
    );
  });
});
