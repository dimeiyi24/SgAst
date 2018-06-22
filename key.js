var hotkey={
  Fns:[],
  isEdtHk:function(e){
    switch(gMod(e)) {
    case 0://todo isAscii&&Arrow Home End
      return true;
    case Key.Ctrl:
      return e.keyCode.eqA(65,67,86,88,90);
    case Key.Ctrl|Key.Sft:
      return e.keyCode.eqA(67,90);
    }
  },
  handleEvent:function(e){
    //var x = document.activeElement.tagName;
    //log(e.target.tagName,x);
    if(e.target.tagName.eqA('INPUT','SELECT','OPTION','TEXTAREA')&&this.isEdtHk(e)) return;
    // log(e.keyCode,gMod(e));
    for(var i=0; i<this.Fns.length; ++i){
      var fi=this.Fns[i];
      // logs('key',fi.key,fi.mod);
      if(e.keyCode==fi.key&&gMod(e)==fi.mod) {
        fi.fn();
        e.preventDefault();
        break;
      }
    }
  },
  addFn:function(md,kc,fn,desc){
    if(typeof kc==="string") kc=kc.charCodeAt(0);
    this.Fns.push({mod:md,key:kc,fn:fn,desc:desc});
  },
  addEvt:function(w){w.addEventListener("keydown",hotkey,true);},
  stt:function(){doFrm(this.addEvt);}
}
function HotKey(et){
  et.addEventListener("keydown",this);
  this.Fns=[];
  this.rmvHt=function(md,kc){
    this.Fns.rmvIf(function(v){return kc==v.key&&md==v.mod;});
  }
  this.addFn=function(md,kc,fn,desc){
    if(Array.isArray(md)) for(var i=0; i<md.length; ++i)
      this.addFn(md[i][0],md[i][1],kc,fn);
    else {
      if(typeof kc==="string") kc=kc.charCodeAt(0);
      this.Fns.push({mod:md,key:kc,fn:fn,desc:desc});
    }
  }
  this.handleEvent=function(e){
    for(var i=0; i<this.Fns.length; ++i){
      var fi=this.Fns[i];
      if(e.keyCode==fi.key&&gMod(e)==fi.mod) {
        fi.fn();
        e.preventDefault();
        break;
      }
    }
  }
}