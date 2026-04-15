import { useState, useEffect } from "react";
import "./App.css";

import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const messages = [
  "Dayan! Bu sadece geçici 🔥",
  "Sen kontrol ediyorsun 💪",
  "Bozma, çok iyi gidiyorsun 🏆",
  "Nefesin temizleniyor 🌿",
  "Her gün daha güçlüsün 🚀",
  "Vücudun sana teşekkür ediyor ❤️"
];

function App() {
  const [user, setUser] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [packsPerDay, setPacksPerDay] = useState("");
  const [packPrice, setPackPrice] = useState("");

  const [motivation, setMotivation] = useState("");
  const [showQuitScreen, setShowQuitScreen] = useState(false);

  // Giriş yap
  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  // Çıkış yap
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setShowQuitScreen(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Firebase verilerini yükle
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();

          setStartDate(data.startDate || null);
          setSalary(data.salary || "");
          setPacksPerDay(data.packsPerDay || "");
          setPackPrice(data.packPrice || "");
          setName(data.name || "");
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadUserData();
  }, [user]);

  // Firebase verilerini kaydet
  useEffect(() => {
    const saveUserData = async () => {
      if (!user) return;

      try {
        const userRef = doc(db, "users", user.uid);

        await setDoc(userRef, {
          startDate,
          salary,
          packsPerDay,
          packPrice,
          name
        });
      } catch (error) {
        console.log(error);
      }
    };

    saveUserData();
  }, [user, startDate, salary, packsPerDay, packPrice, name]);

  const getMonthlyCost = () => {
    const packs = Number(packsPerDay);
    const price = Number(packPrice);

    if (!packs || !price) return 0;

    return packs * price * 30;
  };

  const start = () => {
    setStartDate(new Date().toISOString());
  };

  const reset = () => {
    setStartDate(null);
    setMotivation("");
    setShowQuitScreen(false);
  };

  const kriz = () => {
    const randomMessage =
      messages[Math.floor(Math.random() * messages.length)];

    setMotivation(randomMessage);
  };

  if (!user) {
    return (
      <div className="container">
        <div className="card">
          <h1>🚬 Sigarayı Bırak</h1>
          <p>Daha temiz bir hayat için başla</p>

          <button className="primary" onClick={login}>
            Google ile giriş yap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h1>🚬 Sigarayı Bırakıyorum</h1>

        <h3>👤 {name ? name : "İsimsiz Kullanıcı"}</h3>

        <button onClick={logout}>Çıkış Yap</button>

        {showQuitScreen && (
          <>
            <h2>🚭 Sigarayı Bırakma Planı</h2>

            <h3>📅 Gün: 0</h3>

            <h3>🔥 Seri: 0 Gün</h3>

            <h3>
              🚬 Bugün İçilmeyen Sigara:{" "}
              {Number(packsPerDay || 0) * 20}
            </h3>

            <h3>
              💸 Bugün Cebinde Kalan Para:{" "}
              {Number(packsPerDay || 0) *
                Number(packPrice || 0)}{" "}
              TL
            </h3>

            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                padding: "15px",
                borderRadius: "12px",
                marginTop: "15px"
              }}
            >
              <h3>❤️ Sağlık Durumu</h3>
              <p>8 saat: Oksijen seviyesi normale dönüyor</p>
              <p>24 saat: Karbonmonoksit azalıyor</p>
              <p>72 saat: Nefes alışın düzeliyor</p>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                padding: "15px",
                borderRadius: "12px",
                marginTop: "15px"
              }}
            >
              <h3>📝 Günlük Görevler</h3>
              <p>✅ 2 litre su iç</p>
              <p>✅ 10 dakika yürüyüş yap</p>
              <p>✅ Sakız çiğne</p>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                padding: "15px",
                borderRadius: "12px",
                marginTop: "15px"
              }}
            >
              <h3>🏆 Rozetler</h3>
              <p>🥉 1 Gün</p>
              <p>🥈 3 Gün</p>
              <p>🥇 7 Gün</p>
              <p>👑 30 Gün</p>
            </div>

            <button
              className="primary"
              onClick={kriz}
              style={{ marginTop: "15px" }}
            >
              Kriz Anı 🚨
            </button>

            {motivation && <h3>{motivation}</h3>}

            <textarea
              placeholder="Bugün neden bırakmak istiyorum?"
              style={{
                width: "100%",
                height: "100px",
                marginTop: "15px",
                borderRadius: "12px",
                padding: "10px",
                border: "none",
                resize: "none"
              }}
            />

            <button
              className="primary"
              onClick={() => setShowQuitScreen(false)}
              style={{ marginTop: "15px" }}
            >
              Geri Dön
            </button>
          </>
        )}

        {!showQuitScreen && !startDate && (
          <>
            <h3>Adın</h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Adını yaz"
            />

            <h3>Maaş (TL)</h3>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Örn: 25000"
            />

            <h3>Günde kaç paket?</h3>
            <input
              type="number"
              value={packsPerDay}
              onChange={(e) => setPacksPerDay(e.target.value)}
              placeholder="Örn: 2"
            />

            <h3>1 paket fiyatı</h3>
            <input
              type="number"
              value={packPrice}
              onChange={(e) => setPackPrice(e.target.value)}
              placeholder="Örn: 80"
            />

            <button className="primary" onClick={start}>
              Başla 🚀
            </button>
          </>
        )}

        {!showQuitScreen && startDate && (
          <>
            <h2>🚬 Aylık Giden: {getMonthlyCost()} TL</h2>

            <button
              className="primary"
              style={{
                marginTop: "10px",
                width: "100%"
              }}
              onClick={() => setShowQuitScreen(true)}
            >
              Sigarayı Bırakmaya Başla 🚭
            </button>

            <button
              className="primary"
              onClick={kriz}
              style={{ marginTop: "10px" }}
            >
              Kriz Anı 🚨
            </button>

            {motivation && <h3>{motivation}</h3>}

            <button
              className="danger"
              onClick={reset}
              style={{ marginTop: "10px" }}
            >
              Baştan Başla
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
