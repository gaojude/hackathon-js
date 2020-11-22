import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import {Button} from "@material-ui/core";
import pluralize from 'pluralize';
import _ from 'lodash';

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

export const CarouselCard = ({title, imageUrl, missedIngredients, linkUrl, score}) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                title={<h6>{_.startCase(title)}</h6>}
            />
            <CardMedia
                className={classes.media}
                image={imageUrl}
                title=''
            />
            <CardContent>
                <h5>Health Score: {score}</h5>

                {missedIngredients.length > 0 ? (
                    <h5>
                        You need {missedIngredients.length} more {pluralize('kind', missedIngredients.length)} of
                        ingredients.
                    </h5>
                ) : (
                    <h5 style={{
                        color: 'green'
                    }}>
                        You have all the required ingredients.
                    </h5>
                )}
                <p>
                    {missedIngredients.map(({quantity}) => `${quantity}`)}
                </p>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon/>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon/>
                </IconButton>
                <Button variant="contained" color="primary" href={linkUrl} target="_blank">
                    Read More</Button>
            </CardActions>
        </Card>
    );
}
