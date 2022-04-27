import oracledb from 'oracledb';
import { Well as IWell } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();

type IWellGDC = Pick<IWell, 'name' | 'firstProduction' | 'lastProduction' | 'firstInjection' | 'lastInjection'>;

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const connectionAttributes = {
  user: process.env['gdc_db_user'],
  password: process.env['gdc_db_password'],
  connectString: process.env['gdc_db_connect_string'],
}


export const loadWellGDC = async (wellNameArg1: string, wellNameArg2: string) => {

  let connectionGDC;

  try {
    connectionGDC = await oracledb.getConnection(connectionAttributes);

    const result = await connectionGDC.execute<IWellGDC>(
      `SELECT

      w.gsl_uwid "name",
      pd.on_production_date "firstProduction",
      pd.last_production_date "lastProduction",
      pd.on_injection_date "firstInjection",
      pd.last_injection_date "lastInjection"
      
      FROM well w
      LEFT OUTER JOIN pden pd on pd.gsl_uwi = w.gsl_uwi
      
      WHERE w.gsl_uwid IN ('${wellNameArg1}') OR w.gsl_uwid IN ('${wellNameArg2}')`
    );

    return result.rows

  } catch (err) {
    console.error(err);
  } finally {
    if (connectionGDC) {
      try {
        await connectionGDC.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}