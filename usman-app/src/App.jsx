import { useState, useEffect, useRef } from "react";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;

const G = {
  page: { padding: "28px 32px", maxWidth: 980, fontFamily: "'Plus Jakarta Sans', sans-serif" },
  H1: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: -0.3, color: "#0a0a0a", marginBottom: 4 },
  H2: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, color: "#0a0a0a", marginBottom: 14 },
  card: { background: "#fff", border: "1px solid #ebebeb", borderRadius: 12, padding: "20px 22px", boxShadow: "0 1px 5px rgba(0,0,0,0.04)" },
  input: { width: "100%", padding: "10px 13px", border: "1.5px solid #e4e4e4", borderRadius: 8, fontSize: 13.5, background: "#fff", outline: "none", fontFamily: "'DM Sans', sans-serif", color: "#0a0a0a" },
  label: { fontSize: 10.5, fontWeight: 700, color: "#999", letterSpacing: 1, marginBottom: 5, display: "block", textTransform: "uppercase" },
  btnPrimary: { padding: "11px 22px", background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
  btnDanger: { padding: "9px 16px", background: "#fff1f2", color: "#be123c", border: "1.5px solid #fecdd3", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
  btnGhost: { padding: "9px 16px", background: "#fff", color: "#0a0a0a", border: "1.5px solid #e4e4e4", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
  btnSm: { padding: "6px 13px", background: "#fff", color: "#0a0a0a", border: "1px solid #e4e4e4", borderRadius: 6, fontSize: 11.5, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 },
  tag: (bg, c) => ({ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: bg, color: c, display: "inline-block", whiteSpace: "nowrap" }),
};

const SS = {
  "Not Started": { bg: "#f3f4f6", color: "#6b7280" },
  "In Progress": { bg: "#fef9c3", color: "#a16207" },
  "Review": { bg: "#eff6ff", color: "#2563eb" },
  "Done": { bg: "#f0fdf4", color: "#16a34a" },
  "Delivered": { bg: "#0a0a0a", color: "#fff" },
};
const PS = {
  "Urgent": { bg: "#fff1f2", color: "#be123c" },
  "High": { bg: "#fff7ed", color: "#c2410c" },
  "Normal": { bg: "#f9fafb", color: "#6b7280" },
  "Low": { bg: "#f9fafb", color: "#d1d5db" },
};
const SL = ["Not Started","In Progress","Review","Done","Delivered"];
const PL = ["Urgent","High","Normal","Low"];

function useCopy() {
  const [copied, setCopied] = useState("");
  const copy = (text, id) => {
    try { navigator.clipboard.writeText(text); } catch {}
    setCopied(id); setTimeout(() => setCopied(""), 2000);
  };
  return [copied, copy];
}

function dbLoad(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function dbSave(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {}
}

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState(["Jon Mac","Shrey","Tyler","Danny Rio"]);

  useEffect(() => {
setProjects(dbLoad("uc3_proj", []));
setClients(dbLoad("uc3_clients", ["Jon Mac","Shrey","Tyler","Danny Rio"]));
  }, []);
dbLoad("uc3_earn2",{}).then
  const saveProjects = (d) => { setProjects(d); dbSave("uc3_proj", d); };
  const saveClients = (d) => { setClients(d); dbSave("uc3_clients", d); };

  const NAV = [
    { id: "dashboard", icon: "◈", label: "Dashboard" },
    { id: "projects", icon: "▦", label: "Projects" },
    { id: "earnings", icon: "◎", label: "Earnings" },
    { id: "outreach", icon: "✉", label: "Outreach" },
    { id: "messages", icon: "◻", label: "Messages" },
    { id: "chat", icon: "◆", label: "AI Chat" },
    { id: "translate", icon: "⇄", label: "Translate" },
    { id: "converter", icon: "◉", label: "USD / PKR" },
  ];

  const urgentCount = projects.filter(p => p.priority === "Urgent" && p.status !== "Delivered").length;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f5f5" }}>
      <style>{`
        ${FONT_IMPORT}
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:4px; height:4px; }
        ::-webkit-scrollbar-thumb { background:#d4d4d4; border-radius:4px; }
        input:focus,textarea:focus,select:focus { border-color:#0a0a0a!important; box-shadow:0 0 0 3px rgba(0,0,0,0.06); }
        button:hover { opacity:.87; }
        button:active { transform:scale(0.98); }
      `}</style>

      <aside style={{ width:215, background:"#0a0a0a", display:"flex", flexDirection:"column", position:"sticky", top:0, height:"100vh", flexShrink:0 }}>
        <div style={{ padding:"24px 20px 18px", borderBottom:"1px solid #1c1c1c" }}>
          <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:19, letterSpacing:2, color:"#fff" }}>USMAN</div>
          <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:10, letterSpacing:4.5, color:"#3a3a3a", marginTop:1 }}>CREALFEX</div>
          <div style={{ fontSize:10.5, color:"#383838", marginTop:8, lineHeight:1.7 }}>50+ Clients · Pakistan<br/>Pro Video Editor</div>
        </div>
        <nav style={{ flex:1, padding:"10px 0", overflowY:"auto" }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)} style={{
              width:"100%", padding:"10px 20px", display:"flex", alignItems:"center", gap:10,
              background: tab===n.id ? "#fff" : "transparent",
              color: tab===n.id ? "#0a0a0a" : "#555",
              border:"none", textAlign:"left", fontSize:13,
              fontWeight: tab===n.id ? 700 : 500,
              fontFamily:"'DM Sans',sans-serif", cursor:"pointer",
              borderLeft: tab===n.id ? "3px solid #fff" : "3px solid transparent",
            }}>
              <span style={{ fontSize:12 }}>{n.icon}</span>
              {n.label}
              {n.id==="projects" && urgentCount>0 && (
                <span style={{ marginLeft:"auto", background:"#ef4444", color:"#fff", borderRadius:20, fontSize:10, padding:"1px 7px", fontWeight:800 }}>{urgentCount}</span>
              )}
            </button>
          ))}
        </nav>
        <div style={{ padding:"12px 20px 16px", borderTop:"1px solid #1a1a1a" }}>
          <div style={{ fontSize:9.5, color:"#333", lineHeight:1.8 }}>i5 9th · GTX 1660S · 32GB<br/>~2 days/video · 10h/day</div>
        </div>
      </aside>

      <main style={{ flex:1, overflowY:"auto" }}>
        {tab==="dashboard" && <Dashboard projects={projects}/>}
        {tab==="projects" && <Projects projects={projects} saveProjects={saveProjects} clients={clients} saveClients={saveClients}/>}
        {tab==="earnings" && <Earnings clients={clients} projects={projects}/>}
        {tab==="outreach" && <Outreach clients={clients}/>}
        {tab==="messages" && <Messages/>}
        {tab==="chat" && <AIChat/>}
        {tab==="translate" && <Translator/>}
        {tab==="converter" && <Converter/>}
      </main>
    </div>
  );
}

