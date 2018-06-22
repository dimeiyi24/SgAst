function fmTbs(nm,desc,iptHint,opt){
  fmChs.call(this,nm,desc,iptHint,opt);
  this.pmtDel=false;
  this.itTxs=function(m){ return [m.title,m.url];}
  this.gImgS=function(m){//说是有faviconUrl,其实没有
    return '<img src="http://favicon.byi.pw/?url='+m.url.url2Dom()+'">';
  }
  this.run=function(o,sm){selTb(o.id);}
  this.del=function(o){clsTb(o.id);}
}