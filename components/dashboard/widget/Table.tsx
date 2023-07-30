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
    <table>
      <tr>
        {headers.map((header) => <th>{header}</th>)}
      </tr>
      {values.map((row) => (
        <tr>
          {row.map((cell) => <td>{cell}</td>)}
        </tr>
      ))}
    </table>
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
