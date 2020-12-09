// code to build and initialize DB goes here
const {
  client,
  getAllLinks,
  createLink,
  createTag,
  deleteLink
  // other db methods 
} = require('./index');


async function buildTables() {
  try {


    client.connect();

    // drop tables in correct order
    try {
      console.log('Starting to drop tables...');

      client.query(`
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
        "createDate" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE tags(
        id SERIAL PRIMARY KEY,
        "linksId" INTEGER REFERENCES links(id),
        content TEXT NOT NULL
      )
    `);

    console.log('Finished constructing tables!');
  } catch (error) {
    console.error('Error constructing tables!');

    throw error;
  }

}

async function populateInitialData() {
  try {
    // create useful starting data
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
    console.log("linkOne is:", linkOne)
    console.log("linkTwo is:", linkTwo)
    return [linkOne, linkTwo]
  } catch (error) {
    throw error;
  }

}

async function populateInitialTagsData(initialLinks) {

  const [linkOne, linkTwo] = initialLinks

  try {
    console.log("creating tags initial data...")

    const tagOne = await createTag(
      linkOne.id, {
      content: "search"
    }
    )

    const tagTwo = await createTag(
      linkOne.id, {
      content: "big brother"
    }
    )

    const tagThree = await createTag(
      linkTwo.id, {
      content: "educational"
    }
    )

    console.log("success creating tags!")
    console.log("tagOne is:", tagOne)
    console.log("tagTwo is:", tagTwo)
    console.log("tagThree is:", tagThree)
    return [tagOne, tagTwo, tagThree]

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