// payment helper — Razorpay demo integration
// NOTE: This is a client-side demo for testing. For real payments:
// 1) Create orders on server using Razorpay API (key secret) and return order_id.
// 2) Verify payment signature server-side.

function startRazorpay(amount, payerName = '') {
  const RAZORPAY_KEY = 'RAZORPAY_KEY'; // <-- replace with your test/live key
  if(!RAZORPAY_KEY || RAZORPAY_KEY === 'RAZORPAY_KEY'){ alert('Please set RAZORPAY_KEY in js/payment.js'); return; }

  const options = {
    key: RAZORPAY_KEY,
    amount: amount * 100, // paise
    currency: 'INR',
    name: 'Matri Ghar',
    description: 'Donation',
    prefill: { name: payerName },
    handler: function(response){
      // response.razorpay_payment_id
      alert('Payment successful — ID: ' + response.razorpay_payment_id + '\\nThanks a lot!');
      // TODO: send response to server to verify and record donation
    },
    theme: { color: '#ff7a00' }
  };

  // load library dynamically if needed
  if(typeof Razorpay === 'undefined'){
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = () => new Razorpay(options).open();
    document.body.appendChild(s);
  } else {
    new Razorpay(options).open();
  }
}

// wire donate button on donate.html (if present)
const rzpBtn = document.getElementById('rzpDonate');
if(rzpBtn){
  rzpBtn.addEventListener('click', () => {
    const amt = Number(document.getElementById('donAmt').value || 0);
    if(!amt || amt < 10){ alert('Enter amount (min ₹10)'); return; }
    const name = document.getElementById('donName').value || 'Anonymous';
    startRazorpay(amt, name);
  });
}