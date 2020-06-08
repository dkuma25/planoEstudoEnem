var simplex = require("simplex-solver")

const calcular = (body, type) => {

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  var comb = []
  var { difficulty , options, hoursPerDay, startStudyDay } = body 
  if (!difficulty) return {message: "error"}

  if (type === "application/x-www-form-urlencoded") {

    difficulty = JSON.parse(difficulty)
    options = JSON.parse(options)
    hoursPerDay = JSON.parse(hoursPerDay)
    startStudyDay = JSON.parse(startStudyDay)

  }

  var numMaterias = difficulty.length
  var sumNotes = 0
  for (ind = 0; ind < difficulty.length; ind++) sumNotes += difficulty[ind].note

  var a = difficulty.pop()
  var b = difficulty.pop()
  var c = difficulty.pop()
  var d = difficulty.pop()
  var e = difficulty.pop()
  var f = difficulty.pop()
  var g = difficulty.pop()
  var h = difficulty.pop()
  var i = difficulty.pop()
  var j = difficulty.pop()
  var k = difficulty.pop()
  var l = difficulty.pop()
  var m = difficulty.pop()

  var obj = `${a.note}a+${b.note}b+${c.note}c+${d.note}d+${e.note}e+${f.note}f+${g.note}g+${h.note}h+${i.note}i+${j.note}j+${k.note}k+${l.note}l+${m.note}m`
  var con = [
    `a + m + c + d + e + f + g + h + i + j + k + l + b <= ${options.length * hoursPerDay}`,
    'a >= 1',
    'b >= 1',
    'c >= 1',
    'd >= 1',
    'e >= 1',
    'f >= 1',
    'g >= 1',
    'h >= 1',
    'i >= 1',
    'j >= 1',
    'k >= 1',
    'l >= 1',
    'm >= 1',
    `a <= ${(hoursPerDay*options.length)*(a.note/sumNotes) >= 1 ? Math.round((hoursPerDay*options.length)*(a.note/sumNotes)): 1}`,
    `b <= ${(hoursPerDay*options.length)*(b.note/sumNotes) >= 1 ? Math.round((hoursPerDay*options.length)*(b.note/sumNotes)): 1}`,
    `c <= ${(hoursPerDay*options.length)*(c.note/sumNotes) >= 1 ? Math.round((hoursPerDay*options.length)*(c.note/sumNotes)): 1}`,
    `d <= ${(hoursPerDay*options.length)*(d.note/sumNotes) >= 1 ? Math.round((hoursPerDay*options.length)*(d.note/sumNotes)): 1}`,
    `e <= ${(hoursPerDay*options.length)*(e.note/sumNotes) >= 1 ? Math.round((hoursPerDay*options.length)*(e.note/sumNotes)): 1}`,
    `f <= ${(hoursPerDay*options.length)*(f.note/sumNotes) >= 1 ? Math.round((hoursPerDay*options.length)*(f.note/sumNotes)): 1}`,
    `g <= ${(hoursPerDay*options.length)*(g.note/sumNotes) >= 1 ? Math.round((hoursPerDay*options.length)*(g.note/sumNotes)): 1}`,
    `h <= ${(hoursPerDay*options.length)*(h.note/sumNotes) >= 1 ? Math.round((hoursPerDay*options.length)*(h.note/sumNotes)): 1}`,
    `i <= ${(hoursPerDay*options.length)*(i.note/sumNotes) >= 1 ? Math.round((hoursPerDay*options.length)*(i.note/sumNotes)): 1}`,
    `j <= ${(hoursPerDay*options.length)*(j.note/sumNotes) >= 1 ? Math.round((hoursPerDay*options.length)*(j.note/sumNotes)): 1}`,
    `k <= ${(hoursPerDay*options.length)*(k.note/sumNotes) >= 1 ? Math.round((hoursPerDay*options.length)*(k.note/sumNotes)): 1}`,
    `l <= ${(hoursPerDay*options.length)*(l.note/sumNotes) >= 1 ? Math.round((hoursPerDay*options.length)*(l.note/sumNotes)): 1}`,
    `m <= ${(hoursPerDay*options.length)*(m.note/sumNotes) >= 1 ? Math.round((hoursPerDay*options.length)*(m.note/sumNotes)): 1}`,
  ]
  var result = options.length * hoursPerDay > 13 ? simplex.maximize(obj, con) : {
    a: 1, b: 1, c: 1, d: 1, e: 1, f: 1, g: 1, h: 1, i: 1, j: 1, k: 1, l: 1, m: 1
  }

  var message = options.length * hoursPerDay > 13 ? "" : "Algumas máterias ficaram faltando pois a quantidade de tempo para estudo é insuficiente para comportar todas."

  var arrM = []

  for (xyz = 0; xyz < result.a; xyz++) arrM.push(a.name)
  for (xyz = 0; xyz < result.b; xyz++) arrM.push(b.name)
  for (xyz = 0; xyz < result.c; xyz++) arrM.push(c.name)
  for (xyz = 0; xyz < result.d; xyz++) arrM.push(d.name)
  for (xyz = 0; xyz < result.e; xyz++) arrM.push(e.name)
  for (xyz = 0; xyz < result.f; xyz++) arrM.push(f.name)
  for (xyz = 0; xyz < result.g; xyz++) arrM.push(g.name)
  for (xyz = 0; xyz < result.h; xyz++) arrM.push(h.name)
  for (xyz = 0; xyz < result.i; xyz++) arrM.push(i.name)
  for (xyz = 0; xyz < result.j; xyz++) arrM.push(j.name)
  for (xyz = 0; xyz < result.k; xyz++) arrM.push(k.name)
  for (xyz = 0; xyz < result.l; xyz++) arrM.push(l.name)
  for (xyz = 0; xyz < result.m; xyz++) arrM.push(m.name)

  var agenda = {
    "monday": [],
    "tuesday": [],
    "wednesday": [],
    "thursday": [],
    "friday": [],
    "saturday": [],
    "sunday": []
  }

  options.forEach(element => {
    for (i = 0; i < hoursPerDay && arrM.length > 0; i++){
      arrM = shuffle(arrM)
      agenda[element].push(arrM.pop())
    }
  })

  for (item in agenda) {
    for (i = 0; i < agenda[item].length - 2; i++) {
      for (j = i+1; j < agenda[item].length; j++) {
        if (agenda[item][i] == agenda[item][j]) {
          var aux = agenda[item][i+1]
          agenda[item][i+1] = agenda[item][j]
          agenda[item][j] = aux
        }
      }
    }
  }

  for (item in agenda) comb.push({ name: item, materias: agenda[item] })
  
  return {agenda: comb, options, hoursPerDay, startStudyDay, message }
}

module.exports = calcular