function Dom(d){
  this.doc=d;
  this.addCttChg=function(f){//add Content Change
    var ob=new MutationObserver(function(ms){//里面的this为ob
      var addElm=ms.some(function(m){//只监视ELEMENT和Text的新增
        var tg=m.target;
        return m.addedNodes.length&&tg.nodeType.eqA(Node.ELEMENT_NODE,Node.TEXT_NODE)
          &&tg.nodeName.toLowerCase()!='head';
      });
      if(addElm) {
        ob.disconnect();
        f();//由于要兼顾性能,当监视到第一个后就暂时停止,由于又要速度&正确,用阶梯延时添加
        setTimeout(function(){f();},100);
        setTimeout(function(){
          f();
          ob.observe(document,{childList:true,subtree:true});
        },500);
      }
    });
    ob.observe(document,{childList:true,subtree:true});
    return ob;
  }
  this.selTx=function(){
    var s=d.getSelection();
    return s?s.toString():'';
  }
  Object.defineProperty(this,'acte',{
    get:function(){return d.activeElement;},
    set:function(v){v.focus();}
  });

  this.crtEm=function(){
    var r=arguments[0];
    if(typeof r==="string") {
      if(r.indexOf('<')== -1) r=this.doc.createElement(r);//tag
      else r=emFrHtml(r);
    }
    if(arguments.length>1) r.innerHTML=arguments[1];
    return new Elmt(r);
  }
  this.doElmt=function(fun,fltTp,flt){
    var wk=d.createTreeWalker(d.body,fltTp,flt?{acceptNode:flt}:null,false);
    var nd=wk.currentNode,bnd;
    while(nd){
      bnd=nd;//避免nd被Remove后nextNode为null
      nd=wk.nextNode();
      fun(bnd);
    }
  }
}