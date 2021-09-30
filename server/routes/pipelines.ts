import * as express from 'express';
const router = express.Router();
// import router from 'express';
import pipeline_list, { validator_list, pipeline_copy_post, pipeline_delete_post, record_change, injection_point_add, injection_point_change, injection_point_delete } from '../controllers/pipelineController';
import satellite_list from '../controllers/satelliteController';
import facility_list from '../controllers/facilityController';
import injection_point_list from '../controllers/injectionPointController';


router.get('/pipelines', pipeline_list);
router.get('/validators', validator_list);
router.get('/injectionpoints', injection_point_list);
router.get('/satellites', satellite_list);
router.get('/facilities', facility_list);

router.post('/pipeline/:id/copy', pipeline_copy_post);
router.delete('/pipeline/:id', pipeline_delete_post);

router.post('/pipeline/:id/column', record_change);

router.post('/pipeline/:id/addinjpt', injection_point_add);
router.post('/pipeline/:ppl_id/:inj_pt_id/:new_inj_pt_id', injection_point_change);
router.delete('/pipeline/:ppl_id/:inj_pt_id', injection_point_delete);


export default router;