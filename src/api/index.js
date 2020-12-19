import axios from 'axios';

export async function getLinks() {
  try {
    const { data } = await axios.get('/api/links');
    console.log("links data", data)
    return data.links;
  } catch (error) {
    throw error;
  }
}

export async function getTags() {
  try {
    const { data } = await axios.get('/api/tags');
    console.log("tags data in api", data)
    return data.tags;
  } catch (error) {
    throw error;
  }
}





export async function createNewLink(newLink) {
  try {
    const { data } = await axios.post('/api/links', newLink)
    console.log("created new post in db:", data)
    return data
  } catch (error) {
    throw error
  }
}

export async function createNewTag(newTag) {
  console.log("tags sent to routs from api file createNewTag", newTag)
  try {
    const { data } = await axios.post('/api/tags', newTag)
    console.log("created new tag in db:", data)
    return data
  } catch (error) {
    throw error
  }
}













export async function deleteSingleLink(linkId) {

  console.log("data sending to routes:", linkId)

  try {
    const { data } = await axios.delete(`/api/links/${linkId.id}`)
    // console.log("you set isActive to false", data)
    return data
  } catch (error) {
    throw error
  }
}


export async function clickCount(linkId) {
  try {
    const { data } = await axios.patch(`/api/links/${linkId.id}`);
    // console.log("tags data in api", data)
    return data
  } catch (error) {
    throw error;
  }
}
