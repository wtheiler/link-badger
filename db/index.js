// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'localhost:5432/link-badger-dev'
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
// const client = new Client(DB_URL);

const client = new Client({ connectionString: DB_URL, ssl: { rejectUnauthorized: false, }, });

// database methods


// I need a function to grab all the links in the LINKS table and return NAME, DESCRIPTION, CLICK_COUNT and grab the tags from the TAGS table to return to the front end to display on the UI
async function getAllLinks() {
  try {
    const { rows: links } = await client.query(`
        SELECT * 
        FROM links
        WHERE "isActive" = true
        ORDER BY "createDate" ASC ;
    `)


    const { rows: tags } = await client.query(`
    SELECT *
    FROM tags
    NATURAL JOIN tag_link
    ;
    `)

    links.map((link) => {
      link.tags = []
      tags.map((tag) => {
        if (tag.link_id === link.link_id) {
          link.tags.push(" " + tag.tag)
        }
      })
      return link
    })

    return links

  } catch (error) {
    throw error
  }
}



async function getAllTags() {
  try {
    const { rows: tags } = await client.query(`
        SELECT * 
        FROM tags;
    `)
    console.log("tags from get all tags in db:", tags)
    return tags
  } catch (error) {
    return error
  }
}


// createLink will insert a new link into the database and return it.

async function createLink({ name, url, description, tags = [] }) {
  try {

    const { rows: [link] } = await client.query(`
    INSERT 
    INTO links(name, url, description)
    VALUES($1, $2, $3)
    RETURNING *;
  `, [name, url, description])

    console.log("here is my new link in the db", link)

    // return getAllLinks()

    let insertValues = tags.map(
      (_, index) => `$${index + 1}`).join('), (');
    const { rows: tag } = await client.query(`
    INSERT 
    INTO tags(tag)
    VALUES(${insertValues})
    ON CONFLICT (tag)
    DO UPDATE SET tag=tags.tag
    RETURNING *;
  `, tags)

    console.log("here is my new tag in the db:", tag)

    insertValues = tag.map(
      (_, index) => `$1, $${index + 2}`).join(`), (`)
    console.log([link.link_id, ...tag.map((tag) => tag.tag_id)])
    await client.query(`
    INSERT
    INTO tag_link(link_id, tag_id)
    VALUES(${insertValues});
    `, [link.link_id, ...tag.map((tag) => tag.tag_id)])   // map over tags array and grab the ids, then spread them out over the existing array to then insert into the variables for insertValues

  } catch (error) {
    throw error
  }

  return getAllLinks()
}



async function createTag({ tag }) {
  console.log("the new tag in db", tag)

  try {
    const { rows: newtag } = await client.query(`
    INSERT
    INTO tags(tag)
    VALUES('${tag}');
    `)
    console.log("tag in the db:", newtag)
  } catch (error) {
    throw error
  }
  return getAllTags()
}



// Let's add a get link function to reuse as needed
async function _getLink(linkId) {
  try {
    const { rows: [link] } = await client.query(`
    SELECT *
    FROM links
    WHERE link_id=${linkId};
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
    await client.query(`
    UPDATE links
    SET "isActive" = false
    WHERE link_id=${linkId}
    ;
    
    `)
    return getAllLinks()
    // return link/

  }
  catch (error) {

    throw error
  }
}



// updateLinkCount will run when a user clicks on the link even and then will grab the current link, add "1" to the currentCount on the link table, update the table and return the link object with the new count
async function updateLinkCount(linkId) {

  console.log("update Link Count in db/index:", linkId)

  try {
    const { rows: [link] } = await client.query(`
      SELECT *
      from links
      WHERE link_id=${linkId}
      ;
    
    `)

    console.log("index.db", link)

    const currentCount = link.clickCount
    // console.log(link)
    // console.log("what is my current link count:", link.clickCount)

    const newCount = (currentCount + 1)
    // console.log("this is my new link count", newCount)

    await client.query(`
    UPDATE links
    SET "clickCount" = ${newCount}
    WHERE link_id = ${linkId}
    ;
    `)

    // const newLink = await _getLink(linkId)

    // console.log("here is my new link with updated click count:", newLink)

    return getAllLinks()

  } catch (error) {
    throw error
  }
}


// export
module.exports = {
  client,
  getAllLinks,
  getAllTags,
  createLink,
  createTag,
  updateLinkCount,
  deleteLink
  // db methods
}