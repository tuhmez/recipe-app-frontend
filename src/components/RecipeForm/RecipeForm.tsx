import React, { useEffect, useState } from 'react';
import {
  Button,
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
import { RecipeIngredientTable } from './RecipeIngredientTable';
import { RecipeStepTable } from './RecipeStepTable';
import { RecipeKeywordList } from './RecipeKeywordList';

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
  isEdit?: boolean
}

const RecipeForm = (props: Props) => {
  // Props Destructuring
  const { data, isEdit } = props;
  // Styles
  const classes = useStyles();
  // States
  const [name, setName] = useState(data.name);
  const [type, setType] = useState(data.type);
  const [website, setWebsite] = useState(data.linkToWebsite);
  const [ingredientsList, setIngredientsList] = useState(data.ingredients);
  const [stepsList, setStepsList] = useState(data.steps);
  const [difficulty, setDifficulty] = useState(data.difficulty);
  const [keywordsList, setKeywordsList] = useState(data.keywords);
  const [favorited, setFavorited] = useState(data.favorited);
  // Effects

  // Change Events
  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
  const onChangeType = (event: React.ChangeEvent<{ value: unknown }>) => setType(event.target.value as RecipeType);
  const onChangeDifficulty = (event: React.ChangeEvent<{ value: unknown }>) => setDifficulty(event.target.value as RecipeDifficulty);
  const onChangeWebsite = (event: React.ChangeEvent<HTMLInputElement>) => setWebsite(event.target.value);
  const onToggleFavorited = () => setFavorited(prevState => !prevState);
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
  };

  const onRemoveIngredient = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIngredientsList(prevState => {
      const newState = [...prevState];
      const elementId = event.currentTarget.id;
      const index = Number(elementId.split('-')[1]);
      newState.splice(index, 1);
      return newState;
    });
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
  };

  const onRemoveStep = (event: React.MouseEvent<HTMLButtonElement>) => {
    setStepsList(prevState => {
      const newState = [...prevState];
      const elementId = event.currentTarget.id;
      const index = Number(elementId.split('-')[1]);
      newState.splice(index, 1);
      newState.filter(s => s.stepNumber > index + 1).forEach(s => s.stepNumber = s.stepNumber - 1);
      return newState;
    });
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

  return (
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
            disableRipple
          >
            {favorited ? <Favorite /> : <FavoriteBorder />}
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
      <Grid item>
        <input
          accept='image/*'
          className={classes.input}
          id='recipe-images'
          multiple
          type='file'
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
        <Button
          variant='contained'
          color='primary'
          className={classes.recipeSubmitButton}
          disableElevation
          size='large'
        >
          {isEdit ? 'Save' : 'Submit'}
        </Button>
      </Grid>
    </Grid>
  )
};

export default RecipeForm;
