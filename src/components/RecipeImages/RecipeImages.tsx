import { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import {} from '../../utilities/imageBase64';

export interface Props {
  data: string[];
}

export const RecipeImages = (props: Props) => {
  // Props destructuring
  const { data } = props;
  // States
  const [ imageItems, setImageItems ] = useState<JSX.Element[]>([]);
  // Effects
  useEffect(() => {
    const makeImageItems = (image: string, index: number) => {
      return (
        <Grid item>
          <img src={image} alt={`recipe-pic-${index}`}/>
        </Grid>
      )
    };
    setImageItems(data.map((d, i) => makeImageItems(d, i)));
    return () => {
      setImageItems([]);
    }
  }, [data]);

  return (
    <Grid
      container
      justifyContent='flex-start'
      alignItems='center'
      spacing={1}
    >
      {imageItems}
    </Grid>
  )
};
