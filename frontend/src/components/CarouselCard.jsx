import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Button} from "@material-ui/core";
import pluralize from 'pluralize';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        margin: 16,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));

export const CarouselCard = ({title, imageUrl, missedIngredients, linkUrl}) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                title={title}
            />
            <CardMedia
                className={classes.media}
                image={imageUrl}
                title=''
            />
            <CardContent>
                <h5>
                    You need {missedIngredients.length} more {pluralize('kind', missedIngredients.length)} of ingredients.
                </h5>
                <p>
                    {missedIngredients.map(({quantity}) => `${quantity}` )}
                </p>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <Button variant="contained" color="primary" href={linkUrl}>
                    Read More</Button>
            </CardActions>
        </Card>
    );
}
