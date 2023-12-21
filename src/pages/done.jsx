import Header from "../components/header";
import { useNavigate } from 'react-router-dom';
import '../styles/pages/done.scss';
import Button from "../components/button";

export default function Done() {
  const navigate = useNavigate();
  const money = localStorage.getItem("money") || 0;
  const reservationTime = localStorage.getItem("reservation_time");
  const bighead = localStorage.getItem("bighead");
  const medium = localStorage.getItem("medium", "");
  const big = localStorage.getItem("big", "");
  const apchima = localStorage.getItem("apchima", "");

  const checkItems = () => {
    let returnitems = [];
    if (bighead !== "0") returnitems.push(<p className="contentText">대두 곰돌이 키링 {bighead}개</p>);
    if (medium !== "0") returnitems.push(<p className="contentText">곰돌이 키링 {medium}개</p>);
    if (big !== "0") returnitems.push(<p className="contentText">대형 곰돌이 {big}개</p>);
    if (apchima !== "0") returnitems.push(<p className="contentText">앞치마 {apchima}개</p>);
    return returnitems;
  }

  return (
    <div>
      <Header title="결제 완료" backText="처음으로" backNavigate={() => {
        navigate("/");
      }}/>
      <div className="DonePageTitle">
        <span className="purchaseFinished">결제가 완료되었습니다!</span><br/>
        <span className="purchaseDesc">{reservationTime}에 2학년 3반 교실으로 오시기 바랍니다.</span><br/>
        <span className="purchaseList">구매 내역</span><br/>
        {checkItems()}
        <span className="purchaseList">결제 금액</span><br/>
        <span className="purchaseMoney">{money}원</span><br/>
        <Button className="DonePageButton" text="처음으로" onClick={() => {
          navigate("/");
        }}/><br/>
        <div className="Infos">
          <span className="purchaseInfo">* 티켓 분실 시 책임지지 않습니다.</span><br/>
          <span className="purchaseInfo">* 단순 변심 사유로는 환불해 드리지 않습니다.</span><br/>
          <span className="purchaseInfo">* 제 시간에 도착해 주세요. 시간에 늦어 참여하지 못할 경우 환불해 드리지 않습니다.</span><br/>
        </div>
      </div>
    </div>
  )
}

// 티켓 잃어버리면 책임 X
// 단순변심 환불 불가능
// 시간에 늦으면 참여하지 못할 수 있음. 참여하지 못할 경우 책임 X