const express = require('express');

const router = express.Router();

const {
  getAllRegions,
} = require('../controllers/locale');

router.get('/');
router.get('/regions', getAllRegions);
router.get('/states');
router.get('/lgas');

module.exports = router;


description": "The South-West region stretches along the Atlantic seaboard from the Niger Delta Zone in the east to the border with the Benin Republic in the west. The main ecological regions in this zone include the mangrove forests in the east and the south and the forest savanna in the northwest. Culturally, much of the South-West region falls in the indigenous Yorubaland. The Yoruba people are the largest ethnic group in the country's southwest. The region is home to the incredibly populous cities of Ibadan and Lagos, making it one of the busiest zones in terms of economic activity. The South-West Zone is the second most populous of all Nigeria's geopolitical zones. It is home to 47 million people, accounting for nearly 22% of the country's population. The Lagos Metropolitan Area found in this zone is the world's eighth-largest metropolitan area, with about 21 million people. Here are the states in this region.
