// funcao que conta o numero de estudantes por sede
function countStudents(place, year) {
  var count = 0;
  for (i in data[place][year]['students']) {
    if (isEmpty(data[place][year]['students'][i])===false) {
      count += 1;
    }
  }
  return (count);
}

// funcao que verifica se um objeto � vazio
function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop))
      return false;
  }
  return true;
}

// funcao que conta o numero de estudantes ativas ou nao por sede
function studentsActiveOrNot(place, year) {
  var countActive = 0;
  var countInactive = 0;
  for (i in data[place][year]['students']) {
    if (data[place][year]['students'][i]['active'] === true) {
      countActive += 1;
    }
    else {
      countInactive += 1;
    }
    if (isEmpty(data[place][year]['students'][i]) === true) {
      countInactive -= 1;
    }
  }

  var pieData = [
    { name: 'Ativas', y: countActive },
    { name: 'Desistentes', y: countInactive },
  ]

  Highcharts.setOptions({
    colors: ['#058DC7', '#ED561B']
  });

  Highcharts.chart('container-studentsActiveOrNot', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: '�ndice de estudantes ativas e desistentes'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}</b><br/><b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          
          color: 'black',
          enabled: true,
          format: 'Total: <b>{point.y}</b><br/><b>{point.percentage: .1f}%</b>',
          distance: -60,
        },
        showInLegend: true
      }
    },
    series: [{
      name: 'Total',
      colorByPoint: true,
      data: pieData
    }]
  });

  var countActivePerc = ((countActive / (countStudents(place, year))) * 100).toFixed(2);
 
}

var teste = studentsActiveOrNot('AQP', '2016-2');
console.log(teste);


// funcao que conta o numero de estudantes que alcancaram a meta de 70% em hse e tech por sprint 
// e separadamente por tech e hse

function targetAll(place, year) {
  var targetSprint = [];
  var targetHSE = [];
  var targetTech = [];
  for (k in data[place][year]['students'][0]['sprints']) {
    targetSprint[k] = 0;
    targetHSE[k] = 0;
    targetTech[k] = 0;
  }
  for (i in data[place][year]['students']) {
    for (j in data[place][year]['students'][i]['sprints']) {
      if (data[place][year]['students'][i]['sprints'][j]['score']['tech'] >= 1260 && data[place][year]['students'][i]['sprints'][j]['score']['hse'] >= 840) {
        targetSprint[j] += 1;
      }
      if (data[place][year]['students'][i]['sprints'][j]['score']['tech'] >= 1260) {
        targetTech[j] += 1;
      }
      if (data[place][year]['students'][i]['sprints'][j]['score']['hse'] >= 840) {
        targetHSE[j] += 1;
      }

    }
  }
  for (var i = 0, sum = 0; i < targetSprint.length; sum += targetSprint[i++]) { }
  var averageSprint = sum / targetSprint.length;
  var averagePercAll = ((averageSprint * 100) / (countStudents(place, year))).toFixed(2);
  for (var i = 0, sum = 0; i < targetTech.length; sum += targetTech[i++]) { }
  var averageTech = sum / targetTech.length;
  var averageTechPercAll = ((averageTech * 100) / (countStudents(place, year))).toFixed(2);
  for (var i = 0, sum = 0; i < targetHSE.length; sum += targetHSE[i++]) { }
  var averageHSE = sum / targetHSE.length;
  var averageHSEPercAll = ((averageHSE * 100) / (countStudents(place, year))).toFixed(2);

  //retorna array com numero de estudantes que conseguiram alcancar a meta por sprint (targetSprint) 
  // retorna tamb�m a media de alunas que alcancaram a meta por sprint(averageSprint) e a porcentagem em relaco ao total de alunas (averagePercAll)
  return [targetSprint, averageSprint, averagePercAll, targetTech, averageTech, averageTechPercAll, targetHSE, averageHSE, averageHSEPercAll];
}

//funcao que retorna NPS pela turma por sprints, media de nps e nps (tudo em percentagem)

function returnNPS(place,year) {
  var promoters = [];
  var passive = [];
  var detractors = [];
  for (i in data[place][year]['ratings']) {
      promoters[i] = (data[place][year]['ratings'][i]['nps']['promoters']);
      passive[i] = (data[place][year]['ratings'][i]['nps']['passive']);
      detractors[i] = (data[place][year]['ratings'][i]['nps']['detractors']);
  }

  for (var i = 0, sumPromoters = 0; i < promoters.length; sumPromoters += promoters[i++]) { }
  for (var i = 0, sumPassive = 0; i < promoters.length;  sumPassive += passive[i++]) { }
  for (var i = 0, sumDetractors = 0; i < promoters.length; sumDetractors += detractors[i++]) { }

  var averagePromoters = sumPromoters / promoters.length;
  var averagePassive = sumPassive / passive.length;
  var averageDetractors = sumDetractors / detractors.length;
  var nps = averagePromoters - averageDetractors;
  return [promoters, passive, detractors, averagePromoters, averagePassive, averageDetractors,nps];
}

