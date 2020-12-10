// code to build and initialize DB goes here
const {
  client,
  getAllLinks,
  createLink,
  createTag,
  createComment,
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
        "createDate" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
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
    // console.log("linkOne is:", linkOne)
    // console.log("linkTwo is:", linkTwo)
    return [linkOne, linkTwo]
  } catch (error) {
    throw error;
  }

}

async function populateInitialTagsData(initialLinkTags) {

  const [linkOne, linkTwo] = initialLinkTags

  try {
    console.log("creating tags initial data...")
    console.log("Here is linkOne.id from Tags:", linkOne)

    const tagOne = await createTag(
      linkOne.id,
      "search"

    )

    const tagTwo = await createTag(
      linkOne.id,
      "big brother"

    )

    const tagThree = await createTag(
      linkTwo.id,
      "educational"

    )

    const commentOne = await createComment(
      linkOne.id,
      "I really, really like this site - but what a weird name!"

    )

    const commentTwo = await createComment(
      linkOne.id,
      "This website is most useful!"

    )

    const commentThree = await createComment(
      linkTwo.id,
      "Still my go-to for looking for homes!"

    )

    console.log("success creating tags!")
    console.log("commentOne at end of tags:", commentOne)


    return [tagOne, tagTwo, tagThree, commentOne, commentTwo, commentThree]

  } catch (error) {
    throw error
  }
}


// async function populateInitialComments(initialLinkComments) {
//   console.log("initialLinkComments:", initialLinkComments)

//   const [linkOne, linkTwo] = initialLinkComments

//   try {
//     console.log("creating comments initial data...")
//     console.log("here is linkOne.id:", linkOne.id)

//     const commentOne = await createComment(
//       linkOne.id,
//       "I really, really like this site - but what a weird name!"

//     )

//     const commentTwo = await createComment(
//       linkOne.id,
//       "This website is most useful!"

//     )

//     const commentThree = await createComment(
//       linkTwo.id,
//       "Still my go-to for looking for homes!"

//     )

//     console.log("success creating comments!")

//     console.log(commentOne)
//     return [commentOne, commentTwo, commentThree]

//   } catch (error) {
//     throw error
//   }
// }



buildTables()
  .then(populateInitialData)
  .then(populateInitialTagsData)
  .then(getAllLinks)
  .catch(console.error)
  .finally(() => client.end());