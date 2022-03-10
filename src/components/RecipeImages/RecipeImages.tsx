import { useEffect, useState } from 'react';
import { Grid, IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useStyles } from './styles';

export interface Props {
  data: string[];
  handleRemoveImage: (index: number) => void;
  handleUpdateImagePosition: (index: number) => void;
}

export const RecipeImages = (props: Props) => {
  // Props destructuring
  const { data, handleRemoveImage, handleUpdateImagePosition } = props;
  // States
  const [ imageItems, setImageItems ] = useState<JSX.Element[]>([]);
  const [ isDeleteImageMenuOpen, setIsDeleteImageMenuOpen ] = useState(false);
  const [ menuAnchorEl, setMenuAnchorEl ] = useState<HTMLElement | null>(null);
  const [ imageIndex, setImageIndex ] = useState(-1);
  // Handlers
  const handleDeleteMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
    setIsDeleteImageMenuOpen(true);
  };
  const handleDeleteMenuClose = () => {
    setMenuAnchorEl(null);
    setIsDeleteImageMenuOpen(false);
  };
  const removeImage = () => {
    handleRemoveImage(imageIndex);
    handleDeleteMenuClose();
    setImageIndex(-1);
  };
  const updateImagePosition = () => {
    handleUpdateImagePosition(imageIndex);
    handleDeleteMenuClose();
    setImageIndex(-1);
  }
  // Styles
  const classes = useStyles();
  // Effects
  useEffect(() => {
    const makeImageItems = (image: string, index: number) => {
      const openDeleteMenu = (event: React.MouseEvent<HTMLElement>) => {
        handleDeleteMenuOpen(event);
        setImageIndex(index);
      };
      return (
        <Grid item key={`recipe-pic-${index}`} className={classes.image}>
          <img className={classes.imagePreview} src={image} alt={`recipe-pic-${index}`}/>
          <div className={classes.imageOverlay}>
            <IconButton className={classes.imageButton} size='small' onClick={openDeleteMenu}><MoreVert/></IconButton>
          </div>
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
    <div>
      <Grid
        container
        justifyContent='flex-start'
        alignItems='center'
        spacing={1}
        className={classes.imageContainer}
      >
        {imageItems}
      </Grid>
      <Menu
        id='delete-image-menu'
        key='delete-image-menu'
        anchorEl={menuAnchorEl}
        getContentAnchorEl={null}
        open={isDeleteImageMenuOpen}
        onClose={handleDeleteMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem onClick={updateImagePosition} key='update-image-position-item' id='update-image-position-item'>Make Main Recipe Image</MenuItem>
        <MenuItem onClick={removeImage} key='remove-image-menu-item' id='remove-image-menu-item'>Remove Image</MenuItem>
      </Menu>
    </div>
  )
};
