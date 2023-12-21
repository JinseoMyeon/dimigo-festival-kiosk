import item0 from '../svgs/item0.svg';
import item1 from '../svgs/item1.svg';
import item2 from '../svgs/item2.svg';
import '../styles/pages/order.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import SmallNumberBar from './smallnumberbar';
import Button from './button';

let fetchData = {
  items: [
    {
      name : "",
      count : -1
    },
    {
      name : "",
      count : -1
    },
    {
      name : "",
      count : -1
    },
  ]
};

const waitForPaymentConfirm = (url, id, callback) => {
  let ws = new WebSocket(url, 'chat');

  ws.onclose = (event) => {
      ws = null;
      callback(undefined);
  }
  ws.onerror = (event) => {
      ws.close();
  }

  ws.onmessage = (event) => {
      const packet = JSON.parse(event.data);
      if(packet.method !== 'hello') {
          callback(undefined);
          return;
      }

      ws.onmessage = onChangedProtocol;

      ws.send(JSON.stringify({
          'method': 'change_protocol',
          'type': 'ticket'
      }));
  }

  function onChangedProtocol(event) {
      const packet = JSON.parse(event.data);

      if(packet.ok !== true) {
          callback(undefined);
          return;
      }

      ws.onmessage = onConfirm;

      ws.send(JSON.stringify({
          'method': 'set-ticket',
          'id': id
      }));
  }

  function onConfirm(event) {
      const packet = JSON.parse(event.data);

      if(packet.method !== 'confirm') {
          callback(undefined);
          return;
      }

      ws.onclose = () => {};

      if(packet.ok !== true) {
          callback(false);
          ws.close();
          return;
      }

      callback(true);
      ws.close();
  }
}

try {
  fetchData = await fetch(`http://121.124.49.48:6003/api/get-inventory`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
  }).then((response) => response.json().then((data) => {
    return data;
  }));
} catch (e) {
  console.log(e);
}

const items = fetchData.items || [];

const item0Price = 4500;
const item1Price = 4500;
const item2Price = 5500;
const apronPrice = 500;

// 2 : 대두 / 3 : 일반 / 1 : 대형 / 0 : 앞치마

export default function Items() {
  const [ value, setValue ] = useState(0);
  const count = Number(localStorage.getItem("count"));

  const increaseValue = () => {
    if (value < count) setValue(value + 1);
    else setValue(count);
  }

  const decreaseValue = () => {
    if (value > 0) setValue(value - 1);
    else setValue(0);
  }

  const navigate = useNavigate();

  const navigateDonePage = () => {
    navigate("/done");
  }

  const navigateMainPage = () => {
    navigate("/");
  }

  const navigateNextPage = async () => {
    const item0Value = Number(document.getElementById("item0Value").innerText);
    const item1Value = Number(document.getElementById("item1Value").innerText);
    const item2Value = Number(document.getElementById("item2Value").innerText);

    if (item0Value + item1Value + item2Value !== count) {
      alert("옵션을 모두 선택해주세요.");
      return;
    }

    let fetchData = {
      items: [
        {
          name : "",
          count : -1
        },
        {
          name : "",
          count : -1
        },
        {
          name : "",
          count : -1
        },
      ]
    };

    try {
      fetchData = await fetch(`http://121.124.49.48:6003/api/get-inventory`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => response.json().then((data) => {
        return data;
      }));
    } catch (e) {
      console.log(e);
    }
    
    const items = fetchData.items || [];

    if (items[2].count < item0Value || items[3].count < item1Value || items[1].count < item2Value) {
      alert("선택한 상품 중 재고가 부족한 상품이 있습니다. 다시 선택해 주세요.");
      return;
    }

    localStorage.setItem("bighead", item0Value);
    localStorage.setItem("medium", item1Value);
    localStorage.setItem("big", item2Value);
    localStorage.setItem("apchima", value)

    console.log(item0Value, item1Value, item2Value, value, apronPrice, item0Price, item1Price, item2Price)
    const money = item0Value * item0Price + item1Value * item1Price + item2Value * item2Price + value * apronPrice;
    console.log(money);
    localStorage.setItem("money", money);

    const phone = localStorage.getItem("phone");
    const name = localStorage.getItem("name");
    const peopleCount = localStorage.getItem("count");
    const reservation_time = localStorage.getItem("reservation_time");

    const postData = {
      name: name,
      count: Number(peopleCount),
      reservation_time: reservation_time,
      money: Number(money),
      order: [
          {
              product_id: "bighead",
              count: Number(item0Value)
          },
          {
              product_id: "medium",
              count: Number(item1Value)
          },
          {
              product_id: "big",
              count: Number(item2Value)
          },
          {
              product_id: "apchima",
              count: Number(value)
          }
      ],
      phone: phone
    };

    let requestPayment = {
      ticket_id: -1
    };

    console.log(postData);

    requestPayment = await fetch("http://121.124.49.48:6003/api/request-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((response) => response.json().then((data) => {
      return data;
    }))

    const ticketId = requestPayment.ticket_id;
    console.log(ticketId);

    waitForPaymentConfirm('ws://121.124.49.48:6003', ticketId, (result) => {
      if(result === undefined) {
          alert('결제 과정에서 오류가 발생했습니다.');
          navigateMainPage();
      } else if(result === false) {
          alert('결제가 취소되었습니다.');
          navigateMainPage();
      } else {
          navigateDonePage();
      }
    });

    navigate("/payment");
  }  

  return(
    <div className="orderSelectOptions">
      <div className="itemSelections">
        <div className="orderSelectOption">
          <img src={item0} alt="item0" className="orderSelectOptions__item0"/><br/>
          <div className="itemName">
            <span className="itemNameText">대두 곰돌이 키링</span><br/>
            <span className="itemPrice">가격 : {item0Price}원</span><br/>
            <span className="itemCount">({items[2].count}개 남음)</span><br/>
            <SmallNumberBar id="item0Value" remain={items[2].count}/>
          </div>
        </div>
        <div className="orderSelectOption">
          <img src={item1} alt="item1" className="orderSelectOptions__item0"/><br/>
          <div className="itemName">
            <span className="itemNameText">곰돌이 키링</span><br/>
            <span className="itemPrice">가격 : {item1Price}원</span><br/>
            <span className="itemCount">({items[3].count}개 남음)</span><br/>
            <SmallNumberBar id="item1Value" remain={items[3].count}/>
          </div>
        </div>
        <div className="orderSelectOption">
          <img src={item2} alt="item2" className="orderSelectOptions__item0"/><br/>
          <div className="itemName">
            <span className="itemNameText">대형 곰돌이</span><br/>
            <span className="itemPrice">가격 : {item2Price}원</span><br/>
            <span className="itemCount">({items[1].count}개 남음)</span><br/>
            <SmallNumberBar id="item2Value" remain={items[1].count}/>
          </div>
        </div>
      </div>
      <div className="InputBar">
        <span className="OptionTextTitle">앞치마</span><br/>
        <span className="OptionTextDesc">푸어링 아트 과정에서 물감이 튈 수 있어요.</span>
        <div className="numberBar">
          <ChevronLeftRoundedIcon fontSize="large" className='numberBar__leftIcon' onClick={decreaseValue}/>
          <span id='apronNumber' className="numberBar__value">{value}</span>
          <ChevronRightRoundedIcon fontSize="large" className='numberBar__rightIcon' onClick={increaseValue}/>
        </div>
      </div>
      <div className="paymentButton">
        <Button className="paymentButton" text="결제하기" icon="CreditScoreRoundedIcon" onClick={navigateNextPage}/>
      </div>
    </div>
  )
}