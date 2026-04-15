import { useNavigate } from "react-router-dom";

function DersSecim() {
  const navigate = useNavigate();

  const dersler = [
    "Matematik",
    "Türkçe",
    "Fen",
    "Sosyal"
  ];

  const dersSec = (ders) => {
    navigate("/sorular", { state: { ders } });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Ders Seç</h1>

      {dersler.map((ders, index) => (
        <button
          key={index}
          onClick={() => dersSec(ders)}
          style={{
            display: "block",
            margin: "10px auto",
            padding: "15px",
            width: "200px",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          {ders}
        </button>
      ))}
    </div>
  );
}

export default DersSecim;