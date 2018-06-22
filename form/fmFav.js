function fmFav(nm,desc,iptHint,opt){
  fmChs.call(this,nm,desc,iptHint,opt);
  this.hk.rmvHt(0,27);
  var prtIts=[],prtStr=[];
  this.sts.cld(0).insAft('<span style="color:yellow;position:relative;left:1%"></span>');
  var path=this.sts.cld(1);
  this.itTxs=function(m){return [m.title,m.url];}
  this.gImgS=function(m){
    return m.isFolder?'<i class="ico">folder</i>'
      :'<img src="http://favicon.byi.pw/?url='+m.url.url2Dom()+'">';
  }
  this.runs=function(idxs,sm){
    if(idxs.isEpy) return;
    var isFd=idxs.length==1&&this.data(idxs[0]).isFolder;
    for(var i=0; i<idxs.length; ++i) this.run(this.data(idxs[i]),sm);
    if(sm!=Key.Ctrl&& !isFd) this.cls();
  }
  this.run=function(o,sm){
    if(!o.isFolder) opUrl(o.url,!(sm&Key.Ctrl));
    else {
      var Its=this.Its;
      prtIts.push(Its);
      for(var i=0; i<Its.length; ++i)
        if(Its[i].isFolder&&Its[i].id===o.id) {
          prtStr.push(Its[i].title);
          this.rstIts(gBms(Its[i].children));
          break;
        }
      path.tx=prtStr.join('\\');
    }
  }
  this.del=function(o){rmvBm(o.id);}
  var spHdEvt=this.handleEvent.bind(this);//super
  this.handleEvent=function(e){

    if(e.type!='keydown') spHdEvt(e);
    else if(e.keyCode==27) {//Esc
      if(prtIts.isEpy) this.cls();
      else {
        this.rstIts(prtIts.pop());//todo selIdx
        prtStr.pop();
        path.tx=prtStr.join('\\');
      }
      e.preventDefault();
    } else spHdEvt(e);
  }
}