window.onload = function (event) {
  const problem4 = new Problem4();

  document.addEventListener('click', function (event) {
    if (event.target.id === 'canvas') {
      problem4.CaptureClickPoint(event);
    }
  });
};

function StartFizzBuzz() {

  const fizzBuzz = new FizzBuzz();

  document.getElementById('outputText').innerText = fizzBuzz.Start();
}

function StartProblem2() {
  const problem2 = new Problem2();

  document.getElementById('outputText').innerText = problem2.Start().toString();
}

function StartProblem4() {
  const problem4 = new Problem4();

  document.getElementById('outputText').innerText = problem4.Start();
}

class FizzBuzz {
  Start() {
    var output = '';

    for (let index = 1; index <= 1000; index++) {
      output += this.FizzBuzzify(index);
      output += ', ';
    }

    return output;
  }

  FizzBuzzify(number) {
    return this.MultipleOfThree(number) ? (this.MultipleOfFive(number) ? 'FizzBuzz' : 'Fizz') : (this.MultipleOfFive(number) ? 'Buzz' : number);
  }

  MultipleOfThree(number) {
    return number % 3 === 0 ? true : false;
  }

  MultipleOfFive(number) {
    return number % 5 === 0 ? true : false;
  }
}

class Problem2 {
  Start() {
    const array = this.GenerateArray(10);

    return 'Smallest: ' + this.GetMinimum(array) + '\nBiggest: ' + this.GetMaximum(array) + '\nAverage: ' + this.GetAverage(array);
  }

  GenerateArray(length) {
    var array = [];

    for (let index = 0; index < length; index++) {
      const randomInteger = Math.floor(Math.random() * 999);

      array.push(randomInteger);
    }

    return array;
  }

  GetMinimum(array) {
    var smallestNumber = Infinity;

    array.forEach(number => {
      if (number < smallestNumber)
        smallestNumber = number;
    });

    return smallestNumber;
  }

  GetMaximum(array) {
    var biggestNumber = -1;

    array.forEach(number => {
      if (number > biggestNumber)
        biggestNumber = number;
    });

    return biggestNumber;
  }

  GetAverage(array) {
    var arraySum = 0;

    array.forEach(number => {
      arraySum += number;
    });

    return arraySum / array.length;
  }
}

class Problem4 {
  Start() {
    var r1x1 = document.getElementById('r1x1').value;
    var r1y1 = document.getElementById('r1y1').value;
    var r1x2 = document.getElementById('r1x2').value;
    var r1y2 = document.getElementById('r1y2').value;

    var r2x1 = document.getElementById('r2x1').value;
    var r2y1 = document.getElementById('r2y1').value;
    var r2x2 = document.getElementById('r2x2').value;
    var r2y2 = document.getElementById('r2y2').value;

    var intersect = false;

    if ((r2x1 > r1x1 && r2x1 < r1x2) && (r2y1 > r1y1 && r2y1 < r1y2)) 
    {
      //If true, this means that the second rectangle Point X1Y1 is within bounds of the first rectangle. which means yes, they do intersect. 
      //But thats not enough even if this returns false, we still need to check the second point.

      intersect = true;
    }

    if ((r2x2 > r1x1 && r2x2 < r1x2) && (r2y2 > r1y2 && r2y2 < r1y2))
    {
      intersect = true;
    }

    if ((r2x1 > r1x1 && r2x1 < r1x2) && (r2y2 > r1y1 && r2y2 < r1y2)) //Undefined point.
    {
      intersect = true;
    }

    if ((r2x2 > r1x1 && r2x2 < r1x2) && (r2y1 > r1y1 && r2y1 < r1y2)) //Undefined point.
    {
      intersect = true;
    }

    return intersect;
  }
}