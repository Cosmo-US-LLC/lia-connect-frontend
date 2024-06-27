import React from 'react';
import { Progress } from 'reactstrap';

const Progressbar =(props) =>(
  <Progress style={{height:'8px'}} {...props.attrProgress} >{props.children}</Progress>
);
  
export default Progressbar;