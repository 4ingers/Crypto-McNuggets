import React from 'react';
import ReactMarkdown from 'react-markdown';
import { InlineMath, BlockMath } from 'react-katex';
import math from 'remark-math';
import 'katex/dist/katex.min.css';

const renderers = {
  inlineMath: ({ value }) => <InlineMath math={value} />,
  math: ({ value }) => <BlockMath math={value} />,
};

const MarkdownKatex = (props) => (
  <ReactMarkdown {...props} plugins={[math]} renderers={renderers}/>
);

export default MarkdownKatex;
