import Vue, { VNode, CreateElement } from 'vue';
import { iconNames as icons } from '../icons';
import { formatIconName } from '../utils';

export const Heroicons = Vue.extend({
  props: {
    name: {
      required: true,
      type: String,
      validator(name: string): boolean {
        return icons.indexOf(formatIconName(name)) !== -1;
      }
    }
  },
  render(h: CreateElement): VNode {
    const { name, ...props } = this.$props;
    return h(formatIconName(name), { props });
  }
});
