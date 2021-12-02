import React from 'react';
import { Card, CardContent, CardMedia, CardActionArea, Grid, Theme, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { IRecipe } from '../../common/types';
import NoImagePlaceholder from '../../resources/no_image_placeholder.png';
import { useStyles } from './styles';

export interface Props {
  onCardClick: () => void;
  recipe: IRecipe;
  theme: Theme;
};

export const RecipeCard = (props: Props) => {
  // Props deconstruction
  const { onCardClick, recipe, theme } = props;
  // Styles
  const classes = useStyles(theme);
  // Handlers
  const handleCardClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onCardClick();
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
              {recipe.favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
