import { Widget } from "$store/components/dashboard/base.tsx";
import { Card, Metric, Text } from "@tremor/react";
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
    <Widget title={title}>
      <Card
        className="max-w-xs mx-auto"
        decoration="top"
        decorationColor="indigo"
      >
        <Text>Sales</Text>
        <Metric>$ 14,47</Metric>
      </Card>
    </Widget>
  );
}
