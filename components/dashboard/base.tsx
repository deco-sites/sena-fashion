import { ComponentChildren } from "preact";

interface Props {
  title: string;
  children: ComponentChildren;
}

export function Widget({ title, children }: Props) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
