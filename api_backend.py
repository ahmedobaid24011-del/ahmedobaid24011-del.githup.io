from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import StreamingResponse, JSONResponse
import sqlite3
import hashlib
import io

app = FastAPI()
conn = sqlite3.connect("webapp_users.db", check_same_thread=False)
c = conn.cursor()
c.execute("""
CREATE TABLE IF NOT EXISTS users (
    username TEXT PRIMARY KEY,
    password_hash TEXT,
    data BLOB
)
""")
conn.commit()

def hash_pw(pw:str):
    return hashlib.sha256(pw.encode()).hexdigest()

@app.post("/signup")
def signup(username: str = Form(...), password: str = Form(...)):
    if c.execute("SELECT 1 FROM users WHERE username=?", (username,)).fetchone():
        return JSONResponse({"msg":"username exists"},status_code=400)
    c.execute("INSERT INTO users (username, password_hash) VALUES (?, ?)", (username, hash_pw(password)))
    conn.commit()
    return {"msg":"ok"}

@app.post("/login")
def login(username: str = Form(...), password: str = Form(...)):
    u = c.execute("SELECT password_hash FROM users WHERE username=?", (username,)).fetchone()
    if u and hash_pw(password) == u[0]:
        return {"msg":"ok"}
    return JSONResponse({"msg":"fail"}, status_code=401)

@app.post("/reset-password")
def reset_password(username: str = Form(...), password: str = Form(...)):
    if not c.execute("SELECT 1 FROM users WHERE username=?", (username,)).fetchone():
        return JSONResponse({"msg":"no user"}, status_code=404)
    c.execute("UPDATE users SET password_hash=? WHERE username=?", (hash_pw(password), username))
    conn.commit()
    return {"msg":"ok"}

@app.post("/upload")
def upload(username: str = Form(...), file: UploadFile = File(...)):
    b = file.file.read()
    c.execute("UPDATE users SET data=? WHERE username=?", (b, username))
    conn.commit()
    return {"msg":"ok"}

@app.get("/download")
def download(username: str):
    d = c.execute("SELECT data FROM users WHERE username=?", (username,)).fetchone()
    if d and d[0]:
        return StreamingResponse(io.BytesIO(d[0]), media_type="application/octet-stream")
    return JSONResponse({"msg":"no data"}, status_code=404)