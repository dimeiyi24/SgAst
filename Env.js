var Env={
  gCrmVer:function(){return navigator.appVersion.match(/Chrome\/(\d+)/)[1].toInt();},
  gSgVer:function(){
    if(this.crmVer<=28) return 4;
    else if(this.crmVer>=58) return 8;
    else return 5;
  },
  lgCore:navigator.hardwareConcurrency,
};
Env.crmVer=Env.gCrmVer();
Env.SgVer=Env.gSgVer();
