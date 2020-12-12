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

    try {
      console.log('Starting to drop tables...');

      client.query(`
        DROP TABLE IF EXISTS comments;
        DROP TABLE IF EXISTS tags;
        DROP TABLE IF EXISTS links;
      `);

      console.log('Finished dropping tables!');
    } catch (error) {

      console.error('Error while dropping tables!');

      throw error;
    }

    // build tables in correct order

  } catch (error) {
    throw error;
  }

  try {
    console.log('Starting to construct tables...');

    await client.query(`
      CREATE TABLE links(
        id SERIAL PRIMARY KEY,
        name varchar(255) NOT NULL,
        url varchar(255) NOT NULL,
        description TEXT NOT NULL,
        "clickCount" INTEGER NOT NULL DEFAULT 0,
        "createDate" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        "isActive" BOOLEAN DEFAULT true
      );

      CREATE TABLE tags(
        id SERIAL PRIMARY KEY,
        "linksId" INTEGER REFERENCES links(id),
        tag TEXT NOT NULL
      );

      CREATE TABLE comments(
        id SERIAL PRIMARY KEY,
        "linksId" INTEGER REFERENCES links(id),
        comment TEXT NOT NULL
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
      description: "This is by far my favorite Link on the internet."
    })

    const linkTwo = await createLink({
      name: "SecondFaveLink",
      url: "www.zillow.com",
      description: "looking for or dreaming about your next abode? - check this site out!"
    })
    console.log("success creating links!")

    return [linkOne, linkTwo]
  } catch (error) {
    throw error;
  }

}

async function populateInitialTagsData(initialLinkTags) {
  const [linkOne, linkTwo] = initialLinkTags

  try {
    console.log("creating tags initial data...")
    const tagOne = await createTag(linkOne.id, "search")
    const tagTwo = await createTag(linkOne.id, "big brother")
    const tagThree = await createTag(linkTwo.id, "educational")
    console.log("success creating tags!")

    console.log("creating comments initial data...")
    const commentOne = await createComment(linkOne.id, "I really, really like this site - but what a weird name!")
    const commentTwo = await createComment(linkOne.id, "This website is most useful!")
    const commentThree = await createComment(linkTwo.id, "Still my go-to for looking for homes!")
    console.log("success creating comments!")

    console.log("testing click count function...")
    const clickCount = await updateLinkCount(1)
    console.log("success testing click count function!")

    return [tagOne, tagTwo, tagThree, commentOne, commentTwo, commentThree, clickCount]

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