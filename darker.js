var dker={//darker
  isDark:false,isFlt:true,elmt_Stl:[],
  doc:null,dOb:null,
  reDark:function(){if(this.isDark) this.sDark(true);},
  hsStl:function(cn){
    var ss=this.doc.getElementsByTagName('style');
    //此处不能用innerText,否则在搜狗8下,在某些网站如jd会undefined.
    for(var i=0; i<ss.length; ++i) if(ss[i].textContent.bfA('{')=='.'+cn) return true;
    return false;
  },
  tgDark:function(){this.sDark(!this.isDark);},
  sk4IMG:function(m){//skip with Img 由于有tg有图片,若设置了bgc=black会无法显示
    //if (m.hasChildNodes()) return true;
    if(m.tagName=='A'&&getComputedStyle(m).backgroundImage!='none') return true;
    else if(m.tagName=='SPAN'&&getComputedStyle(m).backgroundImage!='none') return true;
    return false;
  },
  //todo CSP无法使用inine-style
  calDkCss:function(m){//calculate Css,由于AddCls之后,getComputedStyle会改变,因此要分2步执行
    var c=RGB(getComputedStyle(m).color);
    var bcl=RGB(getComputedStyle(m).backgroundColor).lgt();
    if(bcl<30) return;//若本身背景色较深则不管
    var wBk=!this.sk4IMG(m);
    var cn="_dmy_"+c.r+c.g+c.b+(wBk?"":"NB");
    if(!this.hsStl(cn)) {
      var stl=this.doc.createElement('style');
      stl.innerHTML="."+cn+
        "{"+(wBk?"background:#000 !important;":"")+
        " color:"+c.ivtLgt(c).rgbs()+" !important;}";
      this.doc.head.appendChild(stl);
    }
    this.elmt_Stl.push({elmt:m,cls:cn});
  },
  clrChsLst:function(){
    for(var i=0; i<window.frames.length; ++i) try{
      if(window.frames[i].noDark) {
        window.frames[i].document.body.style.color='black';
        return;
      }
    } catch(e){/* cross-origin frame*/}
  },
  _calDkCss:function(f){
    try{ if(!f.document) return;} catch(e){
      log(f);
      return;
    }//有些Frame是空的
    if(f.noDark) {
      f.document.body.style.color=this.isDark?'#E1E1E1':'black';
      f.document.body.style.background=this.isDark?'black':'#E1E1E1';
      return;
    }
    this.doc=f.document;
    var all=this.doc.all;
    var m=[];
    for(var i=0; i<all.length; ++i){
      var ai=all[i];
      if(!ai.tagName.eqA("META","HEAD","LINK","NOSCRIPT","SCRIPT",
        "STYLE","IMG","SVG","TITLE")) m.push(ai);
    }
    for(i=0; i<m.length; ++i) try{
      if(!m[i].className.match("_dmy_")) this.calDkCss(m[i]);
    } catch(e){log("calDkCss",e);}
    //todo 改为Frame完成后再Dark,跨域
    for(var i=0; i<f.frames.length; ++i) this._calDkCss(f.frames[i]);
  },
  stopOb:function(){if(this.dOb) this.dOb.disconnect();},
  rsmOb:function(){this.dOb=win.addCttChg(this.reDark.bind(this));},//Resume Ob
  sDark:function(b){
    this.isDark=b;
    if(b) {
      this._calDkCss(window);
      this.elmt_Stl.forEach(function(v){
        try{
          addCls(v.elmt,v.cls);
          addCls(v.elmt,'dmySel');//只有IE支持
          //alert(v.elmt.tagName);
        } catch(e){log("addCls",e);}
      });
      if(!this.dOb) this.dOb=win.addCttChg(this.reDark.bind(this));
    }
    else {
      this.dOb.disconnect();
      this.dOb=null;
      this.clrChsLst();
      this.elmt_Stl.forEach(
        function(v){
          try{
            rmvCls(v.elmt,v.cls);
            rmvCls(v.elmt,'dmySel');
          } catch(e){log("rmvCls",e);}
        }
      );
      this.elmt_Stl=[];
    }
  }
}

