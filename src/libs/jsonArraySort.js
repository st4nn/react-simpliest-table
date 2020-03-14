function sortArray(parameter, getFunction){
  const ASC = (a, b) => {
      if (getFunction === undefined){
          if ((a[parameter] || "") < (b[parameter] || "")) {
              return -1;
          }
          if ((a[parameter] || "") > (b[parameter] || "")) {
              return 1;
          }
          return 0;
      } else{
          const 
              _a = getFunction(a),
              _b = getFunction(b);

          if (_a < _b) {
              return -1;
          }
          if (_a > _b) {
              return 1;
          }
          return 0;
      }
  }

  const DESC = (a, b) => {
      if (getFunction === undefined) {
          if ((a[parameter] || "") > (b[parameter] || "")) {
              return -1;
          }
          if ((a[parameter] || "") < (b[parameter] || "")) {
              return 1;
          }
          return 0;
      } else {
          const
              _a = getFunction(a),
              _b = getFunction(b);

          if (_a > _b) {
              return -1;
          }
          if (_a < _b) {
              return 1;
          }
          return 0;
      }
  }

  return {ASC, DESC};
}

export default sortArray;
