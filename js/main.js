document.getElementById('f').addEventListener('submit',function(e){
  e.preventDefault();
  var form=e.target,m=document.getElementById('msg'),o={},b='Nueva consulta de acompañamiento terapéutico\n\n',to='mili.molina.mili@gmail.com';
  new FormData(form).forEach(function(v,k){o[k]=v||'—';b+=k+': '+(v||'—')+'\n'});
  o._subject='Consulta de acompañamiento terapéutico';o._captcha='false';o._template='table';
  m.textContent='Enviando…';
  function alt(){
    var u='https://mail.google.com/mail/?view=cm&fs=1&to='+to+'&su='+encodeURIComponent(o._subject)+'&body='+encodeURIComponent(b);
    m.innerHTML='No se pudo enviar automáticamente. <a href="'+u+'" target="_blank" rel="noopener">Abrir Gmail con la consulta ya escrita</a>';
  }
  fetch('https://formsubmit.co/ajax/'+to,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(o)})
  .then(function(r){return r.json()})
  .then(function(j){if(j.success==='true'||j.success===true){m.textContent='¡Consulta enviada! Gracias, me pondré en contacto.';form.reset()}else alt()})
  .catch(alt);
});
