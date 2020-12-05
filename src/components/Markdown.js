import React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import MathJax from 'react-mathjax';
import RemarkMathPlugin from 'remark-math';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const styles = (theme) => ({
  listItem: {
    marginTop: theme.spacing(1),
  },
});

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h5',
      },
    },
    h2: { component: Typography, props: { gutterBottom: true, variant: 'h6' } },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: 'subtitle1' },
    },
    h4: {
      component: Typography,
      props: { gutterBottom: true, variant: 'caption', paragraph: true },
    },
    p: { component: Typography, props: { paragraph: true } },
    a: { component: Link },
    li: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <li className={classes.listItem}>
          <Typography component='span' {...props} />
        </li>
      )),
    },
  },
};

export default function Markdown(props) {
  const newProps = {
    ...props,
    plugins: [RemarkMathPlugin],
    renderers: {
      ...props.renderers,
      math: (props) => <MathJax.Node formula={props.value} />,
      inlineMath: (props) => <MathJax.Node inline formula={props.value} />,
    },
  };

  return <ReactMarkdown options={options} {...newProps} />;
}
