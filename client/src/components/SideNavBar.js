import React, { useState, useEffect } from "react";

function SideNavBar() {
  const [satellites, setSatellites] = useState([]);
  const [facilities, setFacilities] = useState([]);

  const fetchFacilities = () => {
    console.log("RUNNING FETCH FACILITIES!!!");
    fetch("http://localhost:5002/facilities")
      .then(res => res.json())
      .then(
        (result) => {
          setFacilities(result);
        }
      );
  }

  const fetchSatellites = () => {
    console.log("RUNNING FETCH SATELLITES!!!");
    fetch("http://localhost:5002/satellites")
      .then(res => res.json())
      .then(
        (result) => {
          setSatellites(result);
        }
      );
  }

  useEffect(() => {
    fetchFacilities();
    fetchSatellites();
  }, []);


  // satellites.map(satellite =>

  return (
    <ul>
      {facilities.map(facility => {
        return (
          <li key={facility._id}>
            <div>
              {facility.name}
            </div>
            <ul>
              {satellites.filter(satellite => satellite.facility._id === facility._id).map(satellite => {
                return (
                  <li key={satellite._id}>
                    {satellite.name}
                  </li>
                );
              })}
            </ul>
            {/* <button onClick={() => setState("Bingo")}>{satellite.name}</button> */}
          </li>
        );
      })}
    </ul>
  );
}

export default SideNavBar;