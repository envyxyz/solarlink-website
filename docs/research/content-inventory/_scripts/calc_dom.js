const L=require('./lib');const $=L.load('solar-calculator.html');
$('input,select,textarea,button').each((i,e)=>{const a=e.attribs;const id=a.id;let label=id&&$('label[for="'+id+'"]').text();label=L.clean(label||$(e).closest('div').find('label,span,p').first().text()).slice(0,60);
 const line=e.tagName+' id='+id+' type='+a.type+' min='+a.min+' max='+a.max+' step='+a.step+' value='+a.value+' onclick='+(a.onclick||'')+' oninput='+(a.oninput||'')+' onchange='+(a.onchange||'')+' |label='+label+(e.tagName==='select'?' |opts='+$(e).find('option').map((j,o)=>o.attribs.value+':'+L.clean($(o).text())).get().join(';'):e.tagName==='button'?' |txt='+L.clean($(e).text()).slice(0,40):'');
 console.log(line);});
