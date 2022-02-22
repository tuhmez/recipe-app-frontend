import { Divider, Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import { GitHub, LinkedIn, Twitter } from '@material-ui/icons';
import { useStyles } from './styles';

interface ITechnologyUsed {
  [key: string]: {
    title: string;
    image: string;
  }
}

interface ISocialMedia {
  [key: string]: {
    title: string;
    link: string;
    image: JSX.Element;
  }
}

const technologiesUsed: ITechnologyUsed = {
  react: {
    title: 'React',
    image: '/react.svg',
  },
  redux: {
    title: 'Redux',
    image: '/redux.svg'
  },
  materialUI: {
    title: 'Material UI',
    image: '/material-ui.svg'
  },
  mongodb: {
    title: 'MongoDB',
    image: '/mongodb.svg'
  },
  docker: {
    title: 'Docker',
    image: '/docker.png'
  }
};

const socialMediaLinks: ISocialMedia = {
  github: {
    title: 'GitHub',
    image: <GitHub />,
    link: 'https://github.com/tuhmez',
  },
  linkedin: {
    title: 'LinkedIn',
    image: <LinkedIn />,
    link: 'https://www.linkedin.com/in/chris-tamez/'
  },
  twitter: {
    title: 'Twitter',
    image: <Twitter />,
    link: 'https://twitter.com/tuhmez'
  }
};

export const AboutPage = () => {
  // Styles
  const classes = useStyles();

  const technology = Object.keys(technologiesUsed).map(i => {
    const { image, title } = technologiesUsed[i];
    return (
      <Grid item key={`${title}-logo`} xs>
        <img src={image} alt={title} className={classes.companyImages}/>
      </Grid>
    )
  });

  const socialMedia = Object.keys(socialMediaLinks).map(i => {
    const { image, link, title } = socialMediaLinks[i];
    const onButtonClick = () => {
      window.open(link, '_blank');
    };

    return (
      <Grid item key={`${title}-link`}>
        <Tooltip title={`${title}: Chris Tamez`}>
          <IconButton onClick={onButtonClick}>
            {image}
          </IconButton>
        </Tooltip>
      </Grid>
    )
  });

  return (
    <Grid container direction='column' justifyContent='center' alignItems='center' spacing={1}>
      <Grid item>
        <Typography variant='h4'>Motivation</Typography>
      </Grid>
      <Grid item>
        <Typography variant='body1'>This web application intends to make saving recipes online quick and efficient. Just recipes, directions, and ingredients. No life stories here.</Typography>
      </Grid>
      <Grid item>
        <Divider variant='middle' className={classes.divider} />
      </Grid>
      <Grid
        item
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        <Grid item>
          <Typography variant='h4' gutterBottom>Technologies</Typography>
        </Grid>
        <Grid item container direction='row' spacing={1} justifyContent='center' alignItems='center'>
          {technology}
        </Grid>
      </Grid>
      <Grid item>
        <Divider variant='middle' className={classes.divider} />
      </Grid>
      <Grid item>
        <Typography variant='h4'>Developer: Chris Tamez</Typography>
      </Grid>
      <Grid item>
        <img src='self-dev.jpg' alt='Chris Tamez' className={classes.selfImage}/>
      </Grid>
      <Grid
        item
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
      >
        {socialMedia}
      </Grid>
    </Grid>
  );
};
