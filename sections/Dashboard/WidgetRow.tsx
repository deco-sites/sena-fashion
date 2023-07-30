import type { Sections } from "$live/pages/LivePage.tsx";

export interface Props {
  widgets: Sections;
}

/**
 * @title Row containing multiple widgets for a Dashboard.
 */
export default function WidgetRow({ widgets }: Props) {
  return (
    <ul class="flex flex-wrap justify-evenly">
      {widgets.map(({ Component, props }) => (
        <Component {...props} />
      ))}
    </ul>
  );
}
