/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/ban-ts-comment */

const setQueryParamsMock = jest.fn();

const loadCharacterInfoMock = jest.fn();
const useLazyQueryMock = jest.fn(() => [loadCharacterInfoMock, { data: {} }]);

import { MockedProvider } from '@apollo/client/testing';
import { act, renderHook, waitFor } from '@testing-library/react';

import { useCharacter } from '../useCharacter';

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

describe('useCharacter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    setLocationSearchParams('');
  });

  it('should fetch character data when component is mounted', () => {
    setLocationSearchParams('?characterId=42');

    renderHook(() => useCharacter({}), {
      wrapper,
    });

    expect(loadCharacterInfoMock).toBeCalledWith({ variables: { id: '42' } });
    expect(setQueryParamsMock).toBeCalledWith({ characterId: '42' });
  });

  it('should show character info when showCharacterInfo is called', async () => {
    const { result } = renderHook(() => useCharacter({}), {
      wrapper,
    });

    expect(result.current.isCharacterInfoOpen).toBeFalsy();

    act(() => {
      result.current.showCharacterInfo('2');
    });

    expect(loadCharacterInfoMock).toBeCalledWith(
      expect.objectContaining({ variables: { id: '2' } })
    );

    expect(setQueryParamsMock).toBeCalledWith({ characterId: '2' });

    waitFor(() => {
      expect(result.current.isCharacterInfoOpen).toBeTruthy();
    });
  });

  it('should toggle character info correctly', async () => {
    const { result } = renderHook(() => useCharacter({}), {
      wrapper,
    });

    expect(result.current.isCharacterInfoOpen).toBeFalsy();

    act(() => {
      result.current.toggleInfo();
    });

    waitFor(() => {
      expect(result.current.isCharacterInfoOpen).toBeTruthy();
    });
  });
});
