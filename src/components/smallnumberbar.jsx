import '../styles/components/numberbar.scss';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useState } from 'react';

export default function SmallNumberBar(props) {
  const [ value, setValue ] = useState(0);
  const id = props.id || "";
  const remain = Number(props.remain); 

  let item0Value = 0;
  let item1Value = 0;
  let item2Value = 0;

  const MAX_VALUE = localStorage.getItem("count");
  
  const increaseValue = () => {
    item0Value = Number(document.getElementById("item0Value").innerText);
    item1Value = Number(document.getElementById("item1Value").innerText);
    item2Value = Number(document.getElementById("item2Value").innerText);
    if (item0Value + item1Value + item2Value < MAX_VALUE && value < remain) setValue(value + 1);
    else return;
  }

  const decreaseValue = () => {
    if (value > 0) setValue(value - 1);
    else setValue(0);
  }

  return (
    <div className="smallNumberBar">
      <ChevronLeftRoundedIcon className='smallNumberBar__leftIcon' onClick={decreaseValue}/>
      <span id={id} className="smallNumberBar__value">{value}</span>
      <ChevronRightRoundedIcon className='smallNumberBar__rightIcon' onClick={increaseValue}/>
    </div>
  )
}