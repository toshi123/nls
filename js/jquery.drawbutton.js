;(function(){
	$.fn.drawbutton = function(options){
		$(this).click(function(){
      $("#title").text(options.title);
      var markedseq = markSeq(options.seq,options.sosuireg,options.signalreg);
      var markedmrnaseq = markSeq4mRna(options.mrna,options.sosuireg,options.signalreg);
      $("#sequence").html(markedseq);
      $("#mrna").html(markedmrnaseq);
			$("#hydjs").data("seq",options.seq);
      $("#hydjs").data("mrna",options.mrna);      
			$("#hydjs").data("sosuireg",options.sosuireg);
			$("#hydjs").data("signalreg",options.signalreg);
			drawPlots();
		});
	}
})(jQuery);



function drawPlots(){
  var seq = $('#hydjs').data('seq');
  var mrna = $('#hydjs').data('mrna');
  var sosuireg = $('#hydjs').data('sosuireg');
  var signalreg = $('#hydjs').data('signalreg');
  var graphwidth = seq.length*1.6 + 200;
  var graphheight = 200;
  var purine = calcMovingAverage(mrna,_purine,25);
  purine.unshift("Purine");
  var at = calcMovingAverage(mrna,_at,25);
  at.unshift("AT");
  var gc = calcMovingAverage(mrna,_gc,25);
  gc.unshift("CG");
  var num_rna = makeNumbers(mrna);

  var hyd = calcMovingAverage(seq,kd,8);
  hyd.unshift("hyd");
  var pos = calcMovingAverage(seq,positive,8);
  pos.unshift("positive charge");
  var neg = calcMovingAverage(seq,negative,8);
  neg.unshift("negative charge");
  var num = makeNumbers(seq);
  num.unshift("AA");
  var nls = makeRegions(sosuireg,seq.length);
  nls.unshift("NLS");
  // var sosui = makeRegions(sosuireg,seq.length);
  // sosui.unshift("NLS");
  // var signal = makeRegions(signalreg,seq.length);
  // signal.unshift("");

  var purinedata = {

    "config": {
      "type": "line",
      "bg": "#fff",
      "xScaleFont": "12px Helvetica",
      "xScaleYOffset": 8,
      "xScaleSkip":50,
      "axisXLen":4,
      "axisYLen":10,
      "maxY": 1.0,
      "minY": 0,
      "paddingBottom": 0,
      "width": graphwidth,
      "height": graphheight,
      "colorSet": 
            ["#3CB000"],
      "shadows":{"all":['#fff', 0, 0, 100]},
    },

    "data": [
      num_rna,
      purine,
     ]
    };

   var atgcdata = {

    "config": {
      "type": "line",
      "bg": "#fff",
      "xScaleFont": "12px Helvetica",
      "xScaleYOffset": 8,
      "xScaleSkip":50,
      "axisXLen":4,
      "maxY": 1.0,
      "minY": 0.0,
      "paddingBottom": 0,
      "width": graphwidth,
      "height": graphheight,
      "shadows":{"all":['#fff', 0, 0, 100]},
      "colorSet": 
            ["#DDA0DD","#0068b7"]
    },

    "data": [
      num,
      at,
      gc
     ]
    };

  var hyddata = {

    "config": {
      "type": "line",
      "bg": "#fff",
      "xScaleFont": "12px Helvetica",
      "xScaleYOffset": 8,
      "xScaleSkip":50,
      "axisXLen":4,
      "axisYLen":10,
      "maxY": 4.5,
      "minY": -4.5,
      "paddingBottom": 0,
      "width": graphwidth,
      "height": graphheight,
      "colorSet": 
            ["#3CB000"],
      "shadows":{"all":['#fff', 0, 0, 100]},
    },

    "data": [
    	num,
    	hyd,
     ]
    };

   var chargedata = {

    "config": {
      "type": "line",
      "bg": "#fff",
      "xScaleFont": "12px Helvetica",
      "xScaleYOffset": 8,
      "xScaleSkip":50,
      "axisXLen":4,
      "maxY": 1.0,
      "minY": -1.0,
      "paddingBottom": 0,
      "width": graphwidth,
      "height": graphheight,
      "shadows":{"all":['#fff', 0, 0, 100]},
      "colorSet": 
            ["#DDA0DD","#0068b7"]
    },

    "data": [
    	num,
    	pos,
    	neg
     ]
    };

  var sosuipred = {

    "config": {
      "type": "area",
      "shadows":{"all":['#fff', 0, 0, 100]},
      "colorSet": 
        ["rgba(204,204,102,0.5","rgba(153,204,255,0.5)"]
    },

    "data": [
      num,
      nls
//      sosui,
//      signal
    ]
  };

    ccchart
      .init('purine', purinedata)
      .after(sosuipred)
    ccchart
      .init('atgc', atgcdata)
      .after(sosuipred)
    ccchart
    	.init('hydrophobisity', hyddata)
    	.after(sosuipred)
    ccchart
    	.init('netcharge', chargedata)
     	.after(sosuipred)
};

