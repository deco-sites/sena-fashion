import type { LoaderReturnType } from "$live/types.ts";
import type { ComponentChildren } from "preact";

interface Props {
  title: string;
  children: ComponentChildren | null;
}

/**
 * @title Widget box.
 */
export default function Widget({ title, children }: Props) {
  if (children == null) {
    return (
      <div className="card w-96 shadow-xl alert">
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <div class="text">No data returned.</div>
        </div>
      </div>
    );
  }
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
      </div>
      <figure>{children}</figure>
    </div>
  );
}
