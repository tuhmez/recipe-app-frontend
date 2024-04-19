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
  useTheme,
} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { Favorite, FavoriteBorder, KeyboardArrowLeft, KeyboardArrowRight, MoreVert } from '@material-ui/icons';
import { IngredientUnit, IRecipe, RecipeDifficulty } from '../../common/types';
import { emptyImage } from '../../common/imagesBase64';
import { useStyles } from './styles';
import { formatMeasurement } from '../../utilities/myMaths';

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
  const [ingredientMultiplier, setIngredientMultiplier] = useState('1');
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
  const handleIngredientMultiplier = (event: any, newValue: string ) => {
    if (newValue === null) return;

    setIngredientMultiplier(newValue);
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
    if (totalMinutes !== 0){
      if (timeString !== '') timeString += ', ';
      timeString += `${totalMinutes} MIN`;
    }
    if (totalSeconds !== 0) {
      if (timeString !== '') timeString += ', ';
      timeString += `${totalSeconds} SEC`;
    }
    return timeString === '' ? 'No time!' : timeString;
  };
  const ingredientsList = () => {
    const ingredientLabels = recipe.ingredients.map((ingredient, index) => {
      let ingredientText = '';
      const ingredientMeasurementWithMultiplier = formatMeasurement(ingredient.measurement * parseInt(ingredientMultiplier));
      if (ingredient.units === IngredientUnit.NONE) {
        ingredientText = `${ingredient.name}`;
        if (ingredient.measurement !== 0) ingredientText = `${ingredientText} (${ingredientMeasurementWithMultiplier})`;
      } else {
        ingredientText = `${ingredient.name} (${ingredientMeasurementWithMultiplier} ${ingredient.units})`;
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
      <FormControl component="fieldset" key='ingredient-form-control'>
        <FormGroup key='ingredient-form-group'>
          {ingredientLabels}
        </FormGroup>
      </FormControl>
    )
  }
  const stepsList = recipe.steps.map((step, index) => {
    const stepText = `${index + 1}. ${step.description}`;
    const stepSupportText = `${step.time} ${step.timeUnit}`;
    
    return (
      <Grid item container direction='column' key={index}>
        <Grid item key={`step-text-${index}`}>
          <Typography variant='body1'>{stepText}</Typography>
        </Grid>
        {step.time !== 0 && (<Grid item style={{ paddingLeft: '30px' }} key={`step-support-text-${index}`}>
          <Typography variant='body1' className={classes.stepText}>• {stepSupportText}</Typography>
        </Grid>)}
      </Grid>
    )
  });

  return (
    <div>
      <Grid container direction='column' spacing={2} alignItems='center'>
        <Grid
          item
          container
          direction='row'
          alignItems='flex-start'
          justifyContent='space-between'
          key='recipe-header-container'
        >
          <Grid item xs key='recipe-name-text'>
            <Typography variant='h3' key='recipe-name-header'>{recipe.name}</Typography>
          </Grid>
          <Grid item xs={1} key='recipe-dotdotdot-menu'>
            <IconButton onClick={handleOpenMenu} key='recipe-menu-button'>
              <MoreVert />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction='row'
          alignItems='center'
          justifyContent='flex-start'
          spacing={1}
          key='recipe-subinformation-section'
        >
          <Grid item key='recipe-type-header'>
            <Typography variant='body1' key='recipe-type-text'>{recipe.type} |</Typography>
          </Grid>
          <Grid item key='recipe-difficulty-header'>
            <Typography variant='body1' style={{ color: textColor }} key='recipe-difficulty-text'>{recipe.difficulty}</Typography>
          </Grid>
          <Grid item key='time-header'>
            <Typography variant='body1' key='recipe-time-text'>| {calculateTimeString()} |</Typography>
          </Grid>
          <Grid item key='favorited-header'>
            {recipe.favorited ? <Favorite className={classes.favoriteIcon} /> : <FavoriteBorder /> }
          </Grid>
        </Grid>
        <Grid item container direction='column' justifyContent='center' alignItems='center' key='image-section'>
          <Grid item>
            <img
              className={classes.img}
              src={recipe.images.length !== 0 ? recipe.images[activeStep] : emptyImage}
              alt={`recipe-${activeStep}`}
              key='recipe-image'
            />
          </Grid>
          <Grid item>
            <MobileStepper
              key='image-stepper'
              steps={maxSteps}
              position='static'
              variant='dots'
              className={classes.stepper}
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
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction='column'
          alignItems='flex-start'
          justifyContent='center'
          key='variable-section'
        >
          <Grid item container direction='row' key='ingredient-header' justifyContent='space-between'>
            <Grid item key='ingredient-list'>
              <Typography variant='h5' key='title'>Ingredients</Typography>
            </Grid>
            <Grid item key='recipe-scale'>
              <ToggleButtonGroup
                value={ingredientMultiplier}
                exclusive
                onChange={handleIngredientMultiplier}
              >
                <ToggleButton value='1'>1x</ToggleButton>
                <ToggleButton value='2'>2x</ToggleButton>
                <ToggleButton value='3'>3x</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
          <div style={{ paddingLeft: '10px'}} key='ingredient-list-container'>
            {ingredientsList()}
          </div>
          <Grid item key='step-list'>
            <Typography variant='h5' key='step-header'>Steps</Typography>
          </Grid>
          <div style={{ paddingLeft: '10px' }} key='steps-list-container'>
            {stepsList}
          </div>
        </Grid>
      </Grid>
      <Menu
        id='view-recipe-menu'
        key='view-recipe-menu'
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
        {recipe.linkToWebsite ? <MenuItem onClick={handleNavigateToWebsite} key='website-item'>Go to Website</MenuItem> : undefined}
        <MenuItem onClick={handleEditRecipe} key='edit-recipe-item'>Edit Recipe</MenuItem>
        <MenuItem onClick={handleToggleDeleteDialog} key='delete-recipe-item'>Delete Recipe</MenuItem>
      </Menu>
      <Dialog
        open={isDeleteDialogOpen}
        onClose={onHandleCloseDeleteDialog}
      >
        <DialogTitle key='dialog-title'>Are you sure you want to delete this recipe?</DialogTitle>
        <DialogContent key='dialog-content'>
          <DialogContentText key='dialog-content-text'>Proceeding will permanently delete this recipe and all of its data!</DialogContentText>
        </DialogContent>
        <DialogActions key='dialog-actions'>
          <Button
            color='default'
            variant='outlined'
            size='large'
            disableElevation
            onClick={onHandleCloseDeleteDialog}
            key='dialog-cancel-button'
          >
            Cancel
          </Button>
          <Button
            color='secondary'
            variant='contained'
            size='large'
            disableElevation
            onClick={handleDeleteRecipe}
            key='dialog-confirm-button'
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
