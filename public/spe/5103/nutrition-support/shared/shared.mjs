export const $=id=>document.getElementById(id);
export const el=(tag,text,attrs={})=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);return n;};
export async function api(action,data,{params={}}={}){const query=new URLSearchParams({action,...(['b','c'].includes(document.documentElement.dataset.challenge)?{challenge:document.documentElement.dataset.challenge}:{}),...params});const r=await fetch('/api/module10?'+query,{method:data===undefined?'GET':'POST',credentials:'same-origin',cache:'no-store',headers:data===undefined?{}:{'Content-Type':'application/json'},body:data===undefined?undefined:JSON.stringify(data)});if(!r.ok){const b=await r.json().catch(()=>({}));const e=new Error(b.error||'The request could not be completed.');e.status=r.status;throw e;}return ['pdf','preview-pdf'].includes(action)?r.blob():r.json();}
let identitySDK;
export async function auth(ready,{beforeLogout=async()=>true}={}){
 $('retry-auth').hidden=false;let running=false;
 async function check(){if(running)return;running=true;$('auth-status').classList.remove('sr-only','error');$('retry-auth').hidden=false;
 try{
  identitySDK??=await import('https://cdn.jsdelivr.net/npm/@netlify/identity@2.0.0/+esm');
  const callback=await identitySDK.handleAuthCallback();if(callback)history.replaceState({},document.title,location.pathname);
  await identitySDK.refreshSession();const user=await identitySDK.getUser();
  if(!user){$('auth-status').textContent='Sign in with your authorized Google account to save and resume work.';$('login').hidden=false;$('logout').hidden=true;return;}
  $('login').hidden=true;$('logout').hidden=false;
  const session=await api('session');$('identity').textContent=session.user.name;$('auth-status').textContent='Signed in · '+session.user.email;
  await ready(session);if(document.body.classList.contains('clinical-encounter')&&$('auth-status').textContent.startsWith('Signed in')){$('auth-status').classList.add('sr-only');$('retry-auth').hidden=true;}
 }catch(e){$('auth-status').textContent=e.message||'Sign-in is unavailable. The room shell is still available to inspect.';$('auth-status').classList.add('error');}finally{running=false;}
 }
 $('retry-auth').onclick=check;
 $('login').onclick=async()=>{try{identitySDK??=await import('https://cdn.jsdelivr.net/npm/@netlify/identity@2.0.0/+esm');await identitySDK.oauthLogin('google');}catch{$('auth-status').textContent='Google sign-in could not start. Try again.';}};
 $('logout').onclick=async()=>{if(!await beforeLogout())return;await identitySDK?.logout();location.reload();};
 await check();
}
export function field(host,id,label,value,onInput,{readOnly=false}={}){const l=el('label',label,{for:id}),t=el('textarea',undefined,{id,maxlength:'10000'});t.value=value;t.readOnly=readOnly;t.addEventListener('input',()=>onInput(t.value));host.append(l,t);return t;}
export async function downloadPDF(attemptId){const blob=await api('pdf',undefined,{params:attemptId?{attemptId}:{}}),url=URL.createObjectURL(blob),a=el('a',undefined,{href:url,download:document.documentElement.dataset.challenge==='c'?'NFS5363_Module10_ChallengeC_Submission.pdf':document.documentElement.dataset.challenge==='b'?'NFS5363_Module10_ChallengeB_Submission.pdf':'NFS5363_Module10_Submission.pdf'});document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
