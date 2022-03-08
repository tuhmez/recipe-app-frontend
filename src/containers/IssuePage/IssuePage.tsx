import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';
import { Add, Visibility } from '@material-ui/icons';
import { SocketClient } from '../../socket';
import { IIssue } from '../../common/types';
import { ADD_ISSUE_REQUEST, DELETE_ISSUE_REQUEST } from '../../redux/reducer';
import { selectIssues } from '../../redux/selectors';
import { useStyles } from './styles';
import { IAddIssueRequest, IDeleteIssueRequest } from '../../socket/interfaces';

export interface Props {
  socket: SocketClient;
}

const defaultIssueState: IIssue = {
  issueId: '',
  name: '',
  description: ''
}

export const IssuePage = (props: Props) => {
  // Props deconstruction
  const { socket } = props;
  // States
  const [ isIssueDialogOpen, setIsIssueDialogOpen ] = useState(false);
  const [ isDialogReadOnly, setIsDialogReadOnly ] = useState(false);
  const [ issueName, setIssueName ] = useState(defaultIssueState.name);
  const [ issueDescription, setIssueDescription ] = useState(defaultIssueState.description);
  const [ issueId, setIssueId ] = useState(defaultIssueState.issueId);
  const [ issueElements, setIssueElements ] = useState<JSX.Element[]>([]);
  // Dispatch
  const dispatch = useDispatch();
  // Selectors
  const issues = useSelector(selectIssues);
  // Styles
  const classes = useStyles();
  // Handlers
  const onToggleIssueDialogOpen = () => setIsIssueDialogOpen(prevState => !prevState);
  const onIssueNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setIssueName(event.target.value); 
  const onIssueDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => setIssueDescription(event.target.value);
  const onDialogClose = () => {
    onToggleIssueDialogOpen();
    setIssueName(defaultIssueState.name);
    setIssueDescription(defaultIssueState.description);
    setIssueId(defaultIssueState.issueId);
    setIsDialogReadOnly(false);
  };
  const onSubmit = () => {
    dispatch({ type: ADD_ISSUE_REQUEST });
    const issue: IAddIssueRequest = {
      issueId: '',
      name: issueName,
      description: issueDescription
    };
    socket.addIssue(issue);
  };
  const onResolve = () => {
    dispatch({ type: DELETE_ISSUE_REQUEST });
    const issueToDelete: IDeleteIssueRequest = {
      issueId
    }
    socket.deleteIssue(issueToDelete);
  }
  // Components
  useEffect(() => {
    setIssueElements(() => {
      return issues.map((issue, index) => {
        const onOpenIssue = () => {
          setIssueName(issue.name);
          setIssueDescription(issue.description);
          setIssueId(issue.issueId);
          setIsDialogReadOnly(true);
          onToggleIssueDialogOpen();
        };
        return (
          <Grid item container direction='column' spacing={1}>
            <Grid
              item
              container
              justifyContent='space-between'
              alignItems='center'
              key={`issue-${issue.issueId}`}
            >
              <Grid item xs className={classes.issueName}><Typography variant='h6' key={`issue-${issue.issueId}-name`} noWrap>{issue.name}</Typography></Grid>
              <Grid item xs={1}><IconButton onClick={onOpenIssue}><Visibility/></IconButton></Grid>
            </Grid>
            {index === issues.length - 1 ? undefined : <Grid item><Divider variant='middle'/></Grid>}
          </Grid>
        )
      });
    })
  }, [issues, classes]);

  const submitButton = (
    <Button
      variant='contained'
      color='primary'
      disableElevation
      disabled={issueName === '' || issueDescription === ''}
      onClick={onSubmit}
    >
      Submit
    </Button>
  );

  const resolveButton = (
    <Button
      variant='contained'
      color='primary'
      disableElevation
      onClick={onResolve}
    >
      Resolve
    </Button>
  );

  const noIssuesComponent = (
    <div className={classes.noIssuesTextContainer}>
      <Typography variant='subtitle1' className={classes.noIssuesText}>No issues found!</Typography>
    </div>
  );

  return (
    <div>
      <Grid
        container
        direction='column'
        spacing={2}
        alignItems='flex-start'
        justifyContent='center'
        key='issue-page-grid-container'
      >
        <Grid
          item
          container
          direction='row'
          justifyContent='space-between'
          key='issue-page-header-container'
        >
          <Grid item key='issue-page-header'>
            <Typography variant='h4'>Issues</Typography>
          </Grid>
          <Grid item key='issue-page-create-issue'>
            <Button
              variant='outlined'
              color='primary'
              startIcon={<Add/>}
              onClick={onToggleIssueDialogOpen}
            >
              Create Issue
            </Button>
          </Grid>
        </Grid>
        <Grid item style={{ width: '100%' }} key='issue-page-header-divider'><Divider /></Grid>
        <Grid
          item
          container
          direction='column'
          spacing={1}
          alignItems='flex-start'
          justifyContent='center'
          key='issue-elements'
          className={classes.itemContainer}
        >
          {issueElements}
        </Grid>
      </Grid>
      <Dialog open={isIssueDialogOpen} onClose={onToggleIssueDialogOpen}>
        <DialogTitle className={classes.dialogTitle}>{isDialogReadOnly ? 'Existing Issue' : 'Create a new Issue'}</DialogTitle>
        <DialogContent>
          <Grid container direction='column' spacing={1}>
            {isDialogReadOnly ? undefined: 
            (<Grid item>
              <DialogContentText>Enter in your issue below! Please be as descriptive as possible.</DialogContentText>
            </Grid>)
            }
            <Grid item>
              <TextField
                label='Name'
                variant='filled'
                value={issueName}
                onChange={onIssueNameChange}
                fullWidth
                InputProps={{
                  readOnly: isDialogReadOnly
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label='Description'
                variant='filled'
                value={issueDescription}
                onChange={onIssueDescriptionChange}
                fullWidth
                multiline
                minRows={5}
                maxRows={5}
                InputProps={{
                  readOnly: isDialogReadOnly
                }}
              />  
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            color='default'
            onClick={onDialogClose}
          >
            {isDialogReadOnly ? 'Close' : 'Cancel'}
          </Button>
          {isDialogReadOnly ? resolveButton : submitButton}
        </DialogActions>
      </Dialog>
      {issueElements.length === 0 ? noIssuesComponent : undefined}
    </div>
  );
};
