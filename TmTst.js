function TmTst(){
  var ss=[],ts=[];
  this.crt=new Date().getTime();
  this.stt=function(){
    ss=[], ts=[];
    this.crt=new Date().getTime();
  }
  this.end=function(){//ms
    var oCrt=this.crt;
    this.crt=new Date().getTime();
    return this.crt-oCrt;
  }
  this.addNMRst=function(s){alert(this.addNRst(s));}
  this.addNLRst=function(s){console.log(this.addNRst(s));}
  this.addNRst=function(s){//add&Result
    this.add(s);
    var r='';
    for(var i=0; i<ts.length; ++i) r+=ss[i]+': '+ts[i]+'\t';
    return r;
  }
  this.add=function(s){
    var oCrt=this.crt;
    this.crt=new Date().getTime();
    ts.push(this.crt-oCrt);
    ss.push(s);
  }
  this.log=function(){console.log(this.end());}
  this.msg=function(){alert(this.end());}
}