function markSeq(sequence,tmstr,sigstr){
  var seq = sequence.split('');
  var signal = makeRegions(sigstr,sequence.length);
  var sosui = makeRegions(tmstr,sequence.length);
  var s = ''
  for(var i=0;i<seq.length;i++){
    // if(signal[i]==1){
      // s += '<span class="signal">'+seq[i];
      // for(i=i+1;i<seq.length;i++){
      //   if(signal[i] == 1){
      //     s += seq[i];
      //   }else{
      //     s += '</span>'+seq[i];
      //     break;
      //   }
      // }
    // }else if(sosui[i]==1){
    if(sosui[i]==1){
      s += '<span class="tm">'+seq[i];
      for(i=i+1;i<seq.length;i++){
        if(sosui[i] == 1){
          s += seq[i];
        }else{
          s += '</span>'+seq[i];
          break;
        }
      }
    }else{
      s += seq[i]
    }
  }
  if(sosui[-1] == 1){
    s += "</span>";
  }
  return s;
}

function markSeq4mRna(sequence,tmstr,sigstr){
  var seq = sequence.split('');
  var sosui = makeRegions4mrna(tmstr,sequence.length);
  // var signal = makeRegions4mrna(sigstr,sequence.length);
  var s = ''
  for(var i=0;i<seq.length;i++){
    // if(signal[i]==1){
      // s += '<span class="signal">'+seq[i];
      // for(i=i+1;i<seq.length;i++){
      //   if(signal[i] == 1){
      //     s += seq[i];
      //   }else{
      //     s += '</span>'+seq[i];
      //     break;
      //   }
      // }
    // }else if(sosui[i]==1){
    if(sosui[i]==1){
      s += '<span class="tm">'+seq[i];
      for(i=i+1;i<seq.length;i++){
        if(sosui[i] == 1){
          s += seq[i];
        }else{
          s += '</span>'+seq[i];
          break;
        }
      }
    }else{
      s += seq[i]
    }
  }
  if(sosui[-1] == 1){
    s += "</span>";
  }
  return s;
}

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

var _purine = {'A':1.0,'G':1.0,'T':0.0,'C':0.0};
var _at = {'A':1.0,'G':0.0,'T':1.0,'C':0.0};
var _gc = {'A':0.0,'G':1.0,'T':0.0,'C':1.0};


function calcMovingAverage(seq,values,width){
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
      for(j=i-width;j<i+width;j++){
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
  if(regstr == "0-0"){
    return regions;
  }
  for(i=0;i<regs.length;i++){
    var p = regs[i].split('-');

    for(j=p[0];j<parseInt(p[1])+1;j++){
      regions[j] = 1;
    }
  }
  return regions;
};

function makeRegions4mrna(regstr,seqlength){
  var regions = [];
  var regs = regstr.split(',');
  for(i=0;i<seqlength;i++){
    regions[i] = 0;
  }
  if(regstr == "0-0"){
    return regions;
  }
  for(i=0;i<regs.length;i++){    
    var p = regs[i].split('-');
    st = p[0]*3;
    ed = p[1]*3;
    for(j=st;j<ed+1;j++){
      regions[j] = 1;
    }
  }
  return regions;
};

