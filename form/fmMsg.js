function fmMsg(s){
  var sDiv='<div style="color:inherit;background:inherit;height:100%;width:100%"></div>';
  fmPop.call(this,sDiv);
  var div=this.frm.contentDocument.getElementsByTagName('div')[0];
  div.textContent=s;
  this.tmOut=function(ms){setTimeout(this.cls.bind(this),ms);}
}
