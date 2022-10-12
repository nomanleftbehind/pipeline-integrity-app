import sql from 'mssql';
import { SalesPoint as ISalesPoint } from '@prisma/client';
import { sqlConfig } from './LoadWellPV';
import * as dotenv from 'dotenv';
dotenv.config();


export type ISalesPointPV = Pick<ISalesPoint, 'fdcRecId' | 'oil' | 'water' | 'gas' | 'firstProduction' | 'lastProduction'>;

export const loadSalesPointPV = async (salesPointRecIdArg: string) => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    let pool = await sql.connect(sqlConfig)
    const result = await pool.request().query<ISalesPointPV>(`SELECT
  
    sp.*
    
    FROM (
    
    SELECT
  
    unmd.IDRECNODE "fdcRecId",
    flp.firstProduction,
    flp.lastProduction,
    ROUND(AVG(ISNULL(unmd.VOLHCLIQ, 0)),2) "oil",
    ROUND(AVG(ISNULL(unmd.VOLWATER, 0)),2) "water",
    ROUND(AVG(ISNULL(unmd.VOLGAS, 0)),2) "gas"
    
    FROM pvCalcUnitsMetric.PVUNITNODEMONTHDAYCALC unmd
    LEFT OUTER JOIN (	SELECT
    
              unmd.IDRECNODE,
              MIN(unmd.DTTM) firstProduction,
              MAX(unmd.DTTM) lastProduction
    
              FROM pvCalcUnitsMetric.PVUNITNODEMONTHDAYCALC unmd
    
              WHERE (unmd.VOLHCLIQ > 0 OR unmd.VOLWATER > 0 OR unmd.VOLGAS > 0) AND unmd.IDRECNODE IN ('${salesPointRecIdArg}')
    
              GROUP BY unmd.IDRECNODE) flp ON flp.IDRECNODE = unmd.IDRECNODE
    
    WHERE unmd.IDRECNODE IN ('${salesPointRecIdArg}') AND unmd.DTTM > GETDATE()-4
  
    GROUP BY
    unmd.IDRECNODE,
    flp.firstProduction,
    flp.lastProduction) sp
    
    ORDER BY sp.fdcRecId`);

    pool.close();

    return result.recordset;

  } catch (err) {
    console.error(err);
  }
}