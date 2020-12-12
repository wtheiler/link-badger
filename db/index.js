// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'localhost:5432/link-badger-dev'
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);

// database methods


// I need a function to grab all the links in the LINKS table and return NAME, DESCRIPTION, CLICK_COUNT and grab the tags from the TAGS table to return to the front end to display on the UI
async function getAllLinks() {
  try {
    const { rows: links } = await client.query(`
        SELECT * 
        FROM links ;
    `)

    // Let's get the ids for all links so that we can add in appropriate comments & tags:
    const linkIds = links.map((link) => {
      return link.id
    })

    const selectValues = linkIds.map((_, index) => `$${index + 1}`).join(', ');

    // First, let's grab the tags associated with the links:
    const { rows: tags } = await client.query(
      `
      SELECT *
      FROM tags
      WHERE "linksId" in (${selectValues});
      `, linkIds
    )

    // Second, let's grab the comments associated with the links:
    const { rows: comments } = await client.query(
      `
      SELECT *
      FROM comments
      WHERE "linksId" in (${selectValues});
      `, linkIds
    )

    // Finally, let's add them to our links object and return to the request
    links.map((link) => {
      link.tags = []
      link.comments = []

      tags.forEach((tag) => {
        tag.linksId === link.id ? link.tags.push(tag.tag) : undefined
      })
      comments.forEach((comment) => {
        comment.linksId === link.id ? link.comments.push(comment.comment) : undefined
      })
      return link
    })

    console.log("should be my links object with associated tags & comments:", links)
    return links

  } catch (error) {
    throw error
  }
}

// createLink will insert a new link into the database and return it.
async function createLink({ name, url, description }) {

  try {
    const { rows: [link] } = await client.query(`
    INSERT 
    INTO links(name, url, description)
    VALUES($1, $2, $3)
    RETURNING *;
  `, [name, url, description])

    return link

  } catch (error) {
    throw error
  }

}

// createTag adds a new tag to the tags table with appropriate linkId and returns it
async function createTag(linksId, tag) {

  try {
    const { rows: [newTag] } = await client.query(`
    INSERT
    INTO tags("linksId", tag)
    VALUES($1, $2)
    RETURNING*;
    
    `, [linksId, tag])

    return newTag

  } catch (error) {
    throw (error)
  }
}


// createComment creates a new comment on the comments table with appropriate linkId and returns it
async function createComment(linksId, comment) {

  try {
    const { rows: [newComment] } = await client.query(`
    INSERT
    INTO comments("linksId", comment)
    VALUES($1, $2)
    RETURNING*;
    
    `, [linksId, comment])

    return newComment

  } catch (error) {
    throw (error)
  }
}


// Let's add a get link function to reuse as needed
async function _getLink(linkId) {
  try {
    const { rows: [link] } = await client.query(`
    SELECT *
    FROM links
    WHERE id=${linkId};
    `)

    return link

  } catch (error) {
    throw error
  }
}




// Let's start with the ability to DELETE an entire LINK - if we can we can do a POST to edit (for both Links & Tags) as a stretch goal

// deleteLink will remove a link from the database table based on linkId
async function deleteLink(linkId) {

  try {
    const { rows: link } = await client.query(`
    UPDATE links
    SET deleted = true
    WHERE id=${linkId};
    `)

    return link

  }
  catch (error) {
    throw error
  }
}



// updateLinkCount will run when a user clicks on the link even and then will grab the current link, add "1" to the currentCount on the link table, update the table and return the link object with the new count
async function updateLinkCount(linkId) {

  try {
    const link = await _getLink(linkId)
    if (!link) {

      throw "This link does not exist"
    }
  } catch (error) {
    throw error
  }

  try {
    const { rows: [link] } = await client.query(`
      SELECT *
      from links
      WHERE id=${linkId};
    
    `)

    const currentCount = link.clickCount
    // console.log(link)
    // console.log("what is my current link count:", link.clickCount)

    const newCount = (currentCount + 1)
    // console.log("this is my new link count", newCount)

    await client.query(`
    UPDATE links
    SET "clickCount" = ${newCount}
    WHERE id = ${linkId};
    `)

    const newLink = await _getLink(linkId)

    // console.log("here is my new link with updated click count:", newLink)
    return newLink

  } catch (error) {
    throw error
  }
}


// export
module.exports = {
  client,
  getAllLinks,
  createLink,
  createTag,
  createComment,
  updateLinkCount,
  deleteLink
  // db methods
}