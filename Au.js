function beep(dur,fr,vol,tp){
  var ctxClass=window.AudioContext||window.webkitAudioContext;
  var ctx=new ctxClass();
  var osc=ctx.createOscillator();
  if(!dur) dur=100;
  if(!fr) fr=440;
  if(!tp) tp="sine";
  osc.type=tp;
  osc.frequency=fr;
  // osc.connect(ctx.destination);
  var gn=ctx.createGain();
  osc.connect(gn);
  gn.connect(ctx.destination);
  if(!vol) vol=50;
  gn.gain.value=vol/100;//*gn.gain.maxValue有问题
  osc.start(0);
  setTimeout(function(){
    osc.stop(0);
    osc.disconnect();
    gn.disconnect();
  },dur);
}
function plSnd(fn){if(opt.usSnd) new Audio(fn.toExtUrl()).play();}