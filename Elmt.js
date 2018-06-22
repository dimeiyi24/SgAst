if(!Element.prototype.matches) {
  Element.prototype.matches=
    Element.prototype.webkitMatchesSelector||Element.prototype.matchesSelector
    ||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector
    ||Element.prototype.oMatchesSelector;
}
function Elmts(){
  var ms=[];
  this.add=function(m){
    if(m instanceof Elmt) ms.push(m); else ms.push(new Elmt(m));
    return this;
  }
  this.get=function(i){return ms[i];}
  this.onClk=function(f){for(var i=0; i<ms.length; ++i) ms[i].onClk(f);}
  Object.defineProperty(this,'cnt',{get:function(){return ms.length;}});
}
function Elmt(){
  var m=arguments[0],doc,evtTb=[];
  this.elmt=m;
  doc=m.ownerDocument;
  this.addEvt=function(){m.addEventListener("click",this);}
  this.addEvt();
  this.cld=function(t){//children
    if(typeof t==="number") return new Elmt(m.childNodes[t]);
    else if(typeof t==="string") {
      var r=new Elmts();
      for(var i=0; i<m.childNodes.length; ++i)
        if(m.childNodes[i].matches(t)) r.add(m.childNodes[i]);
      return r;
    }
  }
  Object.defineProperty(this,'tx',{
    get:function(){return m.textContent;},
    set:function(v){m.textContent=v;}
  });
  Object.defineProperty(this,'cptStl',{//ComputedStyle
    get:function(){return getComputedStyle(m);}
  });
  Object.defineProperty(this,'v',{
    get:function(){return m.value;},
    set:function(v){m.value=v;}
  });
  this.fd=function(s){return m.querySelectorAll(s);}//find
  this.clk=function(){m.click();}
  this.onClk=function(f){this.doClk=f;}
  this.on=function(evts,f){
    evtTb[evts]=f;
    m.addEventListener(evts,this);
  }
  this.off=function(evts){
    var f=evtTb[evts];
    f&&(m.removeEventListener(evts,f)||(evtTb[evts]=null));
  }
  this.handleEvent=function(e){
    if(e.type=='click') this.doClk&&this.doClk(e);
    else {
      var f=evtTb[e.type];
      f&&f(e);
    }
  }
  function gElmt(ars){
    var r=ars[0];
    if(typeof r==="string") {
      if(r.indexOf('<')== -1) r=doc.createElement(r);//tag
      else r=emFrHtml(doc,r);
    }
    if(ars.length>1) r.innerHTML=ars[1];
    return r;
  }
  this.insAft=function(){
    insAft(m,gElmt(arguments));
    return this;
  }
  this.insBf=function(){
    insBf(m,gElmt(arguments));
    return this;
  }
  this.apd=function(){//append
    var r=gElmt(arguments);
    m.appendChild(r);
    return this;
  }
  this.prpd=function(){//prepend
    var r=gElmt(arguments);
    m.insertBefore(r,m.firstChild);
    return this;
  }
}
