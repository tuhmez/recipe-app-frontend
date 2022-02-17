import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import { CloudUpload, Favorite, FavoriteBorder } from '@material-ui/icons';
import { useStyles } from './styles';
import { IngredientUnit, IRecipe, RecipeDifficulty, RecipeType, StepType, TimeUnit } from '../../common/types';
import { readFileDataUrlAsync } from '../../utilities/readFileAsync';
import { RecipeIngredientTable } from './RecipeIngredientTable';
import { RecipeStepTable } from './RecipeStepTable';
import { RecipeKeywordList } from './RecipeKeywordList';
import { RecipeImages } from '../RecipeImages';
import { useSnackbar } from 'notistack';

const recipeTypeItems = () => {
  const returnItems: JSX.Element[] = [];
  Object.keys(RecipeType).forEach(type => {
    returnItems.push((
      <option key={`recipe-type-${type}`} value={type}>{type}</option>
    ));
  });
  return returnItems;
};

const recipeDifficultyItems = () => {
  const returnItems: JSX.Element[] = [];
  Object.keys(RecipeDifficulty).forEach(difficulty => {
    returnItems.push((
      <option key={`recipe-difficulty-${difficulty}`} value={difficulty}>{difficulty}</option>
    ));
  });
  return returnItems;
};

export interface Props {
  data: IRecipe;
  isEdit?: boolean;
  onCancelFormAction: () => void;
  onSubmitFormAction: (recipe: IRecipe) => void;
}

interface IErrorObject {
  [key: string]: string
}

