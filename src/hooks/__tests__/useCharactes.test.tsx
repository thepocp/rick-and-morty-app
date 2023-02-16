/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/ban-ts-comment */

const setQueryParamsMock = jest.fn();

const loadCharactersInfoMock = jest.fn();
const useLazyQueryMock = jest.fn(() => [
  loadCharactersInfoMock,
  { data: {}, variables: {} },
]);

import { MockedProvider } from '@apollo/client/testing';
import { act, renderHook } from '@testing-library/react';

import { useCharacters } from '../useCharacters';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useLazyQuery: useLazyQueryMock,
}));

jest.mock('../useLocation', () => ({
  useLocation: (): unknown => ({
    setQueryParams: setQueryParamsMock,
  }),
}));

const wrapper = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <MockedProvider>{children}</MockedProvider>
);

const setLocationSearchParams = (search: string): void => {
  // @ts-ignore
  delete global.window.location;
  // @ts-ignore
  global.window.location = { search };
};

describe('useCharacters', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    setLocationSearchParams('');
  });

  it('should call loadCharactersInfo with default params when component is mounted', () => {
    renderHook(() => useCharacters(), { wrapper });

    expect(loadCharactersInfoMock).toBeCalledWith({
      variables: { page: 1, filters: {} },
    });
  });

  it('should call loadCharactersInfo with params when component is mounted if location has params', () => {
    setLocationSearchParams('?page=2&filters={"name":"Rick","status":"Alive"}');

    renderHook(() => useCharacters(), { wrapper });

    expect(loadCharactersInfoMock).toBeCalledWith({
      variables: { page: 2, filters: { name: 'Rick', status: 'Alive' } },
    });
  });

  it('should fetch data correctly when fetchNextData is called', () => {
    useLazyQueryMock.mockReturnValue([
      loadCharactersInfoMock,
      {
        data: {},
        variables: { page: 41, filters: { name: 'Rick', status: 'Alive' } },
      },
    ]);

    const { result } = renderHook(() => useCharacters(), { wrapper });

    act(() => {
      result.current.fetchNextData();
    });

    expect(loadCharactersInfoMock).toBeCalledWith({
      variables: { page: 42, filters: { name: 'Rick', status: 'Alive' } },
    });

    expect(setQueryParamsMock).toBeCalledWith({
      page: 42,
      filters: { name: 'Rick', status: 'Alive' },
    });
  });

  it('should fetch data correctly when fetchPreviousData is called', () => {
    useLazyQueryMock.mockReturnValue([
      loadCharactersInfoMock,
      {
        data: {},
        variables: { page: 43, filters: { name: 'Morty', status: 'Alive' } },
      },
    ]);

    const { result } = renderHook(() => useCharacters(), { wrapper });

    act(() => {
      result.current.fetchPrevData();
    });

    expect(loadCharactersInfoMock).toBeCalledWith({
      variables: { page: 42, filters: { name: 'Morty', status: 'Alive' } },
    });

    expect(setQueryParamsMock).toBeCalledWith({
      page: 42,
      filters: { name: 'Morty', status: 'Alive' },
    });
  });

  it('should fetch data correctly when applyFilters is called', () => {
    useLazyQueryMock.mockReturnValue([
      loadCharactersInfoMock,
      {
        data: {},
        variables: { page: 43, filters: { name: 'Morty', status: 'Alive' } },
      },
    ]);

    const { result } = renderHook(() => useCharacters(), { wrapper });

    act(() => {
      result.current.applyFilters({ name: 'Rick', status: 'Dead' });
    });

    expect(loadCharactersInfoMock).toBeCalledWith({
      variables: { page: 1, filters: { name: 'Rick', status: 'Dead' } },
    });

    expect(setQueryParamsMock).toBeCalledWith({
      page: 1,
      filters: { name: 'Rick', status: 'Dead' },
    });
  });
});
