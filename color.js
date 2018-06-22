const rgbaPat=/rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(?:,([0-9.]+))?\)/;
function RGB(s){return new _RGB(s);}
function rgb(r,g,b){return new _RGB({r:r,g:g,b:b});}
function _RGB(s){
  if("string"=== typeof s) {
    var ar=s.replace(/\s+/g,'').match(rgbaPat);
    this.r=ar[1], this.g=ar[2], this.b=ar[3], this.a=ar[4];
    //这里简化处理当alpha==0时,将颜色作为白色,假定是rgba(0,0,0,0)这种,这样的背景色一般是白色
    //而实际的颜色是和背景融合后的颜色,实现起来非常麻烦
    if(this.a==0) this.r=this.g=this.b=255;
  } else if(s instanceof Object) {
    this.r=s.r;
    this.g=s.g;
    this.b=s.b;
  }
  this.rgbs=function(){return "rgb("+this.r+","+this.g+","+this.b+")";}
  this.lgt=function(){//一种特别办法来计算亮度
    var rgb=[this.r,this.g,this.b];
    //var lrgb=[0.314,0.421,0.264];//假定单色对颜色的贡献比例
    var lrgb=[0.319,0.429,0.252];
    var df=[0.92,0.95];//这里认为多色混合后要衰减
    //当有多色时候,采用等量屏蔽颜色,对rgb中r=g=b的部分,亮度贡献为最亮的色G的亮度.
    //然后再减去等量的部分,剩下的2色采用同样的办法计算亮度.
    var mi=min3I(this.r,this.g,this.b),mx;
    var r=0;
    min=rgb[mi];
    r+=min*lrgb[1]*df[0];//先取出r=g=b的部分,然后这部分的亮度贡献以它们的最大者G计算.
    rgb.splice(mi,1);
    rgb[0]-=min;
    rgb[1]-=min;
    lrgb.splice(mi,1);
    if(rgb[0]<rgb[1]) {
      mi=0;
      mx=1;
    } else {
      mi=1;
      mx=0;
    }
    min=rgb[mi];
    r+=min*Math.max(lrgb[0],lrgb[1])*df[1];//剩余2色的亮者
    r+=(rgb[mx]-min)*lrgb[mx];
    return r;
  };
  this.ivtLgt=function(c){
    var l=c.lgt();
    if(l==0) return rgb(255,255,255);
    var dstl=109.4-l;
    dstl=70+dstl*(100-70)/109.4;//[0,109]→[70,100]
    var rdo=dstl/l;
    //若溢出则trim后追加其它2色,直到达到dstl.
    var r=this.r*rdo,g=this.g*rdo,b=this.b*rdo;
    var rgbAr=[r,g,b];
    var mxi=max3I(r,g,b);
    var dlt=rgbAr[mxi]-255;
    if(dlt>0) for(var i=0; i<rgbAr.length; ++i)//溢出则简单把溢出量平分到其它
      if(i==mxi) rgbAr[i]=255; else {
        if(mxi!=2) rgbAr[i]=Math.min(rgbAr[i]+dlt/2,255);
        //蓝色溢出,要重点补绿色,才更像蓝色.
        else rgbAr[i]=Math.min(rgbAr[i]+(i==0?dlt/2:dlt*2),255);
      }
    for(var i=0; i<rgbAr.length; ++i) rgbAr[i]=parseInt(rgbAr[i]);
    console.log(rgbAr[0],rgbAr[1],rgbAr[2]);
    return rgb(rgbAr[0],rgbAr[1],rgbAr[2]);
  }
  this.ivt=function(rdo){return rgb(255-this.r,55-this.g,255-this.b);};//inert
}