export const RecipeForm = (props: Props) => {
  // Props Destructuring
  const { data, isEdit, onCancelFormAction, onSubmitFormAction } = props;
  // Styles
  const classes = useStyles();
  // States
  const [ name, setName ] = useState(data.name);
  const [ type, setType ] = useState(data.type);
  const [ website, setWebsite ] = useState(data.linkToWebsite);
  const [ ingredientsList, setIngredientsList ] = useState(data.ingredients);
  const [ stepsList, setStepsList ] = useState(data.steps);
  const [ difficulty, setDifficulty ] = useState(data.difficulty);
  const [ keywordsList, setKeywordsList ] = useState(data.keywords);
  const [ favorited, setFavorited ] = useState(data.favorited);
  const [ images, setImages ] = useState(data.images);
  const [ formErrors, setFormErrors ] = useState<IErrorObject>({});
  const [ isCancelDialogOpen, setIsCancelDialogOpen ] = useState(false);
  // Other Hooks
  const { enqueueSnackbar } = useSnackbar();
  // Change Events
  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
  const onChangeType = (event: React.ChangeEvent<{ value: unknown }>) => setType(event.target.value as RecipeType);
  const onChangeDifficulty = (event: React.ChangeEvent<{ value: unknown }>) => setDifficulty(event.target.value as RecipeDifficulty);
  const onChangeWebsite = (event: React.ChangeEvent<HTMLInputElement>) => setWebsite(event.target.value);
  const onToggleFavorited = () => setFavorited(prevState => !prevState);
  const onToggleCancelDialog = () => {
    setIsCancelDialogOpen(prevState => !prevState);
  };
  const onClickSubmitForm = () => {
    const recipe = compileRecipe();
    const isValidSubmission = validate(recipe, false);
    if (isValidSubmission) onSubmitFormAction(recipe);
  }
  // -- Ingredient Control -- //
  const onIngredientItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setIngredientsList(prevState => {
      const newState = [...prevState];
      const elementId = event.target.id;
      const property = elementId.split('-')[0];
      const index = Number(elementId.split('-')[1]);
      const newItem = event.target.value;
      if (property === 'name') {
        newState[index].name = newItem;
      } else {
        newState[index].measurement = newItem as any;
      }
      return newState;
    });
  };

  const onIngredientUnitChange = (event: React.ChangeEvent<{name?: string | undefined; value: unknown; }>) => {
    setIngredientsList(prevState => {
      const newState = [...prevState];
      const elementId = event.target.name!;
      const newItem = event.target.value as string;
      const index = Number(elementId.split('-')[1]);
      newState[index].units = newItem as IngredientUnit;
      return newState;
    });
  };

  const onAddIngredient = () => {
    setIngredientsList(prevState => {
      const newState = [...prevState];
      newState.push({name: '', measurement: 0, units: IngredientUnit.NONE});
      return newState;
    });
    setFormErrors(prevState => {
      if (prevState['ingredients']) delete prevState['ingredients'];
      return prevState;
    });
  };

  const onRemoveIngredient = (event: React.MouseEvent<HTMLButtonElement>) => {
    let areIngredientsEmtpy = false;
    setIngredientsList(prevState => {
      const newState = [...prevState];
      const elementId = event.currentTarget.id;
      const index = Number(elementId.split('-')[1]);
      newState.splice(index, 1);
      if (newState.length === 0) areIngredientsEmtpy = true;
      return newState;
    });
    if (areIngredientsEmtpy) {
      setFormErrors(prevState => {
        return {
          ...prevState,
          'ingredients': 'Recipe must have at least one ingredient!'
        };
      });
    }
  };
  // -- Ingredient Control -- //
  // -- Step Control -- //
  const onStepItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setStepsList(prevState => {
      const newState = [...prevState];
      const elementId = event.target.id;
      const property = elementId.split('-')[0];
      const index = Number(elementId.split('-')[1]);
      const newItem = event.target.value;
      if (property === 'number') {
        newState[index].stepNumber = newItem as any;
      } else if (property === 'time') {
        newState[index].time = newItem as any;
      } else {
        newState[index].description = newItem;
      }
      return newState;
    });
  };

  const onAddStep = () => {
    setStepsList(prevState => {
      const newState = [...prevState];
      newState.push({
        stepNumber: newState.length + 1,
        description: '',
        time: 0,
        timeUnit: TimeUnit.MINUTES,
        stepType: StepType.NONE
    });
      return newState;
    });
    setFormErrors(prevState => {
      if (prevState['steps']) delete prevState['steps'];
      return prevState;
    });
  };

  const onRemoveStep = (event: React.MouseEvent<HTMLButtonElement>) => {
    let areStepsEmpty = false;
    setStepsList(prevState => {
      const newState = [...prevState];
      const elementId = event.currentTarget.id;
      const index = Number(elementId.split('-')[1]);
      newState.splice(index, 1);
      newState.filter(s => s.stepNumber > index + 1).forEach(s => s.stepNumber = s.stepNumber - 1);
      if (newState.length === 0) areStepsEmpty = true;
      return newState;
    });
    if (areStepsEmpty) {
      setFormErrors(prevState => {
        return {
          ...prevState,
          'steps': 'Recipe must have at least one step!'
        };
      });
    }
  };

  const onStepTimeUnitChange = (event: React.ChangeEvent<{name?: string | undefined; value: unknown; }>) => {
    setStepsList(prevState => {
      const newState = [...prevState];
      const elementId = event.target.name!;
      const newItem = event.target.value as string;
      const index = Number(elementId.split('-')[1]);
      newState[index].timeUnit = newItem as TimeUnit;
      return newState;
    });
  };

  const onStepTypeChange = (event: React.ChangeEvent<{name?: string | undefined; value: unknown; }>) => {
    setStepsList(prevState => {
      const newState = [...prevState];
      const elementId = event.target.name!;
      const newItem = event.target.value as string;
      const index = Number(elementId.split('-')[1]);
      newState[index].stepType = newItem as StepType;
      return newState;
    });
  };
  // -- Step Control -- //
  // -- Keyword Control -- //
  const onAddKeyword = (newKeyword: string) => {
    setKeywordsList(prevState => {
      const newState = [...prevState];
      newState.push(newKeyword);
      return newState;
    });
  };
  const onEditKeyword = (index: number, newKeyword: string) => {
    setKeywordsList(prevState => {
      const newState = [...prevState];
      newState[index] = newKeyword;
      return newState;
    });
  };
  const onRemoveKeyword = (keyword: string) => {
    setKeywordsList(prevState => prevState.filter(k => k !== keyword))
  };
  // -- Keyword Control -- //
  // Data validator
  const compileRecipe = (): IRecipe => {
    return {
      recipeId: isEdit ? data.recipeId : '',
      name,
      type,
      linkToWebsite: website,
      ingredients: ingredientsList,
      steps: stepsList,
      difficulty,
      keywords: keywordsList,
      favorited,
      images
    };
  };
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    validate(compileRecipe(), true);
  };
  const validate = (recipe: IRecipe, isOnBlur: boolean): boolean => {
    let isValidForm = true;
    const errorObject: any = {};
    for (const key of Object.keys(recipe)) {
      // @ts-ignore
      const value = recipe[key];
      let errorReason = '';
      if (key === 'name') {
        isValidForm = (value as string) !== '';
        if (!isValidForm) {
          errorReason = 'Recipe must have a name!';
        }
      } else if (!isOnBlur && (key === 'steps' || key === 'ingredients')) {
        isValidForm = (value as any[]).length !== 0;
        if (!isValidForm) {
          const keySingularForm = key.substring(0, key.length - 1);
          errorReason = `Recipe must have at least one ${keySingularForm}!`;
        }
      }
      if (!isValidForm) {
        errorObject[key] = errorReason;
      }
    }
    setFormErrors(errorObject);
    return isValidForm;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        readFileDataUrlAsync(files[i])
          .then((base64Image: string) => {
            setImages(prevState => [...prevState, base64Image]);
          })
          .catch((error: any) => {
            // catch the error
            enqueueSnackbar(error, { variant: 'error' });
          });
      }
    } else {
      // handle null file upload
      enqueueSnackbar('Failed to upload image!', { variant: 'error' });
    }

  }

  return (
    <div>
      <Grid container spacing={2} direction='column'>
        <Grid
          item
          container
          justifyContent='space-between'
          alignItems='center'
        >
          <Grid item>
            <Typography variant='h4'>
              {isEdit ? 'Edit Recipe' : 'New Recipe'}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={onToggleFavorited}
              // disableRipple
            >
              {favorited ? <Favorite className={classes.favoriteIcon}/> : <FavoriteBorder />}
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <TextField
            id='recipe-name'
            required
            label='Name'
            variant='filled'
            fullWidth
            value={name}
            onChange={onChangeName}
            onBlur={handleBlur}
            error={!!formErrors['name'] || false}
            helperText={formErrors['name'] || undefined}
          />
        </Grid>
        <Grid item>
          <FormControl variant='filled' className={classes.formControl}>
            <InputLabel id='recipe-type-label'>Recipe Type</InputLabel>
            <Select
              native
              labelId='recipe-type-label'
              id='recipe-type'
              value={type}
              onChange={onChangeType}
            >
              {recipeTypeItems()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl variant='filled' className={classes.formControl}>
            <InputLabel id='recipe-difficulty-label'>Recipe Difficulty</InputLabel>
            <Select
              native
              labelId='recipe-difficulty-label'
              id='recipe-difficulty'
              value={difficulty}
              onChange={onChangeDifficulty}
            >
              {recipeDifficultyItems()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <RecipeIngredientTable
            data={ingredientsList}
            onAddIngredient={onAddIngredient}
            onRemoveIngredient={onRemoveIngredient}
            onIngredientItemChange={onIngredientItemChange}
            onIngredientUnitChange={onIngredientUnitChange}
            error={formErrors['ingredients']}
          />
        </Grid>
        <Grid item>
          <RecipeStepTable
            data={stepsList}
            onStepItemChange={onStepItemChange}
            onAddStep={onAddStep}
            onRemoveStep={onRemoveStep}
            onStepTimeUnitChange={onStepTimeUnitChange}
            onStepTypeChange={onStepTypeChange}
            error={formErrors['steps']}
          />
        </Grid>
        <Grid item>
          <TextField
            id='recipe-website-link'
            label='Website'
            variant='filled'
            fullWidth
            multiline
            value={website}
            onChange={onChangeWebsite}
          />
        </Grid>
        <Grid item>
          <RecipeKeywordList
            data={keywordsList}
            onAddKeyword={onAddKeyword}
            onEditKeyword={onEditKeyword}
            onRemoveKeyword={onRemoveKeyword}
          />
        </Grid>
        <Grid item container direction='row' spacing={1} justifyContent='flex-start'>
          <Grid item>
            <input
              accept='image/*'
              className={classes.input}
              id='recipe-images'
              multiple
              type='file'
              onChange={handleImageUpload}
            />
            <label htmlFor='recipe-images'>
              <Button
                variant='outlined'
                startIcon={<CloudUpload />}
                component='span'
                color='primary'
              >
                Upload Images
              </Button>
            </label>
          </Grid>
          <Grid item>
            <RecipeImages data={images} />
          </Grid>
        </Grid>
        <Grid item container spacing={2} justifyContent='flex-end'>
          <Grid item>
            <Button
              variant='outlined'
              color='default'
              size='large'
              onClick={onToggleCancelDialog}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              disableElevation
              size='large'
              onClick={onClickSubmitForm}
            >
              {isEdit ? 'Save' : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={isCancelDialogOpen} onClose={onToggleCancelDialog}>
        <DialogTitle id='recipe-form-cancel-dialog-title'>Are you sure you want to cancel?</DialogTitle>
        <DialogContent>
          <DialogContentText>Unsaved changes will be discarded!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            color='default'
            size='large'
            onClick={onToggleCancelDialog}
          >
            No
          </Button>
          <Button
            variant='contained'
            color='secondary'
            size='large'
            disableElevation
            onClick={onCancelFormAction}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};
