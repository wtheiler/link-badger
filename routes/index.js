const apiRouter = require('express').Router();
const { getAllLinks, getAllTags, createLink, createTag, deleteLink, updateLinkCount } = require('../db')


// get all links:
apiRouter.get('/links', async (req, res) => {
  try {
    // console.log("in my try block of /links")
    const links = await getAllLinks()
    res.send({ links })
  } catch (error) {
    throw error
  }
})

// get all tags:
apiRouter.get('/tags', async (req, res) => {
  try {
    // console.log("in my try block of /links")
    const tags = await getAllTags()
    res.send({ tags })
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
    // console.log("send back to the UI", newLink)
    res.send(newLink)
  } catch (error) {
    next(error)
  }
})


// create a tag:
apiRouter.post('/tags', async (req, res, next) => {
  console.log("create a new TAG in routes")
  const tags = req.body
  console.log("routes tags sent to create tags", tags)

  try {
    const tag = await createTag(tags)

    res.send(tag)
  } catch (error) {
    next(error)
  }
})


// create a comment:
// apiRouter.post('/links/:linksId/comments', async (req, res, next) => {
//   const linksId = req.params.linksId
//   const comments = req.body.comment
//   console.log("did I make it here to my routes/index.js?")

//   try {
//     const comment = await createComment(linksId, comments)
//     res.send(comment)
//   } catch (error) {
//     next(error)
//   }
// })


// delete a link:
apiRouter.delete('/links/:linksId', async (req, res, next) => {
  // console.log("here I am", req.params.linksId)
  const linksId = req.params.linksId
  // console.log("my links id in index.routes", linksId)


  try {
    const activeLinks = await deleteLink(linksId)
    res.send(activeLinks)
  } catch (error) {
    next(error)
  }
})





// record a click count:
apiRouter.patch('/links/:linksId', async (req, res, next) => {
  const linkId = req.params.linksId

  try {
    const clickIt = await updateLinkCount(linkId)
    console.log("this should be all links from db in routes click count:", clickIt)
    res.send(clickIt)

  } catch (error) {
    next(error)
  }
})




module.exports = apiRouter;
