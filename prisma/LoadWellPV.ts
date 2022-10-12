import sql from 'mssql';
import { Well as IWell } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();

export type IWellPV = Pick<IWell, 'name' | 'fdcRecId' | 'oil' | 'water' | 'gas' | 'firstProduction' | 'lastProduction' | 'firstInjection' | 'lastInjection'>;

export const sqlConfig = {
  user: process.env["pv_db_username"]!,
  password: process.env["pv_db_password"]!,
  database: process.env["pv_db_database"]!,
  server: process.env["pv_db_server"]!,
  requestTimeout: 10 * 60 * 1000,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
}



export const loadWellPV = async (wellNameArg: string) => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    let pool = await sql.connect(sqlConfig)
    const result = await pool.request().query<IWellPV>(`SELECT

  wl.name,
  wl.fdcRecId,
  wl.oil,
  wl.water,
  wl.gas,
  wl.firstProduction,
  wl.lastProduction,
  wl.firstInjection,
  wl.lastInjection
  
  FROM (
  
  SELECT
  
  ROW_NUMBER() OVER (PARTITION BY wl.name ORDER BY wl.oil DESC, wl.water DESC, wl.gas DESC) "rnk",
  wl.*
  
  FROM (
  
  SELECT
  
  uc.COMPLETIONNAME "name",
  uc.IDREC "fdcRecId",
  flp.firstProduction,
  flp.lastProduction,
  fli.firstInjection,
  fli.lastInjection,
  ROUND(AVG(ISNULL(uamd.VOLNEWPRODALLOCHCLIQ, 0)),2) "oil",
  ROUND(AVG(ISNULL(uamd.VOLNEWPRODALLOCWATER, 0) + ISNULL(uamd.VOLINJECTWATER, 0)),2) "water",
  ROUND(AVG(ISNULL(CASE WHEN uamd.VOLNEWPRODALLOCGAS IS NULL OR uamd.VOLNEWPRODALLOCGAS = 0 THEN uamd.VOLPRODGATHGAS ELSE uamd.VOLNEWPRODALLOCGAS END, 0)),2) "gas"
  
  FROM (SELECT uc.IDFLOWNET, uc.IDRECPARENT, uc.IDREC,
      upper(replace(replace(replace(replace(replace(CASE WHEN SUBSTRING(uc.COMPLETIONNAME,1,1)='2' THEN concat(SUBSTRING(uc.COMPLETIONNAME,1,11),'-',SUBSTRING(uc.COMPLETIONNAME,13,11)) ELSE uc.COMPLETIONNAME END,' SWB',''),' INJ',''),' SRC',''),' DNU',''),'DNU','')) COMPLETIONNAME
      FROM pvCalcUnitsMetric.PVUNITCOMP uc) uc
  LEFT OUTER JOIN pvCalcUnitsMetric.PVUNITALLOCMONTHDAY uamd ON uamd.IDRECCOMP = uc.IDREC AND uamd.DTTM > GETDATE()-4
  LEFT OUTER JOIN (	SELECT
  
            uamd.IDRECCOMP,
            MIN(uamd.DTTM) firstProduction,
            MAX(uamd.DTTM) lastProduction
  
            FROM pvCalcUnitsMetric.PVUNITALLOCMONTHDAY uamd
  
            WHERE (uamd.VOLNEWPRODALLOCHCLIQ > 0 OR uamd.VOLNEWPRODALLOCWATER > 0 OR uamd.VOLNEWPRODALLOCGAS > 0 OR uamd.VOLPRODGATHGAS > 0) AND uamd.DTTM > EOMONTH(GETDATE(),-3)
  
            GROUP BY uamd.IDRECCOMP) flp ON flp.IDRECCOMP = uc.IDREC
  
  LEFT OUTER JOIN (	SELECT
  
            uamd.IDRECCOMP,
            MIN(uamd.DTTM) firstInjection,
            MAX(uamd.DTTM) lastInjection
  
            FROM pvCalcUnitsMetric.PVUNITALLOCMONTHDAY uamd
  
            WHERE uamd.VOLINJECTWATER > 0 AND uamd.DTTM > EOMONTH(GETDATE(),-3)
  
            GROUP BY uamd.IDRECCOMP) fli ON fli.IDRECCOMP = uc.IDREC
  
  GROUP BY
  uc.COMPLETIONNAME,
  uc.IDREC,
  flp.firstProduction,
  flp.lastProduction,
  fli.firstInjection,
  fli.lastInjection) wl
  
  WHERE wl.name IN ('${wellNameArg}')
  
  ) wl
  
  WHERE wl.rnk = 1
  
  ORDER BY wl.name`);

    pool.close();

    return result.recordset;

  } catch (err) {
    console.error(err);
  }
}