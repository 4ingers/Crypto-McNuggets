import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Labs from './components/labs/';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const App = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        className={classes.tabs}
        orientation='vertical'
        variant='scrollable'
        indicatorColor='primary'
        value={value}
        onChange={handleChange}
      >
        {Labs.map((lab, i) => {
          return <Tab className={classes.tab} key={i} label={lab.label} />;
        })}
      </Tabs>
      {Labs.map((lab, i) => {
        return (
          <TabPanel key={i} value={value} index={i}>
            <lab.component />
          </TabPanel>
        );
      })}
    </div>
  );
};

export default App;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
  },
  tabs: {
    height: '100%',
    alignSelf: 'center',
    boxSizing: 'border-box',
    padding: '200px 0',
    border: `1px solid ${theme.palette.divider}`,
  },
  tab: {
    minWidth: 80,
    padding: '40px 0',
  },
}));
