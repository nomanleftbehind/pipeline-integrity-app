const router = require('express').Router();
const pipeline_controller = require('../controllers/pipelineController');
const injection_point_controller = require('../controllers/injectionPointController');

router.get('/pipelines', pipeline_controller.pipeline_list);
router.post('/pipeline/copy', pipeline_controller.pipeline_copy_post);
router.post('/pipeline/update/:id', pipeline_controller.pipeline_update_post);
router.delete('/pipeline/:id', pipeline_controller.pipeline_delete_post);

router.get('/injectionpoints', injection_point_controller.injection_point_list);

// router.post('/pipeline/create', pipeline_controller.pipeline_create_post);

module.exports = router;