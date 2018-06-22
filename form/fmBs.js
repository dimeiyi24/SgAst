function insElm(el){//若无body则通过documentElement返回html
  (document.body||document.documentElement).appendChild(el);
}
function crtStl(d,cn,str){
  var stl=d.createElement('style');
  stl.innerHTML=cn+"{"+str+'}';
  d.head.appendChild(stl);
}
function crtFlStl(d,url){
  var lk=d.createElement('link');
  lk.href=url;
  lk.setAttribute('rel','stylesheet');
  lk.setAttribute('type','text/css');
  d.head.appendChild(lk);
}
function fmBs(instr,cls,nm){
  this.clsHd=false;//use Hide For Close
  var fr=document.createElement('iframe');//由于Div受到外部css影响,用一个iframe来屏蔽
  this.frm=fr;
  document.documentElement.appendChild(fr);
  this.nm=fr.contentWindow.name=nm;
  this.pInst=//Prev Inst
    win.fd(function(f){
      try{
        return f.inst&&f.inst.constructor==this.constructor;
      } catch(e){return false; }
    }.bind(this));
  fr.contentWindow.inst=this;//保存实例
  fr.contentWindow.noDark=true;//不用Dark
  fr.className=cls;
  var html='<html><head><meta charset="UTF-8"></head><body></body></html>';
  fr.contentDocument.open();
  fr.contentDocument.write(html);
  fr.contentDocument.close();
  fr.contentWindow.addEventListener('focus',this);
  this.addStl=function(cn,str){crtStl(fr.contentDocument,cn,str);}
  this.addFlStl=function(url){crtFlStl(fr.contentDocument,url);}
  this.addFlStl('Res/frm.css'.toExtUrl());
  this.crtElmt=function(tag){return fr.contentDocument.createElement(tag);}
  Object.defineProperty(this,'dom',{get:function(){return new Dom(fr.contentDocument);}});
  this.crtEm=function(){
    var dom=new Dom(fr.contentDocument);
    return dom.crtEm.apply(dom,arguments);
  }
  var div=this.crtElmt('div');
  this.div=new Elmt(div);
  div.className='dmyDiv';
  div.innerHTML=instr;
  fr.contentDocument.body.appendChild(div);
  div.onresize=function(){fr.height=div.scrollHeight.toString();};//无法实现
  this.pack=function(){fr.height=div.scrollHeight;}
  this.pack();
  this.addNd=function(nd){
    if(nd instanceof Elmt) nd=nd.elmt;
    div.appendChild(nd);
  }
  this.addCt=function(ct){this.addNd(ct.elmt);}
  this.cls=function(){
    if(this.svOpt) this.svOpt();
    if(this.clsHd) this.hd(); else {
      document.documentElement.removeChild(fr);
      this.onCls&&this.onCls();
    }
  }
  this.hd=function(){
    fr.contentDocument.activeElement.blur();
    //todo 保存点击时焦点 保存选区
    if(this.oFcsW) this.oFcsW.focus();//恢复原焦点
    fr.style.visibility='hidden';
    this.onHd&&this.onHd();
  }
  this.sh=function(){
    fr.style.visibility='visible';
    return this;
  }
  this.vis=function(){return fr.style.visibility!='hidden';}
  this.ipt=function(){return fr.contentDocument.getElementsByTagName('input')[0];}
  this.fcs=function(){
    this.oFcsW=win.fcsWin();
    // var utterThis = new window.SpeechSynthesisUtterance('你好，世界！');
    // window.speechSynthesis.speak(utterThis);
    //iframe必须用contentDocument
    this.ipt().focus();
  }
  this.hk=new HotKey(fr.contentWindow);
  this.hk.addFn(0,27,this.cls.bind(this));
  this.handleEvent=function(e){
    // else if(e.type=='focus') log(win.fcs());
  }
}
// function Dlg2(instr,cls){
//   var div=document.createElement('div');
//   div.className=cls;
//   div.innerHTML=instr;
//   div.addEventListener("keydown",this,true);
//   this.handleEvent=function(e){if(e.keyCode==27) this.hd();}
//   insElm(div);
// }