import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h1>Ana Sayfa</h1>

      <button onClick={() => navigate("/hedefler")}>
        Hedeflere Git
      </button>
    </div>
  );
}