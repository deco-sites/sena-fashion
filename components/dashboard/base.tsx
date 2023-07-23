import { ComponentChildren } from "preact";

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
