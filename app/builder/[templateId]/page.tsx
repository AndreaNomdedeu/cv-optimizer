'use client';
// ============================================================================
// Resume Builder workspace — /builder/[templateId]
// Top bar + Left (Section Library / Structure) + Center (live A4) + Right (Inspector).
// All content/structure lives in the Zustand store; the template only styles it.
// ============================================================================
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useBuilderStore } from '../../../lib/store/builderStore';
import { getTemplate } from '../../../lib/resume/templates';
import {
  ADDABLE_SECTIONS,
  SECTION_REGISTRY,
} from '../../../lib/resume/sectionRegistry';
import ResumeRenderer from '../../../components/resume/ResumeRenderer';
import { SectionType } from '../../../lib/resume/types';
import Inspector from '../../../components/resume/Inspector';

export default function BuilderPage() {
  const params = useParams();
  const templateId = (params?.templateId as string) || 'aria';
  const {
    doc,
    atsScore,
    selectedSectionId,
    loadTemplate,
    addSection,
    removeSection,
    toggleSectionVisible,
    select,
    reorderSections,
    updateBasics,
    markSaved,
  } = useBuilderStore();
  const template = getTemplate(doc.templateId || templateId);

  function onPhoto(e: any) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateBasics({ photoUrl: String(reader.result) });
    reader.readAsDataURL(file);
  }
  function removePhoto() { updateBasics({ photoUrl: undefined }); }
  function doSave() {
    try { localStorage.setItem("cvo:" + doc.templateId, JSON.stringify(doc)); } catch (err) {}
    if (markSaved) markSaved();
    try { const b = document.activeElement; if (b && b.tagName==="BUTTON") { const o=b.textContent; b.textContent="Saved"; setTimeout(()=>{b.textContent=o;}, 1200); } } catch(e){}
  }
  function doExportPDF() {
    const el = document.querySelector(".bld-canvas") as HTMLElement | null;
    if (!el) return;
    const opts = {
      margin: 0,
      filename: "CV.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css"] },
    };
    const run = function () {
      (window as any).html2pdf().set(opts).from(el).save();
    };
    if ((window as any).html2pdf) { run(); return; }
    const CDN =
      "https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js";
    const existing = document.getElementById("h2pdf") as HTMLScriptElement | null;
    if (existing) { existing.addEventListener("load", run); return; }
    const sc = document.createElement("script");
    sc.id = "h2pdf";
    sc.src = CDN;
    sc.onload = run;
    document.body.appendChild(sc);
  }
  function doExportDOCX() {
    const el = document.querySelector(".bld-canvas") as HTMLElement | null;
    const text = el ? el.innerText : (doc.basics.fullName || "Resume");
    const esc = (x: string) => x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const paras = text.split(String.fromCharCode(10)).map((line: string) => "<p>" + (esc(line) || "&nbsp;") + "</p>").join("");
    const html = "<html><head><meta charset=utf-8></head><body style=" + "font-family:Arial,sans-serif;" + ">" + paras + "</body></html>";
    const blob = new Blob([html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (doc.basics.fullName || "resume") + ".doc";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }


  useEffect(() => {
    try { if (templateId) localStorage.setItem('cvo:lastTemplate', String(templateId)); } catch (e) {}
    loadTemplate(templateId);
  }, [templateId, loadTemplate]);

  return (
    <div className="bld">
      <style dangerouslySetInnerHTML={{ __html: BUILDER_CSS }} />
      <header className="bld-top">
        <div className="bld-top-l">
          <a href="/" className="bld-back">
            ←
          </a>
          <strong>{template.name}</strong>
          <span className="bld-cat">{template.category}</span>
        </div>
        <div className="bld-top-r">
          <span className="bld-ats">
            ATS <b>{atsScore}</b>
          </span>
          <button className="bld-btn" onClick={doSave}>Save</button>
          <button className="bld-btn" onClick={doExportPDF}>Descargar PDF</button>
        </div>
      </header>
      <div className="bld-body">
        <aside className="bld-left">
          <h4>Resume Structure</h4>
            {template.showPhoto ? (
              <div className="bld-photo">
                <div className="bld-photo-prev">
                  {doc.basics.photoUrl ? (
                    <img src={doc.basics.photoUrl} alt="" />
                  ) : (
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="#9aa3af"><path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-3.6 0-8 1.8-8 4.2V21h16v-2.8c0-2.4-4.4-4.2-8-4.2z"/></svg>
                  )}
                </div>
                <div className="bld-photo-acts">
                  <label className="bld-btn-sm">
                    {doc.basics.photoUrl ? "Change" : "Upload photo"}
                    <input type="file" accept="image/*" onChange={onPhoto} style={{ display: "none" }} />
                  </label>
                  {doc.basics.photoUrl ? <button className="bld-btn-sm" onClick={removePhoto}>Remove</button> : null}
                </div>
              </div>
            ) : null}
          <ul className="bld-struct">
            {doc.sections.map((s) => (
              <li
                key={s.id}
                className={s.id === selectedSectionId ? 'on' : ''}
                onClick={() => select(s.id)}
              >
                <span>{s.title}</span>
                <span className="bld-row-actions"><button type="button" title="Move up" onClick={(e) => { e.stopPropagation(); const i = doc.sections.indexOf(s); if (i > 0) reorderSections(i, i - 1); }}>up</button><button type="button" title="Move down" onClick={(e) => { e.stopPropagation(); const i = doc.sections.indexOf(s); if (i < doc.sections.length - 1) reorderSections(i, i + 1); }}>dn</button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSectionVisible(s.id);
                    }}
                  >
                    {s.visible ? 'Hide' : 'Show'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSection(s.id);
                    }}
                  >
                    ×
                  </button>
                </span>
              </li>
            ))}
          </ul>
          <h4>Add Section</h4>
          <div className="bld-add">
            {ADDABLE_SECTIONS.map((t: SectionType) => (
              <button key={t} onClick={() => addSection(t)}>
                {SECTION_REGISTRY[t].label}
              </button>
            ))}
          </div>
        </aside>
        <div className="bld-center">
          <div className="bld-canvas">
            <ResumeRenderer doc={doc} template={template} />
          </div>
        </div>
        <aside className="bld-right">
          <Inspector />
        </aside>
      </div>
    </div>
  );
}

