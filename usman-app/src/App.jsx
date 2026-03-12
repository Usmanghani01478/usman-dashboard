import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────
   GLOBAL STYLES  (injected once via <style>)
───────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body { height: 100%; background: #f4f4f5; }
  #root      { height: 100%; }

  body { font-family: 'Plus Jakarta Sans', sans-serif; -webkit-font-smoothing: antialiased; }

  input, textarea, select, button { font-family: inherit; }

  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 99px; }

  input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: #111 !important;
    box-shadow: 0 0 0 3px rgba(0,0,0,0.08);
  }
  button { cursor: pointer; transition: opacity .15s, transform .1s; }
  button:hover { opacity: .82; }
  button:active { transform: scale(.97); }

  /* ── Shell ── */
  .shell {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  /* ── Sidebar ── */
  .sidebar {
    width: 220px;
    min-width: 220px;
    background: #111;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    flex-shrink: 0;
  }

  /* ── Main ── */
  .main-area {
    flex: 1;
    min-width: 0;
    height: 100vh;
    overflow-y: auto;
    background: #f4f4f5;
  }

  .page-wrap {
    max-width: 960px;
    margin: 0 auto;
    padding: 32px 28px 80px;
  }

  /* ── Nav button ── */
  .nav-btn {
    width: 100%;
    padding: 10px 18px;
    display: flex;
    align-items: center;
    gap: 11px;
    background: transparent;
    color: #525252;
    border: none;
    border-left: 3px solid transparent;
    text-align: left;
    font-size: 13px;
    font-weight: 500;
    transition: background .15s, color .15s;
  }
  .nav-btn.active {
    background: #fff;
    color: #111;
    border-left-color: #fff;
    font-weight: 700;
  }
  .nav-btn:hover:not(.active) {
    background: #1a1a1a;
    color: #e5e5e5;
    opacity: 1;
  }

  /* ── Cards / Inputs ── */
  .card {
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 14px;
    padding: 20px 22px;
    box-shadow: 0 1px 3px rgba(0,0,0,.05), 0 1px 2px rgba(0,0,0,.03);
  }
  .inp {
    width: 100%;
    padding: 10px 13px;
    border: 1.5px solid #e4e4e4;
    border-radius: 9px;
    font-size: 14px;
    background: #fff;
    color: #111;
    transition: border-color .15s;
  }
  .lbl {
    font-size: 10px;
    font-weight: 700;
    color: #a1a1aa;
    letter-spacing: 1px;
    text-transform: uppercase;
    display: block;
    margin-bottom: 5px;
  }

  /* ── Buttons ── */
  .btn-primary {
    padding: 10px 20px;
    background: #111;
    color: #fff;
    border: none;
    border-radius: 9px;
    font-size: 13px;
    font-weight: 700;
  }
  .btn-ghost {
    padding: 9px 16px;
    background: #fff;
    color: #111;
    border: 1.5px solid #e4e4e4;
    border-radius: 9px;
    font-size: 13px;
    font-weight: 600;
  }
  .btn-danger {
    padding: 8px 14px;
    background: #fff1f2;
    color: #be123c;
    border: 1.5px solid #fecdd3;
    border-radius: 9px;
    font-size: 12px;
    font-weight: 700;
  }
  .btn-sm {
    padding: 6px 12px;
    background: #fff;
    color: #111;
    border: 1px solid #e4e4e4;
    border-radius: 7px;
    font-size: 11.5px;
    font-weight: 700;
  }

  /* ── Grid ── */
  .g2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; }
  .g3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 14px; }

  /* ── Tags ── */
  .tag {
    padding: 3px 10px;
    border-radius: 99px;
    font-size: 11px;
    font-weight: 700;
    display: inline-block;
    white-space: nowrap;
  }

  /* ── Bottom nav (mobile only) ── */
  .bottom-nav { display: none; }

  /* ── TABLET ── */
  @media (max-width: 900px) and (min-width: 601px) {
    .sidebar { width: 60px; min-width: 60px; }
    .sidebar .brand-text, .sidebar .nav-label, .sidebar .specs { display: none; }
    .nav-btn { justify-content: center; padding: 14px 0; }
    .page-wrap { padding: 24px 20px 80px; }
  }

  /* ── MOBILE ── */
  @media (max-width: 600px) {
    .sidebar { display: none; }
    .main-area { height: calc(100vh - 60px); }
    .page-wrap { padding: 16px 14px 24px; }
    .bottom-nav {
      display: flex;
      position: fixed;
      bottom: 0; left: 0; right: 0;
      height: 60px;
      background: #111;
      border-top: 1px solid #1e1e1e;
      z-index: 999;
    }
    .bn-btn {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      background: none;
      border: none;
      color: #525252;
      font-size: 8.5px;
      font-weight: 600;
      position: relative;
      padding: 0 4px;
    }
    .bn-btn.active { color: #fff; }
    .bn-icon { font-size: 17px; line-height: 1.2; }
  }
`;

/* ─────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────── */
const SS = {
  "Not Started": { bg:"#f3f4f6", c:"#6b7280" },
  "In Progress": { bg:"#fef9c3", c:"#a16207" },
  "Review":      { bg:"#eff6ff", c:"#2563eb" },
  "Done":        { bg:"#f0fdf4", c:"#16a34a" },
  "Delivered":   { bg:"#111",    c:"#fff"     },
};
const PS = {
  "Urgent": { bg:"#fff1f2", c:"#be123c" },
  "High":   { bg:"#fff7ed", c:"#c2410c" },
  "Normal": { bg:"#f9fafb", c:"#6b7280" },
  "Low":    { bg:"#f9fafb", c:"#d1d5db" },
};
const SL = ["Not Started","In Progress","Review","Done","Delivered"];
const PL = ["Urgent","High","Normal","Low"];
const MO = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function Tag({ bg, c, children }) {
  return <span className="tag" style={{ background: bg, color: c }}>{children}</span>;
}

function useCopy() {
  const [id, setId] = useState("");
  const copy = (txt, k) => {
    try { navigator.clipboard.writeText(txt); } catch {}
    setId(k); setTimeout(() => setId(""), 2000);
  };
  return [id, copy];
}

function load(key, fb) {
  try { const d = localStorage.getItem(key); return d ? JSON.parse(d) : fb; }
  catch { return fb; }
}
function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

function calcProjectEarning(p) {
  const r = parseFloat(p.rate) || 0;
  const q = parseFloat(p.qty)  || 1;
  const m = parseFloat(p.videoMins) || 0;
  if (p.rate) return p.rateType === "per_min" ? +(r * m * q).toFixed(2) : +(r * q).toFixed(2);
  return parseFloat(p.money) || 0;
}

/* ─────────────────────────────────────────────────
   APP
───────────────────────────────────────────────── */
export default function App() {
  const [tab, setTab]         = useState("dashboard");
  const [projects, setProjects] = useState(() => load("uc_proj", []));
  const [clients,  setClients]  = useState(() => load("uc_clients", ["Jon Mac","Shrey","Tyler","Danny Rio"]));

  const saveProjects = d => { setProjects(d); save("uc_proj", d); };
  const saveClients  = d => { setClients(d);  save("uc_clients", d); };

  const NAV = [
    { id:"dashboard", icon:"⬡", label:"Dashboard"  },
    { id:"projects",  icon:"◧", label:"Projects"    },
    { id:"earnings",  icon:"◎", label:"Earnings"    },
    { id:"outreach",  icon:"✉", label:"Outreach"    },
    { id:"messages",  icon:"◻", label:"Messages"    },
    { id:"converter", icon:"⊛", label:"USD / PKR"   },
  ];

  const urgentCount = projects.filter(p => p.priority === "Urgent" && p.status !== "Delivered").length;

  const PAGES = {
    dashboard: <Dashboard projects={projects} />,
    projects:  <Projects  projects={projects} saveProjects={saveProjects} clients={clients} saveClients={saveClients} />,
    earnings:  <Earnings  projects={projects} clients={clients} />,
    outreach:  <Outreach  clients={clients} />,
    messages:  <Messages />,
    converter: <Converter />,
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="shell">

        {/* ── Sidebar ── */}
        <aside className="sidebar">
          <div className="brand-text" style={{ padding:"22px 18px 18px", borderBottom:"1px solid #1c1c1c" }}>
            <div style={{ fontWeight:800, fontSize:17, letterSpacing:3, color:"#fff" }}>USMAN</div>
            <div style={{ fontWeight:700, fontSize:9,  letterSpacing:4.5, color:"#333", marginTop:2 }}>CREALFEX</div>
            <div style={{ fontSize:10, color:"#363636", marginTop:10, lineHeight:1.8 }}>
              50+ Clients · Pakistan<br/>Pro Video Editor
            </div>
          </div>

          <nav style={{ flex:1, padding:"6px 0", overflowY:"auto" }}>
            {NAV.map(n => (
              <button
                key={n.id}
                className={`nav-btn${tab === n.id ? " active" : ""}`}
                onClick={() => setTab(n.id)}
              >
                <span style={{ fontSize:15, flexShrink:0 }}>{n.icon}</span>
                <span className="nav-label">{n.label}</span>
                {n.id === "projects" && urgentCount > 0 && (
                  <span className="nav-label" style={{
                    marginLeft:"auto", background:"#ef4444", color:"#fff",
                    borderRadius:99, fontSize:10, padding:"2px 7px", fontWeight:800
                  }}>{urgentCount}</span>
                )}
              </button>
            ))}
          </nav>

          <div className="specs" style={{ padding:"12px 18px 16px", borderTop:"1px solid #1a1a1a" }}>
            <div style={{ fontSize:9, color:"#2a2a2a", lineHeight:1.9 }}>
              i5 9th · GTX 1660S · 32GB DDR3<br/>~2 days/video · 10h/day
            </div>
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="main-area">
          <div className="page-wrap">
            {PAGES[tab]}
          </div>
        </main>

        {/* ── Mobile Bottom Nav ── */}
        <nav className="bottom-nav">
          {NAV.map(n => (
            <button
              key={n.id}
              className={`bn-btn${tab === n.id ? " active" : ""}`}
              onClick={() => setTab(n.id)}
            >
              <span className="bn-icon">{n.icon}</span>
              <span>{n.label}</span>
              {n.id === "projects" && urgentCount > 0 && (
                <span style={{
                  position:"absolute", top:4, right:"calc(50% - 14px)",
                  background:"#ef4444", color:"#fff",
                  borderRadius:99, fontSize:9, padding:"1px 5px", fontWeight:800
                }}>{urgentCount}</span>
              )}
            </button>
          ))}
        </nav>

      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────
   DASHBOARD
───────────────────────────────────────────────── */
function Dashboard({ projects }) {
  const [social, setSocial] = useState({
    "𝕏 Twitter":false, "Instagram":false, "YouTube":false, "LinkedIn":false, "Pinterest":false
  });
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (tz, s) => now.toLocaleTimeString("en-US", { timeZone:tz, hour:"2-digit", minute:"2-digit", second: s?"2-digit":undefined, hour12:true });
  const fmtD = tz => now.toLocaleDateString("en-US", { timeZone:tz, weekday:"short", month:"short", day:"numeric" });

  const cm = now.getMonth(), cy = now.getFullYear();
  const inProg  = projects.filter(p => p.status === "In Progress").length;
  const urgent  = projects.filter(p => p.priority === "Urgent" && p.status !== "Delivered").length;

  const doneProjsThisMonth = projects.filter(p => {
    if (p.status !== "Done" && p.status !== "Delivered") return false;
    const d = new Date(p.completedDate || "");
    return !isNaN(d) && d.getMonth() === cm && d.getFullYear() === cy;
  });
  const monthEarn = doneProjsThisMonth.reduce((s, p) => s + calcProjectEarning(p), 0);
  const totalEarn = projects.filter(p => p.status === "Done" || p.status === "Delivered")
                            .reduce((s, p) => s + calcProjectEarning(p), 0);

  const today = now.toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric" });

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom:28 }}>
        <div style={{ fontSize:11, color:"#a1a1aa", letterSpacing:1.5, textTransform:"uppercase", marginBottom:5 }}>{today}</div>
        <div style={{ fontSize:26, fontWeight:800, letterSpacing:-0.5, color:"#111", marginBottom:4 }}>Good Day, Usman 👋</div>
        <div style={{ fontSize:13, color:"#a1a1aa" }}>Usman Crealfex · Professional YouTube Video Editor</div>
      </div>

      {/* Clocks */}
      <div className="g2" style={{ marginBottom:16 }}>
        {[
          { label:"🇵🇰 Pakistan (PKT)", tz:"Asia/Karachi",      accent:"#10b981" },
          { label:"🇺🇸 New York (EST)", tz:"America/New_York",  accent:"#3b82f6" },
        ].map(cl => (
          <div key={cl.tz} className="card" style={{ borderTop:`3px solid ${cl.accent}` }}>
            <div style={{ fontSize:10, fontWeight:700, color:"#a1a1aa", letterSpacing:1.5, textTransform:"uppercase", marginBottom:6 }}>{cl.label}</div>
            <div style={{ fontSize:28, fontWeight:800, color:"#111", fontVariantNumeric:"tabular-nums", lineHeight:1, letterSpacing:1 }}>{fmt(cl.tz, true)}</div>
            <div style={{ fontSize:12, color:"#a1a1aa", marginTop:5 }}>{fmtD(cl.tz)}</div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="g3" style={{ marginBottom:16 }}>
        {[
          { v:projects.length, l:"Total Projects", s:"all time",         a:"#111"    },
          { v:inProg,          l:"In Progress",    s:"editing now",       a:"#f59e0b" },
          { v:urgent,          l:urgent?"⚠ Urgent":"All Clear ✓", s:urgent?"needs attention":"no urgent tasks", a:urgent?"#ef4444":"#10b981" },
        ].map(st => (
          <div key={st.l} className="card" style={{ borderTop:`3px solid ${st.a}` }}>
            <div style={{ fontSize:46, fontWeight:800, color:st.a, lineHeight:1 }}>{st.v}</div>
            <div style={{ fontSize:13, fontWeight:700, marginTop:7 }}>{st.l}</div>
            <div style={{ fontSize:11, color:"#a1a1aa", marginTop:3 }}>{st.s}</div>
          </div>
        ))}
      </div>

      {/* Earnings */}
      <div className="g2" style={{ marginBottom:16 }}>
        <div className="card" style={{ background:"#111", color:"#fff" }}>
          <div style={{ fontSize:10, letterSpacing:2, color:"#444", textTransform:"uppercase", fontWeight:700, marginBottom:6 }}>
            This Month · {MO[cm]}
          </div>
          <div style={{ fontSize:46, fontWeight:800, lineHeight:1, color:monthEarn > 0 ? "#fff" : "#2a2a2a" }}>
            ${monthEarn.toFixed(0)}
          </div>
          <div style={{ fontSize:12, color:"#444", marginTop:7 }}>
            {doneProjsThisMonth.length} video{doneProjsThisMonth.length !== 1 ? "s" : ""} completed
          </div>
        </div>
        <div className="card" style={{ borderTop:"3px solid #111" }}>
          <div style={{ fontSize:10, letterSpacing:2, color:"#a1a1aa", textTransform:"uppercase", fontWeight:700, marginBottom:6 }}>
            All Time Earnings
          </div>
          <div style={{ fontSize:46, fontWeight:800, lineHeight:1 }}>${totalEarn.toFixed(0)}</div>
          <div style={{ fontSize:12, color:"#a1a1aa", marginTop:7 }}>
            from {projects.filter(p => p.status === "Done" || p.status === "Delivered").length} completed
          </div>
        </div>
      </div>

      {/* Social + Completed */}
      <div className="g2" style={{ marginBottom:16 }}>
        <div className="card">
          <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>Daily Post Checklist</div>
          <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
            {Object.entries(social).map(([platform, checked]) => (
              <button
                key={platform}
                onClick={() => setSocial(p => ({ ...p, [platform]: !p[platform] }))}
                style={{
                  display:"flex", alignItems:"center", gap:10, padding:"9px 12px",
                  background: checked ? "#111" : "#fafafa",
                  color: checked ? "#fff" : "#555",
                  border: `1.5px solid ${checked ? "#111" : "#e8e8e8"}`,
                  borderRadius:9, fontSize:13, fontWeight:600, textAlign:"left",
                }}
              >
                <span style={{
                  width:17, height:17, borderRadius:5,
                  background: checked ? "#fff" : "#e4e4e4",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:10, color:"#111", flexShrink:0, fontWeight:900
                }}>{checked ? "✓" : ""}</span>
                {platform}
                {checked && <span style={{ marginLeft:"auto", fontSize:10, opacity:.4 }}>posted</span>}
              </button>
            ))}
          </div>
          <div style={{ fontSize:11, color:"#a1a1aa", marginTop:10 }}>
            {Object.values(social).filter(Boolean).length}/5 posted today
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>Completed · {MO[cm]}</div>
          {doneProjsThisMonth.length === 0
            ? <div style={{ color:"#d4d4d8", fontSize:13 }}>No completed videos this month yet.</div>
            : doneProjsThisMonth.map(p => (
              <div key={p.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:"1px solid #f4f4f5", gap:8 }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:700, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.title}</div>
                  <div style={{ fontSize:11, color:"#a1a1aa", marginTop:2 }}>{p.client}</div>
                </div>
                <div style={{ fontWeight:800, fontSize:13, flexShrink:0, color:"#16a34a" }}>${calcProjectEarning(p).toFixed(0)}</div>
              </div>
            ))
          }
        </div>
      </div>

      {/* Recent Projects */}
      <div className="card">
        <div style={{ fontSize:14, fontWeight:700, marginBottom:14 }}>Recent Projects</div>
        {projects.length === 0
          ? <div style={{ color:"#d4d4d8", fontSize:13 }}>No projects yet — add in Projects tab.</div>
          : projects.slice(-8).reverse().map(p => {
            const days = p.deadline ? Math.ceil((new Date(p.deadline) - new Date()) / 86400000) : null;
            const earn = calcProjectEarning(p);
            return (
              <div key={p.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 0", borderBottom:"1px solid #f4f4f5" }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13.5, fontWeight:700, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.title}</div>
                  <div style={{ fontSize:11.5, color:"#a1a1aa", marginTop:2 }}>
                    {p.client}{earn > 0 ? ` · $${earn.toFixed(0)}` : ""}
                  </div>
                </div>
                <Tag bg={SS[p.status]?.bg || "#f3f4f6"} c={SS[p.status]?.c || "#666"}>{p.status}</Tag>
                <Tag bg={PS[p.priority]?.bg || "#f9fafb"} c={PS[p.priority]?.c || "#aaa"}>{p.priority}</Tag>
                {days !== null && (
                  <span style={{ fontSize:11, fontWeight:700, whiteSpace:"nowrap",
                    color: days < 0 ? "#ef4444" : days <= 3 ? "#f59e0b" : "#a1a1aa"
                  }}>
                    {days < 0 ? `${Math.abs(days)}d over` : `${days}d`}
                  </span>
                )}
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   PROJECTS
───────────────────────────────────────────────── */
function Projects({ projects, saveProjects, clients, saveClients }) {
  const BLANK = {
    id:"", client:clients[0]||"", title:"", rawLink:"", doneLink:"",
    status:"Not Started", priority:"Normal", deadline:"", money:"",
    rateType:"per_video", rate:"", videoMins:"", qty:"1", completedDate:""
  };
  const [form, setForm]     = useState({ ...BLANK });
  const [editing, setEditing] = useState(null);
  const [fCl, setFCl]       = useState("All");
  const [fSt, setFSt]       = useState("All");
  const [newCl, setNewCl]   = useState("");
  const [showMgr, setShowMgr] = useState(false);
  const topRef = useRef(null);
  const F = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const calcMoney = f => {
    const r = parseFloat(f.rate) || 0, q = parseFloat(f.qty) || 1, m = parseFloat(f.videoMins) || 0;
    return f.rateType === "per_min" ? +(r * m * q).toFixed(2) : +(r * q).toFixed(2);
  };

  const submit = () => {
    if (!form.title.trim() || !form.client.trim()) return;
    const id   = editing || Date.now().toString();
    const isDone  = form.status === "Done" || form.status === "Delivered";
    const prev    = editing ? projects.find(p => p.id === editing) : null;
    const wasDone = prev && (prev.status === "Done" || prev.status === "Delivered");
    let cd = form.completedDate;
    if (isDone && !wasDone && !cd) cd = new Date().toISOString().slice(0, 10);
    if (!isDone) cd = "";
    const final = { ...form, id, completedDate: cd, money: form.rate ? calcMoney(form).toString() : form.money };
    saveProjects(editing ? projects.map(p => p.id === editing ? final : p) : [...projects, final]);
    setForm({ ...BLANK, client: clients[0] || "" });
    setEditing(null);
  };

  const filtered = projects
    .filter(p => (fCl === "All" || p.client === fCl) && (fSt === "All" || p.status === fSt))
    .slice().reverse();

  const preview = form.rate ? calcMoney(form) : null;

  return (
    <div>
      <div ref={topRef} />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22, flexWrap:"wrap", gap:10 }}>
        <div style={{ fontSize:24, fontWeight:800, letterSpacing:-0.5, color:"#111" }}>
          {editing ? "✏️ Edit Project" : "New Project"}
        </div>
        <button className="btn-ghost" style={{ fontSize:12 }} onClick={() => setShowMgr(!showMgr)}>
          {showMgr ? "✕ Close" : "⚙ Manage Clients"}
        </button>
      </div>

      {/* Client Manager */}
      {showMgr && (
        <div className="card" style={{ marginBottom:18, background:"#fafafa", border:"1.5px dashed #e0e0e0" }}>
          <div style={{ fontWeight:800, fontSize:14, marginBottom:12 }}>Client Manager</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:14 }}>
            {clients.map(c => (
              <div key={c} style={{ display:"flex", alignItems:"center", gap:6, background:"#fff", border:"1px solid #e4e4e4", borderRadius:8, padding:"6px 12px" }}>
                <span style={{ fontSize:12.5, fontWeight:600 }}>{c}</span>
                {!["Jon Mac","Shrey","Tyler","Danny Rio"].includes(c) && (
                  <button onClick={() => saveClients(clients.filter(x => x !== c))}
                    style={{ border:"none", background:"none", color:"#ef4444", cursor:"pointer", fontSize:14, padding:"0 0 0 4px" }}>✕</button>
                )}
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <input className="inp" style={{ maxWidth:260 }} placeholder="New client name..." value={newCl}
              onChange={e => setNewCl(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") { const n = newCl.trim(); if (n && !clients.includes(n)) { saveClients([...clients, n]); setNewCl(""); } } }}
            />
            <button className="btn-primary" onClick={() => { const n = newCl.trim(); if (n && !clients.includes(n)) { saveClients([...clients, n]); setNewCl(""); } }}>+ Add</button>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="card" style={{ marginBottom:22 }}>
        <div className="g2" style={{ marginBottom:14 }}>
          {[
            { k:"client", l:"Client *", el:"datalist", ph:"Type or select..." },
            { k:"title",  l:"Video Title *", ph:"e.g. How I Made $10k" },
            { k:"rawLink", l:"Raw File Link", ph:"Google Drive / Dropbox URL" },
            { k:"doneLink", l:"Done File Link", ph:"Exported / delivered URL" },
          ].map(({ k, l, ph, el }) => (
            <div key={k}>
              <label className="lbl">{l}</label>
              <input className="inp" placeholder={ph} value={form[k]}
                onChange={e => F(k, e.target.value)}
                list={el === "datalist" ? "cl-list" : undefined}
              />
              {el === "datalist" && <datalist id="cl-list">{clients.map(c => <option key={c} value={c} />)}</datalist>}
            </div>
          ))}

          <div>
            <label className="lbl">Status</label>
            <select className="inp" value={form.status} onChange={e => F("status", e.target.value)}>
              {SL.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="lbl">Priority</label>
            <select className="inp" value={form.priority} onChange={e => F("priority", e.target.value)}>
              {PL.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="lbl">Deadline</label>
            <input type="date" className="inp" value={form.deadline} onChange={e => F("deadline", e.target.value)} />
          </div>
        </div>

        {/* Payment */}
        <div style={{ borderTop:"1px solid #f4f4f5", paddingTop:14, marginBottom:14 }}>
          <div style={{ fontSize:10, fontWeight:700, color:"#a1a1aa", letterSpacing:1.5, textTransform:"uppercase", marginBottom:12 }}>
            💰 Payment Details — auto-syncs to Earnings
          </div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"flex-end" }}>
            <div style={{ minWidth:150 }}>
              <label className="lbl">Rate Type</label>
              <select className="inp" value={form.rateType} onChange={e => F("rateType", e.target.value)}>
                <option value="per_video">Per Video (fixed)</option>
                <option value="per_min">Per Minute</option>
              </select>
            </div>
            <div style={{ minWidth:90 }}>
              <label className="lbl">{form.rateType === "per_min" ? "$/min" : "$/video"}</label>
              <input type="number" className="inp" min={0} placeholder={form.rateType === "per_min" ? "10" : "100"}
                value={form.rate} onChange={e => F("rate", e.target.value)} />
            </div>
            {form.rateType === "per_min" && (
              <div style={{ minWidth:90 }}>
                <label className="lbl">Length (min)</label>
                <input type="number" className="inp" min={0} placeholder="12"
                  value={form.videoMins} onChange={e => F("videoMins", e.target.value)} />
              </div>
            )}
            <div style={{ minWidth:80 }}>
              <label className="lbl">No. Videos</label>
              <input type="number" className="inp" min={1} placeholder="1"
                value={form.qty} onChange={e => F("qty", e.target.value)} />
            </div>
            {preview !== null && (
              <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:9, padding:"9px 14px" }}>
                <div style={{ fontSize:9, color:"#a1a1aa", textTransform:"uppercase", letterSpacing:1 }}>Total</div>
                <div style={{ fontWeight:800, fontSize:20, color:"#16a34a" }}>${preview}</div>
              </div>
            )}
          </div>

          {(form.status === "Done" || form.status === "Delivered") && (
            <div style={{ marginTop:12, display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
              <span style={{ fontSize:11, fontWeight:700, color:"#16a34a" }}>✓ Will auto-appear in Earnings</span>
              <input type="date" className="inp" style={{ maxWidth:170, fontSize:12, padding:"6px 10px" }}
                value={form.completedDate} onChange={e => F("completedDate", e.target.value)} />
              <span style={{ fontSize:11, color:"#a1a1aa" }}>completion date</span>
            </div>
          )}
        </div>

        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          <button className="btn-primary" onClick={submit}>{editing ? "✓ Update" : "+ Add Project"}</button>
          {editing && (
            <button className="btn-ghost" onClick={() => { setForm({ ...BLANK, client: clients[0] || "" }); setEditing(null); }}>
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:12, alignItems:"center" }}>
        <span style={{ fontSize:10, color:"#a1a1aa", fontWeight:700, letterSpacing:1, textTransform:"uppercase" }}>Client:</span>
        {["All", ...clients].map(c => (
          <button key={c} className="btn-sm"
            style={fCl === c ? { background:"#111", color:"#fff", borderColor:"#111" } : {}}
            onClick={() => setFCl(c)}>{c}</button>
        ))}
        <div style={{ width:1, height:18, background:"#e4e4e4", margin:"0 4px" }} />
        <span style={{ fontSize:10, color:"#a1a1aa", fontWeight:700, letterSpacing:1, textTransform:"uppercase" }}>Status:</span>
        {["All", ...SL].map(s => (
          <button key={s} className="btn-sm"
            style={fSt === s ? { background:"#111", color:"#fff", borderColor:"#111" } : {}}
            onClick={() => setFSt(s)}>{s}</button>
        ))}
      </div>

      <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap", alignItems:"center" }}>
        {SL.map(s => {
          const ct = projects.filter(p => p.status === s).length;
          return ct > 0 ? <Tag key={s} bg={SS[s].bg} c={SS[s].c}>{s} · {ct}</Tag> : null;
        })}
        <span style={{ fontSize:11, color:"#a1a1aa", marginLeft:"auto" }}>{filtered.length} shown</span>
      </div>

      {filtered.length === 0
        ? <div className="card" style={{ textAlign:"center", color:"#d4d4d8", padding:44 }}>No projects match this filter.</div>
        : filtered.map(p => {
          const days  = p.deadline ? Math.ceil((new Date(p.deadline) - new Date()) / 86400000) : null;
          const over  = days !== null && days < 0;
          const warn  = days !== null && days <= 2 && !over;
          const isDone = p.status === "Done" || p.status === "Delivered";
          const earn  = calcProjectEarning(p);
          const borderColor = p.priority === "Urgent" ? "#ef4444" : p.priority === "High" ? "#f97316" : isDone ? "#10b981" : "#e8e8e8";

          return (
            <div key={p.id} className="card" style={{ marginBottom:10, borderLeft:`4px solid ${borderColor}` }}>
              <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center", marginBottom:7 }}>
                    <span style={{ fontWeight:800, fontSize:14 }}>{p.title}</span>
                    <Tag bg={SS[p.status]?.bg || "#f3f4f6"} c={SS[p.status]?.c || "#666"}>{p.status}</Tag>
                    <Tag bg={PS[p.priority]?.bg || "#f9fafb"} c={PS[p.priority]?.c || "#aaa"}>{p.priority}</Tag>
                    {isDone && <Tag bg="#f0fdf4" c="#16a34a">✓ In Earnings</Tag>}
                  </div>
                  <div style={{ display:"flex", gap:12, fontSize:12, color:"#71717a", flexWrap:"wrap", alignItems:"center" }}>
                    <span>👤 <strong style={{ color:"#444" }}>{p.client}</strong></span>
                    {earn > 0 && <span style={{ fontWeight:800, color:"#111" }}>💵 ${earn.toFixed(2)}</span>}
                    {p.rateType && p.rate && (
                      <span style={{ color:"#a1a1aa" }}>
                        {p.rateType === "per_min" ? `$${p.rate}/min · ${p.videoMins || "?"}min × ${p.qty || 1}` : `$${p.rate}/vid × ${p.qty || 1}`}
                      </span>
                    )}
                    {p.completedDate && <span style={{ color:"#10b981", fontWeight:600 }}>✓ {p.completedDate}</span>}
                    {p.deadline && !isDone && (
                      <span style={{ color: over ? "#ef4444" : warn ? "#f59e0b" : "#a1a1aa", fontWeight: over || warn ? 700 : 400 }}>
                        📅 {over ? `${Math.abs(days)}d overdue ⚠` : `${days}d left`}
                      </span>
                    )}
                    {p.rawLink  && <a href={p.rawLink}  target="_blank" rel="noreferrer" style={{ color:"#3b82f6",  fontWeight:600 }}>📁 Raw</a>}
                    {p.doneLink && <a href={p.doneLink} target="_blank" rel="noreferrer" style={{ color:"#16a34a", fontWeight:600 }}>✅ Done</a>}
                  </div>
                </div>
                <div style={{ display:"flex", gap:8, flexShrink:0 }}>
                  <button className="btn-ghost" style={{ fontSize:12, padding:"7px 14px", fontWeight:700 }}
                    onClick={() => { setForm({ ...BLANK, ...p }); setEditing(p.id); setTimeout(() => topRef.current?.scrollIntoView({ behavior:"smooth" }), 50); }}>
                    ✏ Edit
                  </button>
                  <button className="btn-danger" style={{ fontSize:12, padding:"7px 12px" }}
                    onClick={() => saveProjects(projects.filter(x => x.id !== p.id))}>
                    🗑
                  </button>
                </div>
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

/* ─────────────────────────────────────────────────
   EARNINGS
───────────────────────────────────────────────── */
function Earnings({ projects, clients }) {
  const CY = new Date().getFullYear();
  const [year,  setYear]  = useState(CY);
  const [month, setMonth] = useState(new Date().getMonth());
  const [pkr,   setPkr]   = useState(278);
  const [rateStatus, setRateStatus] = useState("Fetching...");
  const [liveOk, setLiveOk] = useState(false);
  const [allData, setAllData] = useState(() => load("uc_earn", {}));
  const [showMore, setShowMore] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const BLANK_FORM = { client: clients[0] || "Jon Mac", rateType:"per_min", rate:"10", title:"", mins:"", qty:"1" };
  const [form, setForm] = useState({ ...BLANK_FORM });
  const F = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const BASE_YEARS = [CY - 1, CY, CY + 1];
  const EXTRA_YEARS = [CY+2, CY+3, CY+4, CY+5].filter(y => y <= 2030);
  const YEARS = showMore ? [...BASE_YEARS, ...EXTRA_YEARS] : BASE_YEARS;

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then(r => r.json())
      .then(d => {
        if (d?.rates?.PKR) { setPkr(d.rates.PKR); setRateStatus(`Live · 1 USD = ${d.rates.PKR.toFixed(2)} PKR`); setLiveOk(true); }
        else setRateStatus("~278 PKR (offline)");
      })
      .catch(() => setRateStatus("~278 PKR (offline)"));
  }, []);

  const KEY = `${year}_${month}`;
  const manualEntries = allData[KEY] || [];

  const autoEntries = (projects || []).filter(p => {
    if (p.status !== "Done" && p.status !== "Delivered") return false;
    const d = new Date(p.completedDate || "");
    return !isNaN(d) && d.getMonth() === month && d.getFullYear() === year;
  }).map(p => {
    const usd = calcProjectEarning(p);
    return { id:"proj_"+p.id, client:p.client, title:p.title, rateType:p.rateType||"per_video",
             rate:p.rate||p.money||"0", mins:p.videoMins||"", qty:p.qty||"1", usd, fromProject:true };
  });

  const entries = [...autoEntries, ...manualEntries];

  const saveEntries = list => {
    const d = { ...allData, [KEY]: list };
    setAllData(d); save("uc_earn", d);
  };

  const calcUSD = e => {
    const r = parseFloat(e.rate) || 0, q = parseFloat(e.qty) || 1;
    if (e.rateType === "per_min") return +(r * (parseFloat(e.mins) || 0) * q).toFixed(2);
    return +(r * q).toFixed(2);
  };

  const addEntry = () => {
    if (!form.client || !form.rate) return;
    const entry = { id: Date.now().toString(), ...form, usd: calcUSD(form) };
    saveEntries([...manualEntries, entry]);
    setForm({ ...BLANK_FORM, client:form.client, rateType:form.rateType, rate:form.rate });
    setShowForm(false);
  };

  const updateEntry = (id, field, val) => {
    saveEntries(manualEntries.map(e => {
      if (e.id !== id) return e;
      const ne = { ...e, [field]: val };
      ne.usd = calcUSD(ne);
      return ne;
    }));
  };

  const totalUSD  = entries.reduce((s, e) => s + (parseFloat(e.usd) || 0), 0);
  const totalPKR  = Math.round(totalUSD * pkr);
  const totalVids = entries.reduce((s, e) => s + (parseFloat(e.qty) || 1), 0);
  const totalMins = entries.reduce((s, e) => s + (parseFloat(e.mins) || 0) * (parseFloat(e.qty) || 1), 0);

  const byClient = {};
  entries.forEach(e => {
    if (!byClient[e.client]) byClient[e.client] = { usd:0, vids:0, mins:0 };
    byClient[e.client].usd  += parseFloat(e.usd) || 0;
    byClient[e.client].vids += parseFloat(e.qty) || 1;
    byClient[e.client].mins += (parseFloat(e.mins) || 0) * (parseFloat(e.qty) || 1);
  });

  return (
    <div>
      <div style={{ fontSize:24, fontWeight:800, letterSpacing:-0.5, color:"#111", marginBottom:4 }}>Earnings Calculator</div>
      <div style={{ fontSize:12, marginBottom:24 }}>
        <span style={{ color: liveOk ? "#10b981" : "#f59e0b", fontWeight:700 }}>●</span>
        <span style={{ color:"#a1a1aa", marginLeft:6 }}>{rateStatus}</span>
      </div>

      {/* Year */}
      <div style={{ marginBottom:14 }}>
        <div className="lbl" style={{ marginBottom:8 }}>Year</div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
          {YEARS.map(y => (
            <button key={y} className="btn-sm"
              style={{ padding:"8px 18px", fontSize:13, fontWeight:700, ...(year === y ? { background:"#111", color:"#fff", borderColor:"#111" } : {}) }}
              onClick={() => setYear(y)}>{y}</button>
          ))}
          <button className="btn-sm"
            style={{ fontSize:11, color:"#a1a1aa", borderStyle:"dashed" }}
            onClick={() => setShowMore(s => !s)}>
            {showMore ? "Show Less ▲" : "+ Up to 2030"}
          </button>
        </div>
      </div>

      {/* Month */}
      <div style={{ marginBottom:24 }}>
        <div className="lbl" style={{ marginBottom:8 }}>Month</div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {MO.map((m, i) => {
            const k = `${year}_${i}`;
            const has = (allData[k] || []).length > 0;
            return (
              <button key={m} className="btn-sm"
                style={{
                  padding:"7px 14px", position:"relative",
                  ...(month === i
                    ? { background:"#111", color:"#fff", borderColor:"#111" }
                    : { color: has?"#111":"#a1a1aa", borderColor: has?"#111":"#e4e4e4", fontWeight: has?700:500 })
                }}
                onClick={() => setMonth(i)}>
                {m}
                {has && month !== i && (
                  <span style={{ position:"absolute", top:3, right:3, width:5, height:5,
                    background:"#10b981", borderRadius:"50%", display:"block" }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary Stats */}
      {entries.length > 0 && (
        <div className="g3" style={{ marginBottom:16 }}>
          {[
            { l:"Videos This Month", v:totalVids, s:"total" },
            { l:"Minutes Edited",    v:Math.round(totalMins)+" min", s:"total" },
            { l:"Earnings",          v:`$${totalUSD.toFixed(2)}`, s:`₨${totalPKR.toLocaleString()}` },
          ].map(st => (
            <div key={st.l} className="card" style={{ borderTop:"3px solid #111" }}>
              <div style={{ fontSize:26, fontWeight:800, color:"#111", lineHeight:1.1 }}>{st.v}</div>
              <div style={{ fontSize:12, fontWeight:700, marginTop:6 }}>{st.l}</div>
              <div style={{ fontSize:11, color:"#a1a1aa", marginTop:2 }}>{st.s}</div>
            </div>
          ))}
        </div>
      )}

      {/* Client Summary */}
      {Object.keys(byClient).length > 0 && (
        <div className="card" style={{ marginBottom:16 }}>
          <div style={{ fontWeight:800, fontSize:14, marginBottom:12 }}>Client Summary — {MO[month]} {year}</div>
          {Object.entries(byClient).map(([cl, data]) => (
            <div key={cl} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"10px 0", borderBottom:"1px solid #f4f4f5", fontSize:13 }}>
              <div>
                <strong>{cl}</strong>
                <span style={{ fontSize:11, color:"#a1a1aa", marginLeft:8 }}>{data.vids} video{data.vids !== 1?"s":""} · {Math.round(data.mins)} min</span>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontWeight:800 }}>${data.usd.toFixed(2)}</div>
                <div style={{ fontSize:11, color:"#a1a1aa" }}>₨{Math.round(data.usd * pkr).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Header + Add Button */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <div style={{ fontWeight:800, fontSize:15 }}>Projects — {MO[month]} {year}</div>
        <button className="btn-primary" style={{ fontSize:12 }} onClick={() => setShowForm(s => !s)}>
          {showForm ? "✕ Cancel" : "+ Add Project"}
        </button>
      </div>

      {/* Add Entry Form */}
      {showForm && (
        <div className="card" style={{ marginBottom:16, background:"#fafafa", border:"1.5px dashed #d4d4d4" }}>
          <div style={{ fontWeight:700, fontSize:13, marginBottom:14 }}>New Entry</div>
          <div className="g2" style={{ marginBottom:12 }}>
            <div>
              <label className="lbl">Client</label>
              <input className="inp" list="earn-cl" value={form.client} onChange={e => F("client", e.target.value)} placeholder="Client name" />
              <datalist id="earn-cl">{clients.map(c => <option key={c} value={c} />)}</datalist>
            </div>
            <div>
              <label className="lbl">Video Title</label>
              <input className="inp" placeholder="e.g. How to Make $10k" value={form.title} onChange={e => F("title", e.target.value)} />
            </div>
            <div>
              <label className="lbl">Rate Type</label>
              <select className="inp" value={form.rateType} onChange={e => F("rateType", e.target.value)}>
                <option value="per_min">Per Minute ($/min)</option>
                <option value="per_video">Per Video (fixed)</option>
              </select>
            </div>
            <div>
              <label className="lbl">{form.rateType === "per_min" ? "Rate per Minute ($)" : "Rate per Video ($)"}</label>
              <input type="number" className="inp" min={0} placeholder="10" value={form.rate} onChange={e => F("rate", e.target.value)} />
            </div>
            {form.rateType === "per_min" && (
              <div>
                <label className="lbl">Video Length (minutes)</label>
                <input type="number" className="inp" min={0} placeholder="12" value={form.mins} onChange={e => F("mins", e.target.value)} />
              </div>
            )}
            <div>
              <label className="lbl">Number of Videos</label>
              <input type="number" className="inp" min={1} placeholder="1" value={form.qty} onChange={e => F("qty", e.target.value)} />
            </div>
          </div>

          {form.rate && (
            <div style={{ background:"#fff", border:"1px solid #e8e8e8", borderRadius:9, padding:"10px 14px", marginBottom:14, fontSize:13 }}>
              <span style={{ color:"#a1a1aa" }}>Preview: </span>
              <strong>
                {form.rateType === "per_min"
                  ? `$${form.rate}/min × ${form.mins||0}min × ${form.qty||1} = $${(parseFloat(form.rate||0)*parseFloat(form.mins||0)*parseFloat(form.qty||1)).toFixed(2)}`
                  : `$${form.rate}/video × ${form.qty||1} = $${(parseFloat(form.rate||0)*parseFloat(form.qty||1)).toFixed(2)}`}
              </strong>
              <span style={{ color:"#a1a1aa", marginLeft:8 }}>
                · ₨{Math.round(calcUSD(form) * pkr).toLocaleString()}
              </span>
            </div>
          )}
          <button className="btn-primary" onClick={addEntry}>✓ Add Entry</button>
        </div>
      )}

      {/* Entries */}
      {entries.length === 0 ? (
        <div className="card" style={{ textAlign:"center", padding:"40px 20px", color:"#d4d4d8" }}>
          <div style={{ fontSize:36, marginBottom:10 }}>📊</div>
          <div style={{ fontWeight:700, fontSize:14, marginBottom:4 }}>No entries for {MO[month]} {year}</div>
          <div style={{ fontSize:12 }}>Click "+ Add Project" to log a video project</div>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {entries.map((e, idx) => {
            const usd = parseFloat(e.usd) || 0;
            return (
              <div key={e.id} className="card" style={{ borderLeft:`4px solid ${usd > 0 ? "#111" : "#e8e8e8"}` }}>
                <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                  <div style={{
                    width:28, height:28, borderRadius:7, flexShrink:0,
                    background: e.fromProject ? "#10b981" : "#111",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color:"#fff", fontSize:11, fontWeight:800
                  }}>
                    {e.fromProject ? "✓" : idx + 1 - autoEntries.length}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center", marginBottom:8 }}>
                      {e.fromProject
                        ? <>
                            <span style={{ fontWeight:700, fontSize:13 }}>{e.title || "(no title)"}</span>
                            <Tag bg="#f0fdf4" c="#16a34a">Auto · Project</Tag>
                          </>
                        : <>
                            <input className="inp" style={{ flex:"1 1 160px", fontWeight:700, padding:"5px 10px", fontSize:13 }}
                              value={e.title} placeholder="Video title..."
                              onChange={ev => updateEntry(e.id, "title", ev.target.value)} />
                            <input className="inp" style={{ width:115, padding:"5px 10px", fontSize:12 }}
                              list={`ec-${e.id}`} value={e.client} placeholder="Client"
                              onChange={ev => updateEntry(e.id, "client", ev.target.value)} />
                            <datalist id={`ec-${e.id}`}>{clients.map(c => <option key={c} value={c} />)}</datalist>
                          </>
                      }
                    </div>
                    {!e.fromProject && (
                      <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
                        <select className="inp" style={{ width:130, padding:"5px 9px", fontSize:12 }}
                          value={e.rateType} onChange={ev => updateEntry(e.id, "rateType", ev.target.value)}>
                          <option value="per_min">Per Minute</option>
                          <option value="per_video">Per Video</option>
                        </select>
                        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                          <span style={{ fontSize:11, color:"#a1a1aa" }}>$</span>
                          <input type="number" className="inp" style={{ width:65, padding:"5px 8px", fontSize:12 }}
                            value={e.rate} placeholder="rate" onChange={ev => updateEntry(e.id, "rate", ev.target.value)} />
                          <span style={{ fontSize:11, color:"#a1a1aa" }}>{e.rateType === "per_min" ? "/min" : "/vid"}</span>
                        </div>
                        {e.rateType === "per_min" && (
                          <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                            <input type="number" className="inp" style={{ width:60, padding:"5px 8px", fontSize:12 }}
                              value={e.mins} placeholder="min" onChange={ev => updateEntry(e.id, "mins", ev.target.value)} />
                            <span style={{ fontSize:11, color:"#a1a1aa" }}>min</span>
                          </div>
                        )}
                        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                          <span style={{ fontSize:11, color:"#a1a1aa" }}>×</span>
                          <input type="number" className="inp" style={{ width:55, padding:"5px 8px", fontSize:12 }}
                            value={e.qty} min={1} placeholder="qty" onChange={ev => updateEntry(e.id, "qty", ev.target.value)} />
                          <span style={{ fontSize:11, color:"#a1a1aa" }}>vid</span>
                        </div>
                      </div>
                    )}
                    {e.fromProject && (
                      <div style={{ fontSize:11, color:"#a1a1aa", marginTop:4 }}>
                        {e.client} · {e.rateType === "per_min" ? `$${e.rate}/min × ${e.mins||"?"}min × ${e.qty||1}` : `$${e.rate}/vid × ${e.qty||1}`}
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontWeight:800, fontSize:18, color: usd > 0 ? "#111" : "#d4d4d8" }}>${usd.toFixed(2)}</div>
                    <div style={{ fontSize:11, color:"#a1a1aa", marginBottom:8 }}>₨{Math.round(usd * pkr).toLocaleString()}</div>
                    {!e.fromProject && (
                      <button className="btn-danger" style={{ padding:"5px 10px", fontSize:11 }}
                        onClick={() => saveEntries(manualEntries.filter(x => x.id !== e.id))}>🗑</button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Grand Total */}
      {entries.length > 0 && (
        <div className="card" style={{ background:"#111", color:"#fff", marginTop:18 }}>
          <div style={{ fontSize:10, letterSpacing:2, color:"#444", textTransform:"uppercase", fontWeight:700, marginBottom:6 }}>
            {MO[month]} {year} — Total
          </div>
          <div style={{ fontWeight:800, fontSize:52, lineHeight:1 }}>${totalUSD.toFixed(2)}</div>
          <div style={{ fontSize:20, color:"#333", marginTop:8 }}>₨ {totalPKR.toLocaleString()}</div>
          <div style={{ fontSize:12, color:"#444", marginTop:8 }}>
            {totalVids} video{totalVids !== 1 ? "s" : ""} · {Math.round(totalMins)} min edited
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────
   OUTREACH
───────────────────────────────────────────────── */
function Outreach({ clients }) {
  const [sub, setSub]   = useState("email");
  const [n, setN]       = useState("");
  const [ch, setCh]     = useState("");
  const [ni, setNi]     = useState("");
  const [vt, setVt]     = useState("");
  const [gen, setGen]   = useState("");
  const [load, setLoad] = useState(false);
  const [copied, copy]  = useCopy();

  const STYLES_LIST = [
    "conversational and warm","professional and concise","curious and helpful",
    "data-driven mentioning retention stats","storytelling opening","short under 80 words",
    "value-first approach","problem-solution format"
  ];

  const TMPLS = [
    { n:1, sub:"Quick idea to improve your video retention",   body:(n,ch,ni,vt)=>`Hi ${n||"[Name]"},\n\nI recently watched your video about ${vt||"your recent upload"} and genuinely liked the way you explained the topic.\n\nI'm a video editor who works with YouTube creators, and while watching I noticed a few small editing improvements that could help increase viewer retention.\n\nIf you're open to it, I'd love to share a few quick ideas or edit a short sample.\n\nBest,\nUsman\nUsman Crealfex` },
    { n:2, sub:"Small editing ideas for your YouTube channel",  body:(n,ch,ni,vt)=>`Hi ${n||"[Name]"},\n\nI came across your channel in the ${ni||"YouTube"} space and your content caught my attention.\n\nI'm a YouTube video editor and noticed a few opportunities where editing could make the videos more engaging, especially in the first 30 seconds.\n\nIf you'd like, I can share a few suggestions or a quick sample edit.\n\nBest,\nUsman\nUsman Crealfex` },
    { n:3, sub:"Loved your recent video",                       body:(n,ch,ni,vt)=>`Hi ${n||"[Name]"},\n\nI just watched your video on ${vt||"your recent upload"} and really enjoyed it. Your ideas are strong.\n\nAs a video editor, I noticed a few areas where pacing and motion graphics could help improve engagement.\n\nHappy to show you a quick example if you're interested.\n\nBest,\nUsman\nUsman Crealfex` },
    { n:4, sub:"Quick suggestion for your next video",         body:(n,ch,ni,vt)=>`Hi ${n||"[Name]"},\n\nI discovered your channel${ch?` (${ch})`:""} recently. Your content is interesting and you clearly understand your niche.\n\nI'm a video editor focused on improving viewer retention through better pacing and visual storytelling.\n\nI'd love to share a few ideas if you're open to it.\n\nBest,\nUsman\nUsman Crealfex` },
    { n:5, sub:"Idea to make your videos more engaging",       body:(n,ch,ni,vt)=>`Hi ${n||"[Name]"},\n\nI came across your channel and enjoyed watching your content. The topic and delivery are solid.\n\nI work as a YouTube video editor and noticed improvements that could make your videos feel more dynamic.\n\nHappy to send a short edit example.\n\nBest,\nUsman\nUsman Crealfex` },
    { n:6, sub:"Quick editing idea for your channel",          body:(n,ch,ni,vt)=>`Hi ${n||"[Name]"},\n\nI watched your recent upload — great content in the ${ni||"content creation"} space.\n\nI specialize in YouTube editing and noticed ways the pacing could be improved to increase retention.\n\nInterested? I can show you a quick sample.\n\nBest,\nUsman\nUsman Crealfex` },
    { n:7, sub:"Loved your content",                           body:(n,ch,ni,vt)=>`Hi ${n||"[Name]"},\n\nI found your channel recently and really like the direction you're taking.\n\nI'm a video editor who helps creators improve through better pacing, storytelling, and visuals.\n\nWould love to share a few ideas if you're open.\n\nBest,\nUsman\nUsman Crealfex` },
    { n:8, sub:"Editing support for your YouTube channel",     body:(n,ch,ni,vt)=>`Hi ${n||"[Name]"},\n\nI came across your channel and enjoyed your videos. Strong content and interesting topics.\n\nI work with YouTubers to improve their videos through editing focused on engagement and retention.\n\nIf you're open, I'd love to help or share a few suggestions.\n\nBest,\nUsman\nUsman Crealfex` },
  ];

  const DMS = [
    {n:1,l:"Simple",    t:"Hi! I'm a video editor. I can help improve your videos. Let me know if you'd like to work together."},
    {n:2,l:"Friendly",  t:"Hey, I really like your content! I'm a video editor and I can make your videos even better. Let me know!"},
    {n:3,l:"Ultra Short",t:"Hey! I'm a video editor. Available if you ever need editing help."},
    {n:4,l:"Value ⭐",  t:"Hey! I'm a video editor. I help creators get better watch time and retention. Let me know if you're open!"},
    {n:5,l:"Direct",    t:"Hey! I'm a video editor. I can edit your videos and improve content quality. Let me know!"},
    {n:6,l:"Growth",    t:"Hey! I'm a video editor who helps creators grow through better editing. Interested?"},
    {n:7,l:"Professional",t:"Hello! I'm a professional video editor with 50+ satisfied clients. I'd love to help improve your videos."},
    {n:8,l:"Appreciation",t:"Hey, I really enjoy your content! I'm a video editor and can take your videos to the next level."},
    {n:9,l:"Collaboration",t:"Hey! I'm a video editor looking to collaborate with great creators. Let's talk!"},
    {n:10,l:"Confident", t:"Hey! I'm a video editor who makes videos more engaging and shareable. Let me know!"},
  ];

  const aiGen = async () => {
    if (!n.trim()) { alert("Creator name is required!"); return; }
    setLoad(true);
    const style = STYLES_LIST[Math.floor(Math.random() * STYLES_LIST.length)];
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:500,
          messages:[{ role:"user", content:`Write a cold email from Usman Ghani (Usman Crealfex, professional YouTube video editor, Pakistan, 50+ clients) to:
Creator: ${n}
Channel: ${ch || n+"'s channel"}
Niche: ${ni || "general YouTube"}
Video topic: ${vt || "their recent video"}
STYLE: ${style}
Rules: under 130 words, genuine, mention retention/watch time, offer free sample, end "Best,\\nUsman\\nUsman Crealfex"
FORMAT: Subject: [subject]\\n\\n[body]
Output ONLY the email.` }]
        })
      });
      const d = await r.json();
      setGen(d.content?.[0]?.text || "Error. Try again.");
    } catch { setGen("Network error."); }
    setLoad(false);
  };

  return (
    <div>
      <div style={{ fontSize:24, fontWeight:800, letterSpacing:-0.5, color:"#111", marginBottom:20 }}>Outreach</div>

      <div style={{ display:"flex", gap:8, marginBottom:22 }}>
        {[["email","✉ Cold Emails"],["dm","💬 Instagram DMs"]].map(([id, lbl]) => (
          <button key={id} className="btn-ghost"
            style={{ fontWeight:700, fontSize:13, ...(sub === id ? { background:"#111", color:"#fff", borderColor:"#111" } : {}) }}
            onClick={() => setSub(id)}>{lbl}</button>
        ))}
      </div>

      {sub === "email" && (
        <>
          <div className="card" style={{ marginBottom:18 }}>
            <div style={{ fontWeight:800, fontSize:15, marginBottom:14 }}>✨ AI Email Generator</div>
            <div className="g2" style={{ marginBottom:14 }}>
              <div><label className="lbl">Creator Name *</label><input className="inp" placeholder="John Smith" value={n} onChange={e => setN(e.target.value)} /></div>
              <div><label className="lbl">Channel Name</label><input className="inp" placeholder="Wealth Hacker" value={ch} onChange={e => setCh(e.target.value)} /></div>
              <div><label className="lbl">Niche</label><input className="inp" placeholder="Finance, Fitness, Tech..." value={ni} onChange={e => setNi(e.target.value)} /></div>
              <div><label className="lbl">Recent Video Topic</label><input className="inp" placeholder="How to invest $1000" value={vt} onChange={e => setVt(e.target.value)} /></div>
            </div>
            <button className="btn-primary" style={{ opacity: load ? .65 : 1 }} onClick={aiGen} disabled={load}>
              {load ? "Generating..." : "✨ Generate (Different Style Each Time)"}
            </button>
            {gen && (
              <div style={{ marginTop:16, padding:"14px 16px", background:"#fafafa", borderRadius:10, border:"1px solid #e8e8e8" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10, alignItems:"center" }}>
                  <span style={{ fontWeight:800, fontSize:13 }}>Generated Email</span>
                  <button className="btn-sm" onClick={() => copy(gen, "ai")}>{copied === "ai" ? "✓ Copied!" : "Copy"}</button>
                </div>
                <pre style={{ fontSize:13, lineHeight:1.75, whiteSpace:"pre-wrap", color:"#333" }}>{gen}</pre>
              </div>
            )}
          </div>

          <div style={{ fontWeight:800, fontSize:15, marginBottom:12 }}>8 Ready Templates</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:12 }}>
            {TMPLS.map(t => {
              const body = t.body(n, ch, ni, vt);
              const full = `Subject: ${t.sub}\n\n${body}`;
              return (
                <div key={t.n} className="card" style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <div>
                      <div style={{ fontSize:10, fontWeight:700, color:"#a1a1aa", letterSpacing:1, textTransform:"uppercase" }}>Template {t.n}</div>
                      <div style={{ fontWeight:800, fontSize:13, marginTop:3, lineHeight:1.3 }}>{t.sub}</div>
                    </div>
                    <button className="btn-sm" style={{ flexShrink:0, marginLeft:8 }}
                      onClick={() => copy(full, `t${t.n}`)}>{copied === `t${t.n}` ? "✓" : "Copy"}</button>
                  </div>
                  <pre style={{ fontSize:12, lineHeight:1.65, whiteSpace:"pre-wrap", color:"#555", maxHeight:150, overflow:"auto" }}>{body}</pre>
                </div>
              );
            })}
          </div>
        </>
      )}

      {sub === "dm" && (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {DMS.map(dm => (
            <div key={dm.n} className="card" style={{ display:"flex", gap:14, alignItems:"center" }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:10, fontWeight:700, color:"#a1a1aa", letterSpacing:1, textTransform:"uppercase", marginBottom:5 }}>
                  Option {dm.n} · {dm.l}
                </div>
                <div style={{ fontSize:13.5, color:"#333", lineHeight:1.65 }}>{dm.t}</div>
              </div>
              <button className="btn-sm" style={{ flexShrink:0, minWidth:58 }}
                onClick={() => copy(dm.t, `dm${dm.n}`)}>{copied === `dm${dm.n}` ? "✓" : "Copy"}</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────
   MESSAGES
───────────────────────────────────────────────── */
function Messages() {
  const [copied, copy] = useCopy();
  const TC = {
    "Boundary":    { bg:"#fff1f2", c:"#be123c" },
    "Status":      { bg:"#fef9c3", c:"#a16207" },
    "Professional":{ bg:"#eff6ff", c:"#2563eb" },
    "Delivery":    { bg:"#f0fdf4", c:"#16a34a" },
    "Invoice":     { bg:"#f5f3ff", c:"#7c3aed" },
    "Intro":       { bg:"#f0f9ff", c:"#0369a1" },
    "Follow-up":   { bg:"#fdf4ff", c:"#9333ea" },
  };
  const MSGS = [
    { id:"footage",   title:"Footage Request (2–3 Days Early)",  tag:"Boundary",     text:"Just a quick note so our workflow stays smooth. It would be great if you could send the footage at least 2–3 days before the deadline. This helps me organize the edit properly and make sure the final video quality is solid." },
    { id:"queue",     title:"In Queue / Progress Update",         tag:"Status",       text:"I currently have a few projects in the queue, so I'm working on them in order. I'll start working on your video right after I finish the current one and will keep you updated on the progress." },
    { id:"delay",     title:"Deadline Extension Request",         tag:"Professional", text:"I want to make sure the video turns out great, so would it be okay if we move the delivery to [new day]? That will give me enough time to polish everything properly." },
    { id:"late_footage",title:"Late Footage Received",            tag:"Boundary",     text:"Hey! Just a heads up — I received the footage later than expected. I'll do my best to deliver on time, but it might be a day or two later than our original deadline. I'll keep you posted!" },
    { id:"revision",  title:"Revision Limit Notice",              tag:"Boundary",     text:"I want to make sure we're aligned — our package includes [X] rounds of revisions. I've completed [X] so far. Any additional revisions would be charged separately. Let me know how you'd like to proceed!" },
    { id:"delivered", title:"Video Delivered 🎬",                 tag:"Delivery",     text:"Hey! Your video is ready. Here's the link: [LINK]\n\nPlease review it and let me know if you have any feedback within [X] days. After that, I'll consider the project complete. Hope you love it! 🎬" },
    { id:"payment",   title:"Payment Reminder",                   tag:"Invoice",      text:"Hey! Just a friendly reminder about the payment for [Video Title]. The amount is $[X]. You can send it via [payment method]. Let me know if you have any questions. Thanks!" },
    { id:"intro",     title:"New Client Introduction",            tag:"Intro",        text:"Hey [Name]! I'm Usman from Usman Crealfex. I'm a professional YouTube video editor with 50+ satisfied clients. I specialize in improving watch time, retention, and hook quality. Looking forward to working with you!" },
    { id:"feedback",  title:"Feedback Request",                   tag:"Follow-up",    text:"Hey [Name]! Hope you're happy with the final video. Could you take a moment to share your thoughts on the edit? Any feedback helps me deliver even better results next time!" },
    { id:"rate",      title:"Rate Increase Notice",               tag:"Professional", text:"Hey [Name]! I wanted to give you a heads up that starting [date], my editing rate will be updated to $[new rate]. I really enjoy working with you and wanted to let you know in advance." },
    { id:"unavail",   title:"Currently Unavailable / Fully Booked", tag:"Boundary",  text:"Hey [Name]! I'm currently fully booked until [date]. I'd love to work with you — can we schedule your project to start after that date?" },
    { id:"start",     title:"Starting Your Project",              tag:"Status",       text:"Hey [Name]! Just wanted to let you know I've started working on your video [Title]. I'll keep you updated as I progress. Expected delivery: [date]." },
    { id:"invoice_sent",title:"Invoice Sent",                     tag:"Invoice",      text:"Hey [Name]! I've sent the invoice for [Project Name]. Total: $[X]. Please review it and let me know if you have any questions. Payment via [method] is preferred." },
  ];

  return (
    <div>
      <div style={{ fontSize:24, fontWeight:800, letterSpacing:-0.5, color:"#111", marginBottom:6 }}>Message Templates</div>
      <div style={{ fontSize:13, color:"#a1a1aa", marginBottom:22 }}>Ready-to-copy. Customize [brackets] before sending.</div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {MSGS.map(m => (
          <div key={m.id} className="card">
            <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:8, flexWrap:"wrap" }}>
                  <span style={{ fontWeight:800, fontSize:14 }}>{m.title}</span>
                  <Tag bg={(TC[m.tag]||{bg:"#f3f4f6"}).bg} c={(TC[m.tag]||{c:"#666"}).c}>{m.tag}</Tag>
                </div>
                <pre style={{ fontSize:13, lineHeight:1.75, whiteSpace:"pre-wrap", color:"#444" }}>{m.text}</pre>
              </div>
              <button className="btn-ghost" style={{ flexShrink:0, minWidth:70, padding:"8px 14px", fontWeight:700 }}
                onClick={() => copy(m.text, m.id)}>
                {copied === m.id ? "✓ Copied" : "Copy"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   CONVERTER
───────────────────────────────────────────────── */
function Converter() {
  const [usd, setUsd] = useState("");
  const [pkr, setPkr] = useState("");
  const [rate, setRate] = useState(278);
  const [status, setStatus] = useState("Fetching...");
  const [live, setLive] = useState(false);

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then(r => r.json())
      .then(d => {
        if (d?.rates?.PKR) {
          setRate(d.rates.PKR);
          setStatus(`Live · 1 USD = ${d.rates.PKR.toFixed(2)} PKR · ${new Date().toLocaleTimeString()}`);
          setLive(true);
        } else setStatus("~278 PKR (offline)");
      })
      .catch(() => setStatus("~278 PKR (offline)"));
  }, []);

  const onUsd = v => { setUsd(v); setPkr(v ? Math.round(parseFloat(v) * rate).toString() : ""); };
  const onPkr = v => { setPkr(v); setUsd(v ? (parseFloat(v) / rate).toFixed(2) : ""); };

  return (
    <div>
      <div style={{ fontSize:24, fontWeight:800, letterSpacing:-0.5, color:"#111", marginBottom:6 }}>USD / PKR Converter</div>
      <div style={{ fontSize:12, marginBottom:24 }}>
        <span style={{ color: live ? "#10b981" : "#f59e0b", fontWeight:700 }}>●</span>
        <span style={{ color:"#a1a1aa", marginLeft:6 }}>{status}</span>
      </div>

      <div className="card" style={{ maxWidth:420, marginBottom:22 }}>
        <label className="lbl">US Dollar (USD $)</label>
        <input type="number" className="inp" placeholder="0"
          style={{ fontWeight:800, fontSize:32, height:68, padding:"10px 16px", marginBottom:14 }}
          value={usd} onChange={e => onUsd(e.target.value)} />
        <div style={{ textAlign:"center", fontSize:24, color:"#d4d4d8", marginBottom:14 }}>⇅</div>
        <label className="lbl">Pakistani Rupee (PKR ₨)</label>
        <input type="number" className="inp" placeholder="0"
          style={{ fontWeight:800, fontSize:32, height:68, padding:"10px 16px" }}
          value={pkr} onChange={e => onPkr(e.target.value)} />
      </div>

      <div className="card" style={{ marginBottom:16 }}>
        <div style={{ fontWeight:800, fontSize:14, marginBottom:12 }}>Quick Amounts</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {[10, 30, 50, 100, 120, 200, 500, 1000].map(p => (
            <button key={p} className="btn-ghost" style={{ padding:"9px 14px", textAlign:"center" }}
              onClick={() => onUsd(p.toString())}>
              <div style={{ fontWeight:800, fontSize:14 }}>${p}</div>
              <div style={{ fontSize:10, color:"#a1a1aa" }}>₨{Math.round(p * rate).toLocaleString()}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight:800, fontSize:14, marginBottom:12 }}>Client Rates in PKR</div>
        {[
          ["Jon Mac",100,"regular video"],
          ["Jon Mac",120,"sponsored"],
          ["Shrey",30,"min/video"],
          ["Shrey",50,"max/video"],
          ["Tyler",100,"10-min video"],
          ["Danny Rio",100,"10-min video"],
        ].map(([c, u, n], i, a) => (
          <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
            padding:"10px 0", borderBottom: i < a.length - 1 ? "1px solid #f4f4f5" : "none", fontSize:13 }}>
            <span><strong>{c}</strong> <span style={{ color:"#a1a1aa", fontSize:11 }}>({n})</span></span>
            <span style={{ fontWeight:800 }}>${u} = <span style={{ color:"#10b981" }}>₨{Math.round(u * rate).toLocaleString()}</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}