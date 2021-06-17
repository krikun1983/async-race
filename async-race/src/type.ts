export interface Component {
  render(): HTMLElement;
}

export interface Route {
  path: string;
  Component: new () => Component;
}
