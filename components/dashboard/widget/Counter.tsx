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
 * @description Counter widget.
 */
export default function Counter({ title, data: { value } }: Props) {
  return (
    <Widget title={title}>
      <p>{value}</p>
    </Widget>
  );
}
