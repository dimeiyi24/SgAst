function Srh(ss,irC,hw,reg){
  const HltClsNm="_dmy_hlt";
  if(irC) ss=ss.toLowerCase();
  this.srh=function(){
    if(ss.isEpy) return;
    dker.stopOb();
    doFrm(this._srhf.bind(this));
    dker.rsmOb();
  }
  this._srhf=function(w){
    if(w.name=='dmySrhUI') return;//byPass Self
    new Dom(w.document).doElmt(this._srhE,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);
  }
  this._srhE=function(m){
    if(m.hasChildNodes()) return;
    var s;
    if(m.nodeType==Node.TEXT_NODE) s=m.textContent;
    else if(m.tagName.toLowerCase()=='input') {
      s=m.value;
    } else return;
    if(/^[\t\n\r]*$/.test(s)) return;
    if(irC) ms=s.toLowerCase();
    var p=0,st=p,rst='';
    while((p=ms.indexOf(ss,st))!= -1){
      rst+=s.substring(st,p);
      st=p+ss.length;
      rst+='<span style="background:orange !important;">'+s.substr(p,ss.length)+'</span>';
    }
    rst+=s.substr(st);
    if(!st) return;
    if(m.nodeType==Node.TEXT_NODE) {
      var sp=document.createElement('span');
      sp.innerHTML=rst;
      sp.className=HltClsNm;
      m.rplCrt(sp);
    }
    // alert(ss);
    // log(s);
  }
  this.clrSrh=function(){
    dker.stopOb();
    doFrm(this._clrSrh);
    dker.rsmOb();
  }
  this._clrSrh=function(w){
    var d=w.document;
    var ms=d.getElementsByClassName(HltClsNm);
    for(var i=ms.length-1; i>=0; --i){//HTMLCollection由于是实时更新的,由于删除了当前Node,要反序
      var m=ms[i];
      var om=d.createTextNode(m.textContent);
      m.rplCrt(om);
    }
  }
}