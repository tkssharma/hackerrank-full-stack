var recipes = require('../recipes.json');
var router = require('express').Router();

function getIndex(timers , elapsedTime){
  for(let i=0; i < timers.length ; i++) {
   if(timers[i] >= elapsedTime) {
     return i;
   }
  }
}
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const elapsedTime = req.query.elapsedTime || 0;

  if(isNaN(id)){
    res.status(400).send('NOT_FOUND');
    return;
  }
  const selectedRecipe = recipes.filter(i => {
    return i.id === Number(id)
  })[0];
  if(selectedRecipe) {
    const { timers } = selectedRecipe;
    const index = getIndex(timers, elapsedTime);
    res.status(200).send({index});
    return;
  } else {
    res.status(404).send('NOT_FOUND');
    return;
  }
})

module.exports = router;

