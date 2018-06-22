function fmChs(nm,desc,iptHint,opt){
  const MaxClLen=120;//由于-webkit-line-clamp有性能影响,这里用MaxClLen来限制
  var prf="12345QWERT";
  var optTx=['Dks','SlI','Ico'];
  var optTip=['直接选择','当过滤到只有一个选项,立即运行','图标'];
  var Opt={dKS:True()/*direct key select*/,slIvk:True()/*sole Invoke*/,shIco:True()};//显示图标,渲染速度会变慢
  var optOdr=['dKS','slIvk','shIco'];
  var shOptTx=['Ir','Hw','And','繁','拼','Reg'];
  var shOptTip=['忽略大小写','整词','And模式','忽略简繁','拼音','正则表达式'];
  var srhOpt={irC:True(),hw:False(),and:True(),trad:True(),pinyin:False(),reg:False()};
  var srhOptOdr=['irC','hw','and','trad','pinyin','reg'];//由于Json是无序的,这里列出顺序
  this.rvsDis=false;//Reverse DisPlay
  Object.defineProperty(this,'noFLt',{//no filter
    _noFLt:false,
    get:function(){return this._noFLt;},
    set:function(v){
      this._noFLt=v;
      if(v) for(var i=0; i<tb.cnt.min(prf.length); ++i)
        tb.cell(i,0).style.color='green';
      else this.chgDks(Opt.dKS.v);
    }
  });
  var olAlt=false;//only Ctrl
  var sInr='<input type="text" style="width:95%;"  class="dmyInr">';
  var Its,cIts;
  var tm=new TmTst();
  fmBs.call(this,sInr,'dmyChsDlg',nm);
  if(this.pInst) {
    this.pInst.inst.fcs();
    this.cls();
    return;
  }
  this.pmtDel=true;//prompt
  this.maxLn=0;//最多显示行数
  this.iptFlt=new Elmt(this.ipt());
  this.iptFlt.placeholder=iptHint;
  var tb=new Tbl(this.frm.contentDocument,'chsIts');
  this.frm.contentWindow.addEventListener("keydown",this);
  this.frm.contentWindow.addEventListener("keyup",this);
  this.frm.contentWindow.addEventListener("keypress",this);
  this.frm.contentDocument.oncopy=function(e){
    var sel=this.frm.document.getSelection();
    if(!sel||sel.toString().isEpy) {
      var tx=[];
      for(var i=0; i<tb.sels.length; ++i){
        tx.push(this.itTxs(tb.data(tb.sels[i])).join('\t'));
      }
      e.clipboardData.setData('text/plain',tx.join('\n'));
      e.preventDefault();
    }
  }.bind(this);
  tb.onClk=function(idx){
    this.runs([idx],0);
  }.bind(this);
  tb.onSel=function(ss){
    var cnt=ss.cnt,iSs;
    if(cnt==0) iSs='-'; else if(cnt==1) iSs=ss[0]+1; else iSs=ss.min()+1+'-'+(ss.max()+1);
    this.sIdx.tx=iSs+'/'+tb.cnt+' '+(this.maxLn==0?'':cIts.cnt);
  }.bind(this);
  var div=this.crtElmt('div'),sts,fltBtns,optBtns;
  div.appendChild(tb.elmt);
  this.addNd(div);
  this.gImgS=function(m){return ''};
  this.svOpt=function(){
    var opt={srhOpt:srhOpt,Opt:Opt};
    svLDt(opt,this.nm+'Opt');
  }
  this.ldOpt=function(){
    if(opt) {
      for(var i=0; i<srhOptOdr.length; ++i)//由于通过json保存后,不会保存类型信息,因此只能设置值
        eval('srhOpt.'+srhOptOdr[i]+'.v=opt.srhOpt.'+srhOptOdr[i]+'.v');
      for(var i=0; i<optOdr.length; ++i) eval('Opt.'+optOdr[i]+'.v=opt.Opt.'+optOdr[i]+'.v');
    }
  }
  this.canDks=function(s){//Can Direct Invoke
    if(!Opt.dKS.v) return false;
    //由于这般sogouExplorer无法获得startOffset,只能假设无选区,光标在最后
    // var sel=ipt.ownerDocument.getSelection();
    return !this.lstMch(this.iptFlt.v+s);
  }
  this.handleEvent=function(e){
    switch(e.type) {
    case 'keypress':
      var md=gMod(e);
      var idx=prf.indexOf(e.keyCode.toS().toUpperCase());
      if(idx!= -1&&idx<tb.cnt) {
        if(md.eqA(0,Key.Sft)&&this.canDks(e.keyCode.toS())||this.noFLt) {
          this.runs([idx],md);
          e.preventDefault();
        }
      }
      break;
    case 'keyup':
      if(olAlt&&e.keyCode==18) this.noFLt= !this.noFLt, e.preventDefault();
      break;
    case 'keydown':
      olAlt=e.keyCode==18;
      var idx=prf.toUpperCase().indexOf(e.keyCode.toS());
      if(idx!= -1&&idx<tb.cnt) {
        var md=gMod(e);
        if(e.ctrlKey||e.altKey) {
          this.runs([idx],md);
          e.preventDefault();
        }
      }
      if(e.keyCode==13) {
        this.runs(tb.sels,gMod(e));
        e.preventDefault();
      }
      else if(e.keyCode.btwn(112,119)) {//F1-F8
        var b=fltBtns.get(e.keyCode-112);
        if(b) b.clk(), e.preventDefault();
      }
      else if(e.keyCode.btwn(120,123)) {//F9-F12
        var b=optBtns.get(e.keyCode-120);
        if(b) b.clk(), e.preventDefault();
      }
      break;
    }
  }
  this.chgDks=function(v){
    for(var i=0; i<tb.cnt.min(prf.length); ++i){
      tb.cell(i,0).style.color=v&&this.canDks(prf[i])
      &&this.canDks(prf[i].toLowerCase())?'green':'red';
    }
  }
  this.crtSts=function(){
    this.sts=sts=this.crtEm('div');
    sts.apd('span',desc).apd('<div style="display:inline;position:relative;left:15%"></div>')
      .apd('<div style="display:inline;position:relative;left:30%"></div>')
      .apd('<span style="float:right"></span>','-/-');
    var tbf=sts.cld('div').get(0),tbo=sts.cld('div').get(1);//toolbar:filter Option
    for(var i=0; i<shOptTx.length; ++i) tbf.apd('<lable title="'+shOptTip[i]+'">'+shOptTx[i]+'</lable>');
    for(var i=0; i<optTx.length; ++i) tbo.apd('<lable title="'+optTip[i]+'">'+optTx[i]+'</lable>');
    fltBtns=tbf.cld('lable'), optBtns=tbo.cld('lable');
    var self=this;
    function sBtnStt(b){
      b.elmt.style.borderWidth=1;
      b.elmt.style.margin=1;
      b.elmt.style.borderStyle=bi.data.v?'inset':'outset';
    }
    for(var i=0; i<fltBtns.cnt; ++i){
      var bi=fltBtns.get(i);
      bi.data=eval('srhOpt.'+srhOptOdr[i]);
      sBtnStt(bi);//todo 由于这方式有滚动条Bug,改成高亮显示
      bi.onClk(function(){
        this.data.tg();
        this.elmt.style.borderStyle=this.data.v?'inset':'outset';
        self.flt();
      });
    }
    for(var i=0; i<optBtns.cnt; ++i){
      var bi=optBtns.get(i);
      bi.data=eval('Opt.'+optOdr[i]);
      sBtnStt(bi);
      bi.onClk(function(){
        this.data.tg();
        this.elmt.style.borderStyle=this.data.v?'inset':'outset';
        if(this.data==Opt.dKS) self.chgDks(this.data.v);
        else if(this.data==Opt.shIco) {
          if(Opt.shIco.v) self.insCol(1,{nm:'ico',w:'2%',align:'center'}); else self.rmvCol(1);
          self.reFrh();
        }
        else if(this.data==Opt.slIvk) self.trySlIvk();
      });
    }
    this.sIdx=sts.cld(3);
    this.addNd(sts);
  }
  this.ldOpt();
  this.crtSts();
  this.rmvCol=function(n){tb.cols.rmv(n);}
  this.insCol=function(i,s){tb.cols.ins(i,s);}
  this.sel=function(i){tb.sel.apply(tb,arguments);}
  this.sCol=function(){
    var args=Array.prototype.slice.call(arguments);
    if(Opt.shIco.v) args.ins(0,{nm:'ico',w:'2%',align:'center'});
    args.ins(0,{nm:'key',w:'2%',align:'center'});
    tb.sCol.apply(tb,args);
  }
  this.shTb=function(){
    var v=this.iptFlt.v;
    if(!v.isEpy) var m=gMch(v);
    var htm='';
    for(var i=0; i<tb.cols.length; ++i) htm+='<col width="'+tb.cols[i].w+'"/>';
    var maxLn=this.maxLn==0?cIts.length:this.maxLn.min(cIts.length);
    for(var i=0; i<maxLn; ++i){
      var it=cIts[!this.rvsDis?i:cIts.length-1-i];
      tb.addDt(it);
      var ss=this.itTxs(it),row=[];
      var scol=Opt.dKS.v&&i<prf.length&&this.canDks(prf[i])
      &&this.canDks(prf[i].toLowerCase())||this.noFLt?'green':'red';
      htm+='<tr><td style="'+'text-align:'+tb.cols[0].align+';color:'+scol
        +'; font-weight: bold; font-size: 12pt;">'
        +(i<prf.length?prf[i]:'')+'</td>';
      if(Opt.shIco.v) htm+='<td style="'+'text-align:'+tb.cols[1].align+';">'+this.gImgS(it)+'</td>';
      for(var j=0; j<ss.length; ++j){
        htm+='<td style="text-align:'+tb.cols[j+Opt.shIco.v?2:1].align+';">'
        var sj=ss[j];
        if(sj) {
          var sj=sj.substr(0,MaxClLen);
          if(!m) htm+=sj.htmEn();
          else {
            var st=0,rst='';
            var rgs=m.posRgn(sj);
            for(var k=0; k<rgs.length; ++k){
              var rg=rgs[k];
              rst+=sj.substring(st,rg.st).htmEn();
              rst+='<span style="background:orange;">'+sj.substring(rg.st,rg.ed).htmEn()+'</span>';
              st=rg.ed;
            }
            rst+=sj.substr(st).htmEn();
            htm+=rst;
          }
        }
        htm+='</td>';
      }
      htm+='</tr>';
    }
    tm.add('Its');
    tb.sHtml(htm);
    tb.sel(0);
    tb.sttRend();
    div.style.maxHeight='none';
    this.pack();
    var hF=getComputedStyle(this.frm).height.toInt();
    var hOtr=this.iptFlt.cptStl.height.toInt()+sts.cptStl.height.toInt();
    div.style.overflow='auto';
    var d=hF-hOtr;
    div.style.maxHeight=d+'px';
  }
  this.doNRmvIt=function(idxs,f){
    var r=[];
    for(var i=0; i<idxs.length; ++i){
      var dt=tb.data(idxs[i]);
      f(dt);
      r.add(dt);
    }
    var ls=idxs.min();
    cIts.rmvVs(r);
    if(cIts!=Its) Its.rmvVs(r);
    tb.stopRend().clr();
    this.shTb();
    if(ls>=tb.cnt) ls=tb.cnt-1;
    tb.sel(ls);
    if(Its.syncNm) svDt(Its);
  }
  this.del=function(o){}
  this.canDel=function(idxs){
    if(idxs.length==1&&(!(this instanceof fmFav)|| !tb.data(idxs[0]).isFolder)) return true;
    else return !this.pmtDel||confirm("你确定要删除 "+idxs.cnt+' 项吗?');
  }
  this.dels=function(idxs){
    if(idxs.isEpy) return;
    if(this.canDel(idxs)) this.doNRmvIt(idxs,this.del);
  }
  this.run=function(o,sm){}
  this.runs=function(idxs,sm){
    if(idxs.isEpy) return;
    for(var i=0; i<idxs.length; ++i) this.run(tb.data(idxs[i]),sm);
    if(sm!=Key.Ctrl) this.cls();
  }
  this.lstMch=function(s){
    var m=gMch(s);
    for(var i=0; i<cIts.length; ++i){
      var ss=this.itTxs(cIts[i]);
      for(var j=0; j<ss.length; ++j)
        if(m.pos(ss[j],0)!= -1) return true;
    }
    return false;
  }
  function gMch(s){
    return new Mch(s,srhOpt.irC.v,srhOpt.hw.v,srhOpt.and.v,srhOpt.trad.v,srhOpt.pinyin.v,srhOpt.reg.v);
  }
  this.trySlIvk=function(){
    if(Opt.slIvk.v&&cIts.cnt==1) {
      this.run(cIts[0],0);
      this.cls();
      return true;
    }
    return false;
  }
  this.flt=function(){
    tm.stt();
    var v=this.iptFlt.v;
    cIts=[];
    var mch=gMch(v);
    if(v.isEpy) cIts=Its;
    else for(var i=0; i<Its.length; ++i){
      var ss=this.itTxs(Its[i]);
      for(var j=0; j<ss.length; ++j)
        if(mch.pos(ss[j],0)!= -1) {
          cIts.push(Its[i]);
          break;
        }
    }
    tm.add('pos');
    if(!this.trySlIvk()) {
      // setTimeout(function(){//todo setTimeOut并不能解决本质问题,当运算时,还是要阻塞界面
      this.clr().shTb();
      // }.bind(this),0);
    }
    tm.addNLRst('showTb');
  }
  this.clr=function(){
    tb.stopRend().clr();
    return this;
  }
  this.reFrh=function(){this.clr().shTb();}
  this.rstIts=function(its){
    this.Its=cIts=Its=its;
    this.iptFlt.v='';
    this.reFrh();
  }
  this.addIts=function(its){
    this.Its=cIts=Its=its;
    tb.stopRend();
    this.shTb();
    this.iptFlt.on('input',this.flt.bind(this));
    this.iptFlt.on('select',function(e){
      var sel=e.target.ownerDocument.getSelection();
      var rg=sel.getRangeAt(0);
    }.bind(this));
    //delte Ctrl+D//由于Alt+D是切换到地址栏改用Ctrl+D
    this.hk.addFn([[0,46],[0,110],[Key.Ctrl,'D']],function(){this.dels(tb.sels);}.bind(this));
    this.hk.addFn(Key.Alt,'C',function(){this.dels(Array.mkIdx(tb.cnt));}.bind(this));
    this.hk.addFn(Key.Alt,'A',function(){this.runs(Array.mkIdx(tb.cnt));}.bind(this));
    this.hk.addFn(Key.Ctrl,'A',tb.selAll.bind(tb));//Ctrl+A
    //移动
    this.hk.addFn(0,36,tb.homeEnd.bind(tb,true));
    this.hk.addFn(0,35,tb.homeEnd.bind(tb,false));
    this.hk.addFn(Key.Alt,'J',tb.homeEnd.bind(tb,true));
    this.hk.addFn(Key.Alt,186,tb.homeEnd.bind(tb,false));//;
    this.hk.addFn(0,40,tb.selNx.bind(tb,true));
    this.hk.addFn(0,38,tb.selNx.bind(tb,false));
    this.hk.addFn(Key.Sft,40,tb.addSel.bind(tb,true));
    this.hk.addFn(Key.Sft,38,tb.addSel.bind(tb,false));
    return this;
  }
  this.data=function(i){return tb.data(i);}
}