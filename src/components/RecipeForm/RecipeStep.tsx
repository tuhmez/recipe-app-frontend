import React, { useState } from 'react';
import { Divider, Grid, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { IStep } from "../../common/types";
import { useStyles } from './styles';

export interface Props {
  step: IStep;
  index: number;
  doesStepHaveDivider?: boolean;
  handleRemoveStep: (event: React.MouseEvent<HTMLLIElement>, elementIndex: number) => void;
  onStepDialogToggle: () => void;
  setDialogStepData: (step: IStep) => void;
  setEditStepIndex: (index: number) => void;
  setIsNewStep: (isNewStep: boolean) => void;
}

export const RecipeStep = (props: Props) => {
  // Props deconstruction
  const {
    index,
    step,
    doesStepHaveDivider,
    handleRemoveStep,
    onStepDialogToggle,
    setDialogStepData,
    setEditStepIndex,
    setIsNewStep
  } = props;
  // States
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [isStepAdditionalActionOpen, setIsStepAdditionalActionOpen] = useState(false);
  // Classes
  const classes = useStyles();
  // Handlers
  const handleOpenStepAdditionalActionMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
    setIsStepAdditionalActionOpen(true);
  };
  const handleCloseStepAdditionalActionMenu = () => {
    setMenuAnchorEl(null);
    setIsStepAdditionalActionOpen(false);
  };
  const removeStep = (event: React.MouseEvent<HTMLLIElement>) => {
    handleRemoveStep(event, index);
    handleCloseStepAdditionalActionMenu();
  };
  const editStep = () => {
    setIsNewStep(false);
    setEditStepIndex(index);
    setDialogStepData(step);
    onStepDialogToggle();
    handleCloseStepAdditionalActionMenu();
  };
  // Constants
  const stepText = `${index + 1}. ${step.description}`;
  const stepSupportText = `• ${step.time} ${step.timeUnit}`;

  return (
    <Grid item container direction='column' alignItems='center' spacing={2} key={`step-${index + 1}-entry`}>
      <Grid
        item
        container
        alignItems='center'
        justifyContent='space-between'
        direction='row'
        key={`step-element-${index}`}
        className={classes.element}
      >
        <Grid item container direction='column' key={index} xs>
          <Grid item key={`step-text-${index}`}>
            <div style={{ width: '100%', maxWidth: '310px' }}>
              <Typography variant='body1'>{stepText}</Typography>
            </div>
          </Grid>
          <Grid item style={{ paddingLeft: '30px' }} key={`step-support-text-${index}`}>
            <Typography variant='body1'>{stepSupportText}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={1} key='edit-button-item'>
          <IconButton id={`step-${index}`} onClick={handleOpenStepAdditionalActionMenu} style={{ float: 'right' }}><MoreVert /></IconButton>
          <Menu
            id='step-additional-action-menu'
            key='step-additional-action-menu'
            anchorEl={menuAnchorEl}
            getContentAnchorEl={null}
            open={isStepAdditionalActionOpen}
            onClose={handleCloseStepAdditionalActionMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
          >
            <MenuItem onClick={editStep} key={`step-edit-${index}`}>Edit Step</MenuItem>
            <MenuItem onClick={removeStep} id={`step-${index}`} key={`step-remove-${index}`}>Delete Step</MenuItem>
          </Menu>
        </Grid>
      </Grid>
      {doesStepHaveDivider ? (<Grid item><Divider variant='middle' /></Grid>) : undefined}
    </Grid>
  );
};
