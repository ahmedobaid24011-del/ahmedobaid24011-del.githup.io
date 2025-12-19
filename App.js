import React, { useEffect, useState } from "react";

function App() {
  const tg = window.Telegram?.WebApp;
  const [step, setStep] = useState("home");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (tg) tg.expand();
  }, [tg]);

  const API_BASE = "https://your-backend-url.example.com"; // غيّرها للباك إند الفعلي

  const signup = async () => {
    const fd = new FormData();
    fd.append("username", username);
    fd.append("password", password);
    const res = await fetch(`${API_BASE}/signup`, {
      method: "POST",
      body: fd
    });
    if (res.ok) {
      setMsg("تم إنشاء الحساب!");
      setStep("home");
    } else {
      setMsg("اسم المستخدم مستخدم أو خطأ بالسيرفر");
    }
  };

  const login = async () => {
    const fd = new FormData();
    fd.append("username", username);
    fd.append("password", password);
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      body: fd
    });
    if (res.ok) {
      setMsg("تم تسجيل الدخول!");
      setStep("dashboard");
    } else {
      setMsg("خطأ في الاسم أو كلمة المرور");
    }
  };

  const resetPassword = async () => {
    const fd = new FormData();
    fd.append("username", username);
    fd.append("password", password);
    const res = await fetch(`${API_BASE}/reset-password`, {
      method: "POST",
      body: fd
    });
    if (res.ok) setMsg("تم تغيير كلمة المرور!");
    else setMsg("خطأ...");
  };

  const uploadData = async () => {
    if (!file) return setMsg("لم يتم اختيار ملف");
    const form = new FormData();
    form.append("username", username);
    form.append("file", file);
    const res = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      body: form
    });
    if (res.ok) setMsg("تم رفع البيانات!");
    else setMsg("خطأ في رفع الملف..");
  };

  const downloadData = async () => {
    const res = await fetch(`${API_BASE}/download?username=${username}`);
    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "yourdata.bin";
      a.click();
    } else setMsg("لا توجد بيانات!");
  };

  return (
    <div dir="rtl" style={{ padding: 24, fontFamily: "Tajawal, Arial, sans-serif", background: "#E6ECF0", minHeight: "100vh" }}>
      <h2>تطبيق المستخدم - Telegram WebApp</h2>
      {msg && (
        <div style={{ background: "#ffd", padding: 10, margin: 8, borderRadius: 6 }}>{msg}</div>
      )}

      {step === "home" && (
        <>
          <button onClick={() => setStep("login")}>تسجيل الدخول</button>
          <button onClick={() => setStep("signup")}>حساب جديد</button>
          <button onClick={() => setStep("reset")}>إعادة تعيين كلمة المرور</button>
        </>
      )}

      {step === "signup" && (
        <>
          <h4>تسجيل حساب جديد</h4>
          <input placeholder="اسم المستخدم" value={username} onChange={e => setUsername(e.target.value)} />
          <input placeholder="كلمة المرور" type="password"  value={password} onChange={e => setPassword(e.target.value)} />
          <button onClick={signup}>تسجيل</button>
          <button onClick={() => setStep("home")}>عودة</button>
        </>
      )}

      {step === "login" && (
        <>
          <h4>تسجيل الدخول</h4>
          <input placeholder="اسم المستخدم" value={username} onChange={e => setUsername(e.target.value)} />
          <input placeholder="كلمة المرور" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button onClick={login}>دخول</button>
          <button onClick={() => setStep("home")}>عودة</button>
        </>
      )}

      {step === "reset" && (
        <>
          <h4>إعادة تعيين كلمة المرور</h4>
          <input placeholder="اسم المستخدم" value={username} onChange={e => setUsername(e.target.value)} />
          <input placeholder="كلمة المرور الجديدة" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button onClick={resetPassword}>تغيير</button>
          <button onClick={() => setStep("home")}>عودة</button>
        </>
      )}

      {step === "dashboard" && (
        <>
          <h4>لوحة التحكم</h4>
          <div>
            <input type="file" onChange={e => setFile(e.target.files[0])} />
            <button onClick={uploadData}>رفع بيانات</button>
          </div>
          <div>
            <button onClick={downloadData}>استعادة البيانات</button>
          </div>
          <button onClick={() => { setUsername(""); setPassword(""); setStep("home") }}>تسجيل الخروج</button>
        </>
      )}
    </div>
  );
}

export default App;