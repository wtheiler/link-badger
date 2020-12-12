const apiRouter = require('express').Router();
const { getAllLinks, createLink, createTag, createComment, deleteLink, updateLinkCount } = require('../db')


// get all links:
apiRouter.get('/', async (req, res) => {
  try {
    console.log("in my try block of /links")
    const links = await getAllLinks()
    res.send({ links })
  } catch (error) {
    throw error
  }
})


// create a link:
apiRouter.post('/links', async (req, res, next) => {
  console.log("create a new link POST")
  const link = req.body
  // console.log("this is my req.body link from postman:", link )
  try {
    const newLink = await createLink(link)
    res.send(newLink)
  } catch (error) {
    next(error)
  }
})


// create a tag:
apiRouter.post('/links/:linksId/tags', async (req, res, next) => {
  const linksId = req.params.linksId
  const tags = req.body.tag

  try {
    const tag = await createTag(linksId, tags)

    res.send(tag)
  } catch (error) {
    next(error)
  }
})


// create a comment:
apiRouter.post('/links/:linksId/comments', async (req, res, next) => {
  const linksId = req.params.linksId
  const comments = req.body.comment

  try {
    const comment = await createComment(linksId, comments)
    res.send(comment)
  } catch (error) {
    next(error)
  }
})


// delete a link:
apiRouter.delete('/links/:linksId', async (req, res, next) => {
  const linksId = req.params.linksId

  try {
    const deletedLink = await deleteLink(linksId)
    res.send(deletedLink)
  } catch (error) {
    next(error)
  }
})

// record a click count:
apiRouter.patch('/links/:linksId', async (req, res, next) => {
  const linkId = req.params.linksId

  try {
    const clickIt = await updateLinkCount(linkId)
    res.send(clickIt)

  } catch (error) {
    next(error)
  }
})




module.exports = apiRouter;
