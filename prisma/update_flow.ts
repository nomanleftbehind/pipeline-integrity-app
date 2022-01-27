import { PrismaClient, Prisma } from '@prisma/client';
import { Connection, Request } from "tedious";

const prisma = new PrismaClient();


// Create connection to ProdView database
const config = {
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


async function main() {

  const pvNodeArray = await prisma.injectionPoint.findMany({
    where: {
      pvNodeId: { not: null }
    },
    select: {
      pvNodeId: true,
    }
  })

  const pvNodeString = pvNodeArray.map(e => e.pvNodeId).join("', '");

  const connection = new Connection(config);

  // Attempt to connect to ProdView and execute query if connection goes through
  connection.connect();

  connection.on("connect", err => {
    if (err) {
      console.error(err.message);
    } else {
      queryDatabase();
    }
  });

  function queryDatabase() {
    console.log("Reading rows from the Table...");

    // Read all rows from table
    const request = new Request(
      `SELECT
  
      un.IDRECPARENT "pvUnitId",
      un.IDREC "pvNodeId",
      ISNULL(unmd.VOLHCLIQ,0) "oil",
      ISNULL(unmd.VOLWATER,0) "water",
      ISNULL(unmd.VOLGAS,0) "gas",
      unmd.DTTM "lastProduction",
      unmd.SYSLOCKDATE "lastInjection"
      
      
      FROM pvCalcUnitsMetric.PVUNITNODE un
      LEFT OUTER JOIN pvCalcUnitsMetric.PVUNITNODEMONTHDAYCALC unmd ON unmd.IDRECNODE = un.IDREC AND unmd.DTTM = CAST(GETDATE()-3 AS DATE)
      
      WHERE un.IDREC IN ('${pvNodeString}')`,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log(`${rowCount} row(s) returned`);
        }
        connection.close();
      }
    );

    request.on('row', async columns => {
      const [unitId, nodeId, oil, water, gas, lastProduction, lastInjection] = columns;

      const data: Prisma.InjectionPointUpdateArgs = {
        where: {
          pvUnitId_pvNodeId: {
            pvUnitId: unitId.value,
            pvNodeId: nodeId.value,
          }
        },
        data: {
          oil: oil.value,
          water: water.value,
          gas: gas.value,
          lastProduction: lastProduction.value,
          lastInjection: lastInjection.value,
        }
      }

      const injectionPoint = await prisma.injectionPoint.update(data);
      const { id, pvNodeId, oil: oilUpdated, water: waterUpdated, gas: gasUpdated, lastInjection: lastInjectionUpdated, lastProduction: lastProductionUpdated } = injectionPoint;


      // console.log(`Updated ${injectionPoint.id}, node: ${pvNodeId}, oil: ${oilUpdated}`);
    });

    connection.execSql(request);
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  });