var srhDlg;
function fmSrh(){
  var sdiv='<input type="text" class="dmyInr">'
    +'Ir<input type="checkbox" class="dmyInr">'
    +'Hw<input type="checkbox" class="dmyInr">'
    +'Reg<input type="checkbox" class="dmyInr">'
    +'Tabs<input type="checkbox" class="dmyInr">'
    +'<button class="dmyInr">⇑</button>'
    +'<button class="dmyInr">⇓</button>';
  var ipt;
  if(!srhDlg) {
    srhDlg=new fmBs(sdiv,'dmyDlg','dmySrhUI');
    srhDlg.clsHd=true;
    ipt=srhDlg.ipt();
    var srh=new Srh('',true,false,false);
    ipt.oninput=function(){
      if(srh) srh.clrSrh();
      srh=new Srh(ipt.value,true,false,false);
      srh.srh();
    };
    srhDlg.onHd=function(){srh.clrSrh();}
  }
  else {
    if(srhDlg.vis()) srhDlg.hd(); else srhDlg.sh();
  }
  if(srhDlg.vis()) srhDlg.fcs();
}