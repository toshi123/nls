var kd = {'A': 1.8, 'R':-4.5, 'N':-3.5, 'D':-3.5, 'C': 2.5, 
         'Q':-3.5, 'E':-3.5, 'G':-0.4, 'H':-3.2, 'I': 4.5, 
         'L': 3.8, 'K':-3.9, 'M': 1.9, 'F': 2.8, 'P':-1.6, 
         'S':-0.8, 'T':-0.7, 'W':-0.9, 'Y':-1.3, 'V': 4.2 };

var charge = {'A': 0, 'R': 1.0, 'N': 0, 'D':-1.0, 'C': 0, 
         'Q': 0, 'E':-1.0, 'G': 0, 'H': 1.0, 'I': 0, 
         'L': 0, 'K': 1.0, 'M': 0, 'F': 0, 'P': 0, 
         'S': 0, 'T': 0, 'W': 0, 'Y': 0, 'V': 0 };

var positive = {'A': 0, 'R': 1.0, 'N': 0, 'D': 0, 'C': 0, 
         'Q': 0, 'E': 0, 'G': 0, 'H': 1.0, 'I': 0, 
         'L': 0, 'K': 1.0, 'M': 0, 'F': 0, 'P': 0, 
         'S': 0, 'T': 0, 'W': 0, 'Y': 0, 'V': 0 };

var negative = {'A': 0, 'R': 0, 'N': 0, 'D':-1.0, 'C': 0, 
         'Q': 0, 'E':-1.0, 'G': 0, 'H': 0, 'I': 0, 
         'L': 0, 'K': 0, 'M': 0, 'F': 0, 'P': 0, 
         'S': 0, 'T': 0, 'W': 0, 'Y': 0, 'V': 0 };
         

function calcMovingAverage(seq,values){
    var s = seq.split('');
    var h = [];
    var ma = [];
    for (var i=0;i<s.length;i++){
      var aa = s[i]
      h.push(values[aa]);
    }
    for(i=0;i<h.length;i++){
      sum = 0;
      n = 0;
      for(j=i-3;j<i+4;j++){
        if(j<0 || j>=h.length){continue;}
        sum += h[j];
        n++;
      }
      ma.push(sum/n);
    }
    return ma;
};

function makeNumbers(seq){
  var num = [];
  for(i=0;i<seq.length;i++){
    num.push(i);
  }
  return num;
};

function makeRegions(regstr,seqlength){
  var regions = [];
  var regs = regstr.split(',');
  for(i=0;i<seqlength;i++){
    regions[i] = 0;
  }
  for(i=0;i<regs.length;i++){
    var p = regs[i].split('-');
    for(j=p[0]-1;j<p[1];j++){
      regions[j] = 1;
    }
  }
  return regions;
};