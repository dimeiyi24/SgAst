function fmCls(nm,desc,iptHint,opt){
  fmChs.call(this,nm,desc,iptHint,opt);
  this.rvsDis=true;
  this.pmtDel=false;
  this.itTxs=function(m){return [m.ti,m.url];}
  this.gImgS=function(m){//说是有faviconUrl,其实没有
    return '<img src="http://favicon.byi.pw/?url='+m.url.url2Dom()+'">';
  }

  this.run=function(o,sm){opUrl(o.url,!(sm&Key.Ctrl));}
  this.del=function(o){}
}