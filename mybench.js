var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

Benchmark.prototype.setup = function() {
    str = "coffeekebab";
//    str = "book";
};

function foo(str){
    counts = [0, 0, 0, 0, 0, 0, 0];
    max = 0;
    idx = 0;

    for (i = 1; i < str.length; i++) {
      ch = str.charAt(i);

      switch (ch) {
        case 'f':
          idx = 0;
          break;
        case 'a':
          idx = 1;
          break;
        case 'c':
          idx = 2;
          break;
        case 'e':
          idx = 3;
          break;
        case 'b':
          idx = 4;
          break;
        case 'o':
          idx = 5;
          break;
        case 'k':
          idx = 6;
          break;
        default:
          idx = 0;
      }

      if (ch == 'o') counts[idx] += 0.5;
      else counts[idx]++;

      if (counts[idx] > max) {
        max = Math.ceil(counts[idx]);
      }
    }
    return max;
}

function foo3(str){
    counts = [0, 0, 0, 0, 0, 0, 0, 0];
    max = 0;
    idx = 0;

    for (i = 1; i < str.length; i++) {
      ch = str.charAt(i);

      switch (ch) {
        case 'f':
          idx = 0;
          break;
        case 'a':
          idx = 1;
          break;
        case 'c':
          idx = 2;
          break;
        case 'e':
          idx = 3;
          break;
        case 'b':
          idx = 4;
          break;
        case 'o':
          if (counts[5] == counts[7]) {
            idx = 5;
          } else {
            idx = 7;
          }
          break;
        case 'k':
          idx = 6;
          break;
        default:
          idx = 0;
      }

      counts[idx]++;

      if (counts[idx] > max) {
        max = counts[idx];
      }
    }
    return max;
}

function mm(x, y){
  if (x > y) { return x; } else { return y; };
}

function foo2(str){
    f = a = c = e = b = o = oo = k = m = 0;
    for (i = 1; i < str.length; i++) {
        ch = str.charAt(i);
        switch (ch) {
            case 'f': m = mm(++f,m); break;
            case 'a': m = mm(++a,m); break;
            case 'c': m = mm(++c,m); break;
            case 'e': m = mm(++e,m); break;
            case 'b': m = mm(++b,m); break;
            case 'o': if (o == oo) { m = mm(++o,m); } else { ++oo; }; break;
            case 'k': m = mm(++k,m); break;
        }
    }
    return m;
}

function foo4(str){
    f = a = c = e = b = o = oo = k = m = 0;
    for (i = 1; i < str.length; i++) {
        ch = str.charAt(i);
        if (ch == 'o') {
            if (o == oo) { m = mm(++o,m); } else { ++o; };
        } else {
            eval("m = mm(++" + ch + ",m)");
        }
    }
    return m;
}


// add tests
suite.add('Better Optimal', function() {
  foo(str);
})
.add('foo2', function() {
  foo2(str);
})
.add('foo3', function() {
  foo3(str);
})
.add('foo4', function() {
  foo4(str);
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
// run async
.run();
