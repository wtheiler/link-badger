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
        FROM links l;
    
    
    `)
    console.log("all links for getAllLinks:", links)
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
async function createTag(linksId, content) {
  console.log("link.id passed in from dbtest:", linksId)
  try {
    const { rows: newTag } = await client.query(`
    INSERT
    INTO tags("linksId", content)
    VALUES($1, $2)
    RETURNING*;
    
    `, [linksId, content])
    return newTag
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
  deleteLink
  // db methods
}