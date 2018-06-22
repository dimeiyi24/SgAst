// onerror=function(){return true;}
var fFilled=false,iRegCnt=0,cntCfg=0;
var oflCfg,runTm,opt;
var isFlt=true;
sogouExplorer.extension.onRequest.addListener(function(dt,sd,rsp){
  switch(dt.cmd) {
  case 'init':
    dt=dt.data;
    oflCfg=dt[0], runTm=dt[1], opt=dt[2];
    runTm.srh= !runTm.srh;
    //reLoc();
    if(oflCfg['Setting'].auDk=="true") dker.sDark(true);
    if(oflCfg['Setting'].auClrFlt=="true") sFlt(isFlt=true);
    break;
  case 'gCltH':
    rsp(window.document.documentElement.clientHeight);
    break;
  case 'pop':
    pop(dt.msg);
    break;
  case 'lg':
    lg(dt.msg);
    break;
  }
});
function fireEvt(e,evt){
  if(e.fireEvent) return e.fireEvent('on'+evt);
  else {
    var aevt=document.createEvent("HTMLEvents");
    aevt.initEvent(evt,true,true);
    return !e.dispatchEvent(aevt);
  }
}
function nxNd(dT){
  if(dT.nextSibling) {
    dT=dT.nextSibling;
    while(dT.firstChild) dT=dT.firstChild;
    return dT;
  } else return dT.parentNode;
}
function prNd(dT){
  if(dT.previousSibling) {
    dT=dT.previousSibling;
    while(dT.lastChild) dT=dT.lastChild;
    return dT;
  } else return dT.parentNode;
}
function getNdTx(nd){
  if(nd.nodeType==1) return nd.outerHTML.trimTag().atrimSp(); else return nd.data.atrimSp();
}
function fdIdx(sel,tx){
  for(var i=0; i<sel.length; ++i) if(sel.options[i].text.match(RegExp(tx,'i'))) return i;
  return -1;
}
function getRdoTx(irdo){//得到radio相关文本
  e=nxNd(irdo);
  while(e){
    if(e.nodeType==1&&e.innerHTML.match(/<input/i)) break;
    if(getNdTx(e).trimTag()) return getNdTx(e).trimTag();
    e=nxNd(e);
  }
  e=prNd(irdo);
  while(e){
    if(e.innerHTML.match(/<input/i)) break;
    if(getNdTx(e).trimTag()) return getNdTx(e).trimTag();
    e=prNd(e);
  }
  return '';
}
function trySelOpt(se,tx)//尝试在se中选择文本为tx的一项
{
  var idx=fdIdx(se,tx);
  if(idx!= -1) with(se){
    stl.backgroundColor='#E3FFFF';
    focus();
    options[idx].selected=true;
    try{fireEvt(se,'change')} catch(e){}
    try{fireEvt(se,'select')} catch(e){}
    blur();
    return true;
  }
  return false;
}
function dlElmt(eipt){
  var rst=false,j,ar=[],lstIpt,st='';
  function fill(s){
    for(n in oflCfg['Setting'])
      if(oflCfg['Setting'].hasOwnProperty(n)&&s.match(RegExp(oflCfg['Setting'][n].reg,'i'))) {
        fFilled=true;
        eipt.stl.backgroundColor="#FFFFCE";
        eipt.focus();
        switch(eipt.tagName) {
        case 'INPUT':
          if(eipt.type=='radio') {
            if(getRdoTx(eipt).toLowerCase().indexOf(cfgVal(n))!= -1)
              eipt.checked=true; else return false;
          }
          break;
        case 'TEXTAREA':
          eipt.value=cfgVal(n);
          break;
        case 'SELECT':
          return trySelOpt(eipt,cfgVal(n));
        }
        eipt.blur();
        return true;
      }
    return false;
  }
  function emElmt(bpreOrd){//bpreOrd向前查找
    function canStop()//是否停止搜索
    {
      return eipt.type=='radio'?e.outerHTML.match(/<form/i):e.outerHTML.match(/<(input|form|select)/i);
    }
    var e=eipt;
    while(e){
      while(bpreOrd?e.previousSibling:e.nextSibling){
        e=bpreOrd?e.previousSibling:e.nextSibling;
        if(e.nodeType==1) {//nodeType有两种1Element 3Text
          if(canStop()) {
            lstIpt=e;
            return false
          }
          ;st=e.innerHTML.trimTag().atrimSp()
        }
        else st=e.data.atrimSp();
        if(st&&fill(st)) return true;
      }
      e=e.parentNode;
    }
    return false;
  }
  bpreOrd= !(eipt.tagName=='SELECT');
  if(!emElmt(bpreOrd)) emElmt(!bpreOrd);
}
function schNfl(mydoc){
  function dlElmts(c){
    var i,j,n,ar;
    for(i=0; i<c.length; ++i){
      if((c[i].type==''||c[i].type.match(/^(text|password|textarea|radio)$/i)||c[i].tagName=='SELECT')&& !c[i].readOnly)
        dlElmt(c[i]);
      if(c[i].type.match(/^password$/i)&& !c[i].readOnly)
        for(n in oflCfg['Setting'])
          if(oflCfg['Setting'].hasOwnProperty(n)&&oflCfg['Setting'][n].reg=='[PW]') {//[PW]表示对所有的password类input有效
            c[i].value=cfgVal(n);
            break;
          }
      if(c[i].tagName=='SELECT'&& !c[i].readOnly)
        for(n in oflCfg['Setting'])
          if(oflCfg['Setting'].hasOwnProperty(n)&&oflCfg['Setting'][n].reg=='[OPT]') {//[OPT]表示对所有的radio类input有效
            ar=cfgVal(n).split('|');
            for(j=0; j<ar.length; ++j) if(trySelOpt(c[i],ar[j])) break;
            break;
          }
    }
  }
  dlElmts(mydoc.getElementsByTagName('input'));
  dlElmts(mydoc.getElementsByTagName('textarea'));
  dlElmts(mydoc.getElementsByTagName('select'));
}
function dlFrm(f){
  var arf=[],arnf=[],i;
  arf.push(window.frames);
  while(arf.length){
    f=arf.pop();
    try{schNfl(f);} catch(e){alert(e.name+":"+e.message+'\n'+f.location)}
    for(i=0; i<f.frames.length; ++i) arnf.push(f.frames(i));
    if(!arf.length) {
      arf=arnf;
      arnf=[];
    }
  }
}
function cfgVal(item){
  return oflCfg['cfg'+window.idimeiyi24][item]||'';
}
function initNFill(){
  var n,ar;
  if(!oflCfg.bInit) {
    for(var n in oflCfg['Setting']) if(oflCfg['Setting'].hasOwnProperty(n)) {
      ar=oflCfg['Setting'][n].split('$$');
      oflCfg['Setting'][n]={reg:ar[0],type:ar[1]};
    }
    oflCfg.bInit=true;
  }
  for(var n in oflCfg) if(oflCfg.hasOwnProperty(n)&&n.match(/cfg/)) cntCfg=Math.max(Number(n.replace(/cfg/,''))+1,cntCfg);//
  if(window.idimeiyi24==null) window.idimeiyi24=0; else window.idimeiyi24=(window.idimeiyi24+1)%cntCfg;
  dlFrm(document);
  //if (fFilled) setTimeout(function () {popmsg('<font color="#008600"><strong><h5>配置'+(window.idimeiyi24+1)+'</h5><h5
  // align="center">'+readIni('username')+'<//h5></strong></font>')},30);
}
//Up
var rdom=/\.(com|net|org|wang|gov|edu|mil|biz|name|info|mobi|pro|int|aero|post|rec|asia|cat|coop|jobs|tel|arpa|root|sh|cc|tv|us|tk|ws|ac|io|cn|af|ar|at|au|ba|be|br|ca|ch|cu|cz|de|dk|do|eg|es|fi|fr|gr|id|ie|il|in|iq|ir|is|it|jo|jp|kp|kr|mn|mo|nz|ph|pk|pl|pt|ru|sa|se|sg|sy|th|tr|tw|ua|uk|vn|za)$/i;
var ourl={},hf;
function calcHf(){
  hf=location.href;
  var mr=hf.match(/^\w+?:\/\//);
  ourl.pro=mr[0];// http://
  hf=hf.substr(mr[0].length);
  mr=hf.match(/^([a-z0-9.]+?\/|[a-z0-9.]+)/i);
  ourl.host=mr[0];
  if('/'!=ourl.host[ourl.host.length-1]) ourl.host+='/';// aa.xxx.com/
  ourl.path=hf.substr(mr[0].length);// open/doc/?i=xxx
}
function prtHost(h)//父Domain
{
  var ht='',mr;
  for(var i=0; i<=1; ++i) if(mr=h.match(rdom)) {
    ht=mr[0]+ht;
    h=h.replace(rdom,'');
  } else break;
  if(h.split('.').length==1) return h+ht;
  if(h.substr(0,4)=='www.') h=h.substr(4); else h=h.replace(/^[a-z]+/i,'www');
  return h+ht;
}
function myopen(url,tp){
  tp==1?location.href=url:window.open(url);
}
function prtUrl(u)//父路径
{
  if(!u) return '';
  if('/'==u[u.length-1]) u=u.substr(0,u.length-1);
  return u.substr(0,u.lastIndexOf('/')+1);
}
function dlAlVdo(){
  var sites=[
    ['.youku.com','<div class="lists">','scrollbar_container','/v.youku.com/v_show/id_.+?.html','http:/'],
    ['.tudou.com','<div class="list_data fix">','scrollbar_container',
      'href="http://www.tudou.com/albumplay/.+?.','']
  ];
  var vd=document.getElementById('VDCOM.id');
  if(!vd) {
    var div=document.createElement("div");
    div.innerHTML='<object classid="clsid:82B2D190-415D-4590-AEF3-6BB4E810A5A0" id="VDCOM.id"></object>';
    document.head.appendChild(div);//不能用"VDCOM.VdComCtrl.1"
    vd=document.getElementById('VDCOM.id');
  }
  calcHf();
  for(var i=0; i<sites.length; ++i){
    var st={url:sites[i][0],lsStt:sites[i][1],lsEd:sites[i][2],itReg:sites[i][3],prUrl:sites[i][4]};
    if(ourl.host.indexOf(st.url)!= -1) {
      var ht=document.getElementsByTagName('html')[0].innerHTML;
      if((p=ht.indexOf(st.lsStt))!= -1) {//是一个列表
        rs=ht.substr(p,ht.indexOf(st.lsEd,p)-p).match(RegExp(st.itReg,'gi'));
        vd.Submit("");//先清空,它就是这么设计的
        for(var j=0; j<rs.length; ++j){
          mr=rs[j].match(/http:\/\/.+/i);
          if(mr) url=mr[0];
          else {//相对路径
            if(rs[j].indexOf('/')==0) rs[j]=rs[j].substr(1);
            url='http://'+rs[j];
          }
          vd.AddCandidateUrl(url,'');
        }
        vd.Submit(location.href);
      }
      break;
    }
  }
}
function reLoc(){//解封贴吧
  var rpre=/http:\/\/tieba\.baidu\.com/i;
  var s=location.href;
  if(s.match(rpre)) {
    location.href=s.replace('http:','https:');
  }//http://jump.bdimg.com
}
function tgFLt(){sFlt(isFlt= !isFlt);}
function sFlt(b){
  var m=document.all;
  if(!b) for(i=0; i<m.length; i++) try{
    var z=getComputedStyle(m[i]).zIndex;
    z=z=='auto'?0:parseInt(z);
    if(z>0)//istl.position=="absolute"&&idx>0 ||istl.position=="fixed"
      addCls(m[i],"ClrFlt");
  } catch(e){}
  else for(i=0; i<m.length; i++) try{rmvCls(m[i],"ClrFlt");} catch(e){}
}
hotkey.addFn(0,'D',function(){scrollBy(0,-100);});
hotkey.addFn(0,'F',function(){scrollBy({top:100,behavior:'smooth'});});
hotkey.addFn(Key.Ctrl,'B',function(){beep();});
hotkey.addFn(Key.Alt|Key.Sft,'W',function(){sdCmd('clsOtr');});
hotkey.addFn(Key.Sft,122,function(){sdCmd('tgStsBar');});
hotkey.addFn(Key.Alt,'G',fmSrh);
// hotkey.addFn(Key.Alt,'Z',function(){sdCmd('opLst');});
hotkey.addFn(Key.Alt|Key.Sft,'Z',chsLst);
hotkey.addFn(Key.Alt,'3',function(){sdCmd('tgCore');});
hotkey.addFn(Key.Ctrl,'5',function(){sdCmd('dupCrt');});
hotkey.addFn(Key.Ctrl,'T',chsTbs);
hotkey.addFn(Key.Alt,188,function(){sdCmd('mvPr');});
hotkey.addFn(Key.Alt,190,function(){sdCmd('mvNx');});
hotkey.addFn(Key.Ctrl|Key.Sft,'F',chsFav);
hotkey.addFn(Key.Ctrl,'H',chsHis);
hotkey.addFn(Key.Ctrl,'G',chsMltSrh);
function chsLst(){
  sdCmd('chsLst',function(dt){
    var fm=new fmCls('chsLst','Last Close','Input to Search',dt.opt);
    if(fm.pInst) return;
    fm.sCol({nm:'title',w:'40%',align:'left'},{nm:'url',w:'40%',align:'left'});
    dt.data.syncNm='lstCls';
    fm.addIts(dt.data).sh().fcs();
  });
}
function chsTbs(){
  sdCmd('chsTbs',function(dt){
    var fm=new fmTbs('chsTbs','Tabs','Input to Search',dt.opt);
    if(fm.pInst) return;
    fm.sCol({nm:'title',w:'40%',align:'left'},{nm:'url',w:'40%',align:'left'});
    fm.addIts(dt.data).sh().fcs();
  });
}
function gBms(cld){
  function _gBms(cld,rst){
    if(!cld) return;
    rst.addAll(cld);
    for(var i=0; i<cld.length; ++i) _gBms(cld[i].children,rst);
  }
  var r=[];
  _gBms(cld,r);
  return r;
}
function chsFav(){
  sdCmd('chsFav',function(dt){
    var fm=new fmFav('chsFav','Favs','Input to Search',dt.opt);
    if(fm.pInst) return;
    fm.sCol({nm:'title',w:'40%',align:'left'},{nm:'url',w:'40%',align:'left'});
    fm.addIts(gBms(dt.data)).sh().fcs();
  });
}
function chsHis(){
  sdCmd('chsHis',function(dt){
    var fm=new fmHis('chsHis','History','Input to Search',dt.opt);
    if(fm.pInst) return;
    fm.sCol({nm:'title',w:'40%',align:'left'},{nm:'url',w:'43%',align:'left'},
      {nm:'date',w:'13%',align:'left'});
    fm.addIts(dt.data).sh().fcs();
  });
}
function chsMltSrh(){
  sdCmd('chsMltSrh',function(dt){
    var fm=new fmMltSrh('chsMltSrh','Multi Search','Input to Search',dt.opt);
    if(fm.pInst) return;
    fm.srhTx=win.selTx();
    fm.sCol({nm:'name',w:'40%',align:'left'},{nm:'url',w:'40%',align:'left'});
    // dt.data.syncNm='mltSrh';
    fm.crt=toTrNd(dt.data);
    fm.addIts(fm.crt.toAr()).sh().fcs();
  });
}
hotkey.stt();
var _bakDocKD=document.onkeydown;
document.onkeydown=function(e){
  if(e.ctrlKey) switch(e.keyCode) {
  case 69://E
    calcHf();
    with(ourl){
      if(path) path=prtUrl(path); else host=prtHost(host);
      //alert(pro+host+path);
      myopen(pro+host+path,e.shiftKey?2:1);
    }
    break;
  case 90://Z
    sdCmd('uniqueTab');
    break;
  case 52://4
    // chsMltSrh();
    test();
    e.preventDefault();
    break;
  case 81://Q
    //tt='href="http://www.tudou.com/albumplay/.+?.html';
    //mr='href="http://www.tudou.com/albumplay/tCI_vQtlvug/QDiicSk_1i4.html'.match(RegExp(tt,'gi'));
    //alert(mr);
    //dlAlVdo();
    sogouExplorer.extension.sendRequest({cmd:'sortTab'});
    break;
  default:
  } else if(e.altKey) switch(e.keyCode) {
  case 83://S
    initNFill();
    break;
  case 88://X
    if(e.shiftKey) tgFLt(); else dker.tgDark();
    break;
  }
  _bakDocKD&&_bakDocKD(e);
}