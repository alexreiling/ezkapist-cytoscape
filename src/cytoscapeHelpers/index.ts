import { Core } from 'cytoscape';
import { reinitControllers } from '../Flow';

export function getViewportCenter(cy: Core) {
  const { x1, y1, w, h } = cy.extent();
  return {
    x: x1 + w / 2,
    y: y1 + h / 2,
  };
}
export const initFromLocalStorage = (cy: Core, key: string) => {
  try {
    let data = localStorage.getItem(key) as string;
    cy.add(JSON.parse(data));
    reinitControllers(cy);
    cy.$(':selected').unselect();
  } catch (error) {
    console.log(error);
  }
};
