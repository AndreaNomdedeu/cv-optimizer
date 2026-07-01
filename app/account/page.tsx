"use client";
import Link from "next/link";
import { useState } from "react";

const BRAND = { primary:"#4F46E5", primaryDark:"#4338CA", secondary:"#0EA5A4", ink:"#1F2433", inkSoft:"#5B6478", surface:"#F7F8FC", surfaceAlt:"#FBFAFF", line:"#ECEDF3" };

const INITIAL = {
  name:"Alex Morgan",
  email:"alex.morgan@email.com",
  phone:"+1 (555) 014-2389",
  location:"San Francisco, CA",
  headline:"Senior Product Manager",
};

const ROWS = [
  { key:"name", label:"Full name" },
  { key:"email", label:"Email" },
  { key:"phone", label:"Phone" },
  { key:"location", label:"Location" },
  { key:"headline", label:"Headline" },
];

export default function AccountPage() {
  const [data, setData] = useState(INITIAL);
  const [draft, setDraft] = useState(INITIAL);
  const [editing, setEditing] = useState(false);
  function startEdit() { setDraft(data); setEditing(true); }
  function cancelEdit() { setDraft(data); setEditing(false); }
  function saveEdit() { setData(draft); setEditing(false); }
    function change(k: string, v: any) { setDraft(function(d: any){ const n = Object.assign({}, d); n[k] = v; return n; }); }
  return (
    <div className={"min-h-screen"} style={{ background: BRAND.surface }}>
      <header className={"sticky top-0 z-10 border-b bg-white"} style={{ borderColor: BRAND.line }}>
        <div className={"mx-auto flex max-w-4xl items-center justify-between px-6 py-4"}>
          <Link href={"/dashboard"} className={"flex items-center gap-2 text-sm font-semibold"} style={{ color: BRAND.inkSoft }}>
            <span>&larr;</span><span>Back to dashboard</span>
          </Link>
          <span className={"text-base font-bold"} style={{ color: BRAND.ink }}>Account settings</span>
        </div>
      </header>
      <main className={"mx-auto max-w-4xl px-6 py-10"}>
        <div className={"mb-6 flex items-center gap-4"}>
          <span className={"flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white"} style={{ background: BRAND.primary }}>A</span>
          <div>
            <h1 className={"text-2xl font-bold"} style={{ color: BRAND.ink }}>{data.name}</h1>
            <p className={"text-sm"} style={{ color: BRAND.inkSoft }}>{data.email}</p>
          </div>
        </div>
        <section className={"mb-6 rounded-2xl border bg-white p-6"} style={{ borderColor: BRAND.line }}>
          <div className={"mb-4 flex items-center justify-between"}>
            <h2 className={"text-lg font-bold"} style={{ color: BRAND.ink }}>Profile</h2>
            {editing ? (
              <div className={"flex gap-2"}>
                <button onClick={cancelEdit} className={"rounded-lg border px-3 py-1.5 text-sm font-semibold"} style={{ borderColor: BRAND.line, color: BRAND.inkSoft }}>Cancel</button>
                <button onClick={saveEdit} className={"rounded-lg px-3 py-1.5 text-sm font-semibold text-white"} style={{ background: BRAND.primary }}>Save</button>
              </div>
            ) : (
              <button onClick={startEdit} className={"rounded-lg border px-3 py-1.5 text-sm font-semibold"} style={{ borderColor: BRAND.line, color: BRAND.primary }}>Edit</button>
            )}
          </div>
          <dl className={"grid grid-cols-1 gap-4 sm:grid-cols-2"}>
            {ROWS.map(function(r){ return (
              <div key={r.key}>
                <dt className={"text-xs font-semibold uppercase tracking-wide"} style={{ color: BRAND.inkSoft }}>{r.label}</dt>
                {editing ? (
                  <input value={draft[r.key]} onChange={function(e){ change(r.key, e.target.value); }} className={"mt-1 w-full rounded-lg border px-3 py-2 text-sm"} style={{ borderColor: BRAND.line, color: BRAND.ink }} />
                ) : (
                  <dd className={"mt-1 text-sm font-medium"} style={{ color: BRAND.ink }}>{data[r.key]}</dd>
                )}
              </div>
            ); })}
          </dl>
        </section>
        <section className={"mb-6 rounded-2xl border p-6"} style={{ borderColor: BRAND.line, background: BRAND.surfaceAlt }}>
          <div className={"flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"}>
            <div>
              <h2 className={"text-lg font-bold"} style={{ color: BRAND.ink }}>Plan and billing</h2>
              <p className={"mt-1 text-sm"} style={{ color: BRAND.inkSoft }}>You are on the <span className={"font-semibold"} style={{ color: BRAND.ink }}>Free plan</span>. Upgrade for unlimited optimizations and exports.</p>
            </div>
            <Link href={"/pricing"} className={"shrink-0 rounded-xl px-5 py-2.5 text-center text-sm font-semibold text-white"} style={{ background: BRAND.primary }}>Upgrade plan</Link>
          </div>
        </section>
        <section className={"rounded-2xl border bg-white p-6"} style={{ borderColor: BRAND.line }}>
          <h2 className={"mb-4 text-lg font-bold"} style={{ color: BRAND.ink }}>Preferences</h2>
          <div className={"divide-y"} style={{ borderColor: BRAND.line }}>
            <div className={"flex items-center justify-between py-3"}>
              <div><p className={"text-sm font-semibold"} style={{ color: BRAND.ink }}>Email notifications</p><p className={"text-xs"} style={{ color: BRAND.inkSoft }}>Job match alerts and scan results.</p></div>
              <span className={"rounded-full px-3 py-1 text-xs font-semibold text-white"} style={{ background: BRAND.secondary }}>On</span>
            </div>
            <div className={"flex items-center justify-between py-3"}>
              <div><p className={"text-sm font-semibold"} style={{ color: BRAND.ink }}>Product updates</p><p className={"text-xs"} style={{ color: BRAND.inkSoft }}>News about new features.</p></div>
              <span className={"rounded-full px-3 py-1 text-xs font-semibold"} style={{ background: BRAND.line, color: BRAND.inkSoft }}>Off</span>
            </div>
            <div className={"flex items-center justify-between py-3"}>
              <div><p className={"text-sm font-semibold"} style={{ color: BRAND.ink }}>Sign out</p><p className={"text-xs"} style={{ color: BRAND.inkSoft }}>End your session on this device.</p></div>
              <Link href={"/auth?mode=login"} className={"rounded-lg border px-3 py-1.5 text-sm font-semibold"} style={{ borderColor: BRAND.line, color: BRAND.ink }}>Sign out</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
