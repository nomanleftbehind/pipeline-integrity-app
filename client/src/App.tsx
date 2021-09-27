import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import PipelineDatabase from './components/PipelineDatabase';
import Facilities from './components/Facilities';
import Satellites from './components/Satellites';

export interface IFacility { _id: string; name: string; created_at: Date }

export interface ISatellite { _id: string; name: string; facility: IFacility; created_at: Date }

export interface IInjectionPoint { _id: string; source: string; oil: number; water: number; gas: number; first_production?: Date; last_production?: Date; first_injection?: Date; last_injection?: Date; pv_unit_id: string; pv_node_id: string }

export interface IInjectionPointOptionsError { _id: string; source: string }

export interface IPipeline {
  _id: string;
  license: string;
  segment: string;
  substance: string;
  from: string;
  from_feature: string;
  to: string;
  to_feature: string;
  status: string;
  length: string;
  type: string;
  grade: string;
  outside_diameter: number;
  wall_thickness: number;
  material: string;
  mop: number;
  internal_protection: string;
  injection_points: IInjectionPoint[];
  satellite: ISatellite;
  created_at: Date;
  created_at_formatted: string
}

export interface IValidators {
  license: string;
  segment: string;
  substance: string[];
  from_to: string;
  from_to_feature: string[];
  status: string[];
  length: string;
  type: string[];
  grade: string[];
  outside_diameter: number[];
  wall_thickness: string;
  material: string[];
  mop: string;
  internal_protection: string[]
}

export interface IError { message: string }


export default function App(): JSX.Element {
  const [pipelines, setPipelines] = useState<IPipeline[]>([]);
  const [errorPipelines, setErrorPipelines] = useState<IError | null>(null);
  const [arePipelinesLoaded, setArePipelinesLoaded] = useState<boolean>(false);

  const [injectionPointOptions, setInjectionPointOptions] = useState<IInjectionPoint[]>([]);
  const [errorInjectionPoints, setErrorInjectionPoints] = useState<IError | null>(null);
  const [areInjectionPointsLoaded, setAreInjectionPointsLoaded] = useState<boolean>(false);

  const [validators, setValidators] = useState<IValidators | null>(null);

  const [facilities, setFacilities] = useState<IFacility[]>([]);
  const [satellites, setSatellites] = useState<ISatellite[]>([]);


  const fetchPipelines = () => {
    console.log("RUNNING FETCH PIPELINES!!!");
    fetch("http://localhost:5002/pipelines")
      .then(res => res.json())
      .then(
        (result) => {
          setArePipelinesLoaded(true);
          setPipelines(result);
        },
        (error) => {
          setArePipelinesLoaded(true);
          setErrorPipelines(error);
        }
      );
  }

  const fetchInjectionPoints = () => {
    console.log("RUNNING FETCH INJECTION POINTS!!!");
    fetch("http://localhost:5002/injectionpoints")
      .then(res => res.json())
      .then(
        (result) => {
          setAreInjectionPointsLoaded(true);
          setInjectionPointOptions(result);
        },
        (error) => {
          setAreInjectionPointsLoaded(true);
          setErrorInjectionPoints(error);
        }
      );
  }

  const injectionPointOptionsLoaded = (): IInjectionPoint[] | IInjectionPointOptionsError[] => {
    if (errorInjectionPoints) {
      return [{ _id: "0", source: `Failed to load: ${errorInjectionPoints.message}` }]
    } else if (!areInjectionPointsLoaded) {
      return [{ _id: "0", source: "Loading..." }]
    } else {
      return injectionPointOptions
    }
  }

  async function fetchValidators(): Promise<void> {
    console.log("RUNNING FETCH VALIDATORS!!!");
    const response = await fetch("http://localhost:5002/validators");
    const json = await response.json();
    setValidators(json);
  }

  async function fetchFacilities(): Promise<void> {
    console.log("RUNNING FETCH FACILITIES!!!");
    const response = await fetch("http://localhost:5002/facilities");
    const json = await response.json();
    setFacilities(json);
  }

  async function fetchSatellites(): Promise<void> {
    console.log("RUNNING FETCH SATELLITES!!!");
    const response = await fetch("http://localhost:5002/satellites");
    const json = await response.json();
    setSatellites(json);
  }

  useEffect(() => {
    fetchPipelines();
    fetchInjectionPoints();
    fetchValidators();
    fetchFacilities();
    fetchSatellites();
    return () => {
      console.log('Facility component will be unmount');
    }
  }, []);

  return (
    <Router>
      <div>
        <nav className="fixed-nav-bar">
          <ul>
            <li>
              <Link to="/pipelines">Pipelines</Link>
            </li>
            <li>
              <Link to="/injectionpoints">Injection Points</Link>
            </li>
            <li>
              <Link to="/facilities">Facilities</Link>
            </li>
            <li>
              <Link to="/satellites">Satellites</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/facilities">
            <Facilities facilities={facilities} />
          </Route>
          <Route path="/satellites">
            <Satellites satellites={satellites} />
          </Route>
          <Route path="/injectionpoints">
            <InjectionPoints />
          </Route>
          <Route path="/pipelines">
            <PipelineDatabase
              pipelines={pipelines}
              errorPipelines={errorPipelines}
              arePipelinesLoaded={arePipelinesLoaded}
              fetchPipelines={fetchPipelines}
              injectionPointOptions={injectionPointOptionsLoaded()}
              validators={validators}
              facilities={facilities}
              satellites={satellites}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function InjectionPoints(): JSX.Element {
  return <div className="app"><h2>Injection Points</h2></div>;
}