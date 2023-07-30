import type { LoaderReturnType } from "$live/types.ts";
import type { ComponentChildren } from "preact";

interface Props {
  title: string;
  children: ComponentChildren | null;
  width: "col-span-1" | "col-span-2";
}

/**
 * @title Widget box.
 */
export default function Widget({ title, children, width }: Props) {
  if (children == null) {
    return (
      <div className={width}>
        <div className="card shadow-xl alert w-96">
          <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <div class="text">No data returned.</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={width}>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
        </div>
        <figure>{children}</figure>
      </div>
    </div>
  );
}
