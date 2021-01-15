import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Lab from './components/labs/lab1';

const CURRENT_INDEX = 9;

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
          {children}
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
  const [value, setValue] = React.useState(CURRENT_INDEX);

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
        {Lab.map((task, i) => {
          return <Tab className={classes.tab} key={i} label={task.label} />;
        })}
      </Tabs>
      {Lab.map((task, i) => {
        return (
          <TabPanel className={classes.content} key={i} value={value} index={i}>
            <task.component />
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
    position: 'fixed',
    height: '100%',
    minWidth: 80,
    alignSelf: 'center',
    boxSizing: 'border-box',
    padding: '200px 0',
    borderRight: `1px solid ${theme.palette.divider}`,
    backdropFilter: 'blur(3px)',
    backgroundColor: 'rgb(255, 255, 255, .3)',
    zIndex: 10000,
  },
  tab: {
    minWidth: 80,
    padding: '40px 0',
  },
  content: {
    minWidth: "600px",
    maxWidth: "900px",
    margin: '0 auto',
    position: 'relative',
    paddingLeft: '80px',
  },
}));
