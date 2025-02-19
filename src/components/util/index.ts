import { ChangeEvent } from 'react';

export function handleInputChange<T>(
  state: Partial<T>,
  setState: (update: Partial<T>) => any
) {
  return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value: any = e.target.value;
    if (e.target.type === 'number')
      value = value ? parseInt(e.target.value) : undefined;
    let update = { ...state, [e.target.name]: value };
    setState(update);
  };
}
