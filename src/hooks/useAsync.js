import { useEffect, useState } from 'react';

/**
 * Runs an async function on mount (and when `deps` change) and tracks
 * loading / error / data state. Keeps portal pages free of boilerplate.
 */
export function useAsync(fn, deps = []) {
  const [state, setState] = useState({ loading: true, error: null, data: null });

  useEffect(() => {
    let active = true;
    setState({ loading: true, error: null, data: null });
    Promise.resolve()
      .then(fn)
      .then((data) => active && setState({ loading: false, error: null, data }))
      .catch((error) => active && setState({ loading: false, error, data: null }));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
