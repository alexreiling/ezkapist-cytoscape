import { NodeSingular, EventObject } from 'cytoscape';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
function useCytoState<T>(
  node: NodeSingular,
  namespace: string,
  useScratch?: boolean
): [T, (value: Partial<T>) => any] {
  const initState =
    (useScratch ? node.scratch(namespace) : node.data(namespace)) || {};
  const [state, setState] = useState<T>(initState);
  useEffect(() => {
    const updateState = (e: EventObject) => {
      let update = useScratch ? node.scratch(namespace) : node.data(namespace);
      setState(update);
    };
    const listenerNamespace = useScratch ? 'scratch' : 'data';
    node.addListener(listenerNamespace, updateState);
    return () => {
      node.removeListener(listenerNamespace, undefined, updateState);
    };
  }, [node]);
  return [
    state,
    useScratch
      ? (value: Partial<T>) => node.scratch(namespace, value)
      : (value: Partial<T>) => node.data(namespace, value),
  ];
}
export function useCytoDataState<T = any>(
  node: NodeSingular,
  namespace: string
) {
  return useCytoState<T>(node, namespace, false);
}
export function useCytoScratchState<T = any>(
  node: NodeSingular,
  namespace: string
) {
  return useCytoState<T>(node, namespace, true);
}
