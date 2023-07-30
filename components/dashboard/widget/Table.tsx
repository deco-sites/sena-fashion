import type { LoaderReturnType } from "$live/types.ts";
import Widget from "$store/components/dashboard/widget/Widget.tsx";

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
    <div className="overflow-x-auto w-full">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            {headers.map((header) => <th>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {values.map((row, index) => (
            <tr key={index}>
              <th>{index}</th>
              {row.map((cell) => <td>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * @title Table widget.
 */
export default function Table({ title, data }: Props) {
  return (
    <Widget title={title} width="col-span-1">
      {data && <TableInner dataset={data} />}
    </Widget>
  );
}
