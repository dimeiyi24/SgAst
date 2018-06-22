//□ Runtime
Object.prototype.eqA=function(){//eq Any
  for(var i=0; i<arguments.length; ++i) if(this==arguments[i]) return true;
  return false;
}
Object.prototype.arg2Ar=function(){//arguments→Array,
  // 若arguments只有一个,且是数组,则返回它,否则返回arguments的数组
  if(this.length==1&&Array.isArray(this[0])) return this[0];
  else return Array.prototype.slice.call(this);
}
Object.prototype.msg=function(){alert(this);}
Object.prototype.log=function(){console.log(this);}
Node.prototype.insBf=function(nd){this.parentNode.insertBefore(nd,this);}
function insBf(th,nd){th.parentNode.insertBefore(nd,th);}
function insAft(th,nd){
  var ns=th.nextSibling;
  ns?insBf(ns,nd):th.appendChild(nd);
}
Node.prototype.insAft=function(nd){
  var ns=this.nextSibling;
  ns?ns.insBf(nd):this.parentNode.appendChild(nd);
}
Node.prototype.rplCrt=function(nd){
  this.insBf(nd);
  this.parentNode.removeChild(this);
}
function sv2LS(obj,arg){//由于Object.prototype方式老是出错,只能用普通函数方式
  var nm=!arg?obj.srlzNm:arg;
  localStorage[nm]=obj.toJson();//serialize name
}
function frLS(srlzNm){//from localStorage
  var s=localStorage[srlzNm];
  return !s?null:s.Json2Obj();
}
Object.prototype.toJson=function(){return JSON.stringify(this);}
Object.prototype.htmEn=function(){
  return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
Object.prototype.btwn=function(a,b){return a<=this&&this<=b;}
String.prototype.isAnsi=function(){
  for(var i=0; i<this.length; ++i)
    if(this.charCodeAt(i)>255) return false;
  return true;
}
String.prototype.escape=function(){return escape(this);}
String.prototype.URICpnt=function(){return encodeURIComponent(this);}
String.prototype.enURI=function(){return encodeURI(this);}
String.prototype.msk2Reg=function(){//通配符→正则
  var r="",meta="$^[](){}|+.";
  var s=this+"\0";
  for(var i=0; i<s.length-1; ++i){
    var c=s[i];
    if(c=='\\') {//转义
      if(s[i+1]=='*') {
        r+="\\*";
        ++i;
      }
      else if(s[i+1]=='?') {
        r+="\\?";
        ++i;
      }
      else if(s[i+1]=='\\') {
        r+="\\\\";
        ++i;
      }
      else r+="\\\\";//若是其他字符,则认为是一个单独的\
    } else if(meta.indexOf(c)!= -1) r+="\\"+c;
    else switch(c) {
      case '*':
        r+=".*";
        break;
      case '?':
        r+='.';
        break;
      default:
        r+=c;
      }
  }
  return r;
}
String.prototype.hsAnyCh=function(cs){
  for(var i=0; i<cs.length; ++i) if(this.indexOf(cs[i])!= -1) return true;
  return false;
}
String.prototype.posAnyRg=function(ss,st){//return [st,ed] 返回所有匹配中位置最靠前的那个
  var mI=-1,mP=2147483647;
  for(var p,i=0; i<ss.length; ++i)
    if((p=this.indexOf(ss[i],st))!= -1&&p<mP) mP=p, mI=i;
  return mI!= -1?[mP,mP+ss[mI].length]:[-1,-1];
}
String.prototype.posAll=function(ss){
  for(var i=0; i<ss.length; ++i) if(this.indexOf(ss[i])== -1) return -1;
  return 0;
}
String.prototype.url2Dom=function(){//Url to Domain
  var st=this.indexOf('://');
  st=st== -1?0:st+3;
  var ed=this.indexOf('/',st);
  if(ed== -1) ed=this.length;
  return this.substring(st,ed);
}
String.prototype.Json2Obj=function(){return JSON.parse(this);}
String.prototype.trimSp=function(){return this.replace(/^(\s|　|&nbsp;)+|(\s|　|&nbsp;)+$/gi,'');}
String.prototype.atrimSp=function(){return this.replace(/(\s|　|&nbsp;)+/gi,'');}
String.prototype.trimTag=function(){return this.replace(/<[^<>]*>/g,'');}
String.prototype.fn2Ext=function(){
  var p=this.lastIndexOf('.');
  if(p!= -1) return this.substr(p+1);
  return '';
}
String.prototype.ctn=function(s){return this.indexOf(s)!= -1;}
String.prototype.toExtUrl=function(){
  return sogouExplorer.extension.getURL(this.valueOf());
}
String.prototype.toInt=function(){return parseInt(this);}
String.prototype.bfA=function(a){
  var p;
  if((p=this.indexOf(a))!= -1) return this.substring(0,p);
  else return '';
}
String.prototype.afB=function(b){
  var p;
  if((p=this.indexOf(b))!= -1) return this.substr(p+b.length);
  else return '';
}
Object.defineProperty(String.prototype,'isEpy',{get:function(){return this.length==0;}});
Object.defineProperty(String.prototype,'cnt',{get:function(){return this.length;}});
String.prototype.toPinYin=function(){
  r='';
  for(var i=0; i<this.length; ++i){
    var c=this.charCodeAt(i);
    r+=c.btwn(0x4E00,0x9FA5)?PinYi[c-0x4E00]:this[i];
  }
  return r;
}
String.prototype.toGB=function(){
  if(!String.prototype.Big_GB) {//首次构建HashTable
    String.prototype.Big_GB=[];
    for(var i=0; i<L_BIG5.length; ++i)
      String.prototype.Big_GB[L_BIG5[i]]=L_GB[i];
    log(String.prototype.Big_GB);
  }
  var r='';
  for(var i=0; i<this.length; ++i){
    var gb=String.prototype.Big_GB[this[i]];
    r+=!gb?this[i]:gb;
  }
  return r;
}
String.prototype.toBig5=function(){
  if(!String.prototype.GB_Big) {//首次构建HashTable
    String.prototype.GB_Big=[];
    for(var i=0; i<L_GB.length; ++i)
      String.prototype.GB_Big[L_GB[i]]=L_BIG5[i];
  }
  var r='';
  for(var i=0; i<this.length; ++i){
    var big5=String.prototype.GB_Big[this[i]];
    r+=!big5?this[i]:big5;
  }
  return r;
}
//□ Number
String.prototype.addProt=function(){//add Protocol
  if(this.indexOf('://')== -1) return 'file:///'+this.replace(/\\/g,'/'); else return this.valueOf();
}
Number.prototype.ms2Dt=function(){
  function pd2(n){
    n=n.toString();
    return n.length!=1?n:'0'+n;
  }
  var d=new Date();
  d.setTime(this);
  return d.getFullYear().toString().substr(2)+'-'+pd2(d.getMonth())+'-'+pd2(d.getDay())
    +' '+pd2(d.getHours())+':'+pd2(d.getMinutes());
}
Number.prototype.has=function(a){return (this&a)==a;}
Number.prototype.toS=function(){return String.fromCharCode(this);}
Number.prototype.min=function(b){return this<b?this:b;}
Number.prototype.max=function(b){return b<this?this:b;}
Number.prototype.nxMod=function(inc,mod){
  return (this+mod+inc)%mod;
}
Number.prototype.lim=function(a,b){
  if(this<a) return a;
  if(b<this) return b; else return this.valueOf();
}
//□ Array
Array.mkIdx=function(n){
  var r=new Array(n);
  for(var i=0; i<n; ++i) r[i]=i;
  return r;
}
Array.prototype.swap=function(a,b){
  var t=this[a];
  this[a]=this[b];
  this[b]=t;
}
Array.prototype.move=function(a,b){
  var t=this[a];
  this.splice(a,1);
  this.splice(b,0,t);
}
Array.prototype.joinEx=function(a,f){
  r='';
  for(var i=0; i<this.length-1; ++i) r+=f(this[i])+a;
  if(this.length>0) r+=f(this[i]);
  return r;
}
Array.prototype.min=function(){return Math.min.apply(null,this);}
Array.prototype.max=function(){return Math.max.apply(null,this);}
Array.prototype.lst=function(){return this[this.length-1];}
Object.defineProperty(Array.prototype,'isEpy',{get:function(){return this.length==0;}});
Object.defineProperty(Array.prototype,'cnt',{get:function(){return this.length;}});//ArrayLike
Array.prototype.clr=function(){this.length=0;}//由于要保留其它属性,不能用=[]的方法
Array.prototype.popn=function(i){//pop第n个
  r=this[i];
  this.splice(i,1);
  return r;
}
Array.prototype.rmv=function(i){this.splice(i,1);}
Array.prototype.limt=function(max){//限制最大为max个,裁左端
  this.splice(0,this.length-max);
}
Array.prototype.rmvV=function(v){
  for(var i=0; i<this.length; ++i) if(v==this[i]) {
    this.splice(i,1);
    break;
  }
}
Array.prototype.rmvVs=function(vs){for(var i=0; i<vs.length; ++i) this.rmvV(vs[i]);}
Array.prototype.rmvIf=function(f){//只Rmv满足条件的首个
  for(var i=this.length-1; i>=0; --i) if(f(this[i])) {
    this.splice(i,1);
    break;
  }
}
Array.prototype.addAll=function(ar){Array.prototype.push.apply(this,ar);}
Array.prototype.add=function(a){
  this.push(a);
  return this;
}
Array.prototype.ins=function(i,s){this.splice(i,0,s);}
Array.prototype.joinN=function(s,st,ed){//从st到ed以s连接
  var r='';
  for(var i=st; i<=ed; ++i) r+=this[i]+s;
  return r.substr(0,r.length-s.length);
}
Array.prototype.addUnq=function(v){//增加不重复
  for(var i=0; i<this.length; ++i) if(v==this[i]) return;
  this.push(v);
}
Array.prototype.addNew=function(v){//增加不重复,把最新的提到末尾
  for(var i=0; i<this.length; ++i) if(v==this[i]) {
    this.splice(i,1);
    break;
  }
  this.push(v);
}
const Key={Alt:1,Sft:2,Ctrl:4,Mod:8}
function gMod(e){
  var r=0;
  if(e.altKey) r|=Key.Alt;
  if(e.shiftKey) r|=Key.Sft;
  if(e.ctrlKey) r|=Key.Ctrl;
  if(e.metaKey) r|=Key.Mod;
  return r;
}
KeyboardEvent.prototype.gMod=function(){//不知为啥,没有用
  var r=0;
  if(this.altKey) r|=Key.Alt;
  if(this.shiftKey) r|=Key.Sft;
  if(this.ctrlKey) r|=Key.Ctrl;
  if(this.metaKey) r|=Key.Mod;
  return r;
}
HTMLCollection.prototype.idx=function(m){
  for(var i=0; i<this.length; ++i) if(this[i]==m) return i;
  return -1;
}
HTMLElement.prototype.stopRend=function(){this.style.display='none';}//stop Render
HTMLElement.prototype.sttRend=function(){this.style.display='initial';}//start Render
function fdPrtByTag(crt,tag){//有些元素的prototype有bug,如HTMLTableCellElement
  var prt=crt;
  while(prt&&prt.tagName.toLowerCase()!=tag) prt=prt.parentNode;
  return prt;
}
HTMLTableElement.prototype.aRow=function(){return this.insertRow(this.rows.length);}
HTMLTableRowElement.prototype.aCell=function(){return this.insertCell(this.cells.length);}
function _pr2s(p){
  if(!(p instanceof Array)) return p.toString();
  return '['+p.join(',')+']';
}
function ar2s(ar){
  var r=[];
  for(var i=0; i<ar.length; ++i) r.push(_pr2s(ar[i]));
  return r.join(',');
}
function alerts(){alert(ar2s(arguments));}
function lg(){//在页内部对话框log
  gFmLog().add(ar2s(arguments)+'\n');
}
function pop(){new fmMsg(ar2s(arguments)).tmOut(1500);}
function log(){
  for(var i=0; i<arguments.length; ++i) console.log(arguments[i]);
}
function logs(){console.log(ar2s(arguments));}
function sleep(ms){
  var tm=new Date().getTime()+ms;
  while(true) if(new Date().getTime()>tm) return;
}
//□ Maths
function min3I(a,b,c){
  var min,idx;
  if(a<b) {
    min=a;
    idx=0;
  } else {
    min=b;
    idx=1;
  }
  if(c<min) idx=2;
  return idx;
}
function max3I(a,b,c){
  var max,idx;
  if(a<b) {
    max=b;
    idx=1;
  } else {
    max=a;
    idx=0;
  }
  if(max<c) idx=2;
  return idx;
}
//□ Json
function inis2json(str){//把一个ini格式字符串转换为json对象
  var r={
    sec:/^\s*\[\s*(.+)\s*\]\s*$/,
    indt:/^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/,
    cmt:/^\s*;.*$/
  };
  var rst={},mar,sec='',arln,i;
  if(!str) return null;
  arln=str.split(/\r\n|\r|\n/);
  for(i=0; i<arln.length; ++i){
    if(arln[i].match(r.cmt)) continue;
    if(mar=arln[i].match(r.indt)) {if(sec) rst[sec][mar[1]]=mar[2]; else rst[mar[1]]=mar[2];}
    else if(mar=arln[i].match(r.sec)) {
      sec=mar[1];
      rst[sec]={};
    }
  }
  return rst;
}
function json2inis(o){
  var rst='';
  for(var n in o) if(o.hasOwnProperty(n)) {
    rst+='['+n+']\r\n';
    for(var m in o[n]) if(o[n].hasOwnProperty(m)) rst+=m+'='+o[n][m]+'\r\n';
  }
  return rst.slice(0,-2);
}
//□ Dom
function emFrHtml(d,s){
  var div=d.createElement('div');
  div.innerHTML=s;
  var r=div.firstChild;
  div=null;
  return r;
}
function hasClass(el,cs){
  if(el.classList) return el.classList.contains(cs)
  else return !!el.className.match(new RegExp('(\\s|^)'+cs+'(\\s|$)'))
}
function addCls(el,cs){
  if(el.classList) el.classList.add(cs);
  else if(!hasClass(el,cs)) el.className+=" "+cs;
}
function rmvCls(el,cs){
  if(el.classList)
    el.classList.remove(cs)
  else if(hasClass(el,cs)) {
    el.className=el.className.replace(new RegExp('(\\s|^)'+cs+'(\\s|$)'),' ');
  }
}
function _doFrm(){//win func(w,arg...) arg...
  var w=arguments[0],f=arguments[1];
  var prs=[w];
  prs.push.apply(prs,Array.prototype.slice.call(arguments,2));
  //页面可能没加载,加载后也可能有刷新的问题
  try{
    if(w.document.readyState=='complete') f.apply(this,prs);
    w.addEventListener('load',function(){f.apply(this,prs);});
  } catch(e){ }
  var args=Array.prototype.slice.call(arguments);
  var _f=function(){
    for(var i=0; i<w.frames.length; i++){
      Array.prototype.splice.call(args,0,1,w.frames[i]);
      try{ _doFrm.apply(this,args);} catch(e){ }
    }
  };
  //Frame未加载完有些操作会失败
  try{
    if(w.document.readyState=='complete') _f();
    w.addEventListener('load',_f);
  } catch(e){ }
}
function doFrm(){//(func(w,arg...),arg...)
  Array.prototype.splice.call(arguments,0,0,window);
  _doFrm.apply(this,arguments);
}
function crtTid2Tab(tid){//不能用此,因为getAllInWindow是异步的.
  var r;
  sogouExplorer.tabs.getAllInWindow(function(tbs){
    for(i in tbs) if(tbs[i].id==tid) {
      r=tbs[i];
      return;
    }
  });
  return r;
}
//◇ Util
function unit2px(m,v){
  var div=m.contentDocument.createElement("div");
  div.style.overflow="hidden";
  div.style.visibility="hidden";
  m.parentElement.appendChild(div);
  div.style.width=v;
  var r=div.offsetWidth;
  m.parentElement.removeChild(div);
  return r;
}
//◇ sogouExplorer
function sdReq(req,rf){
  rf?sogouExplorer.extension.sendRequest(req,rf)
    :sogouExplorer.extension.sendRequest(req);
}
function sdCmd(cmd,rf){sdReq({cmd:cmd},rf);}
function selTb(tid){sdReq({cmd:'selTb',tid:tid});}
function clsTb(tid){sdReq({cmd:'clsTb',tid:tid});}
function opUrl(url,sel){sdReq({cmd:'opUrl',url:url,sel:sel});}
function rmvBm(id){sdReq({cmd:'rmvBm',id:id});}
function rmvHis(url){sdReq({cmd:'rmvHis',url:url});}
//由于sendRequest无法传送子对象,必须把syncNm传回去
function svDt(dt){sdReq({cmd:'svDt',data:dt,syncNm:dt.syncNm});}//save data
//Local data和data不同,是直接保存到localStorage中的,这些数据只有读取和保存,而svDt里的数据是
//先保存到变量,关闭是才保存,通常这些变量在运行时也要修改
function svLDt(dt,syncNm){sdReq({cmd:'svLDt',data:dt,syncNm:syncNm});}//save Local data
function wKer(){
  var wk=gWkFrS('onmessage=function (e) {\n'+
    '  postMessage(e.data[0]*e.data[1]);\n'+
    '}');
  wk.postMessage([3,7]);
  wk.onmessage=function(e){
    log(e.data);
  };
  lg("sdf");
}
function test(){
  plSnd('Res/1.mp3');
  // wKer();
  // var a="繁万萬與12";
  // a.toPinYin().msg();
  // document.body.focus();
  // var f=win.fcs();
  // alert(f);
  // doFrm(function(d,str,p2){
  //   logs(str,p2,d.all.length);
  // },'hah',3);
  // beep();
}
