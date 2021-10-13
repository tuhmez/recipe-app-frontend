import React, { useState } from 'react';
import { Card, CardContent, CardMedia, CardActionArea, Grid, IconButton, Theme, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useStyles } from './styles';
import { IRecipe } from '../../common/types';

interface Props {
  onCardClick: () => void;
  onFavoriteToggle: (recipe: IRecipe) => void;
  recipe: IRecipe;
  theme: Theme;
};

const RecipeCard = (props: Props) => {
  const { onCardClick, onFavoriteToggle, recipe, theme } = props;

  const classes = useStyles(theme);

  const handleCardClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onCardClick();
  }

  const [ isRecipeFavorited, setIsRecipeFavorited ] = useState(recipe.favorited);
  const handleFavoriteToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const newToggleBool = !isRecipeFavorited;
    recipe.favorited = newToggleBool;
    onFavoriteToggle(recipe);
    setIsRecipeFavorited(newToggleBool);
  }

  const mainPicture = recipe.images[0] as string; 
  return (
    <Card variant='outlined'>
      <CardActionArea
        onClick={handleCardClick}
      >
        <CardMedia
          className={classes.media}
          image={mainPicture}
          title={recipe.name}
        />
        <CardContent>
          <Grid
            container
            direction='row'
            justify='space-between'
            alignItems='center'
          >
            <Grid item>
              <Typography variant='h5' component='h2'>
                {recipe.name}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                className={classes.favoriteButton}
                onClick={handleFavoriteToggle}
                disableRipple
                disableTouchRipple
              >
                {isRecipeFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  )
};

export default RecipeCard;
