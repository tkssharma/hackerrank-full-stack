var find11ViaFor = function(array) {
    for(i=0;i<array.length;i++){
      if(array[i] === 11){
        return "eleven found in forloop"
      }
    }
    return "eleven not found in forloop"
  };
  console.log(find11ViaFor([2,7,11,15]))
  