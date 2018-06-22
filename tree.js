function TrNd(dt,prt){//Tree Node
  this.cld=[], this._dt=dt, this.prt=prt;
  Object.defineProperty(this,'cnt',{get:function(){return this.cld.length;}});
  Object.defineProperty(this,'isEpy',{get:function(){return this.cnt==0;}});
  this.clr=function(){this.cld=[];};
  this.add=function(){
    for(var i=0; i<arguments.length; ++i)
      this.cld.push(new TrNd(arguments[i],this));
  };
  this.toTrNdNP=function(){return new TrNdNP(this);};
  this.dt=function(i){return this.cld[i]._dt;};
  this.rmv=function(i){this.cld.rmv(i);};
  this.rmvV=function(v){this.cld.rmvV(v);};
  this.rmvSf=function(){this.prt.rmvV(this);};//rmv Self
  this.toPrtS=function(sep,f){
    var rs=[],nd=this;
    while(nd&&nd._dt) rs.ins(0,f(this)), nd=nd.prt;
    return rs.join(sep);
  }
  this.toAr=function(){
    function _2Ar(nd,rst){
      if(!nd.cld.isEpy) rst.addAll(nd.cld);
      for(var i=0; i<nd.cnt; ++i) _2Ar(nd.cld[i],rst);
    }
    var r=[];
    _2Ar(this,r);
    return r;
  }
}
function TrNdNP(nd){//由于TrNd包含了对prt的引用,传递时会无限引用,这里在传递时先变换为没有prt的TrNdNP
  this.cld=[];
  if(nd instanceof TrNd) {
    this._dt=nd._dt;
    for(var i=0; i<nd.cld.length; ++i) this.cld.push(new TrNdNP(nd.cld[i]));
  } else this._dt=nd;
  this.add=function(){
    for(var i=0; i<arguments.length; ++i) this.cld.push(new TrNdNP(arguments[i]));
  };
}
function _toTrNd(nd,prt){
  var r=new TrNd(nd._dt,prt);
  for(var i=0; i<nd.cld.length; ++i) r.cld.push(_toTrNd(nd.cld[i],r));
  return r;
}
function toTrNd(nd){return _toTrNd(nd,null);}