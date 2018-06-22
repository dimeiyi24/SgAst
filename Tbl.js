function Tbl(doc,nm){
  var tb=doc.createElement('table');
  this.elmt=tb;
  var data=[];
  tb.id=nm;
  this.sels=[];
  this.fcs= -1;//选中行,焦点
  tb.style.tableLayout='fixed';
  tb.style.width='100%';
  this.cols=[];
  this.hdVis=false;
  tb.style.color='inherit';
  tb.onclick=function(e){
    if(gMod(e)==0&&e.button==0) {
      var idx=tb.rows.idx(fdPrtByTag(e.target,'tr'));
      if(idx!= -1) {
        this.sel(idx);
        this.onClk&&this.onClk(idx);
      }
    }
  }.bind(this);
  this.sCol=function(){//{nm,w,align}
    this.cols=arguments.arg2Ar();
    if(this.hdVis) {
      var th;
      var r=tb.aRow();
      for(var i=0; i<this.cols.length; ++i){
        th=doc.createElement('th');
        th.textContent=this.cols[i].nm;
        th.style.width=this.cols[i].w;
        th.style.textAlign=this.cols[i].align;
        r.appendChild(th);
      }
    }
  }
  this.selAll=function(){
    if(this.isEpy) return;
    with(this.sels){
      clr();
      for(var i=0; i<this.cnt; ++i) push(i);
    }
    this.doSel();
  }
  this.addSel=function(down){
    if(this.isEpy) return;
    if(this.fcs== -1) this.sels=[this.fcs=down?0:tb.rows.length-1];
    else {
      var nxI=(this.fcs+(down?1:-1)).lim(0,this.cnt-1);
      if(this.sels.indexOf(nxI)== -1) {
        this.sels.push(nxI);
        this.addARowSel(nxI);
      }
      else if(nxI!=this.fcs) {
        this.sels.rmvV(this.fcs);
        this.clrARowSel(this.fcs);
      }
      this.fcs=nxI;
    }
    this.doSel();
    tb.rows[this.sels[0]].scrollIntoViewIfNeeded(!down);
  }
  this.homeEnd=function(home){
    this.sel(home?0:this.cnt-1);
    tb.rows[this.sels[0]].scrollIntoViewIfNeeded(!home);
  }
  this.selNx=function(nx){
    if(this.isEpy) return;
    if(this.sels.isEpy) this.sels=[nx?0:this.cnt-1];
    else {
      var selI=this.sels[nx?this.sels.length-1:0];
      this.clrSel();
      this.fcs=selI.nxMod(nx?1:-1,this.cnt);
      this.sels=[this.fcs];
    }
    this.doSel();
    tb.rows[this.sels[0]].scrollIntoViewIfNeeded(!nx);
  }
  this.clrARowSel=function(i){tb.rows[i].style.backgroundColor='initial';}
  this.addARowSel=function(i){tb.rows[i].style.backgroundColor=selCol();}
  this.clrSel=function(){
    for(var i=0; i<this.sels.length; ++i) this.clrARowSel(this.sels[i]);
  }
  this.doSel=function(){
    for(var i=0; i<this.sels.length; ++i) this.addARowSel(this.sels[i]);
    this.onSel&&this.onSel(this.sels);
  }
  this.sel=function(){
    this.sels=arguments.arg2Ar();
    if(this.isEpy) {
      this.sels=[];
      return this.doSel();
    }
    for(var i=0; i<this.cnt; ++i) this.clrARowSel(i);
    this.fcs=this.sels.lst();
    this.doSel();
  }
  function selCol(){return dker.isDark?'green':'Gainsboro';}
  this.clr=function(){
    data=[];
    tb.innerHTML='';
    return this;
  }
  this.addDt=function(dt){data.push(dt)};
  this.data=function(i){return data[i];}
  this.sHtml=function(s){tb.innerHTML=s;}
  this.cell=function(row,col){return tb.rows[row].childNodes[col];}
  this.aRow=function(args,dt){
    var r=tb.aRow();
    r.data=dt;//由于受排序等影响,每项未必和序号对应,这里用data来存储数据
    for(var i=0; i<args.length; ++i){
      var td=r.aCell();
      td.style.width=this.cols[i].w;
      td.style.textAlign=this.cols[i].align;
      td.appendChild(args[i]);
    }
  }
  this.stopRend=function(){
    tb.style.display='none';
    return this;
  }
  this.sttRend=function(){
    tb.style.display='table';
    return this;
  }
  this.selTx=function(){
    var r=[];
    for(var i=0; i<this.sels.length; ++i){
      var row=tb.rows[this.sels[i]],rs=[];
      for(var j=1; j<row.childNodes.length; ++j) rs.push(row.childNodes[j].textContent);
      r.push(rs.join('\t'));
    }
    return r.join('\n');
  }
  Object.defineProperty(this,'cnt',{get:function(){return tb.rows.length;}});
  Object.defineProperty(this,'isEpy',{get:function(){return this.cnt==0;}});
  this.handleEvent=function(e){
    if(e.type=='keydown') {
    }
    // else if(e.type=='focus') log(win.fcs());
  }
}