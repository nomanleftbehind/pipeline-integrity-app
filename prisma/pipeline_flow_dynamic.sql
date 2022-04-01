CREATE OR REPLACE FUNCTION "ppl_db".pipeline_flow(
	pipeline_id text,
	flow_calculation_direction "ppl_db"."flow_calculation_direction"
)
RETURNS TABLE (
	id text,
	oil double precision,
	water double precision,
	gas double precision,
	"firstProduction" timestamp without time zone,
	"lastProduction" timestamp without time zone,
	"firstInjection" timestamp without time zone,
	"lastInjection" timestamp without time zone
)
LANGUAGE plpgsql
AS
$$

DECLARE

	res text;
	keep_going boolean := true;
	counter integer := 1;
	connected_pipeline_column text := CASE WHEN flow_calculation_direction = 'Upstream' THEN '"A"' WHEN flow_calculation_direction = 'Downstream' THEN '"B"' END;
	connected_pipeline_join_on_column text := CASE WHEN flow_calculation_direction = 'Upstream' THEN '"B"' WHEN flow_calculation_direction = 'Downstream' THEN '"A"' END;
	query_pipeline_volume text := '
WITH pipeline_volume as (
SELECT

pip.id,
fl.' || connected_pipeline_column || ' as "connected_pipeline_id",
SUM(COALESCE(w.oil,0) + COALESCE(sp.oil,0))  as "oil",
SUM(COALESCE(w.water,0) + COALESCE(sp.water,0)) as "water",
SUM(COALESCE(w.gas,0) + COALESCE(sp.gas,0)) as "gas",
MIN(LEAST(w."firstProduction", sp."firstFlow")) as "firstProduction",
MAX(GREATEST(w."lastProduction", sp."lastFlow")) as "lastProduction",
MIN(w."firstInjection") as "firstInjection",
MAX(w."lastInjection") as "lastInjection"

FROM "ppl_db"."Pipeline" pip
LEFT OUTER JOIN "ppl_db"."_PipelineFollows" fl ON fl.' || connected_pipeline_join_on_column || ' = pip.id
LEFT OUTER JOIN "ppl_db"."Well" w ON w."pipelineId" = pip.id
LEFT OUTER JOIN "ppl_db"."SalesPoint" sp ON sp."pipelineId" = pip.id

GROUP BY
pip.id,
fl.' || connected_pipeline_column || '
)
';

	query_select text := '
SELECT

pv1.id';

	query_select2 text := '
SELECT

pv.id';

	query_select3 text := '
SELECT

pv.id,
';

	coalesce_oil text;
	coalesce_water text;
	coalesce_gas text;
	
	least_prod text := 'LEAST(';
	greatest_prod text := 'GREATEST(';
	least_inj text := 'LEAST(';
	greatest_inj text := 'GREATEST(';

	query_max text;

	query_join text := '
FROM pipeline_volume pv1';
	query_where text := CONCAT('
WHERE pv1.id IN (''', pipeline_id, ''')');

	query_not_in_beggin text;
	plus text;
	query_not_in text;
	
	query_final_text text;

BEGIN
	WHILE keep_going LOOP

		IF counter > 1 THEN
			query_not_in_beggin := ',';
		ELSE
			query_not_in_beggin := '';
		END IF;
		
		IF counter > 1 THEN
			plus := ' + ';
		ELSE
			plus := '';
		END IF;

		query_select := CONCAT(query_select, ',
ROW_NUMBER () OVER (PARTITION BY pv', counter, '.id ORDER BY pv', counter, '.id) as sum_if_', counter, ',
pv', counter, '.oil as "oil', counter, '"', ',
pv', counter, '.water as "water', counter, '"', ',
pv', counter, '.gas as "gas', counter, '"', ',
pv', counter, '."firstProduction" as "firstProduction', counter, '"', ',
pv', counter, '."lastProduction" as "lastProduction', counter, '"', ',
pv', counter, '."firstInjection" as "firstInjection', counter, '"', ',
pv', counter, '."lastInjection" as "lastInjection', counter, '"');

		query_select2 := CONCAT(query_select2, ',

SUM(CASE WHEN pv.sum_if_', counter, ' = 1 THEN pv.oil', counter, ' END) as "oil', counter, '"', ',
SUM(CASE WHEN pv.sum_if_', counter, ' = 1 THEN pv.water', counter, ' END) as "water', counter, '"', ',
SUM(CASE WHEN pv.sum_if_', counter, ' = 1 THEN pv.gas', counter, ' END) as "gas', counter, '"', ',
MIN(CASE WHEN pv.sum_if_', counter, ' = 1 THEN pv."firstProduction', counter, '" END) as "firstProduction', counter, '"', ',
MAX(CASE WHEN pv.sum_if_', counter, ' = 1 THEN pv."lastProduction', counter, '" END) as "lastProduction', counter, '"', ',
MIN(CASE WHEN pv.sum_if_', counter, ' = 1 THEN pv."firstInjection', counter, '" END) as "firstInjection', counter, '"', ',
MAX(CASE WHEN pv.sum_if_', counter, ' = 1 THEN pv."lastInjection', counter, '" END) as "lastInjection', counter, '"');

		coalesce_oil := CONCAT(coalesce_oil, plus, 'COALESCE(pv.oil', counter, ',0)');
		coalesce_water := CONCAT(coalesce_water, plus, 'COALESCE(pv.water', counter, ',0)');
		coalesce_gas := CONCAT(coalesce_gas, plus, 'COALESCE(pv.gas', counter, ',0)');
		least_prod := CONCAT(least_prod, query_not_in_beggin, 'pv."firstProduction', counter, '"');
		greatest_prod := CONCAT(greatest_prod, query_not_in_beggin, 'pv."lastProduction', counter, '"');
		least_inj := CONCAT(least_inj, query_not_in_beggin, 'pv."firstInjection', counter, '"');
		greatest_inj := CONCAT(greatest_inj, query_not_in_beggin, 'pv."lastInjection', counter, '"');

		counter := counter + 1;

		query_max := 'SELECT MAX(pv' || counter || '.id)';

		query_not_in := CONCAT(query_not_in, query_not_in_beggin, 'pv', counter - 1, '.id');
		
		query_join := CONCAT(query_join, '
LEFT OUTER JOIN pipeline_volume pv', counter, ' ON pv', counter, '.id = pv', counter - 1, '.connected_pipeline_id', ' AND pv', counter, '.id NOT IN (', query_not_in, ')');

		query_final_text := CONCAT(query_pipeline_volume, query_select3, coalesce_oil, ' as "oil",
', coalesce_water, ' as "water",
', coalesce_gas, ' as "gas",
', least_prod, ') as "firstProduction",
', greatest_prod, ') as "lastProduction",
', least_inj, ') as "firstInjection",
', greatest_inj, ') as "lastInjection"

FROM (
', query_select2, '

FROM (
', query_select, query_join, query_where, '

) pv

GROUP BY 
pv.id
) pv

ORDER BY
pv.id');
 		raise notice '%', query_final_text;
		EXECUTE query_pipeline_volume || query_max || query_join || query_where
		INTO res;
		
		IF res IS NULL THEN
			keep_going := false;
		END IF;

   END LOOP;
     RETURN QUERY EXECUTE query_final_text;
END;

$$;
