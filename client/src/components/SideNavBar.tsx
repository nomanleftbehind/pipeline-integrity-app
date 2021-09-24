import { IFacility, ISatellite } from "../App";

type SideNavBarProps = {
  facilities: IFacility[];
  satellites: ISatellite[];
  onSatelliteClick: React.MouseEventHandler<HTMLButtonElement>;
  onFacilityClick: React.MouseEventHandler<HTMLButtonElement>
};

export default function SideNavBar({ facilities, satellites, onFacilityClick, onSatelliteClick }: SideNavBarProps): JSX.Element {

  return (
    <ul>
      {facilities.map(facility => {
        return (
          <li key={facility._id}>
            <div>
              <button value={facility._id} onClick={onFacilityClick}>{facility.name}</button>
            </div>
            <ul>
              {satellites.filter(satellite => satellite.facility._id === facility._id).map(satellite => {
                return (
                  <li key={satellite._id}>
                    <button value={satellite._id} onClick={onSatelliteClick}>{satellite.name}</button>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}