function fmMltSrh(nm,desc,iptHint,opt){
  fmChs.call(this,nm,desc,iptHint,opt);
  this.noFLt=true;
  this.frm.style.left='20%';
  this.frm.style.top='15%';
  this.frm.style.maxHeight='70%';
  this.frm.style.width='60%';
  this.hk.rmvHt(0,27);
  this.sts.cld(0).insAft('<span style="color:yellow;position:relative;left:1%"></span>');
  var path=this.sts.cld(1);
  this.div.prpd('br').prpd(
    '<input type="text" style="width:95%;" placeholder="搜索文本" class="dmyInr">');
  this.iptSrh=this.div.cld('input').get(0);
  var crt;
  Object.defineProperty(this,'crt',{
    get:function(){return crt;},
    set:function(v){crt=v;}
  });
  Object.defineProperty(this,'srhTx',{
    get:function(){return this.iptSrh.v;},
    set:function(v){this.iptSrh.v=v;}
  });
  this.itTxs=function(m){
    m=m._dt;
    return [m.ti,m.url?m.url:''];
  }
  this.gImgS=function(m){//说是有faviconUrl,其实没有
    m=m._dt;
    return !m.url?'<i class="ico">folder</i>'
      :'<img src="http://favicon.byi.pw/?url='+m.url.url2Dom()+'">';
  }
  this.runs=function(idxs,sm){
    if(idxs.isEpy) return;
    var isFd=idxs.length==1&& !this.data(idxs[0]).cld.isEpy;
    for(var i=0; i<idxs.length; ++i) this.run(this.data(idxs[i]),sm);
    if(sm!=Key.Ctrl&& !isFd||(this.noFLt&&sm.has(Key.Alt))) this.cls();
  }
  this.opUrl=function(url,sm){
    var st=this.srhTx;
    opUrl(url.replace('%s',st).replace('%as',st.escape())
      .replace('%cs',st.URICpnt()).replace('%us',st.enURI()),!(sm&Key.Ctrl));
  }
  this.run=function(o,sm){
    if(o.cld.isEpy) this.opUrl(o._dt.url,sm);
    else {//folder
      if(this.noFLt) if(sm==0) {
        crt=o;
        this.rstIts(o.toAr());
        path.tx=o.toPrtS('\\',function(o){return o._dt.ti;});
      }
      else for(var i=0; i<o.cld.length; ++i) this.opUrl(o.cld[i]._dt.url,sm);
    }
  }
  this.del=function(o){rmvBm(o.id);}
  var spHdEvt=this.handleEvent.bind(this);//super
  this.canBkDel=function(){
    var m=this.dom.acte;
    return m&&m.tagName=='INPUT'&& !m.value.isEpy;
  }
  this.upDir=function(){
    if(!crt.prt) return;
    this.rstIts(crt.prt.toAr());
    this.sel(crt.prt.cld.indexOf(crt));
    crt=crt.prt;
    path.tx=crt.toPrtS('\\',function(o){return o._dt.ti;});
  }
  this.handleEvent=function(e){
    if(e.type!='keydown') spHdEvt(e);
    else if(e.keyCode==27) {//Esc
      if(!crt.prt) this.cls(); else this.upDir();
      e.preventDefault();
    } else if(e.keyCode==8&& !this.canBkDel()) this.upDir(), e.preventDefault();
    else spHdEvt(e);
  }
}