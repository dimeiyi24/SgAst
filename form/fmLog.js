var _fmLog;
function fmLog(){
  var sEdt='<textarea style="color:inherit;background:inherit;height:100%;width:100%"></textarea>';
  fmPop.call(this,sEdt);
  var tx=this.frm.contentDocument.getElementsByTagName('textarea')[0];
  this.clr=function(s){tx.value='';}
  this.add=function(s){tx.value+=s;}
  this.onCls=function(){_fmLog=null;}
  this.hk.addFn(Key.Alt,'C',this.clr);
}
function gFmLog(){
  if(!_fmLog) _fmLog=new fmLog();
  return _fmLog;
}