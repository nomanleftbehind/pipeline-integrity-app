import { ISatellite } from "../App";

export default function Satellites({ satellites }: { satellites: ISatellite[] }): JSX.Element {
  return (
    <div className="app">
      <ul>
        {satellites.map(satellite => {
          return (
            <li key={satellite._id}>
              <div>{satellite.name}</div>
              <div>{satellite.facility.name}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}