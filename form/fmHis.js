function fmHis(nm,desc,iptHint,opt){
  fmChs.call(this,nm,desc,iptHint,opt);
  var path=this.sts.cld(1);
  this.maxLn=200;
  this.frm.style.left='10%';
  this.frm.style.top='5%';
  this.frm.style.maxHeight='90%';
  this.frm.style.width='80%';
  this.sts.cld(0).insAft('<span style="color:yellow;position:relative;left:1%"></span>');
  this.itTxs=function(m){
    try{return m?[m.title,m.url,m.time?(m.time*1000).ms2Dt():'']:['','',''];} catch(e){beep();}}
  this.gImgS=function(m){//说是有faviconUrl,其实没有
    return '<img src="http://favicon.byi.pw/?url='+m.url.url2Dom()+'">';
  }
  this.run=function(o,sm){opUrl(o.url,!(sm&Key.Ctrl));}
  this.del=function(o){rmvHis(o.url);}
}