const BUILDER_CSS = [
  '.bld{height:100vh;display:flex;flex-direction:column;font-family:Inter,Arial,sans-serif;background:#F6F7FB;color:#1F2433}',
  '.bld-top{height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 18px;background:#FFFFFF;border-bottom:1px solid #E5E7F0}',
  '.bld-top-l{display:flex;align-items:center;gap:10px}',
  '.bld-back{color:#5B6478;text-decoration:none;font-size:18px}',
  '.bld-cat{font-size:12px;color:#5B6478;border:1px solid #E5E7F0;border-radius:10px;padding:1px 8px}',
  '.bld-top-r{display:flex;align-items:center;gap:8px}',
  '.bld-ats{font-size:13px;color:#5B6478;margin-right:6px}.bld-ats b{color:#34d399}',
  '.bld-btn{background:#4F46E5;color:#fff;border:0;border-radius:7px;padding:7px 12px;font-size:13px;cursor:pointer} .bld-photo{display:flex;flex-direction:column;align-items:center;gap:8px;margin:10px 0 14px;padding:12px;border:1px dashed #d1d5db;border-radius:10px} .bld-photo-prev{width:72px;height:72px;border-radius:50%;background:#eef0f3;border:1px solid #d8dce1;display:flex;align-items:center;justify-content:center;overflow:hidden} .bld-photo-prev img{width:100%;height:100%;object-fit:cover} .bld-photo-acts{display:flex;gap:6px;flex-wrap:wrap;justify-content:center} .bld-btn-sm{background:#eef2ff;color:#4338ca;border:1px solid #c7d2fe;border-radius:6px;padding:4px 9px;font-size:11px;font-weight:600;cursor:pointer} .bld-row-actions button{background:transparent;border:1px solid #d8dce1;border-radius:5px;font-size:10px;padding:1px 5px;margin-left:3px;cursor:pointer;color:#475569}',
  '.bld-body{flex:1;display:grid;grid-template-columns:250px 1fr 300px;overflow:hidden}',
  '.bld-left,.bld-right{background:#FFFFFF;overflow-y:auto;padding:14px}',
  '.bld-left{border-right:1px solid #E5E7F0}.bld-right{border-left:1px solid #E5E7F0}',
  '.bld-left h4,.bld-right h4{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#6B7384;margin:14px 0 8px}',
  '.bld-struct{list-style:none;margin:0;padding:0}',
  '.bld-struct li{display:flex;justify-content:space-between;align-items:center;padding:8px 10px;border-radius:7px;cursor:pointer;font-size:13px}',
  '.bld-struct li:hover{background:#F1F2F8}.bld-struct li.on{background:#E7E9FB}',
  '.bld-row-actions{display:flex;gap:4px}',
  '.bld-row-actions button{background:transparent;border:0;color:#5B6478;cursor:pointer;font-size:11px}',
  '.bld-add{display:flex;flex-wrap:wrap;gap:6px}',
  '.bld-add button{background:#F1F2F8;border:1px solid #E5E7F0;color:#3A4154;border-radius:6px;padding:5px 8px;font-size:11px;cursor:pointer}',
  '.bld-add button:hover{border-color:#4F46E5}',
  '.bld-center{overflow:auto;background:#EEF1F8;display:flex;justify-content:safe center;padding:30px}',
  '.bld-canvas{box-shadow:0 8px 30px rgba(31,36,51,.12);height:max-content}',
  '.bld-hint{font-size:12px;color:#6B7384;line-height:1.5}',
  '.insp{display:flex;flex-direction:column;gap:14px}',
  '.insp-empty{color:#6B7384;font-size:13px;text-align:center;padding:40px 16px;line-height:1.6}',
  '.insp-empty-icon{font-size:26px;opacity:.5;margin-bottom:8px}',
  '.insp-top{display:flex;flex-direction:column;gap:4px}',
  '.insp-title-input{background:#FFFFFF;border:1px solid #E5E7F0;border-radius:7px;color:#1F2433;font-size:14px;font-weight:600;padding:8px 10px;width:100%}',
  '.insp-title-input:focus{outline:none;border-color:#4F46E5}',
  '.insp-type{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#6B7384}',
  '.insp-controls{display:flex;flex-direction:column;gap:10px}',
  '.insp-seg{display:inline-flex;background:#FFFFFF;border:1px solid #E5E7F0;border-radius:7px;overflow:hidden;flex-wrap:wrap}',
  '.insp-seg-wrap{flex-wrap:wrap}',
  '.insp-seg button{background:transparent;border:0;color:#5B6478;font-size:12px;padding:6px 11px;cursor:pointer}',
  '.insp-seg button.on{background:#4F46E5;color:#fff}',
  '.insp-display{display:flex;flex-direction:column;gap:6px}',
  '.insp-content{display:flex;flex-direction:column;gap:10px}',
  '.insp-field{display:flex;flex-direction:column;gap:5px;margin-bottom:2px}',
  '.insp-label{font-size:11px;font-weight:600;color:#5B6478;text-transform:uppercase;letter-spacing:.04em}',
  '.insp-input{background:#FFFFFF;border:1px solid #E5E7F0;border-radius:6px;color:#1F2433;font-size:13px;padding:7px 9px;width:100%;font-family:inherit}',
  '.insp-input:focus{outline:none;border-color:#4F46E5}',
  '.insp-area{resize:vertical;min-height:54px;line-height:1.45}',
  '.insp-num{max-width:64px}',
  '.insp-range-row{display:flex;align-items:center;gap:8px}',
  '.insp-range-row input[type=range]{flex:1;accent-color:#4F46E5}',
  '.insp-inline{display:flex;gap:6px;align-items:center}',
  '.insp-tags{display:flex;flex-wrap:wrap;gap:5px}',
  '.insp-tag{display:inline-flex;align-items:center;gap:5px;background:#F1F2F8;border:1px solid #E5E7F0;border-radius:20px;padding:3px 9px;font-size:12px;color:#3A4154}',
  '.insp-tag button{background:transparent;border:0;color:#6B7384;cursor:pointer;font-size:13px;line-height:1;padding:0}',
  '.insp-tag button:hover{color:#ef4444}',
  '.insp-bullet{display:flex;gap:6px;align-items:flex-start;margin-bottom:5px}',
  '.insp-dot{color:#6B7384;padding-top:8px}',
  '.insp-x{background:transparent;border:0;color:#6B7384;cursor:pointer;font-size:16px;line-height:1;padding:2px 5px;border-radius:5px}',
  '.insp-x:hover{color:#ef4444;background:#F1F2F8}',
  '.insp-mini{align-self:flex-start;background:#F1F2F8;border:1px solid #E5E7F0;color:#4F46E5;border-radius:6px;font-size:12px;padding:5px 9px;cursor:pointer}',
  '.insp-mini:hover{border-color:#4F46E5}',
  '.insp-card{background:#FFFFFF;border:1px solid #E5E7F0;border-radius:8px;overflow:hidden}',
  '.insp-card-head{display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#F4F5FB}',
  '.insp-toggle{flex:1;display:flex;align-items:center;gap:8px;background:transparent;border:0;color:#1F2433;font-size:13px;cursor:pointer;text-align:left;min-width:0}',
  '.insp-chev{color:#6B7384;font-size:11px}',
  '.insp-card-title{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
  '.insp-card-body{padding:10px;display:flex;flex-direction:column;gap:9px;border-top:1px solid #E5E7F0}',
  '.insp-add{margin-top:4px;background:#4F46E5;border:0;color:#fff;border-radius:7px;font-size:13px;font-weight:600;padding:9px;cursor:pointer}',
  '.insp-add:hover{background:#4338CA}',
].join('');
