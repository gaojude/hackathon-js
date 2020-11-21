import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import pluralize from 'pluralize';

const useStyles = makeStyles({
    root: {
        width: '100%'
    },
    media: {
        height: 140,
    },
});

const TextWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

export const IngredientCard = ({imageUrl, name, count, unit}) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={imageUrl}
                    title={name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" display='inline'>
                        {count} {unit ? unit : ''}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2" display='inline'>
                        {pluralize(name, count)}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
