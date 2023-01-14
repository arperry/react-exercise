import { Link } from 'react-router-dom';
import { createStyles, Text, Grid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const useStyles = createStyles(() => ({
  linkContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  link: {
    fontWeight: 'normal',
    fontFamily: 'Verdana, sans-serif',
    color: 'rgb(241, 140, 8)',
    '&:hover': {
      color: '#228be6'
    }
  }
}));

const NavLinks = ({ page }: { page: string }) => {
  const { classes, cx } = useStyles();
  const smallScreen = useMediaQuery('(max-width: 800px)');

  return (
    <>
      <Grid>
        <Grid.Col span={2} pt={0} className={classes.linkContainer}>
          {page === 'main' ? (
            <Link to="/urgent" className={cx(classes.link, 'link')}>
              <Text size={!smallScreen ? 'md' : 'sm'}>{!smallScreen ? 'Go to Urgent Items List' : 'Urgent Items'}</Text>
            </Link>
          ) : (
            <Link to="/" className={cx(classes.link, 'link')}>
              <Text size={!smallScreen ? 'md' : 'sm'}>{!smallScreen ? 'Go to All Items List' : 'All Items'}</Text>
            </Link>
          )}
        </Grid.Col>
        <Grid.Col span={8}>
          <Text
            ta="center"
            c="blue"
            sx={{ fontFamily: 'Verdana, sans-serif' }}
            style={!smallScreen ? { fontSize: 46 } : { fontSize: 30 }}>
            ToDo List
          </Text>
        </Grid.Col>
      </Grid>
      <Grid justify="center">
        <Grid.Col xs={8} pt={0}>
          <Text color="dimmed" ta="center" fz="xl">
            {page === 'main' ? 'All Items' : 'Urgent Items'}
          </Text>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default NavLinks;
