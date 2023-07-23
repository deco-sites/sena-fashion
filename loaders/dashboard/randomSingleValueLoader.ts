import { Data } from "$store/components/dashboard/widget/Counter.tsx";

export interface Props {
  minValue: number;
  maxValue: number;
}

/**
 * @title Random value for a Counter widget.
 */
export default function counterMockLoader(
  { minValue, maxValue }: Props,
): Data {
  return {
    value: Math.round(
      Math.random() * (maxValue - minValue) + minValue,
    ),
  };
}
