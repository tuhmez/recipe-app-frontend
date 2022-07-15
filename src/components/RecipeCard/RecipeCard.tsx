import React from 'react';
import { Card, CardContent, CardMedia, CardActionArea, Theme, Typography } from '@material-ui/core';
import { IRecipe } from '../../common/types';
import NoImagePlaceholder from '../../resources/no_image_placeholder.png';
import { useStyles } from './styles';
import { Favorite } from '@material-ui/icons';

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
      <CardActionArea onClick={handleCardClick}>
        <div style={{ position: 'relative'}}>
          <CardMedia
            className={classes.media}
            image={mainPicture}
            title={recipe.name}
            component='img'
          />
          {recipe.favorited && (
            <>
              <span id="favorite-span" className={classes.favoriteBanner}></span>
              <Favorite fontSize='small' className={classes.favoriteIcon} />
            </>
          )}
        </div>
        <CardContent>
          <Typography variant='h6' component='h2' style={{ fontSize: '1rem' }}>
            {recipe.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
