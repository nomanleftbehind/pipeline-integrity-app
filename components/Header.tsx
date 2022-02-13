import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { IHeader } from '../pages/pipelines';
import { useAuth } from '../context/AuthContext';

type HeaderProps = {
  onFilterTextChange: (e: React.FormEvent<HTMLInputElement>) => void;
  filterText: IHeader;
}

export default function Header({ onFilterTextChange, filterText }: HeaderProps): JSX.Element {

  const { user } = useAuth() || {};

  return (
    <TableHead style={{ position: "sticky", zIndex: 999, backgroundColor: "gold" }}>
      <TableRow>
        <TableCell />
        {user?.role === 'USER' && <TableCell />}
        {Object.entries(filterText).map(([key, value], index) => {
          return (
            <TableCell key={index} align="right" scope="col">
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
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}