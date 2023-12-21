import '../styles/components/numberbar.scss';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useState } from 'react';

export default function NumberBar(props) {
  const [ value, setValue ] = useState(1);
  const id = props.id || "";

  const MAX_VALUE = 5;
  
  const increaseValue = () => {
    if (value < MAX_VALUE) setValue(value + 1);
    else setValue(MAX_VALUE);
  }

  const decreaseValue = () => {
    if (value > 1) setValue(value - 1);
    else setValue(1);
  }

  return (
    <div className="numberBar">
      <ChevronLeftRoundedIcon fontSize="large" className='numberBar__leftIcon' onClick={decreaseValue}/>
      <span id={id} className="numberBar__value">{value}</span>
      <ChevronRightRoundedIcon fontSize="large" className='numberBar__rightIcon' onClick={increaseValue}/>
    </div>
  )
}