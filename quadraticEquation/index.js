const errors = {
  input: "Invalid input type",
  complex: "Only complex values available",
  irrelevant: "No solutions could be found"
}

const validateInput = (a, b, c) => (
  Number.isFinite(a) && !Number.isNaN(a) &&
  Number.isFinite(b) && !Number.isNaN(b) &&
  Number.isFinite(c) && !Number.isNaN(c)
)

const solveConstant = (c, res) => (
  c === 0 ?
  res.x1 = res.x2 = "any" :
  res.error = errors.irrelevant
)

const solveLinear = (b, c, res) => {
  if (b === 0) {
    solveConstant(c, res);
  } else {
    res.x1 = - c / b;
  }
}

function solveQuadraticEquation(a = null, b = null, c = null) {
  let res = {
    x1: null,
    x2: null,
    discr: null,
    error: null
  };
  
	if (validateInput(a, b, c)) {
		if (a === 0) {
			solveLinear(b, c, res);
		} else {
			if (b === 0) { 
					if ((-c / a) < 0)
					  res.error = errors.complex
					else
            res.x1 = Math.sqrt(-c/a);
            res.x2 = -Math.sqrt(-c/a);
			} else {
				if ((res.discr = b*b - 4*a*c) < 0)
				  res.error = errors.complex
        else {
          res.x1 = ((-b - Math.sqrt(res.disc)) / (2*a));
          res.x2 = ((-b + Math.sqrt(res.disc)) / (2*a));
        }
      }
		} 
  } else {
    res.error = errors.input;
  }
  return res;
}

[
  [1,1,1],
  [1,1,0],
  [1,0,0],
  [0,1,0],
  [0,0,1],
  [0,0,0],
  [1,2,1]
].forEach(([a,b,c]) => console.log(` ${a}x^2 + ${b}x + ${c} = 0`,solveQuadraticEquation(a,b,c)))