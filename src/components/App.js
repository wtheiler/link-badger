import React, { useState, useEffect } from 'react';
import 'fontsource-roboto';
import MultipleSelect from './Tags'
import SimpleDialogDemo from './AddTag'
// import SearchCards from './Search'

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import LinkIcon from '@material-ui/icons/Link';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import {
  getLinks, getTags, createNewLink, createNewTag, deleteSingleLink, clickCount
} from '../api';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        will theiler
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(8),


  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  }

}));


export default function Album() {
  const classes = useStyles();
  const [theLinkName, setTheLinkName] = useState("")
  const [theUrl, setTheUrl] = useState("")
  const [theDescription, setTheDescription] = useState("")
  const [allTags, setAllTags] = useState([])
  const [cards, setLinks] = useState([])
  const [selectedTagNames, setSelectedTagNames] = useState([]);
  const [newTag, setNewTag] = useState([])
  const [sortLinks, setSortLinks] = useState("Created Date")

  // add state for which sort mechanism it is - if sort by created date, then update "cards" using cards.sort(), then setLinks to that new order... 
  // for date formatting:
  const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };


  useEffect(() => {
    getLinks().then((response) => {
      console.log("links from useEffect", response)
      setLinks(response);
    })

  }, []);

  useEffect(() => {
    getTags().then((response) => {
      console.log("tags from useEffect", response)
      setAllTags(response);

    });
  }, []);



  const handleTheLinkName = (event) => {
    event.preventDefault()
    const theLink = event.target.value
    setTheLinkName(theLink)
  }

  const handleTheUrl = (event) => {
    event.preventDefault()
    const newUrl = event.target.value
    setTheUrl(newUrl)
  }

  const handleTheDescription = (event) => {
    event.preventDefault()
    const newDescription = event.target.value
    setTheDescription(newDescription)
  }

  // NEED TO BUILD THIS GUY
  const handleSelectedTags = (event) => {
    event.preventDefault()
    const newTags = event.target.value
    console.log("the selected tags:", newTags)
  }




  const buildLinkObject = async (event) => {
    event.preventDefault()
    const newLink = {
      name: theLinkName,
      url: theUrl,
      description: theDescription,
      tags: selectedTagNames
    }

    const theLinks = await createNewLink(newLink)
    setLinks(theLinks)

  }

  const handleClickCount = async (card) => {

    const cardId = { id: card.link_id }
    console.log("click count cardId:", cardId)
    const clickCountLinks = await clickCount(cardId)
    setLinks(clickCountLinks)

  }

  const deleteCard = async (card) => {

    console.log("card grabbed upon delete click:", card)
    const cardId = { id: card.link_id }
    const theLinks = await deleteSingleLink(cardId)
    setLinks(theLinks)
  };





  const handleSort = (event) => {
    // console.log(event.target.value)
    const sortBy = event.target.value
    setSortLinks(sortBy)
  }

  if (sortLinks === "Popularity") {
    console.log("SORT LINKS BY CLICK COUNT", sortLinks)
    // cards.sort((a, b) => a.clickCount - b.clickCount);
    cards.sort((a, b) => (a.clickCount < b.clickCount ? 1 : -1))
    console.log(cards)



  } else if (sortLinks === "Created Date") {
    console.log("SORT LINKS BY CREATED DATE", sortLinks)
    cards.sort((a, b) => (a.link_id - b.link_id))
    console.log("cards after create date sort:", cards)

  } else if (sortLinks === "Name") {
    console.log("SORT LINKS BY NAME", sortLinks)
    cards.sort((a, b) => (a.name > b.name ? 1 : -1))
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <LinkIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Link badger
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Link badger
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              a carefully curated collection of sites from around the world wide web
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={5} justify="center">
                <Grid item>
                  <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="your favorite site" required={true} onChange={handleTheLinkName}/*helperText="name your fave"*/ />
                  </form>
                </Grid>
                <Grid item>
                  <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="the link" required={true} onChange={handleTheUrl} />
                  </form>
                </Grid>
                <Grid item>
                  <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="a description" onChange={handleTheDescription} />
                  </form>
                </Grid>

                <Grid item>
                  <MultipleSelect className={classes.root} allTags={allTags} setSelectedTagNames={setSelectedTagNames} selectedTagNames={selectedTagNames} onChange={handleSelectedTags} />
                </Grid>



                <Grid item>
                  <SimpleDialogDemo className={classes.root} allTags={allTags} newTag={newTag} setNewTag={setNewTag} setAllTags={setAllTags} createNewTag={createNewTag} />
                </Grid>






                <Grid item>
                  <Button variant="contained" color="primary" onClick={buildLinkObject}>
                    Add
                  </Button>
                </Grid>
              </Grid>
            </div>

          </Container>
        </div>
        <Grid>
          <Container className={classes.root} maxWidth="md">
            {/* End hero unit */}
            <FormControl className={classes.formControl} style={{ width: "180px", margin: "20px" }}>
              <InputLabel id="demo-simple-select-helper-label">Sort by</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={sortLinks}
                onChange={handleSort}
              >

                <MenuItem value={"Created Date"}>Created Date</MenuItem>
                <MenuItem value={"Popularity"}>Popularity</MenuItem>
                <MenuItem value={"Name"}>Name</MenuItem>
              </Select>

            </FormControl>


            {/* <SearchCards cards={cards} setAllLinks={setLinks} /><br /> */}
          </Container>
        </Grid>






        <Container className={classes.cardGrid} maxWidth="md">


          <Grid container spacing={4}>









            {cards.map((card) => (

              < Grid item key={card.id} xs={12} sm={6} md={4} >

                <Card className={classes.card}>
                  {/* <CardMedia
                    className={classes.cardMedia}
                    //  image="https://source.unsplash.com/random"

                    title="Image title"
                  /> */}
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      <Link rel="canonical" href={`//${card.url}`} onClick={() => { handleClickCount(card) }} target="_blank">
                        {card.name}
                      </Link>

                    </Typography>

                    <Typography>
                      {card.description}
                    </Typography>

                    <Typography>
                      Tags: {`${card.tags}`}
                    </Typography>


                  </CardContent>
                  <CardActions>
                    <Typography>
                      {card.clickCount} click(s) since {(new Date(card.createDate)).toLocaleDateString('en-US', DATE_OPTIONS)}
                    </Typography>
                    <IconButton aria-label="delete" className={classes.margin} onClick={() => {
                      deleteCard(card);
                    }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </CardActions>
                </Card>


              </Grid>

            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Thanks for checking out the Link badger - have a wonderful day.
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment >
  );
}

// export default App;

