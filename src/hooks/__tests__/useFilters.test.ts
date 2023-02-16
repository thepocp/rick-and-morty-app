// useFilters tests:

import { act, renderHook, waitFor } from '@testing-library/react';

import { useFilters } from '../useFilters';

describe('useFilters', () => {
  it('applyFilters should call onChange with new filters', async () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useFilters({}, onChange));

    act(() => {
      result.current.applyFilters('name', 'Rick');
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: 'Rick' });
    });
  });

  it('applyFilters should call onChange with existing filters', async () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useFilters({ name: 'Rick' }, onChange));

    act(() => {
      result.current.applyFilters('status', 'Alive');
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: 'Rick', status: 'Alive' });
    });
  });

  it('applyFilters should call onChange correctly when value is "all"', async () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useFilters({}, onChange));

    act(() => {
      result.current.applyFilters('name', 'all');
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({});
    });
  });
});
