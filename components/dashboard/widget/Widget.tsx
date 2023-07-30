import type { LoaderReturnType } from "$live/types.ts";
import type { ComponentChildren } from "preact";

interface Props {
  title: string;
  children: ComponentChildren | null;
  width: "w-1/3" | "w-2/3" | "w-full";
}

/**
 * @title Widget box.
 */
export default function Widget({ title, children, width }: Props) {
  if (children == null) {
    return (
      <li className={width}>
        <div className="card shadow-xl alert">
          <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <div class="text">No data returned.</div>
          </div>
        </div>
      </li>
    );
  }
  return (
    <li className={`${width} self-center mx-auto`}>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
        </div>
        <figure>{children}</figure>
      </div>
    </li>
  );
}
