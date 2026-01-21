(async ()=>{
  try{
    const res = await fetch('http://localhost:3001/contact');
    const text = await res.text();
    if (text.includes('id="bootstrapForm"')) {
      console.log('FOUND_FORM');
    } else {
      console.log('FORM_NOT_FOUND');
      console.log(text.slice(0, 1600));
    }
  } catch (e) {
    console.error('ERR', e && e.message ? e.message : e);
    process.exit(1);
  }
})();
