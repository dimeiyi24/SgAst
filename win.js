var win={
  addCttChg:function(f){//add Content Change
    this.ob=new MutationObserver(function(ms){//里面的this为ob
      var addElm=ms.some(function(m){//只监视ELEMENT和Text的新增
        var tg=m.target;
        return m.addedNodes.length&&tg.nodeType.eqA(Node.ELEMENT_NODE,Node.TEXT_NODE)
          &&tg.nodeName.toLowerCase()!='head';
      });
      if(addElm) {
        win.ob.disconnect();//由于disconnect会闪烁
        f();
        //由于要兼顾性能,当监视到第一个后就暂时停止,由于又要速度&正确,用阶梯延时添加
        setTimeout(function(){f();},100);
        setTimeout(function(){
          f();
          win.addAlFrm();
        },500);
      }
    });
    this.addAlFrm();
    return this.ob;
  },
  _addAlFrm:function(w){
    try{
      this.ob.observe(w.document,{childList:true,subtree:true});
    } catch(e){log('obErr',e); }
  },
  addAlFrm:function(){doFrm(this._addAlFrm.bind(this));},
  _doElmt:function(w,fun,fltTp,flt){
    var d=w.document;
    var wk=d.createTreeWalker(d.body,fltTp,flt?{acceptNode:flt}:null,false);
    var nd=wk.currentNode,bnd;
    while(nd){
      bnd=nd;//避免nd被Remove后nextNode为null
      nd=wk.nextNode();
      fun(bnd);
    }
  },
  doElmt:function(fun,fltTp,flt){doFrm(this._doElmt,fun,fltTp,flt);},
  fcs:function(){return this._fcs(window);},
  _fcs:function(w){
    var d=w.document;
    if(d.activeElement.tagName.toLowerCase().indexOf('frame')!= -1) {
      for(var i=0; i<w.frames.length; ++i){
        var r=this._fcs(w.frames[i]);
        if(r) return r;
      }
    }
    else return d.activeElement;
  },
  selTx:function(){
    return new Dom(this.fcsWin().document).selTx();
  },
  fd:function(f){
    for(var i=0; i<window.frames.length; ++i)
      if(f(window.frames[i])) return window.frames[i];
    return null;
  },
  fcsWin:function(){return this._fcsWin(window);},
  _fcsWin:function(w){
    var r=w.document.activeElement;
    if(r&&r.tagName.toLowerCase().indexOf('frame')!= -1)
      return this._fcsWin(r.contentWindow);
    else return w;
  },
}