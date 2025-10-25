declare module "customersMF/Component" {
  const Component: any;
  export default Component;
}

declare module "customersMF/bootstrap" {
  export const bootstrap: (
    element: HTMLElement
  ) => Promise<{ destroy: () => void }>;
  const Component: any;
  export default Component;
}
