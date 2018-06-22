function MBool(v){
  this.v=v;
  this.setV=function(v){this.v=v;}
  this.tg=function(){this.setV(!this.v);}
}
MBool.prototype.valueOf=function(){return this.v;}
function False(){return new MBool(false);}
function True(){return new MBool(true);}