/* ── DASHBOARD ─────────────────────────────────── */
function Dashboard({ projects }) {
  const MO=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const [social,setSocial]=useState({"𝕏 Twitter":false,"Instagram":false,"YouTube":false,"LinkedIn":false,"Pinterest":false});
  const [now,setNow]=useState(new Date());
  useEffect(()=>{const t=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(t);},[]);

  const fmtTime=(tz)=>now.toLocaleTimeString("en-US",{timeZone:tz,hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:true});
  const fmtDate=(tz)=>now.toLocaleDateString("en-US",{timeZone:tz,weekday:"short",month:"short",day:"numeric"});

  const urgent=projects.filter(p=>p.priority==="Urgent"&&p.status!=="Delivered");
  const inProg=projects.filter(p=>p.status==="In Progress");

  const calcP=(p)=>{
    const r=parseFloat(p.rate)||0,q=parseFloat(p.qty)||1,m=parseFloat(p.videoMins)||0;
    if(p.rate){return p.rateType==="per_min"?+(r*m*q).toFixed(2):+(r*q).toFixed(2);}
    return parseFloat(p.money)||0;
  };

  const cm=now.getMonth(),cy=now.getFullYear();
  const thisMonthDone=projects.filter(p=>{
    if(p.status!=="Done"&&p.status!=="Delivered")return false;
    const d=new Date(p.completedDate||p.deadline||"");
    return !isNaN(d)&&d.getMonth()===cm&&d.getFullYear()===cy;
  });
  const monthEarn=thisMonthDone.reduce((s,p)=>s+calcP(p),0);
  const totalEarn=projects.filter(p=>p.status==="Done"||p.status==="Delivered").reduce((s,p)=>s+calcP(p),0);
  const today=now.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});

  return(
    <div style={G.page}>
      <div style={{marginBottom:20}}>
        <div style={{fontSize:11,color:"#bbb",letterSpacing:1.5,textTransform:"uppercase",marginBottom:4}}>{today}</div>
        <div style={G.H1}>Good Day, Usman 👋</div>
        <div style={{fontSize:13,color:"#999",marginTop:2}}>Usman Crealfex · Professional YouTube Video Editor</div>
      </div>

      {/* ── Clocks ── */}
      <div style={{...G.grid2,marginBottom:16}}>
        {[{label:"🇵🇰 Pakistan (PKT)",tz:"Asia/Karachi",acc:"#10b981"},{label:"🇺🇸 New York (EST)",tz:"America/New_York",acc:"#2563eb"}].map(cl=>(
          <div key={cl.tz} style={{...G.card,borderTop:`3px solid ${cl.acc}`}}>
            <div style={{fontSize:10.5,fontWeight:700,color:"#bbb",letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>{cl.label}</div>
            <div style={{fontWeight:800,fontSize:26,letterSpacing:0.5,color:"#0a0a0a",lineHeight:1,fontVariantNumeric:"tabular-nums"}}>{fmtTime(cl.tz)}</div>
            <div style={{fontSize:11,color:"#aaa",marginTop:3}}>{fmtDate(cl.tz)}</div>
          </div>
        ))}
      </div>

      {/* ── Stats ── */}
      <div style={{...G.grid3,marginBottom:16}}>
        {[
          {v:projects.length,l:"Total Projects",s:"all time",acc:"#0a0a0a"},
          {v:inProg.length,l:"In Progress",s:"editing now",acc:"#f59e0b"},
          {v:urgent.length,l:urgent.length?"⚠ Urgent":"All Clear ✓",s:urgent.length?"needs attention!":"no urgent tasks",acc:urgent.length?"#ef4444":"#10b981"},
        ].map(st=>(
          <div key={st.l} style={{...G.card,borderTop:`3px solid ${st.acc}`}}>
            <div style={{fontWeight:800,fontSize:44,color:st.acc,lineHeight:1}}>{st.v}</div>
            <div style={{fontSize:13,fontWeight:700,marginTop:6}}>{st.l}</div>
            <div style={{fontSize:11,color:"#aaa",marginTop:2}}>{st.s}</div>
          </div>
        ))}
      </div>

      {/* ── Earnings ── */}
      <div style={{...G.grid2,marginBottom:16}}>
        <div style={{...G.card,background:"#0a0a0a",color:"#fff"}}>
          <div style={{fontSize:10.5,letterSpacing:2,color:"#444",textTransform:"uppercase",fontWeight:700,marginBottom:4}}>This Month · {MO[cm]}</div>
          <div style={{fontWeight:800,fontSize:44,lineHeight:1,color:monthEarn>0?"#fff":"#333"}}>${monthEarn.toFixed(0)}</div>
          <div style={{fontSize:12,color:"#555",marginTop:6}}>{thisMonthDone.length} video{thisMonthDone.length!==1?"s":""} completed</div>
        </div>
        <div style={{...G.card,borderTop:"3px solid #0a0a0a"}}>
          <div style={{fontSize:10.5,letterSpacing:2,color:"#aaa",textTransform:"uppercase",fontWeight:700,marginBottom:4}}>All Time Earnings</div>
          <div style={{fontWeight:800,fontSize:44,lineHeight:1}}>${totalEarn.toFixed(0)}</div>
          <div style={{fontSize:12,color:"#aaa",marginTop:6}}>from {projects.filter(p=>p.status==="Done"||p.status==="Delivered").length} completed</div>
        </div>
      </div>

      {/* ── Social + Completed this month ── */}
      <div style={{...G.grid2,marginBottom:16}}>
        <div style={G.card}>
          <div style={{...G.H2,fontSize:14,marginBottom:11}}>Daily Post Checklist</div>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {Object.entries(social).map(([p,c])=>(
              <button key={p} onClick={()=>setSocial(prev=>({...prev,[p]:!prev[p]}))} style={{
                display:"flex",alignItems:"center",gap:10,padding:"8px 12px",
                background:c?"#0a0a0a":"#f9f9f9",color:c?"#fff":"#555",
                border:`1.5px solid ${c?"#000":"#e8e8e8"}`,borderRadius:8,
                fontSize:12.5,fontWeight:600,cursor:"pointer",textAlign:"left",fontFamily:"'Plus Jakarta Sans',sans-serif",
              }}>
                <span style={{width:17,height:17,borderRadius:4,background:c?"#fff":"#e4e4e4",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#000",flexShrink:0,fontWeight:900}}>{c?"✓":""}</span>
                {p}{c&&<span style={{marginLeft:"auto",fontSize:10,opacity:0.4}}>posted</span>}
              </button>
            ))}
          </div>
          <div style={{fontSize:11,color:"#aaa",marginTop:10}}>{Object.values(social).filter(Boolean).length}/5 posted today</div>
        </div>
        <div style={G.card}>
          <div style={{...G.H2,fontSize:14,marginBottom:11}}>Completed · {MO[cm]}</div>
          {thisMonthDone.length===0
            ?<div style={{color:"#ddd",fontSize:13}}>No completed videos this month yet.</div>
            :thisMonthDone.map(p=>(
              <div key={p.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #f5f5f5",gap:8}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12.5,fontWeight:700,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.title}</div>
                  <div style={{fontSize:11,color:"#aaa"}}>{p.client}</div>
                </div>
                <div style={{fontWeight:800,fontSize:13,flexShrink:0,color:"#16a34a"}}>${calcP(p).toFixed(0)}</div>
              </div>
            ))
          }
        </div>
      </div>

      {/* ── Recent Projects ── */}
      <div style={G.card}>
        <div style={{...G.H2,fontSize:14}}>Recent Projects</div>
        {projects.length===0?<div style={{color:"#ccc",fontSize:13}}>No projects yet.</div>
          :projects.slice(-8).reverse().map(p=>{
            const days=p.deadline?Math.ceil((new Date(p.deadline)-new Date())/86400000):null;
            return(
              <div key={p.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:"1px solid #f5f5f5"}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13.5,fontWeight:700,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.title}</div>
                  <div style={{fontSize:11.5,color:"#aaa",marginTop:1}}>{p.client}{calcP(p)>0?` · $${calcP(p).toFixed(0)}`:""}</div>
                </div>
                <span style={G.tag(SS[p.status]?.bg||"#f3f4f6",SS[p.status]?.color||"#666")}>{p.status}</span>
                <span style={G.tag(PS[p.priority]?.bg||"#f9f9f9",PS[p.priority]?.color||"#aaa")}>{p.priority}</span>
                {days!==null&&<span style={{fontSize:11,color:days<=1?"#ef4444":days<=3?"#f59e0b":"#bbb",fontWeight:700,whiteSpace:"nowrap"}}>{days<0?`${Math.abs(days)}d over`:`${days}d`}</span>}
              </div>
            );
          })}
      </div>
    </div>
  );
}

/* ── PROJECTS ──────────────────────────────────── */
function Projects({ projects, saveProjects, clients, saveClients }) {
  const blank = { id:"", client:clients[0]||"", title:"", rawLink:"", doneLink:"",
    status:"Not Started", priority:"Normal", deadline:"", money:"",
    rateType:"per_video", rate:"", videoMins:"", qty:"1", completedDate:"" };
  const [form, setForm] = useState({...blank});
  const [editing, setEditing] = useState(null);
  const [fCl, setFCl] = useState("All");
  const [fSt, setFSt] = useState("All");
  const [newCl, setNewCl] = useState("");
  const [showMgr, setShowMgr] = useState(false);
  const topRef = useRef(null);
  const F = (k,v)=>setForm(f=>({...f,[k]:v}));

  const calcMoney=(f)=>{
    const r=parseFloat(f.rate)||0, q=parseFloat(f.qty)||1, m=parseFloat(f.videoMins)||0;
    if(f.rateType==="per_min") return +(r*m*q).toFixed(2);
    return +(r*q).toFixed(2);
  };

  const submit = () => {
    if (!form.title.trim()||!form.client.trim()) return;
    const id = editing||Date.now().toString();
    const isDone = form.status==="Done"||form.status==="Delivered";
    const prevProj = editing ? projects.find(p=>p.id===editing) : null;
    const prevDone = prevProj&&(prevProj.status==="Done"||prevProj.status==="Delivered");
    // Set completedDate when first marked done
    let completedDate = form.completedDate;
    if(isDone && !prevDone && !completedDate) completedDate = new Date().toISOString().slice(0,10);
    if(!isDone) completedDate = "";
    const autoMoney = form.rate ? calcMoney(form).toString() : form.money;
    const final = {...form, id, completedDate, money: autoMoney};
    const updated = editing
      ? projects.map(p=>p.id===editing?final:p)
      : [...projects,final];
    saveProjects(updated);
    setForm({...blank,client:clients[0]||""});
    setEditing(null);
  };

  const deleteProj = (id) => saveProjects(projects.filter(p=>p.id!==id));

  const editProj = (p) => {
    setForm({...blank,...p}); setEditing(p.id);
    setTimeout(()=>topRef.current?.scrollIntoView({behavior:"smooth",block:"start"}),50);
  };

  const addClient = () => {
    const n=newCl.trim(); if(!n||clients.includes(n)) return;
    saveClients([...clients,n]); setNewCl("");
  };
  const rmClient = (c) => {
    if(["Jon Mac","Shrey","Tyler","Danny Rio"].includes(c)) return;
    saveClients(clients.filter(x=>x!==c));
  };

  const filtered = projects.filter(p=>(fCl==="All"||p.client===fCl)&&(fSt==="All"||p.status===fSt)).slice().reverse();

  // Live money preview
  const preview = form.rate ? calcMoney(form) : null;

  return (
    <div style={G.page}>
      <div ref={topRef}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
        <div style={G.H1}>{editing?"✏️ Edit Project":"New Project"}</div>
        <button onClick={()=>setShowMgr(!showMgr)} style={{...G.btnGhost,fontSize:12}}>{showMgr?"✕ Close":"⚙ Manage Clients"}</button>
      </div>

      {showMgr&&(
        <div style={{...G.card,marginBottom:18,background:"#fafafa",border:"1.5px dashed #e0e0e0"}}>
          <div style={{fontWeight:800,fontSize:14,marginBottom:12}}>Client Manager</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:14}}>
            {clients.map(c=>(
              <div key={c} style={{display:"flex",alignItems:"center",gap:6,background:"#fff",border:"1px solid #e4e4e4",borderRadius:7,padding:"6px 12px"}}>
                <span style={{fontSize:12.5,fontWeight:600}}>{c}</span>
                {!["Jon Mac","Shrey","Tyler","Danny Rio"].includes(c)&&(
                  <button onClick={()=>rmClient(c)} style={{border:"none",background:"none",color:"#ef4444",cursor:"pointer",fontSize:13,fontWeight:900,padding:"0 0 0 4px",lineHeight:1}}>✕</button>
                )}
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:10}}>
            <input style={{...G.input,maxWidth:260}} placeholder="New client name..." value={newCl} onChange={e=>setNewCl(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addClient()}/>
            <button style={G.btnPrimary} onClick={addClient}>+ Add Client</button>
          </div>
        </div>
      )}

      <div style={{...G.card,marginBottom:22}}>
        {/* Row 1 */}
        <div style={{...G.grid2,marginBottom:12}}>
          <div>
            <label style={G.label}>Client *</label>
            <input style={G.input} placeholder="Type or select..." value={form.client} onChange={e=>F("client",e.target.value)} list="cl-list"/>
            <datalist id="cl-list">{clients.map(c=><option key={c} value={c}/>)}</datalist>
          </div>
          <div>
            <label style={G.label}>Video Title *</label>
            <input style={G.input} placeholder="e.g. How I Made $10k in 30 Days" value={form.title} onChange={e=>F("title",e.target.value)}/>
          </div>
          <div>
            <label style={G.label}>Raw File Link</label>
            <input style={G.input} placeholder="Google Drive / Dropbox URL" value={form.rawLink} onChange={e=>F("rawLink",e.target.value)}/>
          </div>
          <div>
            <label style={G.label}>Done File Link</label>
            <input style={G.input} placeholder="Exported / delivered URL" value={form.doneLink} onChange={e=>F("doneLink",e.target.value)}/>
          </div>
          <div>
            <label style={G.label}>Status</label>
            <select style={G.input} value={form.status} onChange={e=>F("status",e.target.value)}>
              {SL.map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={G.label}>Priority</label>
            <select style={G.input} value={form.priority} onChange={e=>F("priority",e.target.value)}>
              {PL.map(p=><option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label style={G.label}>Deadline</label>
            <input type="date" style={G.input} value={form.deadline} onChange={e=>F("deadline",e.target.value)}/>
          </div>
        </div>

        {/* Rate section */}
        <div style={{borderTop:"1px solid #f0f0f0",paddingTop:12,marginBottom:12}}>
          <div style={{fontSize:11,fontWeight:700,color:"#bbb",letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>💰 Payment Details (auto-syncs to Earnings)</div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"flex-end"}}>
            <div style={{minWidth:155}}>
              <label style={G.label}>Rate Type</label>
              <select style={G.input} value={form.rateType} onChange={e=>F("rateType",e.target.value)}>
                <option value="per_video">Per Video (fixed)</option>
                <option value="per_min">Per Minute</option>
              </select>
            </div>
            <div style={{minWidth:90}}>
              <label style={G.label}>{form.rateType==="per_min"?"$/min":"$/video"}</label>
              <input type="number" style={G.input} min={0} placeholder={form.rateType==="per_min"?"10":"100"} value={form.rate} onChange={e=>F("rate",e.target.value)}/>
            </div>
            {form.rateType==="per_min"&&(
              <div style={{minWidth:90}}>
                <label style={G.label}>Video Length (min)</label>
                <input type="number" style={G.input} min={0} placeholder="12" value={form.videoMins} onChange={e=>F("videoMins",e.target.value)}/>
              </div>
            )}
            <div style={{minWidth:80}}>
              <label style={G.label}>No. of Videos</label>
              <input type="number" style={G.input} min={1} placeholder="1" value={form.qty} onChange={e=>F("qty",e.target.value)}/>
            </div>
            {preview!==null&&(
              <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8,padding:"8px 14px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                <div style={{fontSize:10,color:"#aaa",textTransform:"uppercase",letterSpacing:0.8}}>Total</div>
                <div style={{fontWeight:800,fontSize:18,color:"#16a34a"}}>${preview}</div>
              </div>
            )}
          </div>
          {(form.status==="Done"||form.status==="Delivered")&&(
            <div style={{marginTop:10,display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:11,fontWeight:700,color:"#16a34a"}}>✓ Will auto-appear in Earnings</span>
              <div style={{minWidth:160}}>
                <input type="date" style={{...G.input,fontSize:12,padding:"6px 10px"}} value={form.completedDate} onChange={e=>F("completedDate",e.target.value)} title="Completion date (for earnings month)"/>
              </div>
              <span style={{fontSize:11,color:"#aaa"}}>completion date</span>
            </div>
          )}
        </div>

        <div style={{display:"flex",gap:10}}>
          <button style={G.btnPrimary} onClick={submit}>{editing?"✓ Update Project":"+ Add Project"}</button>
          {editing&&<button style={G.btnGhost} onClick={()=>{setForm({...blank,client:clients[0]||""});setEditing(null);}}>Cancel</button>}
        </div>
      </div>

      {/* Filters */}
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12,alignItems:"center"}}>
        <span style={{fontSize:10.5,color:"#bbb",fontWeight:700,letterSpacing:0.5}}>CLIENT:</span>
        {["All",...clients].map(c=>(
          <button key={c} onClick={()=>setFCl(c)} style={{...G.btnSm,...(fCl===c?{background:"#0a0a0a",color:"#fff",borderColor:"#000"}:{})}}>{c}</button>
        ))}
        <div style={{width:1,height:18,background:"#e0e0e0",margin:"0 4px"}}/>
        <span style={{fontSize:10.5,color:"#bbb",fontWeight:700,letterSpacing:0.5}}>STATUS:</span>
        {["All",...SL].map(s=>(
          <button key={s} onClick={()=>setFSt(s)} style={{...G.btnSm,...(fSt===s?{background:"#0a0a0a",color:"#fff",borderColor:"#000"}:{})}}>{s}</button>
        ))}
      </div>

      <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
        {SL.map(s=>{const ct=projects.filter(p=>p.status===s).length;return ct>0?<span key={s} style={{...G.tag(SS[s].bg,SS[s].color),fontSize:12}}>{s} · {ct}</span>:null;})}
        <span style={{fontSize:11,color:"#bbb",marginLeft:"auto"}}>{filtered.length} shown</span>
      </div>

      {filtered.length===0
        ?<div style={{...G.card,textAlign:"center",color:"#ccc",padding:40}}>No projects match this filter.</div>
        :filtered.map(p=>{
          const days=p.deadline?Math.ceil((new Date(p.deadline)-new Date())/86400000):null;
          const over=days!==null&&days<0; const warn=days!==null&&days<=2&&!over;
          const isDone=p.status==="Done"||p.status==="Delivered";
          const pMoney=p.money||p.rate?(()=>{
            const r=parseFloat(p.rate)||0,q=parseFloat(p.qty)||1,m=parseFloat(p.videoMins)||0;
            return p.rateType==="per_min"?+(r*m*q).toFixed(2):+(r*q).toFixed(2);
          })():null;
          return (
            <div key={p.id} style={{...G.card,marginBottom:10,borderLeft:`4px solid ${p.priority==="Urgent"?"#ef4444":p.priority==="High"?"#f97316":isDone?"#10b981":"#ebebeb"}`}}>
              <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginBottom:6}}>
                    <span style={{fontWeight:800,fontSize:14}}>{p.title}</span>
                    <span style={G.tag(SS[p.status]?.bg||"#f3f4f6",SS[p.status]?.color||"#666")}>{p.status}</span>
                    <span style={G.tag(PS[p.priority]?.bg||"#f9f9f9",PS[p.priority]?.color||"#aaa")}>{p.priority}</span>
                    {isDone&&<span style={{...G.tag("#f0fdf4","#16a34a"),fontSize:10}}>✓ In Earnings</span>}
                  </div>
                  <div style={{display:"flex",gap:12,fontSize:12,color:"#888",flexWrap:"wrap",alignItems:"center"}}>
                    <span>👤 <strong style={{color:"#444"}}>{p.client}</strong></span>
                    {pMoney!==null&&<span style={{fontWeight:800,color:"#0a0a0a"}}>💵 ${pMoney}</span>}
                    {p.rateType&&p.rate&&<span style={{color:"#aaa"}}>{p.rateType==="per_min"?`$${p.rate}/min · ${p.videoMins||"?"}min × ${p.qty||1}vid`:`$${p.rate}/vid × ${p.qty||1}`}</span>}
                    {p.completedDate&&<span style={{color:"#10b981",fontWeight:600}}>✓ {p.completedDate}</span>}
                    {p.deadline&&!isDone&&(
                      <span style={{color:over?"#be123c":warn?"#f59e0b":"#aaa",fontWeight:over||warn?700:400}}>
                        📅 {over?`${Math.abs(days)}d overdue ⚠`:`${days}d left`}
                      </span>
                    )}
                    {p.rawLink&&<a href={p.rawLink} target="_blank" rel="noreferrer" style={{color:"#2563eb",fontWeight:600}}>📁 Raw</a>}
                    {p.doneLink&&<a href={p.doneLink} target="_blank" rel="noreferrer" style={{color:"#16a34a",fontWeight:600}}>✅ Done</a>}
                  </div>
                </div>
                <div style={{display:"flex",gap:8,flexShrink:0}}>
                  <button onClick={()=>editProj(p)} style={{...G.btnGhost,fontSize:12,padding:"8px 16px",fontWeight:700}}>✏ Edit</button>
                  <button onClick={()=>deleteProj(p.id)} style={{...G.btnDanger,fontSize:12,padding:"8px 16px"}}>🗑 Delete</button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

/* ── EARNINGS ──────────────────────────────────── */
function Earnings({ clients, projects }) {
  const MO=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const CY=new Date().getFullYear();
  const BASE_YEARS=[CY-1,CY,CY+1];
  const EXTRA_YEARS=[CY+2,CY+3,CY+4,CY+5].filter(y=>y<=2030);
  const [showMoreYears,setShowMoreYears]=useState(false);
  const YEARS=showMoreYears?[...BASE_YEARS,...EXTRA_YEARS]:BASE_YEARS;

  const [year,setYear]=useState(CY);
  const [month,setMonth]=useState(new Date().getMonth());
  const [pkr,setPkr]=useState(278);
  const [rs,setRs]=useState("Fetching...");
  const [liveOk,setLiveOk]=useState(false);

  // earningEntries: { "2025_2": [ {id, client, rateType, rate, title, mins, qty, usd}, ... ] }
  const [allData,setAllData]=useState({});

  // Add-entry form
  const blankForm={client:clients[0]||"Jon Mac",rateType:"per_min",rate:"10",title:"",mins:"",qty:"1"};
  const [form,setForm]=useState({...blankForm});
  const [showForm,setShowForm]=useState(false);

  useEffect(()=>{
  fetch("https://open.er-api.com/v6/latest/USD").then(r=>r.json()).then(d=>{
    if(d?.rates?.PKR){setPkr(d.rates.PKR);setRs(`Live · 1 USD = ${d.rates.PKR.toFixed(2)} PKR`);setLiveOk(true);}
    else setRs("~278 PKR (offline)");
  }).catch(()=>setRs("~278 PKR (offline)"));

  const d = dbLoad("uc3_earn2", {});
  if (d && Object.keys(d).length) setAllData(d);
},[]);
  const KEY=`${year}_${month}`;
  const manualEntries=allData[KEY]||[];

  // Auto-synced from completed projects
  const autoEntries=(projects||[]).filter(p=>{
    if(p.status!=="Done"&&p.status!=="Delivered")return false;
    const d=new Date(p.completedDate||"");
    return !isNaN(d)&&d.getMonth()===month&&d.getFullYear()===year;
  }).map(p=>{
    const r=parseFloat(p.rate)||0,q=parseFloat(p.qty)||1,m=parseFloat(p.videoMins)||0;
    const usd=p.rate?(p.rateType==="per_min"?+(r*m*q).toFixed(2):+(r*q).toFixed(2)):parseFloat(p.money)||0;
    return{id:"proj_"+p.id,client:p.client,title:p.title,rateType:p.rateType||"per_video",rate:p.rate||p.money||"0",mins:p.videoMins||"",qty:p.qty||"1",usd,fromProject:true};
  });

  const entries=[...autoEntries,...manualEntries];

  const saveAll=(d)=>{setAllData(d);dbSave("uc3_earn2",d);};
  const saveEntries=(list)=>saveAll({...allData,[KEY]:list});

  const calcUSD=(e)=>{
    const rate=parseFloat(e.rate)||0;
    const qty=parseFloat(e.qty)||1;
    if(e.rateType==="per_min") return +(rate*(parseFloat(e.mins)||0)*qty).toFixed(2);
    if(e.rateType==="per_video") return +(rate*qty).toFixed(2);
    return 0;
  };

  const addEntry=()=>{
    if(!form.client||!form.rate) return;
    const entry={id:Date.now().toString(),...form,rate:form.rate,mins:form.mins,qty:form.qty||"1"};
    entry.usd=calcUSD(entry);
    saveEntries([...entries,entry]);
    setForm({...blankForm,client:form.client,rateType:form.rateType,rate:form.rate});
    setShowForm(false);
  };

  const delEntry=(id)=>saveEntries(entries.filter(e=>e.id!==id));

  const updateEntry=(id,field,val)=>{
    const updated=entries.map(e=>{
      if(e.id!==id) return e;
      const ne={...e,[field]:val};
      ne.usd=calcUSD(ne);
      return ne;
    });
    saveEntries(updated);
  };

  const totalUSD=entries.reduce((s,e)=>s+(parseFloat(e.usd)||0),0);
  const totalPKR=Math.round(totalUSD*pkr);
  const totalVids=entries.reduce((s,e)=>s+(parseFloat(e.qty)||1),0);
  const totalMins=entries.reduce((s,e)=>s+(parseFloat(e.mins)||0)*(parseFloat(e.qty)||1),0);

  // Group by client for summary
  const byClient={};
  entries.forEach(e=>{
    if(!byClient[e.client]) byClient[e.client]={usd:0,vids:0,mins:0};
    byClient[e.client].usd+=parseFloat(e.usd)||0;
    byClient[e.client].vids+=parseFloat(e.qty)||1;
    byClient[e.client].mins+=(parseFloat(e.mins)||0)*(parseFloat(e.qty)||1);
  });

  const F=(k,v)=>setForm(f=>({...f,[k]:v}));

  return(
    <div style={G.page}>
      <div style={G.H1}>Earnings Calculator</div>
      <div style={{fontSize:12,marginBottom:20}}>
        <span style={{color:liveOk?"#10b981":"#f59e0b",fontWeight:700}}>●</span>
        <span style={{color:"#aaa",marginLeft:6}}>{rs}</span>
      </div>

      {/* ── Year Selector ── */}
      <div style={{marginBottom:14}}>
        <div style={{fontSize:10.5,fontWeight:700,color:"#bbb",letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Year</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
          {YEARS.map(y=>(
            <button key={y} onClick={()=>setYear(y)} style={{...G.btnSm,padding:"8px 20px",fontSize:13,fontWeight:700,...(year===y?{background:"#0a0a0a",color:"#fff",borderColor:"#000"}:{})}}>{y}</button>
          ))}
          <button onClick={()=>setShowMoreYears(s=>!s)} style={{...G.btnSm,padding:"8px 14px",fontSize:11,color:"#aaa",borderStyle:"dashed"}}>
            {showMoreYears?"Show Less ▲":"+ Up to 2030"}
          </button>
        </div>
      </div>

      {/* ── Month Selector ── */}
      <div style={{marginBottom:24}}>
        <div style={{fontSize:10.5,fontWeight:700,color:"#bbb",letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Month</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {MO.map((m,i)=>{
            const k=`${year}_${i}`;
            const hasData=(allData[k]||[]).length>0;
            return(
              <button key={m} onClick={()=>setMonth(i)} style={{...G.btnSm,padding:"7px 14px",position:"relative",...(month===i?{background:"#0a0a0a",color:"#fff",borderColor:"#000"}:{color:hasData?"#0a0a0a":"#aaa",borderColor:hasData?"#0a0a0a":"#e4e4e4",fontWeight:hasData?700:500})}}>
                {m}
                {hasData&&month!==i&&<span style={{position:"absolute",top:3,right:3,width:5,height:5,background:"#10b981",borderRadius:"50%",display:"block"}}/>}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Summary Stats ── */}
      {entries.length>0&&(
        <div style={{...G.grid3,marginBottom:18}}>
          {[
            {l:"Videos This Month",v:totalVids,s:"total"},
            {l:"Minutes Edited",v:Math.round(totalMins)+" min",s:"total"},
            {l:"Earnings",v:`$${totalUSD.toFixed(2)}`,s:`₨${totalPKR.toLocaleString()}`},
          ].map(st=>(
            <div key={st.l} style={{...G.card,borderTop:"3px solid #0a0a0a"}}>
              <div style={{fontSize:24,fontWeight:800,color:"#0a0a0a",lineHeight:1.1}}>{st.v}</div>
              <div style={{fontSize:12,fontWeight:700,marginTop:5}}>{st.l}</div>
              <div style={{fontSize:11,color:"#aaa",marginTop:2}}>{st.s}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── Client Summary ── */}
      {Object.keys(byClient).length>0&&(
        <div style={{...G.card,marginBottom:18}}>
          <div style={{fontWeight:800,fontSize:14,marginBottom:12}}>Client Summary — {MO[month]} {year}</div>
          {Object.entries(byClient).map(([cl,data])=>(
            <div key={cl} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:"1px solid #f5f5f5",fontSize:13}}>
              <div>
                <strong>{cl}</strong>
                <span style={{fontSize:11,color:"#bbb",marginLeft:8}}>{data.vids} video{data.vids!==1?"s":""} · {Math.round(data.mins)} min</span>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontWeight:800,fontSize:14}}>${data.usd.toFixed(2)}</div>
                <div style={{fontSize:11,color:"#aaa"}}>₨{Math.round(data.usd*pkr).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Add Entry Button ── */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{fontWeight:800,fontSize:15}}>Projects — {MO[month]} {year}</div>
        <button onClick={()=>setShowForm(s=>!s)} style={{...G.btnPrimary,fontSize:12}}>
          {showForm?"✕ Cancel":"+ Add Project"}
        </button>
      </div>

      {/* ── Add Entry Form ── */}
      {showForm&&(
        <div style={{...G.card,marginBottom:16,background:"#fafafa",border:"1.5px dashed #d4d4d4"}}>
          <div style={{fontWeight:700,fontSize:13,marginBottom:14}}>New Entry</div>
          <div style={{...G.grid2,marginBottom:12}}>
            <div>
              <label style={G.label}>Client</label>
              <input style={G.input} list="earn-clients" value={form.client} onChange={e=>F("client",e.target.value)} placeholder="Client name"/>
              <datalist id="earn-clients">{clients.map(c=><option key={c} value={c}/>)}</datalist>
            </div>
            <div>
              <label style={G.label}>Video Title / Description</label>
              <input style={G.input} placeholder="e.g. How to Make $10k" value={form.title} onChange={e=>F("title",e.target.value)}/>
            </div>
            <div>
              <label style={G.label}>Rate Type</label>
              <select style={G.input} value={form.rateType} onChange={e=>F("rateType",e.target.value)}>
                <option value="per_min">Per Minute ($X per min)</option>
                <option value="per_video">Per Video (fixed price)</option>
              </select>
            </div>
            <div>
              <label style={G.label}>{form.rateType==="per_min"?"Rate per Minute ($)":"Rate per Video ($)"}</label>
              <input type="number" style={G.input} min={0} placeholder="10" value={form.rate} onChange={e=>F("rate",e.target.value)}/>
            </div>
            {form.rateType==="per_min"&&(
              <div>
                <label style={G.label}>Video Length (minutes)</label>
                <input type="number" style={G.input} min={0} placeholder="e.g. 12" value={form.mins} onChange={e=>F("mins",e.target.value)}/>
              </div>
            )}
            <div>
              <label style={G.label}>Number of Videos</label>
              <input type="number" style={G.input} min={1} placeholder="1" value={form.qty} onChange={e=>F("qty",e.target.value)}/>
            </div>
          </div>

          {/* Preview */}
          {form.rate&&(
            <div style={{background:"#fff",border:"1px solid #e8e8e8",borderRadius:8,padding:"10px 14px",marginBottom:14,fontSize:13}}>
              <span style={{color:"#888"}}>Preview: </span>
              <strong>
                {form.rateType==="per_min"
                  ?`$${form.rate}/min × ${form.mins||0} min × ${form.qty||1} video = $${(parseFloat(form.rate||0)*parseFloat(form.mins||0)*parseFloat(form.qty||1)).toFixed(2)}`
                  :`$${form.rate}/video × ${form.qty||1} = $${(parseFloat(form.rate||0)*parseFloat(form.qty||1)).toFixed(2)}`
                }
              </strong>
              <span style={{color:"#aaa",marginLeft:8}}>· ₨{Math.round(
                (form.rateType==="per_min"
                  ?parseFloat(form.rate||0)*parseFloat(form.mins||0)*parseFloat(form.qty||1)
                  :parseFloat(form.rate||0)*parseFloat(form.qty||1)
                )*pkr
              ).toLocaleString()}</span>
            </div>
          )}

          <button style={G.btnPrimary} onClick={addEntry}>✓ Add Entry</button>
        </div>
      )}

      {/* ── Entries List ── */}
      {entries.length===0
        ?(
          <div style={{...G.card,textAlign:"center",padding:"36px 20px",color:"#ccc"}}>
            <div style={{fontSize:32,marginBottom:8}}>📊</div>
            <div style={{fontWeight:700,fontSize:14,marginBottom:4}}>No entries for {MO[month]} {year}</div>
            <div style={{fontSize:12}}>Click "+ Add Project" to log a video project</div>
          </div>
        )
        :(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {entries.map((e,idx)=>{
              const usd=parseFloat(e.usd)||0;
              return(
                <div key={e.id} style={{...G.card,borderLeft:`4px solid ${usd>0?"#0a0a0a":"#e8e8e8"}`}}>
                  <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                    <div style={{width:28,height:28,background:e.fromProject?"#10b981":"#0a0a0a",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:11,fontWeight:800,flexShrink:0}}>{e.fromProject?"✓":idx+1-autoEntries.length}</div>
                    <div style={{flex:1,minWidth:0}}>
                      {/* Title & Client */}
                      <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginBottom:8}}>
                        <input
                          style={{...G.input,flex:"1 1 180px",fontWeight:700,padding:"6px 10px",fontSize:13}}
                          value={e.title}
                          onChange={ev=>updateEntry(e.id,"title",ev.target.value)}
                          placeholder="Video title..."
                        />
                        <input
                          style={{...G.input,width:120,padding:"6px 10px",fontSize:12}}
                          list={`ec-${e.id}`}
                          value={e.client}
                          onChange={ev=>updateEntry(e.id,"client",ev.target.value)}
                          placeholder="Client"
                        />
                        <datalist id={`ec-${e.id}`}>{clients.map(c=><option key={c} value={c}/>)}</datalist>
                      </div>
                      {/* Rate inputs */}
                      <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
                        <select style={{...G.input,width:130,padding:"6px 10px",fontSize:12}} value={e.rateType} onChange={ev=>updateEntry(e.id,"rateType",ev.target.value)}>
                          <option value="per_min">Per Minute</option>
                          <option value="per_video">Per Video</option>
                        </select>
                        <div style={{display:"flex",alignItems:"center",gap:4}}>
                          <span style={{fontSize:11,color:"#aaa"}}>$</span>
                          <input type="number" style={{...G.input,width:65,padding:"6px 8px",fontSize:12}} value={e.rate} onChange={ev=>updateEntry(e.id,"rate",ev.target.value)} placeholder="rate"/>
                          <span style={{fontSize:11,color:"#aaa"}}>{e.rateType==="per_min"?"/min":"/vid"}</span>
                        </div>
                        {e.rateType==="per_min"&&(
                          <div style={{display:"flex",alignItems:"center",gap:4}}>
                            <input type="number" style={{...G.input,width:60,padding:"6px 8px",fontSize:12}} value={e.mins} onChange={ev=>updateEntry(e.id,"mins",ev.target.value)} placeholder="min"/>
                            <span style={{fontSize:11,color:"#aaa"}}>min</span>
                          </div>
                        )}
                        <div style={{display:"flex",alignItems:"center",gap:4}}>
                          <span style={{fontSize:11,color:"#aaa"}}>×</span>
                          <input type="number" style={{...G.input,width:55,padding:"6px 8px",fontSize:12}} value={e.qty} min={1} onChange={ev=>updateEntry(e.id,"qty",ev.target.value)} placeholder="qty"/>
                          <span style={{fontSize:11,color:"#aaa"}}>vid</span>
                        </div>
                      </div>
                    </div>
                    {/* Earning + Delete */}
                    <div style={{textAlign:"right",flexShrink:0}}>
                      <div style={{fontWeight:800,fontSize:18,color:usd>0?"#0a0a0a":"#ddd"}}>${usd.toFixed(2)}</div>
                      <div style={{fontSize:11,color:"#aaa",marginBottom:8}}>₨{Math.round(usd*pkr).toLocaleString()}</div>
                      {e.fromProject
                        ?<span style={{...G.tag("#f0fdf4","#16a34a"),fontSize:10}}>Auto · Project</span>
                        :<button onClick={()=>delEntry(e.id)} style={{...G.btnDanger,padding:"5px 10px",fontSize:11}}>🗑</button>
                      }
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      }

      {/* ── Grand Total ── */}
      {entries.length>0&&(
        <div style={{...G.card,background:"#0a0a0a",color:"#fff",marginTop:18}}>
          <div style={{fontSize:10.5,letterSpacing:2,color:"#555",textTransform:"uppercase",fontWeight:700,marginBottom:6}}>{MO[month]} {year} — Total</div>
          <div style={{fontWeight:800,fontSize:52,lineHeight:1}}>${totalUSD.toFixed(2)}</div>
          <div style={{fontSize:20,color:"#444",marginTop:8}}>₨ {totalPKR.toLocaleString()}</div>
          <div style={{fontSize:12,color:"#333",marginTop:8}}>{totalVids} video{totalVids!==1?"s":""} · {Math.round(totalMins)} min edited</div>
        </div>
      )}
    </div>
  );
}

/* ── OUTREACH ──────────────────────────────────── */
function Outreach({ clients }) {
  const [sub,setSub]=useState("email");
  const [n,setN]=useState(""); const [ch,setCh]=useState(""); const [ni,setNi]=useState(""); const [vt,setVt]=useState("");
  const [gen,setGen]=useState(""); const [load,setLoad]=useState(false);
  const [copied,copy]=useCopy();

  const TMPLS=[
    {n:1,sub:"Quick idea to improve your video retention",body:(n,ch,ni,vt)=>`Hi ${n||"[Name]"},\n\nI recently watched your video about ${vt||"your recent upload"} and I genuinely liked the way you explained the topic. Your content has strong potential and it's clear you put effort into it.\n\nI'm a video editor who works with YouTube creators, and while watching your video I noticed a few small editing improvements that could help increase viewer retention and make the pacing more engaging.\n\nIf you're open to it, I'd be happy to share a few quick ideas or even edit a short sample so you can see the difference.\n\nBest regards,\nUsman\nUsman Crealfex`},
    {n:2,sub:"Small editing ideas for your YouTube videos",body:(n,ch,ni,vt)=>`Hi ${n||"[Name]"},\n\nI came across your channel while browsing videos in the ${ni||"YouTube"} space and your content caught my attention. The topic selection and presentation are great.\n\nI'm a YouTube video editor and I noticed a few opportunities where editing could make the videos more engaging, especially in the first 30 seconds to keep viewers watching longer.\n\nIf you'd like, I can share a few suggestions or create a quick sample edit for you.\n\nBest,\nUsman\nUsman Crealfex`},
    {n:3,sub:"Loved your recent video",body:(n,ch,ni,vt)=>`Hi ${n||"[Name]"},\n\nI just watched your video on ${vt||"your recent upload"} and I really enjoyed the content. Your ideas are strong and the channel has good growth potential.\n\nAs someone who edits YouTube videos professionally, I noticed a few areas where pacing, visual cuts, and small motion graphics could help improve engagement and watch time.\n\nIf you're interested, I'd be happy to show you a quick example of how the editing could look.\n\nBest regards,\nUsman\nUsman Crealfex`},
    {n:4,sub:"Quick suggestion for your next video",body:(n,ch,ni,vt)=>`Hi ${n||"[Name]"},\n\nI recently discovered your channel${ch?` (${ch})`:""}  and watched a couple of your videos. Your content is interesting and you clearly understand your niche.\n\nI'm a video editor who focuses on helping YouTubers improve viewer retention through better pacing, cuts, and visual storytelling.\n\nI had a few ideas while watching your videos that could make them even more engaging. If you're open to it, I'd love to share them.\n\nBest,\nUsman\nUsman Crealfex`},
    {n:5,sub:"Idea to make your videos more engaging",body:(n,ch,ni,vt)=>`Hi ${n||"[Name]"},\n\nI came across your YouTube channel and enjoyed watching your content. The topic and delivery are solid.\n\nI work as a YouTube video editor and noticed a few small editing improvements that could make your videos feel more dynamic and keep viewers engaged longer.\n\nIf you'd like, I can send a few quick suggestions or a short edit example.\n\nBest regards,\nUsman\nUsman Crealfex`},
    {n:6,sub:"Quick editing idea for your channel",body:(n,ch,ni,vt)=>`Hi ${n||"[Name]"},\n\nI watched your recent upload and thought the content was really good. Your channel has strong potential in the ${ni||"content creation"} space.\n\nI specialize in editing YouTube videos and noticed a few ways the pacing and visuals could be improved to increase audience retention.\n\nIf you're interested, I'd be happy to show you a quick sample edit.\n\nBest,\nUsman\nUsman Crealfex`},
    {n:7,sub:"Loved your content",body:(n,ch,ni,vt)=>`Hi ${n||"[Name]"},\n\nI recently found your channel and watched a couple of your videos. I really like the direction you're taking with your content.\n\nI'm a video editor who helps creators improve their videos through better pacing, storytelling, and engaging visuals.\n\nI had a few ideas while watching your videos that could help make them even more engaging. If you'd like, I can share those ideas with you.\n\nBest regards,\nUsman\nUsman Crealfex`},
    {n:8,sub:"Editing support for your YouTube channel",body:(n,ch,ni,vt)=>`Hi ${n||"[Name]"},\n\nI came across your channel recently and enjoyed watching your videos. The content is strong and the topics are interesting.\n\nI work with YouTubers to improve their videos through editing that focuses on viewer engagement and retention.\n\nIf you're open to it, I'd love to help with editing or share a few suggestions that could improve the overall flow of your videos.\n\nBest,\nUsman\nUsman Crealfex`},
  ];

  const DMS=[
    {n:1,l:"Simple",t:"Hi! I'm a video editor. I can help improve your videos with better editing. Let me know if you'd like to work together."},
    {n:2,l:"Friendly",t:"Hey, I really like your content! I'm a video editor and I can help make your videos even better. Let me know if you're interested."},
    {n:3,l:"Ultra Short",t:"Hey! I'm a video editor. Available if you ever need help with editing."},
    {n:4,l:"Value (Best)",t:"Hey! I'm a video editor. I can help you get better watch time and audience retention with good editing. Let me know if you're open to working together."},
    {n:5,l:"Direct",t:"Hey! I'm a video editor. I can edit your videos and help improve your content quality. Let me know if you'd like to work together."},
    {n:6,l:"Growth",t:"Hey! I'm a video editor. I can help make your videos more engaging and help grow your audience through better editing."},
    {n:7,l:"Professional",t:"Hello! I'm a professional video editor with 50+ satisfied clients. I'd love to help improve your videos with high-quality editing."},
    {n:8,l:"Appreciation",t:"Hey, I really enjoy your content! I'm a video editor and I can help take your videos to the next level."},
    {n:9,l:"Collaboration",t:"Hey! I'm a video editor looking to collaborate with great creators. I'd love to edit some of your videos. Let's talk!"},
    {n:10,l:"Confident",t:"Hey! I'm a video editor and I can make your videos more engaging and shareable with strong editing. Let me know!"},
  ];

  const STYLES=["conversational and warm","professional and concise","curious and helpful","data-driven mentioning retention stats","storytelling opening","short and punchy under 80 words","value-first approach","problem-solution format"];

  const aiGen=async()=>{
    if(!n.trim()){alert("Creator name is required!");return;}
    setLoad(true);
    const style=STYLES[Math.floor(Math.random()*STYLES.length)];
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:500,messages:[{role:"user",content:`Write cold email from Usman Ghani (Usman Crealfex, professional YouTube video editor, Pakistan, 50+ clients, 1+ year experience) to:
Creator: ${n}
Channel: ${ch||n+"'s channel"}
Niche: ${ni||"general YouTube"}
Video topic: ${vt||"their recent video"}
STYLE: ${style}
Rules: under 130 words, genuine, no fluff, mention retention/watch time, offer free sample OR Loom video, end "Best,\\nUsman\\nUsman Crealfex"
FORMAT: Subject: [subject]\\n\\n[body]
Output ONLY the email.`}]})
      });
      const d=await r.json();
      setGen(d.content?.[0]?.text||"Error. Try again.");
    }catch{setGen("Network error.");}
    setLoad(false);
  };

  return(
    <div style={G.page}>
      <div style={G.H1}>Outreach</div>
      <div style={{display:"flex",gap:8,marginBottom:22}}>
        {[["email","Cold Emails"],["dm","Instagram DMs"]].map(([id,lbl])=>(
          <button key={id} onClick={()=>setSub(id)} style={{...G.btnGhost,...(sub===id?{background:"#000",color:"#fff",borderColor:"#000"}:{}),fontWeight:700,fontSize:12.5}}>{lbl}</button>
        ))}
      </div>

      {sub==="email"&&(
        <>
          <div style={{...G.card,marginBottom:16}}>
            <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:15,marginBottom:14}}>✨ AI Email Generator</div>
            <div style={{...G.grid2,marginBottom:12}}>
              <div><label style={G.label}>Creator Name *</label><input style={G.input} placeholder="John Smith" value={n} onChange={e=>setN(e.target.value)}/></div>
              <div><label style={G.label}>Channel Name</label><input style={G.input} placeholder="Wealth Hacker" value={ch} onChange={e=>setCh(e.target.value)}/></div>
              <div><label style={G.label}>Niche</label><input style={G.input} placeholder="Finance, Fitness, Tech..." value={ni} onChange={e=>setNi(e.target.value)}/></div>
              <div><label style={G.label}>Recent Video Topic</label><input style={G.input} placeholder="How to invest $1000" value={vt} onChange={e=>setVt(e.target.value)}/></div>
            </div>
            <button style={{...G.btnPrimary,opacity:load?0.65:1}} onClick={aiGen} disabled={load}>
              {load?"Generating...":"✨ AI Generate (Different Style Each Time)"}
            </button>
            {gen&&(
              <div style={{marginTop:16,padding:"14px 16px",background:"#f9f9f9",borderRadius:8,border:"1px solid #e8e8e8"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                  <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:13}}>Generated Email</span>
                  <button style={G.btnSm} onClick={()=>copy(gen,"ai")}>{copied==="ai"?"✓ Copied!":"Copy"}</button>
                </div>
                <pre style={{fontSize:13,lineHeight:1.75,whiteSpace:"pre-wrap",color:"#333",fontFamily:"'DM Sans',sans-serif"}}>{gen}</pre>
              </div>
            )}
          </div>

          <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:15,marginBottom:12}}>8 Ready Templates</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {TMPLS.map(t=>{
              const body=t.body(n,ch,ni,vt);
              const full=`Subject: ${t.sub}\n\n${body}`;
              return(
                <div key={t.n} style={{...G.card,display:"flex",flexDirection:"column",gap:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div>
                      <div style={{fontSize:10.5,fontWeight:700,color:"#bbb",letterSpacing:1,textTransform:"uppercase"}}>Template {t.n}</div>
                      <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:13,marginTop:2,lineHeight:1.3}}>{t.sub}</div>
                    </div>
                    <button style={{...G.btnSm,flexShrink:0,marginLeft:8}} onClick={()=>copy(full,`t${t.n}`)}>{copied===`t${t.n}`?"✓":"Copy"}</button>
                  </div>
                  <pre style={{fontSize:11.5,lineHeight:1.65,whiteSpace:"pre-wrap",color:"#555",fontFamily:"'DM Sans',sans-serif",maxHeight:155,overflow:"auto"}}>{body}</pre>
                </div>
              );
            })}
          </div>
        </>
      )}

      {sub==="dm"&&(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {DMS.map(dm=>(
            <div key={dm.n} style={{...G.card,display:"flex",gap:14,alignItems:"center"}}>
              <div style={{flex:1}}>
                <div style={{fontSize:10.5,fontWeight:700,color:"#bbb",letterSpacing:1,textTransform:"uppercase",marginBottom:5}}>Option {dm.n} · {dm.l}</div>
                <div style={{fontSize:13.5,color:"#333",lineHeight:1.65}}>{dm.t}</div>
              </div>
              <button style={{...G.btnSm,flexShrink:0,minWidth:58}} onClick={()=>copy(dm.t,`dm${dm.n}`)}>{copied===`dm${dm.n}`?"✓":"Copy"}</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── MESSAGES ──────────────────────────────────── */
function Messages() {
  const [copied,copy]=useCopy();
  const TC={"Boundary":{bg:"#fff1f2",color:"#be123c"},"Status":{bg:"#fef9c3",color:"#a16207"},"Professional":{bg:"#eff6ff",color:"#2563eb"},"Delivery":{bg:"#f0fdf4",color:"#16a34a"},"Invoice":{bg:"#f5f3ff",color:"#7c3aed"},"Intro":{bg:"#f0f9ff",color:"#0369a1"},"Follow-up":{bg:"#fdf4ff",color:"#9333ea"}};
  const MSGS=[
    {id:"footage",title:"Footage Request (2–3 Days Early)",tag:"Boundary",text:"Just a quick note so our workflow stays smooth. It would be great if you could send the footage at least 2–3 days before the deadline. This helps me organize the edit properly and make sure the final video quality is solid."},
    {id:"queue",title:"In Queue / Progress Update",tag:"Status",text:"I currently have a few projects in the queue, so I'm working on them in order. I'll start working on your video right after I finish the current one and will keep you updated on the progress."},
    {id:"delay",title:"Deadline Extension Request",tag:"Professional",text:"I want to make sure the video turns out great, so would it be okay if we move the delivery to [new day]? That will give me enough time to polish everything properly."},
    {id:"late_footage",title:"Late Footage Received",tag:"Boundary",text:"Hey! Just a heads up — I received the footage later than expected. I'll do my best to deliver on time, but it might be a day or two later than our original deadline. I'll keep you posted!"},
    {id:"revision",title:"Revision Limit Notice",tag:"Boundary",text:"I want to make sure we're aligned — our package includes [X] rounds of revisions. I've completed [X] so far. Any additional revisions after this would be charged separately. Let me know how you'd like to proceed!"},
    {id:"delivered",title:"Video Delivered 🎬",tag:"Delivery",text:"Hey! Your video is ready. Here's the link: [LINK]\n\nPlease review it and let me know if you have any feedback within [X] days. After that, I'll consider the project complete. Hope you love it! 🎬"},
    {id:"payment",title:"Payment Reminder",tag:"Invoice",text:"Hey! Just a friendly reminder about the payment for [Video Title]. The amount is $[X]. You can send it via [payment method]. Let me know if you have any questions. Thanks!"},
    {id:"intro",title:"New Client Introduction",tag:"Intro",text:"Hey [Name]! I'm Usman from Usman Crealfex. I'm a professional YouTube video editor with 50+ satisfied clients. I specialize in improving watch time, retention, and hook quality. Looking forward to working with you!"},
    {id:"feedback",title:"Feedback Request",tag:"Follow-up",text:"Hey [Name]! Hope you're happy with the final video. Could you take a moment to let me know what you thought of the edit? Any feedback helps me deliver even better results next time!"},
    {id:"rate",title:"Rate Increase Notice",tag:"Professional",text:"Hey [Name]! I wanted to give you a heads up that starting [date], my editing rate will be updated to $[new rate]. I really enjoy working with you and wanted to let you know in advance. Happy to answer any questions!"},
    {id:"unavail",title:"Currently Unavailable / Fully Booked",tag:"Boundary",text:"Hey [Name]! I wanted to let you know that I'm currently fully booked until [date]. I'd love to work with you — can we schedule your project to start after that date?"},
    {id:"start",title:"Starting Your Project",tag:"Status",text:"Hey [Name]! Just wanted to let you know I've started working on your video [Title]. I'll keep you updated as I make progress. Expected delivery: [date]."},
    {id:"invoice_sent",title:"Invoice Sent",tag:"Invoice",text:"Hey [Name]! I've sent over the invoice for [Project Name]. Total: $[X]. Please review it and let me know if you have any questions. Payment via [method] is preferred."},
  ];

  return(
    <div style={G.page}>
      <div style={G.H1}>Message Templates</div>
      <div style={{fontSize:13,color:"#aaa",marginBottom:22}}>Ready-to-copy messages. Customize [brackets] before sending.</div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {MSGS.map(m=>(
          <div key={m.id} style={G.card}>
            <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8,flexWrap:"wrap"}}>
                  <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:14}}>{m.title}</span>
                  <span style={G.tag((TC[m.tag]||{bg:"#f3f4f6"}).bg,(TC[m.tag]||{color:"#666"}).color)}>{m.tag}</span>
                </div>
                <pre style={{fontSize:13,lineHeight:1.7,whiteSpace:"pre-wrap",color:"#444",fontFamily:"'DM Sans',sans-serif"}}>{m.text}</pre>
              </div>
              <button style={{...G.btnGhost,flexShrink:0,minWidth:70,padding:"8px 14px",fontWeight:700}} onClick={()=>copy(m.text,m.id)}>
                {copied===m.id?"✓ Copied":"Copy"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── AI CHAT ───────────────────────────────────── */
function AIChat() {
  const QUICK=["Mujhe Jon Mac ka rate batao","Ek project update draft karo","How to get new clients?","Work schedule tips","Earnings ka summary batao"];
  const [msgs,setMsgs]=useState([{role:"assistant",content:"Hey Usman! 👋 Main tumhara personal assistant hoon. Jon Mac, Shrey, Tyler, Danny Rio — sab clients ke baare mein jaanta hoon. Roman Hindi ya English mein pooch sakte ho — kya help chahiye?"}]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const bottomRef=useRef(null);
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[msgs,loading]);

  const send=async(text)=>{
    const msg=text||input.trim();
    if(!msg||loading)return;
    const newMsgs=[...msgs,{role:"user",content:msg}];
    setMsgs(newMsgs); setInput(""); setLoading(true);
    const apiM=newMsgs.filter((m,i)=>!(i===0&&m.role==="assistant")).map(m=>({role:m.role,content:m.content}));
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",max_tokens:700,
          system:`You are Usman Ghani's personal assistant. Be concise, practical, fast.
PROFILE: Professional YouTube video editor, Pakistan, Brand: Usman Crealfex, 50+ clients, 10h/day, ~2 days/video
PC: i5 9th, GTX 1660 Super, 32GB DDR3, 1TB SSD
CLIENTS:
• Jon Mac: $100/regular, $120/sponsored — 1 channel, 1 year
• Shrey: $30–$50/video, 3 channels
• Tyler: $10/min ($100 per 10-min video)
• Danny Rio: $10/min — best editor who passes client projects
GOALS: Grow freelance, better workflow, new clients
Reply in same language as user (Roman Hindi or English). Keep SHORT and ACTIONABLE.`,
          messages:apiM
        })
      });
      const d=await r.json();
      setMsgs(p=>[...p,{role:"assistant",content:d.content?.[0]?.text||"Sorry, error."}]);
    }catch{setMsgs(p=>[...p,{role:"assistant",content:"Network error. Please try again."}]);}
    setLoading(false);
  };

  return(
    <div style={{display:"flex",flexDirection:"column",height:"100vh",background:"#f5f5f5"}}>
      <div style={{padding:"22px 32px 12px",flexShrink:0}}>
        <div style={G.H1}>AI Assistant</div>
        <div style={{fontSize:12,color:"#aaa"}}>Your personal work assistant — knows your clients, rates & goals</div>
      </div>
      <div style={{padding:"0 32px 12px",display:"flex",gap:7,flexWrap:"wrap",flexShrink:0}}>
        {QUICK.map((q,i)=>(
          <button key={i} onClick={()=>send(q)} style={{...G.btnGhost,fontSize:11.5,padding:"6px 12px"}}>{q}</button>
        ))}
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"0 32px",display:"flex",flexDirection:"column",gap:10}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
            <div style={{
              maxWidth:"74%",padding:"12px 16px",
              borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",
              background:m.role==="user"?"#0a0a0a":"#fff",
              color:m.role==="user"?"#fff":"#0a0a0a",
              border:m.role==="assistant"?"1px solid #ebebeb":"none",
              fontSize:13.5,lineHeight:1.65,whiteSpace:"pre-wrap",
              fontFamily:"'DM Sans',sans-serif",boxShadow:"0 1px 4px rgba(0,0,0,0.05)",
            }}>{m.content}</div>
          </div>
        ))}
        {loading&&(
          <div style={{display:"flex"}}>
            <div style={{padding:"12px 18px",background:"#fff",border:"1px solid #ebebeb",borderRadius:"18px 18px 18px 4px",fontSize:13,color:"#bbb",fontFamily:"'DM Sans',sans-serif"}}>
              <span style={{letterSpacing:3}}>● ● ●</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} style={{height:8}}/>
      </div>
      <div style={{padding:"12px 32px 24px",flexShrink:0,borderTop:"1px solid #ebebeb",background:"#f5f5f5"}}>
        <div style={{display:"flex",gap:10}}>
          <input style={{...G.input,flex:1,fontSize:14}} placeholder="Type in Roman Hindi ya English... (Enter to send)" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()}/>
          <button style={{...G.btnPrimary,flexShrink:0,padding:"11px 24px"}} onClick={()=>send()} disabled={loading||!input.trim()}>Send</button>
        </div>
      </div>
    </div>
  );
}

/* ── TRANSLATOR ────────────────────────────────── */
function Translator() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  const [dir,setDir]=useState("rh_en"); const [load,setLoad]=useState(false);
  const [copied,copy]=useCopy();

  const translate=async()=>{
    if(!input.trim())return; setLoad(true);
    const prompt=dir==="rh_en"
      ?`Translate this Roman Hindi/Urdu to correct natural English. Fix all grammar. Output ONLY the translated text:\n\n${input}`
      :`Translate this English to Roman Hindi/Urdu (English letters, natural Pakistani messaging style). Fix grammar. Output ONLY the Roman Hindi text:\n\n${input}`;
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,messages:[{role:"user",content:prompt}]})});
      const d=await r.json(); setOutput(d.content?.[0]?.text||"Error.");
    }catch{setOutput("Network error.");}
    setLoad(false);
  };

  return(
    <div style={G.page}>
      <div style={G.H1}>Translator</div>
      <div style={{fontSize:13,color:"#aaa",marginBottom:20}}>Roman Hindi ↔ English · Grammar automatically corrected</div>
      <div style={{display:"flex",gap:8,marginBottom:20}}>
        {[["rh_en","Roman Hindi → English"],["en_rh","English → Roman Hindi"]].map(([id,lbl])=>(
          <button key={id} onClick={()=>{setDir(id);setOutput("");}} style={{...G.btnGhost,...(dir===id?{background:"#0a0a0a",color:"#fff",borderColor:"#000"}:{}),fontWeight:700,fontSize:12.5}}>{lbl}</button>
        ))}
      </div>
      <div style={G.grid2}>
        <div>
          <label style={G.label}>{dir==="rh_en"?"Roman Hindi Input":"English Input"}</label>
          <textarea style={{...G.input,height:220,resize:"vertical"}} placeholder={dir==="rh_en"?"Yahan Roman Hindi mein type karo...":"Type your English text here..."} value={input} onChange={e=>setInput(e.target.value)}/>
        </div>
        <div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
            <label style={{...G.label,marginBottom:0}}>{dir==="rh_en"?"English Output":"Roman Hindi Output"}</label>
            {output&&<button style={G.btnSm} onClick={()=>copy(output,"out")}>{copied==="out"?"✓ Copied":"Copy"}</button>}
          </div>
          <textarea style={{...G.input,height:220,resize:"vertical",background:"#f9f9f9"}} value={output} readOnly placeholder="Translation appears here..."/>
        </div>
      </div>
      <button style={{...G.btnPrimary,marginTop:16,opacity:load?0.65:1}} onClick={translate} disabled={load}>
        {load?"Translating...":"⇄ Translate + Fix Grammar"}
      </button>
    </div>
  );
}

/* ── CONVERTER ─────────────────────────────────── */
function Converter() {
  const [usd,setUsd]=useState(""); const [pkr,setPkr]=useState("");
  const [rate,setRate]=useState(278); const [status,setStatus]=useState("Fetching..."); const [live,setLive]=useState(false);

  useEffect(()=>{
    fetch("https://open.er-api.com/v6/latest/USD").then(r=>r.json()).then(d=>{
      if(d?.rates?.PKR){setRate(d.rates.PKR);setStatus(`Live · 1 USD = ${d.rates.PKR.toFixed(2)} PKR · ${new Date().toLocaleTimeString()}`);setLive(true);}
      else setStatus("~278 PKR (offline)");
    }).catch(()=>setStatus("~278 PKR (offline)"));
  },[]);

  const onUsd=v=>{setUsd(v);setPkr(v?Math.round(parseFloat(v)*rate).toString():"");};
  const onPkr=v=>{setPkr(v);setUsd(v?(parseFloat(v)/rate).toFixed(2):"");};

  return(
    <div style={G.page}>
      <div style={G.H1}>USD / PKR Converter</div>
      <div style={{fontSize:12,marginBottom:22}}>
        <span style={{color:live?"#10b981":"#f59e0b",fontWeight:700}}>●</span>
        <span style={{color:"#aaa",marginLeft:6}}>{status}</span>
      </div>
      <div style={{...G.card,maxWidth:420,marginBottom:22}}>
        <label style={G.label}>US Dollar (USD $)</label>
        <input type="number" style={{...G.input,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:30,height:66,padding:"10px 16px",marginBottom:14}} placeholder="0" value={usd} onChange={e=>onUsd(e.target.value)}/>
        <div style={{textAlign:"center",fontSize:22,color:"#ccc",marginBottom:14}}>⇅</div>
        <label style={G.label}>Pakistani Rupee (PKR ₨)</label>
        <input type="number" style={{...G.input,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:30,height:66,padding:"10px 16px"}} placeholder="0" value={pkr} onChange={e=>onPkr(e.target.value)}/>
      </div>

      <div style={{...G.card,marginBottom:16}}>
        <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:14,marginBottom:12}}>Quick Amounts</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {[10,30,50,100,120,200,500,1000].map(p=>(
            <button key={p} onClick={()=>onUsd(p.toString())} style={{...G.btnGhost,padding:"8px 14px",textAlign:"center"}}>
              <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:14}}>${p}</div>
              <div style={{fontSize:10,color:"#aaa"}}>₨{Math.round(p*rate).toLocaleString()}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={G.card}>
        <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:14,marginBottom:12}}>Client Rates in PKR</div>
        {[["Jon Mac",100,"regular video"],["Jon Mac",120,"sponsored"],["Shrey",30,"min/video"],["Shrey",50,"max/video"],["Tyler",100,"10-min video"],["Danny Rio",100,"10-min video"]].map(([c,u,n],i,a)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<a.length-1?"1px solid #f5f5f5":"none",fontSize:13}}>
            <span><strong>{c}</strong> <span style={{color:"#bbb",fontSize:11}}>({n})</span></span>
            <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800}}>${u} = <span style={{color:"#10b981"}}>₨{Math.round(u*rate).toLocaleString()}</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}