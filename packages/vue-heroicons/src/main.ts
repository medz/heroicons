import Vue, { VueConstructor } from 'vue';
import { Heroicons } from "./components/heroicons";
import { iconsMap } from './icons';

export function install(app: VueConstructor<Vue>): void {
  app.component('Heroicons', Heroicons);
  Object.values(iconsMap).forEach(component => app.component(component.name, component));
}

export * from './icons';
export { Heroicons } from './components/heroicons';
export default { install };
