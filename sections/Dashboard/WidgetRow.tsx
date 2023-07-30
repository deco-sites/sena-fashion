import type { Sections } from "$live/pages/LivePage.tsx";

export interface Props {
  widgets: Sections;
}

/**
 * @title Row containing multiple widgets for a Dashboard.
 */
export default function WidgetRow({ widgets }: Props) {
  return (
    <div class="grid grid-cols-3 gap-4 justify-items-center items-center">
      {widgets.map(({ Component, props }) => <Component {...props} />)}
    </div>
  );
}
