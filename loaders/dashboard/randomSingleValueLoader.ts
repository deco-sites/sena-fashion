import { Data } from "$store/components/dashboard/widget/Counter.tsx";

export interface Props {
  minValue: number;
  maxValue: number;
}

/**
 * @description Generates a random value for a counter widget.
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
