import '../styles/pages/payment.scss';

import Header from "../components/header";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Payment() {
  const navigate = useNavigate();

  const navigatePrevPage = () => {
    navigate("/order");
  }

  async function getTicketId() {
    return localStorage.getItem("ticketId");
  }

  const checkItems = () => {
    let returnitems = [];
    if (bighead !== "0") returnitems.push(<p className="orderRecall_contentText">대두 곰돌이 키링 {bighead}개</p>);
    if (medium !== "0") returnitems.push(<p className="orderRecall_contentText">곰돌이 키링 {medium}개</p>);
    if (big !== "0") returnitems.push(<p className="orderRecall_contentText">대형 곰돌이 {big}개</p>);
    if (apchima !== "0") returnitems.push(<p className="orderRecall_contentText">앞치마 {apchima}개</p>);
    return returnitems;
  }

  let bighead = localStorage.getItem("bighead") || 0;
  let medium = localStorage.getItem("medium") || 0;
  let big = localStorage.getItem("big") || 0;
  let apchima = localStorage.getItem("apchima") || 0;
  let money = localStorage.getItem("money") || 0;
  money = money.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div>
      <Header title="결제하기" backText="뒤로가기 불가" />
      <div className='Body'>
        <div className='orderRecall'>
          <span className="orderInfo">결제 완료 후 카운터에 송금 내역을 보내주세요.</span>
          <div className='orderRecall__title'>
            <span className="orderRecall__titleText">결제 금액</span><br/>
            <span className="orderRecall__money">{money}원</span>
          </div>
          <div className='orderRecall__content'>
            {checkItems()}
          </div>
        </div>
        <div className="orderPayment">
          <img className="orderQR" src={`https://chart.apis.google.com/chart?cht=qr&chs=384x384&chl=https://toss.me/%EB%B6%80%EB%8D%A9%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4/${money}`} alt="tossqr"></img>
        </div>
      </div>
    </div>
  )
}