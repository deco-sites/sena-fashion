import { useSignal } from "@preact/signals";
import { DateRangePicker, type DateRangePickerValue } from "@tremor/react";

export default () => {
  const value = useSignal<DateRangePickerValue>({
    from: new Date(2023, 1, 1),
    to: new Date(),
  });

  const onValueChange = (val: DateRangePickerValue) => {
    value.value = val;
  };

  return (
    <DateRangePicker
      class="max-w-md"
      value={value.value}
      onValueChange={onValueChange}
    />
  );
};
