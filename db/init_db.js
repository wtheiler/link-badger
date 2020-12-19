// code to build and initialize DB goes here
const {
  client,
  getAllLinks,
  createLink,
  createTag,
  createComment,
  updateLinkCount,
  deleteLink
  // other db methods 
} = require('./index');


async function buildTables() {
  try {
    client.connect();

    console.log('Starting to drop tables...');

    await client.query(`
        DROP TABLE IF EXISTS tag_link;
        DROP TABLE IF EXISTS tags;
        DROP TABLE IF EXISTS links;
      `);

    console.log('Finished dropping tables!');

    console.log('Starting to construct tables...');

    await client.query(`
      CREATE TABLE links(
        link_id SERIAL PRIMARY KEY,
        name varchar(255) NOT NULL,
        url varchar(255) NOT NULL,
        description TEXT NOT NULL,
        "clickCount" INTEGER NOT NULL DEFAULT 0,
        "createDate" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        "isActive" BOOLEAN DEFAULT true
      );

      CREATE TABLE tags(
        tag_id SERIAL PRIMARY KEY,
        tag TEXT UNIQUE NOT NULL
      );

      CREATE TABLE tag_link(
        link_id INTEGER REFERENCES links(link_id) NOT NULL,
        tag_id INTEGER REFERENCES tags(tag_id) NOT NULL, 
        UNIQUE (link_id, tag_id)
      );


    `);

    console.log('Finished constructing tables!');


  } catch (error) {
    console.error('Error constructing tables!');

    throw error;
  }

}

async function populateInitialData() {
  try {

    console.log("Creating test links data...")

    const linkOne = await createLink({
      name: "FaveLink",
      url: "www.google.com",
      description: "This is by far my favorite Link on the internet.",
      tags: ["tag one", "general", "music"]
    })

    // const linkTwo = await createLink({
    //   name: "SecondFaveLink",
    //   url: "www.zillow.com",
    //   description: "looking for or dreaming about your next abode? - check this site out!",
    //   tags: "tagyouareit"
    // })
    console.log("success creating links!")

    return [linkOne]
  } catch (error) {
    throw error;
  }

}

async function populateInitialTagsData(/*initialLinkTags*/) {
  // const [linkOne] = initialLinkTags

  try {
    // console.log("creating tags initial data...")
    // const tagOne = await createTag("search")
    // const tagTwo = await createTag("big brother")

    // console.log("success creating tags!")


    console.log("testing click count function...")
    const clickCount = await updateLinkCount(1)
    console.log("success testing click count function!")

    return [clickCount]

  } catch (error) {
    throw error
  }
}


buildTables()
  .then(populateInitialData)
  .then(populateInitialTagsData)
  .then(getAllLinks)
  .catch(console.error)
  .finally(() => client.end());