import React, { useEffect, useState } from 'react';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useStyles } from './styles';

export interface Props {
  data: string[];
  onAddKeyword: (newKeyword: string) => void;
  onEditKeyword: (index: number, newKeyword: string) => void;
  onRemoveKeyword: (keyword: string) => void;
}

export const RecipeKeywordList = (props: Props) => {
  // Deconstruct props
  const { data, onAddKeyword, onEditKeyword, onRemoveKeyword} = props;
  // States
  const [ keywordItems, setKeywordItems ] = useState<JSX.Element[]>([]);
  const [ currentKeyword, setCurrentKeyword ] = useState<{word: string, index: number | undefined}>({ word: '', index: undefined });
  const [ isKeywordPanelOpen, setIsKeywordPanelOpen ] = useState(false);
  const [ isEdit, setIsEdit ] = useState(false);
  // Styles
  const classes = useStyles();
  // Effects
  useEffect(() => {
    const makeKeywordElement = (keyword: string, index: number) => {
      const removeKeyword = () => {
        onRemoveKeyword(keyword);
      };
      const clickKeyword = () => {
        onClickKeyword(keyword, index);
      }
      return (
        <Grid item>
          <Chip label={keyword} onDelete={removeKeyword} onClick={clickKeyword}/>
        </Grid>
      );
    }
    setKeywordItems(data.map((d, i) => makeKeywordElement(d, i)));
    return () => {
      setKeywordItems([]);
    }
  }, [
    data,
    onRemoveKeyword,
  ]);
  // Local component controls
  const onClosePanel = () => {
    setIsKeywordPanelOpen(prevState => !prevState);
  };
  const onSaveKeyword = () => {
    isEdit
    ? onEditKeyword(currentKeyword.index as number, currentKeyword.word)
    : onAddKeyword(currentKeyword.word);
    setCurrentKeyword({ word: '', index: undefined });
    onClosePanel();
  };
  const addKeyword = () => {
    setIsKeywordPanelOpen(true);
    setIsEdit(false);
    setCurrentKeyword({ word: '', index: undefined });
  };
  const onClickKeyword = (keyword: string, index: number) => {
    setIsKeywordPanelOpen(true);
    setIsEdit(true);
    setCurrentKeyword({ word: keyword, index });
  };
  const onCurrentKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentKeyword(prevState => {
      return {...prevState, word: event.target.value}
    });
  };

  return (
    <div>
      <Typography variant='h5' gutterBottom>Keywords</Typography>
      <Paper variant='outlined' className={classes.chipPaper}>
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'
        >
          <Grid
            item
            container
            direction='row'
            spacing={1}
            justifyContent='flex-start'
            className={classes.chipSubGrid}
          >
            {keywordItems}
          </Grid>
          <Grid item>
            <Chip
              label='Add'
              icon={<Add />}
              onClick={addKeyword}
              color='primary'
            />
          </Grid>
        </Grid>
      </Paper>
      <Dialog open={isKeywordPanelOpen} onClose={onClosePanel}>
        <DialogTitle id='edit-keyword-list-title'>{isEdit ? `Edit Keyword` : `Add Keyword`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isEdit
            ? 'Edit the keyword below!'
            : 'Enter a new keyword below!'}
          </DialogContentText>
          <TextField
            value={currentKeyword.word}
            onChange={onCurrentKeywordChange}
            label='Keyword'
            id='keyword-input'
            autoFocus
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='default' onClick={onClosePanel}>
            Cancel
          </Button>
          <Button variant='contained' disableElevation color='primary' onClick={onSaveKeyword}>
            {isEdit ? 'Save' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
