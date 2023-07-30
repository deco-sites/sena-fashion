import { Widget } from "$store/components/dashboard/base.tsx";
import type { LoaderReturnType } from "$live/types.ts";

export interface Dataset {
  headers: string[];
  values: string[][];
}

export interface Props {
  title: string;
  data: LoaderReturnType<Dataset | null>;
}

function TableInner({ dataset: { headers, values } }: { dataset: Dataset }) {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {values.map((row, idKey) => (
        <li key={idKey} className="flex justify-between gap-x-6 py-5">
          <div className="flex gap-x-4">
            {row.map((value, index) => (
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {value}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {headers[index]}
                </p>
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

/**
 * @title Table widget.
 */
export default function Table({ title, data }: Props) {
  return (
    <Widget title={title}>
      {data == null ? "No data" : <TableInner dataset={data} />}
    </Widget>
  );
}
