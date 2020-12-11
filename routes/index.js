const apiRouter = require('express').Router();
const { getAllLinks } = require('../db')



apiRouter.get('/', async (req, res) => {
  try {
    console.log("in my try block of /links")
    const links = await getAllLinks()
    res.send({ links })
  } catch (error) {
    throw error
  }
})



module.exports = apiRouter;
