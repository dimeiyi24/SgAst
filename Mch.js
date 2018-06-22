function Mch(bm,irC,hw,and,trad,pinyin,reg){
  if(irC) bm=bm.toLowerCase();
  if(trad&&bm.isAnsi()) trad=false;//由于trad开销大,当bm为Ascii优化掉
  if(trad) bm=bm.toGB();
  var bms,lb;
  //若前后有空格则split会添加一个'',因此要trim,不过IE好像不添加
  if(and) bms=bm.trim().split(/\s+/); else lb=bm.length;
  if(!reg) {
    if(bm.hsAnyCh('*?')) {
      reg=true;
      bm=new RegExp(bm.msk2Reg(),'g'+(irC?'i':''));
      and=false, irC=false;//由于irC已经体现在RegExp中了,这里关闭
    }
  } else {//reg
    bm=new RegExp(bm,'g'+(irC?'i':''));
    and=false, irC=false;
  }
  this.posRgn=function(s){//获取所有的范围,用于高亮
    var r=[];
    if(irC) s=s.toLowerCase();
    if(trad) s=s.toGB();
    var rg=[0,0],p=0,st=p,mr;
    if(!reg)
      if(and)
        while((rg=s.posAnyRg(bms,rg[1]))[0]!= -1) r.push({st:rg[0],ed:rg[1]});
      else while((p=s.indexOf(bm,st))!= -1) st=p+lb, r.push({st:p,ed:st});
    else//reg
      while((mr=bm.exec(s))!=null){
        if(mr[0].length==0) break;//若Reg='x*'之类会死循环
        r.push({st:mr.index,ed:mr.index+mr[0].length});
      }
    return r;
  }
  this.pos=function(s,st){
    if(irC) s=s.toLowerCase();
    if(trad) s=s.toGB();
    if(and) return s.posAll(bms);
    else {
      if(!reg) return s.indexOf(bm,st);
      else {
        var r=bm.exec(s);
        return r?r.index:-1;
      }
    }
  }
  // function pos2(s,st){
  //   var l=s.length;
  //   var ed=l-lb;
  //   for(var i=st; i<=ed; ++i){
  //     var k=0;
  //     for(var j=i; k<lb; ++j, ++k) if(s[j]!=bm[k]) break;
  //     if(k==lb) return i;
  //   }
  //   return -1;
  // }
}
