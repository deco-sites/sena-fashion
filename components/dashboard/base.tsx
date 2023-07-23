import { ComponentChildren } from "preact";

/**
 * An object returned by a WidgetLoader and used as props by a Widget.
 */
export interface WidgetProps<TParams> {
  title: string;
  params: TParams;
}

/**
 * The configuration definition for a specific loader.
 */
export interface BaseLoaderProps<TParams> {
  title: string;
  params: TParams;
}

interface Props {
  title: string;
  children: ComponentChildren;
}

export function Widget({ title, children }: Props) {
  return (
    <section style={{ border: "1px solid grey" }}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
