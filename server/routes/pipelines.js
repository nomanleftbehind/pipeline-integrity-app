const router = require('express').Router();
const pipeline_controller = require('../controllers/pipelineController');
const satellite_controller = require('../controllers/satelliteController');
const facility_controller = require('../controllers/facilityController');
const injection_point_controller = require('../controllers/injectionPointController');


router.get('/pipelines', pipeline_controller.pipeline_list);
router.get('/validators', pipeline_controller.validators);
router.get('/injectionpoints', injection_point_controller.injection_point_list);
router.get('/satellites', satellite_controller.satellite_list);
router.get('/facilities', facility_controller.facility_list);

router.post('/pipeline/:id/copy', pipeline_controller.pipeline_copy_post);
router.delete('/pipeline/:id', pipeline_controller.pipeline_delete_post);

router.post('/pipeline/:id/column', pipeline_controller.record_change);

router.post('/pipeline/:id/addinjpt', pipeline_controller.injection_point_add);
router.post('/pipeline/:ppl_id/:inj_pt_id/:new_inj_pt_id', pipeline_controller.injection_point_change);
router.delete('/pipeline/:ppl_id/:inj_pt_id', pipeline_controller.injection_point_delete);


module.exports = router;