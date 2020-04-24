import Vue, { VueConstructor } from 'vue';
import { Heroicons } from "./components/heroicons";

export function install(app: VueConstructor<Vue>): void {
  app.component('Heroicons', Heroicons);
}

export * from './icons';
export { Heroicons } from './components/heroicons';
export default { install };
