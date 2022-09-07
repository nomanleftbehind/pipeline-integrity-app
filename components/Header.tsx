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
  if (columnName === 'pipelineTypeId') {
    return 'Type'
  }
  if (columnName === 'length') {
    return 'Length (km)'
  }
  if (columnName === 'mop') {
    return 'MOP (kPa)'
  }
  if (columnName === 'requiredWTForMop') {
    return 'Required W.T. for MOP (mm)'
  }
  if (columnName === 'requiredWTForTestPressure') {
    return 'Required W.T. for Test Pressure (mm)'
  }
  if (columnName === 'mopTestPressure') {
    return 'MOP Test Pressure (kPa)'
  }
  if (columnName === 'pressureTestCorrosionAllowance') {
    return 'Pressure Test Corrosion Allowance (mm)'
  }
  if (columnName === 'costPerM3Released') {
    return 'Cost Per m³ Released'
  }
  if (columnName === 'yieldStrength') {
    return 'Yield Strength (Mpa)'
  }

  return columnName
    .split(/(?=[A-Z])/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .filter(word => word !== 'Id')
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