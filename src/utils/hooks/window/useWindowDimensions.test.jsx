import { act, render } from '@testing-library/react';
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useWindowDimensions from './useWindowDimensions';

function fireResize(width) {
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
}
// Test component that uses the Hook
function EffecfulComponent() {
  const viewport = useWindowDimensions()[0].device;
  return <span>{viewport}</span>;
}

describe('test to dimensions.hook', () => {
  test('test change state when resize event', async () => {
    window.matchMedia = jest.fn().mockImplementation(query => {
      return {
        matches: query === '(orientation: portrait)' ? true : false,
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    });

    const { container, rerender } = render(<EffecfulComponent />);

    await act(async () => {
      fireResize(320);
    });

    rerender(<EffecfulComponent />);
    expect(container.firstChild.textContent).toBe('mobile');

    await act(async () => {
      fireResize(1200);
    });

    rerender(<EffecfulComponent />);
    expect(container.firstChild.textContent).toBe('browser');
  });

  test('test with mock window for matchMedia (orientation: landscape)', () => {
    window.matchMedia = jest.fn().mockImplementation(query => {
      return {
        matches: query === '(orientation: landscape)' ? true : false,
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    });
    const { result } = renderHook(() => useWindowDimensions());
    expect(result.current[0].orientation).toBe('landscape');
  });

  test('test with mock window for matchMedia (orientation: undefined)', () => {
    window.matchMedia = jest.fn().mockImplementation(query => {
      return {
        matches: query === '(orientation: undefned)' ? true : false,
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    });
    const { result } = renderHook(() => useWindowDimensions());
    expect(result.current[0].orientation).toBe('none');
  });

  test('test display device tablet', () => {
    window.innerWidth = 800;
    const { result } = renderHook(() => useWindowDimensions());
    expect(result.current[0].device).toBe('tablet');
  });

  test('test display with width undefined', () => {
    window.innerWidth = undefined;
    const { result } = renderHook(() => useWindowDimensions());
    expect(result.current[0].device).toBe('none');
  });

  test('test display with width 4k', () => {
    window.innerWidth = 3000;
    const { result } = renderHook(() => useWindowDimensions());
    expect(result.current[0].device).toBe('4k');
  });
});
