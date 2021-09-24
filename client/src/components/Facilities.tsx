import React from "react";
import { IFacility } from "../App";


export default function Facilities({ facilities }: { facilities: IFacility[] }): JSX.Element {

  return (
    <div className="app">
      <ul>
        {facilities.map(facility => {
          return (
            <li key={facility._id}>{facility.name}</li>
          );
        })}
      </ul>
    </div>
  );
}