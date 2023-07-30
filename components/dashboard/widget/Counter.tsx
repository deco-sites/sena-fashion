import { Widget } from "$store/components/dashboard/base.tsx";
import type { LoaderReturnType } from "$live/types.ts";

export interface Data {
  value: number;
}

export interface Props {
  title: string;
  data: LoaderReturnType<Data>;
}

/**
 * @title Counter widget.
 */
export default function Counter({ title, data: { value } }: Props) {
  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
      </div>
    </div>
  );
}
