// Common JS used across pages

// Theme toggle (persist)
const themeBtn = document.querySelectorAll('.theme-btn');
function applyTheme(t){
  if(t==='dark') document.body.classList.add('dark');
  else document.body.classList.remove('light');
  localStorage.setItem('mg_theme', t);
}
const saved = localStorage.getItem('mg_theme') || 'dark';
applyTheme(saved);
themeBtn.forEach(b => b.addEventListener('click', () => {
  const current = document.body.classList.contains('dark') ? 'dark' : 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}));

// Quick donate button on index
const quickBtn = document.getElementById('quickDonateBtn');
if(quickBtn){
  quickBtn.addEventListener('click', () => {
    const amt = Number(document.getElementById('quickAmount').value || 0);
    if(!amt || amt < 10){ alert('Enter amount (min ₹10)'); return; }
    // payment.js exposes startRazorpay
    if(typeof startRazorpay === 'function') startRazorpay(amt, 'Anonymous');
    else alert('Payment script not available.');
  });
}

// Contact form demo
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thanks — message received (demo).');
    contactForm.reset();
  });
}

// Volunteer form handling + CSV export (client-only demo)
const volForm = document.getElementById('volForm');
if(volForm){
  const vols = JSON.parse(localStorage.getItem('mg_vols') || '[]');
  volForm.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(volForm);
    const obj = Object.fromEntries(fd.entries());
    obj.date = new Date().toISOString();
    vols.push(obj);
    localStorage.setItem('mg_vols', JSON.stringify(vols));
    alert('Thank you! Volunteer signup received (demo).');
    volForm.reset();
  });
  const exportBtn = document.getElementById('exportVol');
  if(exportBtn) exportBtn.addEventListener('click', () => {
    const rows = vols.map(v => [v.name||'', v.email||'', v.phone||'', v.shift||'', v.date||'']);
    let csv = 'Name,Email,Phone,Shift,Date\\n' + rows.map(r => r.map(c => "${(c||'').toString().replace(/"/g,'""')}").join(',')).join('\\n');
    const blob = new Blob([csv], {type: 'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'volunteers.csv'; a.click(); URL.revokeObjectURL(url);
  });
}