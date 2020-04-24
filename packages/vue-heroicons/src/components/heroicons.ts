import Vue, { VNode, CreateElement } from 'vue';
import { iconsMap } from '../icons';
import { formatIconName } from '../utils';

export const Heroicons = Vue.extend({
  props: {
    name: {
      required: true,
      type: String,
      validator(name: string): boolean {
        return Object.getOwnPropertyNames(iconsMap).indexOf(name) !== -1;
      }
    }
  },
  render(h: CreateElement): VNode {
    const { name, ...props } = this.$props;
    return h(formatIconName(name), { props });
  }
});
