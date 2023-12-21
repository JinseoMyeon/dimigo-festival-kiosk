import Header from "../components/header";
import { useNavigate } from 'react-router-dom';

export default function Done() {
  const navigate = useNavigate();
  return (
    <div>
      <Header title="결제 완료" backText="처음으로" backNavigate={() => {
        navigate("/");
      }}/>
    </div>
  )
}