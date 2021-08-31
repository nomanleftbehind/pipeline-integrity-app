const router = require('express').Router();
const pipeline_controller = require('../controllers/pipelineController');
const injection_point_controller = require('../controllers/injectionPointController');


router.get('/pipelines', pipeline_controller.pipeline_list);

router.post('/pipeline/copy', pipeline_controller.pipeline_copy_post);
router.post('/pipeline/update/:id', pipeline_controller.pipeline_update_post);
router.delete('/pipeline/:id', pipeline_controller.pipeline_delete_post);

router.post('/pipeline/:id/addinjpt', pipeline_controller.injection_point_add);
router.post('/pipeline/:ppl_id/:inj_pt_id/:new_inj_pt_id', pipeline_controller.injection_point_change);
router.delete('/pipeline/:ppl_id/:inj_pt_id', pipeline_controller.injection_point_delete);

router.get('/injectionpoints', injection_point_controller.injection_point_list);

module.exports = router;