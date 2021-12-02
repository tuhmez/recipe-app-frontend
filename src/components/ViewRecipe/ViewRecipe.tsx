import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormGroup,
  FormControlLabel,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  MobileStepper,
  Typography,
  useTheme
} from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight, MoreVert } from '@material-ui/icons';
import { IngredientUnit, IRecipe, RecipeDifficulty } from '../../common/types';
import { emptyImage } from '../../utilities/imageBase64';
import { useStyles } from './styles';

export interface Props {
  recipe: IRecipe;
  onHandleEditRecipe: (recipe: IRecipe) => void;
  onHandleDeleteRecipe: (recipe: IRecipe) => void;
}

interface ITimes {
  [key: string]: number[];
}

export const ViewRecipe = (props: Props) => {
  // Props deconstruction
  const { recipe, onHandleEditRecipe, onHandleDeleteRecipe } = props;
  // States
  const [activeStep, setActiveStep] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [ingredientCheckboxList, setIngredientCheckboxList] = useState(() => {
    const checkboxObject: { [key: string]: boolean } = {};
    recipe.ingredients.forEach(ingredient => checkboxObject[ingredient.name] = false)
    return checkboxObject;
  });
  // Handlers
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };
  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
    setIsMenuOpen(false);
  }
  const handleNextImage = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBackImage = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNavigateToWebsite = () => {
    window.open(recipe.linkToWebsite);
    handleCloseMenu();
  };
  const handleEditRecipe = () => {
    onHandleEditRecipe(recipe);
  };
  const handleToggleDeleteDialog = () => setIsDeleteDialogOpen(prevState => !prevState);
  const onHandleCloseDeleteDialog = () => {
    handleToggleDeleteDialog();
    handleCloseMenu();
  };
  const handleDeleteRecipe = () => {
    onHandleDeleteRecipe(recipe);
  };
  const handleCheckIngredientItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientCheckboxList(prevState => {
      return {
        ...prevState,
        [event.target.name]: event.target.checked
      };
    });
  };
  // Styles
  const classes = useStyles();
  const theme = useTheme();
  // Constants
  const maxSteps = recipe.images.length !== 0 ? recipe.images.length : 1;
  const textColor = recipe.difficulty === RecipeDifficulty.EASY ? 'green' : recipe.difficulty === RecipeDifficulty.MEDIUM ? 'orange' : 'red';
  const calculateTimeString = () => {
    const times: ITimes = {
      seconds: [],
      minutes: [],
      hours: []
    };
    recipe.steps.forEach(step => {
      const { time, timeUnit } = step;
      times[timeUnit.toLowerCase()].push(time);
    });
    let totalSeconds = times.seconds.length !== 0 ? times.seconds.reduce((p, c) => p + c) : 0;
    let totalMinutes = times.minutes.length !== 0 ? times.minutes.reduce((p, c) => p + c) : 0;
    let totalHours = times.hours.length !== 0 ? times.hours.reduce((p, c) => p + c) : 0;
    let timeString = ``;
    if (totalSeconds > 60) {
      const [additionalMinutes, leftoverSeconds] = (totalSeconds / 60).toString().split('.').map(t => Number(t));
      totalMinutes += additionalMinutes;
      totalSeconds = leftoverSeconds;
    }
    if (totalMinutes > 60) {
      const [additionalHours, leftoverMinutes] = (totalMinutes / 60).toString().split('.').map(t => Number(t));
      totalHours += additionalHours;
      totalMinutes = leftoverMinutes;
    }
    if (totalHours !== 0) timeString = `${totalHours} HR`;
    if (totalMinutes !== 0) timeString = `${totalMinutes} MIN`;
    if (totalSeconds !== 0) timeString = `${totalSeconds} SEC`;
    return timeString === '' ? 'No time!' : timeString;
  };
  const ingredientsList = () => {
    const ingredientLabels = recipe.ingredients.map((ingredient, index) => {
      let ingredientText = '';
      if (ingredient.units === IngredientUnit.NONE) {
        ingredientText = `${ingredientText} ${ingredient.measurement} ${ingredient.name}`;
      } else {
        ingredientText = `${ingredientText} ${ingredient.name} (${ingredient.measurement} ${ingredient.units})`;
      }
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={ingredientCheckboxList[ingredient.name]}
              onChange={handleCheckIngredientItem}
              name={ingredient.name}
              color='primary'
            />
          }
          label={ingredientText}
        />
      );
    });
    return (
      <FormControl component="fieldset">
      <FormGroup>
        {ingredientLabels}
      </FormGroup>
    </FormControl>
    )
  }
  const stepsList = recipe.steps.map(step => {
    const stepText = `${step.stepNumber}. ${step.description}`;
    const stepSupportText = `${step.stepType} - ${step.time} ${step.timeUnit}`;
    
    return (
      <Grid item container direction='column'>
        <Grid item>
          <Typography variant='body1'>{stepText}</Typography>
        </Grid>
        <Grid item style={{ paddingLeft: '30px' }}>
          <Typography variant='body1'>{stepSupportText}</Typography>
        </Grid>
      </Grid>
    )
  });

  return (
    <div>
      <Grid container direction='column' spacing={2}>
        <Grid item container direction='row' alignItems='center' justifyContent='space-between'>
          <Grid item>
            <Typography variant='h3'>{recipe.name}</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleOpenMenu}>
              <MoreVert />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item container direction='row' alignItems='center' justifyContent='flex-start' spacing={1}>
          <Grid item>
            <Typography variant='body1'>{recipe.type} |</Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1' style={{ color: textColor }}>{recipe.difficulty}</Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1'>| {calculateTimeString()}</Typography>
          </Grid>
          {recipe.favorited
          ? (
            <Grid item>
              <Typography variant='body1'>| Favorited</Typography>
            </Grid>
          )
          : undefined
          }
        </Grid>
        <Grid item>
          <div className={classes.root}>
            <img
              className={classes.img}
              src={recipe.images.length !== 0 ? recipe.images[activeStep] : emptyImage}
              alt={`recipe-${activeStep}`}
            />
            <MobileStepper
              steps={maxSteps}
              position='static'
              variant='dots'
              activeStep={activeStep}
              nextButton={
                <Button size='small' onClick={handleNextImage} disabled={activeStep === maxSteps - 1}>
                  Next
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size='small' onClick={handleBackImage} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Back
                </Button>
              }
            />
          </div>
        </Grid>
        <Grid item container direction='column' alignItems='flex-start' justifyContent='center'>
          <Grid item>
            <Typography variant='h5'>Ingredients</Typography>
          </Grid>
          <div style={{ paddingLeft: '20px'}}>
            {ingredientsList()}
          </div>
        </Grid>
        <Grid item>
          <Typography variant='h5'>Steps</Typography>
        </Grid>
        <div style={{ paddingLeft: '20px' }}>
          {stepsList}
        </div>
      </Grid>
      <Menu
        id='view-recipe-menu'
        anchorEl={menuAnchorEl}
        getContentAnchorEl={null}
        keepMounted
        open={isMenuOpen}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        {recipe.linkToWebsite ? <MenuItem onClick={handleNavigateToWebsite}>Go to Website</MenuItem> : undefined}
        <MenuItem onClick={handleEditRecipe}>Edit Recipe</MenuItem>
        <MenuItem onClick={handleToggleDeleteDialog}>Delete Recipe</MenuItem>
      </Menu>
      <Dialog
        open={isDeleteDialogOpen}
        onClose={onHandleCloseDeleteDialog}
      >
        <DialogTitle>Are you sure you want to delete this recipe?</DialogTitle>
        <DialogContent>
          <DialogContentText>Proceeding will permanently delete this recipe and all of its data!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color='default'
            variant='outlined'
            size='large'
            disableElevation
            onClick={onHandleCloseDeleteDialog}
          >
            Cancel
          </Button>
          <Button
            color='secondary'
            variant='outlined'
            size='large'
            disableElevation
            onClick={handleDeleteRecipe}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
