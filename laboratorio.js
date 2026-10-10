/* STEAMLab RV – demostrador educativo de la ley de Gauss.
   Convención: la carga fuente está en el origen; la superficie se desplaza en X.
   La curva y las flechas son ilustraciones de un campo de carga puntual (no mediciones).
*/
(()=>{'use strict';
const $=id=>document.getElementById(id), eps=8.8541878128e-12, k=1/(4*Math.PI*eps);
const state={forma:'esfera',radio:1.2,offset:0,q:1,normales:true,lineas:true,hyp:null};
let lab=null; const fmt=(v)=>Number(v).toLocaleString('es-BO',{maximumFractionDigits:2});
function inside(){return state.q!==0&&(state.forma!=='desplazada'||state.offset<state.radio-1e-6)}
function theoretical(){return (inside()?state.q*1e-9/eps:0)}
function pred(){return theoretical()>1?'positivo':theoretical() < -1?'negativo':'nulo'}
function updateText(){ $('radOut').textContent=state.radio.toFixed(2);$('desOut').textContent=state.offset.toFixed(2);$('insideText').setAttribute('value',`Q encerrada: ${inside()?state.q:0} nC`); const result=theoretical();$('ecuacion').innerHTML='Φ<sub>E</sub> = ∯ E·dA = Q<sub>enc</sub>/ε<sub>0</sub>';$('pregunta').textContent=`Escenario: ${state.forma==='cubo'?'cubo centrado':state.forma==='desplazada'?'esfera desplazada':'esfera centrada'}. Predice el signo del flujo neto.`;if(state.hyp===null)$('respuesta').textContent='Selecciona un escenario, formula tu hipótesis y comprueba.';}
function rebuild(){updateText();if(lab)lab.redraw();}
function updateState(){state.forma=$('forma').value;state.radio=+$('radio').value;state.offset=+$('desplaz').value;state.q=+$('carga').value;$('desplaz').disabled=state.forma!=='desplazada';state.hyp=null;rebuild()}
for(const id of ['forma','radio','desplaz','carga'])$(id).addEventListener('input',updateState);
document.querySelectorAll('[data-op]').forEach(el=>el.addEventListener('click',()=>{const op=el.dataset.op;if(op==='verificar'){$('verifica').click();return} $('forma').value=op;state.forma=op;if(op==='desplazada'){$('desplaz').value='1.5';state.offset=1.5}else{$('desplaz').value='0';state.offset=0}state.hyp=null;rebuild();}));
$('predice').onclick=()=>{$('predbox').hidden=!$('predbox').hidden};$('guardar').onclick=()=>{state.hyp=$('pronostico').value;$('predbox').hidden=true;$('respuesta').textContent=`Hipótesis registrada: flujo ${state.hyp}. Pulsa «Comprobar cálculo».`};
$('verifica').onclick=()=>{const v=theoretical();const result=pred();$('respuesta').textContent=`Resultado: flujo ${result}. Carga encerrada: ${inside()?state.q:0} nC. ΦE = ${fmt(v)} N·m²/C. ${state.hyp===null?'Antes de repetir, registra una predicción.':state.hyp===result?'Tu predicción coincide.':'Tu predicción no coincide; revisa qué carga queda encerrada.'} La forma no determina el flujo neto por sí sola.`;$('ecuacion').innerHTML=`Φ<sub>E</sub> = (${inside()?state.q:0} × 10<sup>−9</sup> C)/(8,854×10<sup>−12</sup>) = ${fmt(v)} N·m²/C`;};
$('normales').onclick=()=>{state.normales=!state.normales;$('normales').textContent=state.normales?'Ocultar normales':'Mostrar normales';rebuild()};$('lineas').onclick=()=>{state.lineas=!state.lineas;$('lineas').textContent=state.lineas?'Ocultar campo':'Mostrar campo';rebuild()};$('reset').onclick=()=>{Object.assign(state,{forma:'esfera',radio:1.2,offset:0,q:1,normales:true,lineas:true,hyp:null});$('forma').value='esfera';$('radio').value='1.2';$('desplaz').value='0';$('carga').value='1';$('normales').textContent='Ocultar normales';$('lineas').textContent='Ocultar campo';$('respuesta').textContent='Selecciona un escenario, formula tu hipótesis y comprueba.';updateState()};
AFRAME.registerComponent('gauss-lab',{init:function(){lab=this;this.world=$('world').object3D;this.redraw();this.el.addEventListener('enter-vr',()=>{$('tipo').textContent='RV activa'});this.el.addEventListener('exit-vr',()=>{$('tipo').textContent='Exploración 3D / RV'});},
remove:function(){this.clear();lab=null;},
clear:function(){if(!this.world)return;while(this.world.children.length){const o=this.world.children[0];this.world.remove(o);o.traverse(n=>{if(n.geometry)n.geometry.dispose();if(n.material){(Array.isArray(n.material)?n.material:[n.material]).forEach(m=>m.dispose())}})}},
redraw:function(){if(!this.world)return;this.clear();const T=AFRAME.THREE, group=this.world;
const mat=(color,opacity=1)=>new T.MeshBasicMaterial({color,transparent:opacity<1,opacity,side:T.DoubleSide,depthWrite:opacity>=1});
const sphere=new T.Mesh(new T.SphereGeometry(.16,24,20),mat(state.q>0?'#ffbc61':state.q<0?'#69b8ff':'#8da7ba'));group.add(sphere);
const chargeLabel=document.createElement('a-text'); // label via A-Frame scene entity, disposed by re-render separately below
const r=state.radio,off=state.forma==='desplazada'?state.offset:0;
let surface;if(state.forma==='cubo'){surface=new T.Mesh(new T.BoxGeometry(2*r,2*r,2*r),mat('#5ddaf0',.12));}else{surface=new T.Mesh(new T.SphereGeometry(r,38,24),mat('#5ddaf0',.12));}surface.position.x=off;group.add(surface);
const wire=new T.LineSegments(new T.EdgesGeometry(surface.geometry,13),new T.LineBasicMaterial({color:'#7cf5ff',transparent:true,opacity:.78}));wire.position.x=off;group.add(wire);
if(state.forma!=='cubo'){let rings=9; for(let i=0;i<rings;i++){const phi=Math.PI*(i+.5)/rings,RR=r*Math.sin(phi), yy=r*Math.cos(phi),pts=[];for(let j=0;j<=72;j++){const a=2*Math.PI*j/72;pts.push(new T.Vector3(off+RR*Math.cos(a),yy,RR*Math.sin(a)));}group.add(new T.Line(new T.BufferGeometry().setFromPoints(pts),new T.LineBasicMaterial({color:'#88e8fa',transparent:true,opacity:.2})));}}
if(state.normales){let samples=[]; if(state.forma==='cubo'){for(let face=0;face<6;face++)for(let u=-1;u<=1;u++)for(let v=-1;v<=1;v++){const p=[0,0,0],n=[0,0,0],axis=Math.floor(face/2),sgn=face%2? -1:1; p[axis]=sgn*r;n[axis]=sgn;const dims=[0,1,2].filter(x=>x!==axis);p[dims[0]]=u*r*.63;p[dims[1]]=v*r*.63;samples.push([new T.Vector3(off+p[0],p[1],p[2]),new T.Vector3(...n)]);}}else{for(let i=0;i<38;i++){let zz=1-2*(i+.5)/38,t=Math.sqrt(1-zz*zz),a=i*2.399963;const n=new T.Vector3(t*Math.cos(a),zz,t*Math.sin(a));samples.push([n.clone().multiplyScalar(r).add(new T.Vector3(off,0,0)),n]);}}for(const [pos,n] of samples){group.add(new T.ArrowHelper(n,pos,.26,0xffd66e,.1,.06));}}
if(state.lineas&&state.q!==0){const color=state.q>0?0xffa66e:0x82abff;for(let i=0;i<38;i++){const zz=1-2*(i+.5)/38,rad=Math.sqrt(1-zz*zz),a=i*2.399963,dir=new T.Vector3(rad*Math.cos(a),zz,rad*Math.sin(a));const start=.22,end=2.5;const pts=[dir.clone().multiplyScalar(start),dir.clone().multiplyScalar(end)];group.add(new T.Line(new T.BufferGeometry().setFromPoints(pts),new T.LineBasicMaterial({color,transparent:true,opacity:.50})));const arrowPos=dir.clone().multiplyScalar(state.q>0?2.05:.78);group.add(new T.ArrowHelper(dir.clone().multiplyScalar(Math.sign(state.q)),arrowPos,.28,color,.12,.07));}}
// 3D point and pulse rings are schematic; integration uses analytic Gauss result rather than numerical sampling.
const dot=new T.Mesh(new T.SphereGeometry(.055,12,10),mat('#ffffff'));dot.position.set(off+r,0,0);group.add(dot);const axes=new T.AxesHelper(2.3);group.add(axes);
}});
// Ajuste de cámara: en móvil sin visor, solo gestos táctiles (no giros involuntarios del teléfono).
const sceneEl=document.querySelector('a-scene');
const rig=$('rig'),cam=$('cam');
const original={rigPos:'0 1.6 4.3',menuPos:'-2.6 1.45 -2.6',menuRot:'0 20 0',worldPos:'0 1.25 -1.3'};
function resetCamera(){
  if(sceneEl.is('vr-mode'))return;
  rig.setAttribute('position',original.rigPos);
  rig.setAttribute('rotation','0 0 0');
  if(cam.components['look-controls']){
    const lc=cam.components['look-controls'];
    if(lc.yawObject)lc.yawObject.rotation.y=0;
    if(lc.pitchObject)lc.pitchObject.rotation.x=-0.07;
  }
}
$('centrar').addEventListener('click',resetCamera);
// En VR se redistribuye el escenario alrededor de un nuevo origen cercano al observador;
// evitamos que quede fuera del campo visual de la lente al entrar a la sesión.
function centerVR(){
  const T=AFRAME.THREE;
  const cameraObj=cam.getObject3D('camera');
  if(!cameraObj)return;
  cameraObj.updateWorldMatrix(true,false);
  const head=new T.Vector3(),forward=new T.Vector3();
  cameraObj.getWorldPosition(head);cameraObj.getWorldDirection(forward);
  forward.y=0;
  if(forward.lengthSq()<.001)forward.set(0,0,-1);
  forward.normalize();
  const center=head.clone().addScaledVector(forward,2.6);
  const world=$('world'),menu=$('vrmenu'),title=$('titulo3d'),insideText=$('insideText');
  world.object3D.position.copy(center);
  world.object3D.position.y=head.y-.1;
  // Panel al costado izquierdo del campo de visión, siempre alcanzable mirando ligeramente a la izquierda.
  menu.object3D.position.copy(center).add(new T.Vector3(-1.65,.1,0));
  const angle=Math.atan2(forward.x,forward.z)+Math.PI;
  menu.object3D.rotation.set(0,angle,0);
  title.object3D.position.copy(center).add(new T.Vector3(0,1.65,0));
  insideText.object3D.position.copy(center).add(new T.Vector3(0,1.25,0));
  title.object3D.rotation.set(0,angle,0);
  insideText.object3D.rotation.set(0,angle,0);
}
sceneEl.addEventListener('enter-vr',()=>{
  // Oculta la interfaz HTML en sesión inmersiva para que no tape la vista estereoscópica.
  document.body.classList.add('vr-active');
  requestAnimationFrame(()=>setTimeout(centerVR,350));
});
sceneEl.addEventListener('exit-vr',()=>{
  document.body.classList.remove('vr-active');
  $('world').setAttribute('position',original.worldPos);
  $('vrmenu').setAttribute('position',original.menuPos);
  $('vrmenu').setAttribute('rotation',original.menuRot);
  $('titulo3d').setAttribute('position','0 3.3 -3.5');
  $('insideText').setAttribute('position','0 2.7 -3.0');
  resetCamera();
});
updateState();
})();
