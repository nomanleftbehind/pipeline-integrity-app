import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { IHeader } from '../pages/pipelines';
import { useAuth } from '../context/AuthContext';

type HeaderProps = {
  onFilterTextChange: (e: React.FormEvent<HTMLInputElement>) => void;
  filterText: IHeader;
}

export const prettifyColumnName = (columnName: string) => {
  if (columnName === 'id') {
    return 'ID'
  }
  if (columnName === 'co2') {
    return 'CO₂'
  }
  if (columnName === 'o2') {
    return 'O₂'
  }
  if (columnName === 'h2s') {
    return 'H₂S'
  }
  return columnName
    .split(/(?=[A-Z])/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function Header({ onFilterTextChange, filterText }: HeaderProps): JSX.Element {

  const { user } = useAuth() || {};
  const { role } = user || {};

  return (
    <TableHead style={{ position: "sticky", zIndex: 999, backgroundColor: "gold" }}>
      <TableRow>
        <TableCell />
        {role && ['ADMIN', 'ENGINEER'].includes(role) && <TableCell />}
        {Object.entries(filterText).map(([key, value], index) => {
          const columnNamePretty = prettifyColumnName(key);
          return (
            <TableCell key={index} align="right" scope="col">
              <div>{columnNamePretty}</div>
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
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}