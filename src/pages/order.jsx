import Header from "../components/header";
import Items from "../components/items";

export default function Order() {
  const navigatePrevPage = () => {
    window.location.replace("/time");
  }
  
  const count = localStorage.getItem("count");

  return (
    <div>
      <Header title="옵션 선택" backNavigate={navigatePrevPage}/>
      <div className='Body'>
        <span className="OptionTextDesc attendPeople">참가 인원 : {count}명</span><br/>
        <div className="topInputBar">
          <span className="OptionTextTitle">베어브릭 종류 · 개수</span><br/>
          <span className="OptionTextDesc">인당 1개씩만 구매 가능합니다.</span>
          <Items />
        </div>
      </div>
    </div>
  )
}