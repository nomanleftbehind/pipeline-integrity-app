import oracledb from 'oracledb';
import * as dotenv from 'dotenv';
dotenv.config();

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const connectionAttributes = {
  user: process.env['gdc_db_user'],
  password: process.env['gdc_db_password'],
  connectString: process.env['gdc_db_connect_string'],
}

console.log(connectionAttributes);


async function run() {

  let connectionGDC;

  let resultGDC;

  try {

    connectionGDC = await oracledb.getConnection(connectionAttributes);

    console.log("Successfully connected to Oracle Database");

    const result = await connectionGDC.execute(
      `SELECT

      w.gsl_uwid "name",
      pd.on_production_date "firstProduction",
      pd.last_production_date "lastProduction",
      pd.on_injection_date "firstInjection",
      pd.last_injection_date "lastInjection"
      
      FROM well w
      INNER JOIN pden pd on pd.gsl_uwi = w.gsl_uwi AND (w.gsl_uwid IN ('102/16-11-048-04W5/00') OR w.gsl_uwid IN ('102/16-12-049-07W5/00','102/16-17-048-06W5/00'))`
    );

    resultGDC = result.rows


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
  console.log(resultGDC);
}

run();