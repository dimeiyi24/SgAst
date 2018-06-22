function map(){//由于Sogou4.2是Chrome28,没有map
  this.ems=[];
  Object.defineProperty(this,'cnt',{get:function(){return this.ems.length;}});
  Object.defineProperty(this,'isEpy',{get:function(){return this.cnt==0;}});
  this.clr=function(){this.ems=[];};
  this.put=function(k,v){
    for(var i=0; i<this.ems.length; ++i)
      if(this.ems[i].k==k) {
        this.ems[i].v=v;
        return;
      }
    this.ems.push({k:k,v:v});
  };
  this.v=function(k){
    for(var i=0; i<this.ems.length; ++i)
      if(this.ems[i].k==k) return this.ems[i].v;
    return null;
  }
  this.rmv=function(k){
    for(var i=0; i<this.ems.length; ++i)
      if(this.ems[i].k==k) this.ems.splice(i,1);
  };
  this.rmvV=function(v){
    for(var i=0; i<this.ems.length; ++i)
      if(this.ems[i].v==v) this.ems.splice(i,1);
  };
}