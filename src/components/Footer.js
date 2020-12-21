
import React from 'react'

import Typography from '@material-ui/core/Typography';

export default function Footer({ Copyright, classes }) {

    return (
        <footer className={classes.footer}>
            {/* <Typography variant="h6" align="center" gutterBottom>
        Footer
      </Typography> */}
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Thanks for checking out the Link badger - have a wonderful day.
      </Typography>
            <Copyright />
        </footer>
    )

}