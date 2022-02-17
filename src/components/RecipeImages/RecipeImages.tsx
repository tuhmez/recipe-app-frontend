import { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useStyles } from './styles';

export interface Props {
  data: string[];
}

export const RecipeImages = (props: Props) => {
  // Props destructuring
  const { data } = props;
  // States
  const [ imageItems, setImageItems ] = useState<JSX.Element[]>([]);
  // Styles
  const classes = useStyles();
  // Effects
  useEffect(() => {
    const makeImageItems = (image: string, index: number) => {
      
      return (
        <Grid item key={`recipe-pic-${index}`}>
          <img className={classes.imagePreview} src={image} alt={`recipe-pic-${index}`}/>
        </Grid>
      )
    };
    setImageItems(data.map((d, i) => makeImageItems(d, i)));
    return () => {
      setImageItems([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Grid
      container
      justifyContent='flex-start'
      alignItems='center'
      spacing={1}
      className={classes.imageContainer}
    >
      {imageItems}
    </Grid>
  )
};