//funcao que retorna a avaliacao das estudantes sobre a laborat�ria
function returnStudentsRating(place,year) {
  var overExpectation = [];
  var onExpectation= [];
  var underExpectation= [];
  for (i in data[place][year]['ratings']) {
    overExpectation[i] = (data[place][year]['ratings'][i]['student']['supera']);
    onExpectation[i] = (data[place][year]['ratings'][i]['student']['cumple']);
    underExpectation[i] = (data[place][year]['ratings'][i]['student']['no-cumple']);
  }
  for (var i = 0, sumOverExpectation = 0; i < overExpectation.length; sumOverExpectation += overExpectation[i++]) { }
  for (var i = 0, sumOnExpectation = 0; i < onExpectation.length; sumOnExpectation += onExpectation[i++]) { }
  for (var i = 0, sumUnderExpectation = 0; i < underExpectation.length; sumUnderExpectation += underExpectation[i++]) { }
  var averageOverExpectation = sumOverExpectation / overExpectation.length;
  var averageOnExpectation = sumOnExpectation / onExpectation.length;
  var averageUnderExpectation = sumUnderExpectation / underExpectation.length;
 

  var myDataOver = transformArray(overExpectation);
  var myDataOn = transformArray(onExpectation);
  var myDataUnder = transformArray(underExpectation);

  return [myDataOver, myDataOn, myDataUnder, averageOverExpectation, averageOnExpectation, averageUnderExpectation];

  Highcharts.chart('container-ratingsStudents', {
    chart: {
      type: 'line',

    },
    title: {
      text: 'Avalia��o das estudantes sobre a Laborat�ria'
    },

    xAxis: {
      categories: myDataOver.map(x => x.name)
    },
    yAxis: {
      title: {
        text: 'Avalia��o'
      }
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: false
      }
    },
    series: [{
      name: 'Supera a expectativa',
      data: myDataOver.map(x => x.data),
    }, {
      name: 'Dentro da expectativa',
      data: myDataOn.map(x => x.data),
    }, {
      name: 'Abaixo da expectativa',
      data: myDataUnder.map(x => x.data),
    }],

  });

}
var teste = returnStudentsRating('AQP', '2016-2');
console.log(teste);

//funcao que retorna a pontuacao media de mentores e Jedis
function returnTeachersJedisRating(place, year) {
  var jedi = [];
  var teacher = [];
  
  for (i in data[place][year]['ratings']) {
    jedi[i] = (data[place][year]['ratings'][i]['jedi']);
    teacher[i] = (data[place][year]['ratings'][i]['teacher']);
  }
  for (var i = 0, sumJedi = 0; i < jedi.length; sumJedi += jedi[i++]) { }
  for (var i = 0, sumTeacher = 0; i < teacher.length; sumTeacher += teacher[i++]) { }
  var averageJedi = (sumJedi / jedi.length).toFixed(2);
  var averageTeacher = (sumTeacher / teacher.length).toFixed(2);

  var myDataJedi = transformArray(jedi);
  var myDataTeacher = transformArray(teacher);

  Highcharts.chart('container-ratingsJediTeacher', {
    chart: {
      type: 'line',
      
    },
    title: {
      text: 'Pontua��o de Mentores e Jedis'
    },
    
   xAxis: {
      categories: myDataJedi.map(x => x.name)
    },
    yAxis: {
      title: {
        text: 'Pontua��o'
      }
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: false
      }
    },
    series: [{
      name: 'Jedis',
      data: myDataJedi.map( x=> x.data),
    }, {
      name: 'Teachers',
      data: myDataTeacher.map( x => x.data),
      }],
     
  });
  return [myDataJedi, myDataTeacher, averageJedi, averageTeacher];
}

var teste = returnTeachersJedisRating('AQP', '2016-2');
console.log(teste);

//funcao que tranforma o array de dados em um objeto no formato de entrada de dadod dos gr�ficos
function transformArray(array) {
  var myData = [];
  for (var n in array) {
    myData.push({});
    var j = 1;
    for (i in myData) {
      myData[i]['name'] = 'SP' + j;
      myData[i]['data'] = array[i];
      j++;
    }
  }
  return myData;
}

