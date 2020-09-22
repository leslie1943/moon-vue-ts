import Vue, { VNode } from 'vue'

declare global {
  // 适配 JSX/TSX的模板语法
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode { }
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue { }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
