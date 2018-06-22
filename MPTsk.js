function gWkFrS(s){//get Worker From str
  return new Worker(URL.createObjectURL(new Blob([s])));
}