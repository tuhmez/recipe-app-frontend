import React, { useState } from 'react';
import { Card, CardContent, CardMedia, CardActionArea, Grid, IconButton, Theme, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { IRecipe } from '../../common/types';
import NoImagePlaceholder from '../../resources/no_image_placeholder.png';
import { useStyles } from './styles';

export interface Props {
  onCardClick: () => void;
  onFavoriteToggle: (recipe: IRecipe) => void;
  recipe: IRecipe;
  theme: Theme;
};

export const RecipeCard = (props: Props) => {
  // Props deconstruction
  const { onCardClick, onFavoriteToggle, recipe, theme } = props;
  // States
  const [ isRecipeFavorited, setIsRecipeFavorited ] = useState(recipe.favorited);
  // Styles
  const classes = useStyles(theme);
  // Handlers
  const handleCardClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onCardClick();
  };
  const handleFavoriteToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const newToggleBool = !isRecipeFavorited;
    recipe.favorited = newToggleBool;
    onFavoriteToggle(recipe);
    setIsRecipeFavorited(newToggleBool);
  };

  const mainPicture = (recipe.images.length > 0 ? recipe.images[0] : NoImagePlaceholder) as string;

  return (
    <Card variant='outlined' className={classes.card}>
      <CardActionArea
        onClick={handleCardClick}
      >
        <CardMedia
          className={classes.media}
          image={mainPicture}
          title={recipe.name}
          component='img'
        />
        <CardContent>
          <Grid
            container
            direction='row'
            justify='space-between'
            alignItems='center'
          >
            <Grid item>
              <Typography variant='h6' component='h2'>
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
  );
};
