import { h, defineAsyncComponent, defineComponent, ref, onMounted, type AsyncComponentLoader, type Component, } from 'vue';

type ComponentResolver = (component: Component) => void

export const lazyLoadComponentIfVisible = ({
  componentLoader,
  loadingComponent,
  errorComponent,
  delay,
  timeout
}: {
  componentLoader: AsyncComponentLoader;
  loadingComponent: Component;
  errorComponent?: Component;
  delay?: number;
  timeout?: number;
}) => {
  let resolveComponent: ComponentResolver;

  return defineAsyncComponent({
    loader: () => new Promise((resolve) => resolveComponent = resolve as ComponentResolver),
    loadingComponent: defineComponent({
      setup() {
        const elRef = ref();

        async function loadComponent() {
          const component = await componentLoader()
          resolveComponent(component)
        }

        onMounted(async () => {
          if (!('IntersectionObserver' in window)) {
            await loadComponent();
            return;
          }

          const observer = new IntersectionObserver(async (entries) => {
            if (!entries[0].isIntersecting) {
              return;
            }
            observer.unobserve(elRef.value);
            await loadComponent();
          });

          observer.observe(elRef.value);
        });

        // return () => loadingComponent as any;
        // return h('div', { ref: elRef }, loadingComponent.name);
        return () => h('div', { ref: elRef }, loadingComponent as any);;
      },
    }),
    delay,
    errorComponent,
    timeout,
  });
};