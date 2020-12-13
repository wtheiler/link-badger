import React, { useState, useEffect } from 'react';
import 'fontsource-roboto';
// import Button from '@material-ui/core/Button';

import {
  getSomething
} from '../api';

// const App = () => {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     getSomething()
//       .then(response => {
//         setMessage(response.message);
//       })
//       .catch(error => {
//         setMessage(error.message);
//       });
//   });

//   return (
//     <div className="App">
//       <h1>Hello, World!</h1>
//       <h2>{message}</h2>
//       <Button variant="contained" color="primary">
//         This thing on?
//       </Button>
//     </div>
//   );
// }

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


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
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
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const classes = useStyles();
  const [theLinkName, setTheLinkName] = useState("")
  const [theUrl, setTheUrl] = useState("")
  const [theDescription, setTheDescription] = useState("")
  const [theTags, setTheTags] = useState("")

  const handleTheLinkName = (event) => {
    event.preventDefault()
    const theLink = event.target.value
    // console.log("the link name:", theLink)
    setTheLinkName(theLink)
  }

  const handleTheUrl = (event) => {
    event.preventDefault()
    const newUrl = event.target.value
    // console.log("the Url:", newUrl)
    setTheUrl(newUrl)
  }

  const handleTheDescription = (event) => {
    event.preventDefault()
    const newDescription = event.target.value
    // console.log("the Description:", newDescription)
    setTheDescription(newDescription)
  }

  const handleTheTags = (event) => {
    event.preventDefault()
    const newTags = event.target.value
    // console.log("the Tags:", newTags)
    setTheTags(newTags)
  }


  const buildLinkObject = (event) => {
    event.preventDefault()
    const newLink = {
      name: theLinkName,
      url: theUrl,
      description: theDescription,
      tags: theTags
    }
    console.log("the new link object:", newLink)


    // event.target.reset()
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
                  <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="add tag(s)" onChange={handleTheTags} />
                  </form>
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
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    // image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Link Name
                    </Typography>
                    <Typography>
                      Link Description and/or Comment(s)
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Add Comment
                    </Button>
                    <Button size="small" color="primary">
                      Add Tag
                    </Button>
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
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

// export default App;

