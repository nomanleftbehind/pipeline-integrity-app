import { IHeader } from '../pages/pipelines';

type HeaderProps = {
  onFilterTextChange: (e: React.FormEvent<HTMLInputElement>) => void;
  filterText: IHeader
}

export default function Header({ onFilterTextChange, filterText }: HeaderProps): JSX.Element {

  return (
    <thead className="MuiTableHead-root header-fixed-zzz">
      <tr className="MuiTableRow-root MuiTableRow-head">
        <th className=/*"expand-collapse-row"*/"MuiTableCell-root MuiTableCell-head"></th>
        <th className=/*"add-delete-pipeline"*/"MuiTableCell-root MuiTableCell-head"></th>
        <th className=/*"_id"*/"MuiTableCell-root MuiTableCell-head"></th>
        {Object.entries(filterText).map(([key, value], index) => {
          return (
            <th scope="col" key={index} className=/*{key}*/"MuiTableCell-root MuiTableCell-head  MuiTableCell-alignRight">
              <div>{key.replace('_', ' ').toUpperCase()}</div>
              <div>
                <form className={`form-${key}`}>
                  <input
                    name={key}
                    type="text"
                    placeholder="Search..."
                    value={value}
                    autoComplete="off"
                    onChange={onFilterTextChange}
                  />
                </form>
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}