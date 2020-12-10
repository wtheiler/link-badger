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
    // console.log("all links for getAllLinks:", links)

    const linkIds = links.map((link) => {

      return link.id
    })
    // console.log(linkIds)
    const selectValues = linkIds.map((_, index) => `$${index + 1}`).join(', ');
    // console.log(selectValues)





    const { rows: tags } = await client.query(
      `
      SELECT *
      FROM tags
      WHERE "linksId" in (${selectValues});
      `, linkIds
    )

    // console.log("tags returend from db:", tags)
    const { rows: comments } = await client.query(
      `
      SELECT *
      FROM comments
      WHERE "linksId" in (${selectValues});
      `, linkIds
    )
    console.log("comments from db:", comments)


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



// to get the tags for each link:
// SELECT *
// FROM links l
// JOIN tags t ON t."linksId" = l.id



// I need a function to insert a new link into the links table.  Will need NAME, URL & DESCRIPTION
// createLink

async function createLink({ name, url, description }) {
  // const { name, description } = linkInfo
  try {
    const { rows: [link] } = await client.query(`
    INSERT 
    INTO links(name, url, description)
    VALUES($1, $2, $3)
    RETURNING *;
  `, [name, url, description])
    // console.log(link)
    return link
  } catch (error) {
    throw error
  }

}






// I need a function to insert a new Tag into the Tags (& LinkTags) table?
async function createTag(linksId, tag) {
  // console.log("link.id passed in from dbtest:", linksId)
  try {
    const { rows: newTag } = await client.query(`
    INSERT
    INTO tags("linksId", tag)
    VALUES($1, $2)
    RETURNING*;
    
    `, [linksId, tag])
    // console.log("what is my tag from query:", newTag)
    return newTag
  } catch (error) {
    throw (error)
  }
}


async function createComment(linksId, comment) {
  // console.log("link.id passed in from dbtest:", linksId)
  try {
    const { rows: newComment } = await client.query(`
    INSERT
    INTO comments("linksId", comment)
    VALUES($1, $2)
    RETURNING*;
    
    `, [linksId, comment])
    // console.log("what is my tag from query:", newTag)
    return newComment
  } catch (error) {
    throw (error)
  }
}







// Let's start with the ability to DELETE an entire LINK - if we can we can do a POST to edit (for both Links & Tags) as a stretch goal
// deleteLink

async function deleteLink({ linkId }) {

  try {
    const { rows: link } = await client.query(`
    DELETE 
    FROM links
    WHERE id=${linkId}
    RETURNING *;
    `)

    console.log("this link has been deleted:", link)
    return link
  }
  catch (error) {
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
  deleteLink
  // db methods
}