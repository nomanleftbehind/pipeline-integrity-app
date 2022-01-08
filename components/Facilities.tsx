import React from "react";
import { IFacility } from "../App";

export default function Facilities({
  facilities,
}: {
  facilities: IFacility[];
}): JSX.Element {
  const foo = 1;
  return (
    <div className="app">
      <ul>
        {facilities.map((facility) => {
          return <li key={facility._id}>{facility.name}</li>;
        })}
      </ul>
    </div>
  );
}

const Faci = ({ facilities }: { facilities: IFacility[] }) => {
  const foo = 1;

  return (
    <div className="app">
      <ul>
        {facilities.map((facility) => (
          <li key={facility._id}>{facility.name}</li>
        ))}
      </ul>
    </div>
  );
};
export default Faci;
