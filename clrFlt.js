var objs=document.all;
for(i=0;i<objs.length;i++) {
  var istl=window.getComputedStyle(objs[i],null);
  var idx=parseInt(istl.zIndex);
  if(istl.zIndex=='auto') idx=0;
  if(idx>0) // istl.position=="absolute"&&idx>0 ||istl.position=="fixed"
  objs[i].style.visibility="hidden";
}

