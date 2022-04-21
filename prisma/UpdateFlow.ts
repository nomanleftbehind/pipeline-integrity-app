import { PrismaClient, Prisma, Well as IWell } from '@prisma/client';
import { Connection, Request } from "tedious";
import oracledb from 'oracledb';


type IWellPV = Pick<IWell, 'name' | 'fdcRecId' | 'oil' | 'water' | 'gas' | 'firstProduction' | 'lastProduction' | 'firstInjection' | 'lastInjection'>;
type IWellGDC = Pick<IWell, 'name' | 'firstProduction' | 'lastProduction' | 'firstInjection' | 'lastInjection'>;

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;


const prisma = new PrismaClient();


const connectionAttributesPV = {
  authentication: {
    options: {
      userName: process.env["pv_db_username"],
      password: process.env["pv_db_password"]
    },
    type: "default"
  },
  server: process.env["pv_db_server"],
  options: {
    database: process.env["pv_db_database"],
    encrypt: true
  }
};


const connectionAttributesGDC = {
  user: process.env['gdc_db_user'],
  password: process.env['gdc_db_password'],
  connectString: process.env['gdc_db_connect_string'],
}



async function main() {

  const wellFdcRecIdArray = await prisma.well.findMany({
    where: {
      fdcRecId: { not: null }
    },
    select: {
      fdcRecId: true,
    }
  });
  const wellFdcRecIdArg = wellFdcRecIdArray.map(e => e.fdcRecId).join("', '");

  const wellNameArray = await prisma.well.findMany({
    select: {
      name: true,
    }
  });
  const wellNameArg1 = wellNameArray.slice(0, 1000).map(e => e.name).join("', '");
  const wellNameArg2 = wellNameArray.slice(1000, -1).map(e => e.name).join("', '");



  const connectionGDC = await oracledb.getConnection(connectionAttributesGDC);
  const resultGDC = await connectionGDC.execute<IWellGDC>(
    `SELECT

    w.gsl_uwid "name",
    pd.on_production_date "firstProduction",
    pd.last_production_date "lastProduction",
    pd.on_injection_date "firstInjection",
    pd.last_injection_date "lastInjection"

    FROM well w
    INNER JOIN pden pd on pd.gsl_uwi = w.gsl_uwi AND (w.gsl_uwid IN ('${wellNameArg1}') OR w.gsl_uwid IN ('${wellNameArg2}'))`
  );

  const rowsGDC = resultGDC.rows;


  console.log('resultGDC', rowsGDC);

  const executePVQuery = async () => {

  }

  const connectionPV = new Connection(connectionAttributesPV);

  // Attempt to connect to ProdView and execute query if connection goes through
  connectionPV.connect();

  connectionPV.on("connect", err => {
    if (err) {
      console.error(err.message);
    } else {
      queryDatabase();
    }
  });


  

  async function queryDatabase() {
    console.log("Reading rows from the Table...");

    // Read all rows from table
    const request = new Request(
      `SELECT

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
      
                WHERE (uamd.VOLNEWPRODALLOCHCLIQ > 0 OR uamd.VOLNEWPRODALLOCWATER > 0 OR uamd.VOLNEWPRODALLOCGAS > 0) AND uamd.DTTM > EOMONTH(GETDATE(),-3)
      
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
      
      WHERE wl.fdcRecId IN ('${wellFdcRecIdArg}')
      
      ) wl
      
      WHERE wl.rnk = 1
      
      ORDER BY wl.name`,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log(`${rowCount} row(s) returned`);
        }
        connectionPV.close();
      }
    );

    let rowsPV: IWellPV[] = [];

    request.on('row', async columns => {
      const [name, fdcRecId, oil, water, gas, firstProduction, lastProduction, firstInjection, lastInjection] = columns;

      rowsPV.push({
        name: name.value,
        fdcRecId: fdcRecId.value,
        oil: oil.value,
        water: water.value,
        gas: gas.value,
        firstProduction: firstProduction.value,
        lastProduction: lastProduction.value,
        firstInjection: firstInjection.value,
        lastInjection: lastInjection.value
      });



      const data: Prisma.WellUpdateArgs = {
        where: {
          fdcRecId: fdcRecId.value,
        },
        data: {
          oil: oil.value,
          water: water.value,
          gas: gas.value,
          firstProduction: firstProduction.value,
          lastProduction: lastProduction.value,
          firstInjection: firstInjection.value,
          lastInjection: lastInjection.value,
        }
      }

      // console.log('data:', data);

      // const well = await prisma.well.update(data);
      // const { id, fdcRecId: wellFdcRecId, oil: oilUpdated, water: waterUpdated, gas: gasUpdated, lastInjection: lastInjectionUpdated, lastProduction: lastProductionUpdated } = well;


      // console.log(`Updated ${well.id}, uwi: ${name.value} node: ${fdcRecId.value}, oil: ${oilUpdated}`);
    });

    connectionPV.execSql(request);
    console.log('rowsPV:', rowsPV);
    return rowsPV
  }
  const re = await queryDatabase()
  console.log('re:', re);

}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  });