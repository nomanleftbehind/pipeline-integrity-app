ALTER TABLE ppl_db."LicenseChange"
	DROP CONSTRAINT "LicenseChange_pipelineId_fkey",
	ADD CONSTRAINT "LicenseChange_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES ppl_db."Pipeline"("id") ON DELETE CASCADE ON UPDATE CASCADE;
	
ALTER TABLE ppl_db."PigRun"
	DROP CONSTRAINT "PigRun_pipelineId_fkey",
	ADD CONSTRAINT "PigRun_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES ppl_db."Pipeline"("id") ON DELETE CASCADE ON UPDATE CASCADE;
	
ALTER TABLE ppl_db."PressureTest"
	DROP CONSTRAINT "PressureTest_pipelineId_fkey",
	ADD CONSTRAINT "PressureTest_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES ppl_db."Pipeline"("id") ON DELETE CASCADE ON UPDATE CASCADE;
	
ALTER TABLE ppl_db."PipelineBatch"
	DROP CONSTRAINT "PipelineBatch_pipelineId_fkey",
	ADD CONSTRAINT "PipelineBatch_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES ppl_db."Pipeline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE ppl_db."Geotechnical"
	DROP CONSTRAINT "Geotechnical_pipelineId_fkey",
	ADD CONSTRAINT "Geotechnical_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES ppl_db."Pipeline"("id") ON DELETE CASCADE ON UPDATE CASCADE;
	
ALTER TABLE ppl_db."Risk"
	DROP CONSTRAINT "Risk_id_fkey",
	ADD CONSTRAINT "Risk_id_fkey" FOREIGN KEY ("id") REFERENCES ppl_db."Pipeline"("id") ON DELETE CASCADE ON UPDATE CASCADE;
	
ALTER TABLE ppl_db."Chemical"
	DROP CONSTRAINT "Chemical_id_fkey",
	ADD CONSTRAINT "Chemical_id_fkey" FOREIGN KEY ("id") REFERENCES ppl_db."Pipeline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE ppl_db."PipelinesOnPipelines"
	DROP CONSTRAINT "PipelinesOnPipelines_upstreamId_fkey",
	ADD CONSTRAINT "PipelinesOnPipelines_upstreamId_fkey" FOREIGN KEY ("upstreamId") REFERENCES ppl_db."Pipeline"("id") ON DELETE CASCADE ON UPDATE CASCADE,
	DROP CONSTRAINT "PipelinesOnPipelines_downstreamId_fkey",
	ADD CONSTRAINT "PipelinesOnPipelines_downstreamId_fkey" FOREIGN KEY ("downstreamId") REFERENCES ppl_db."Pipeline"("id") ON DELETE CASCADE ON UPDATE CASCADE;