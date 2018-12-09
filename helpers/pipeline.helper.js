const pipe = (...fns) =>
  fns.length === 1
    ? fns[0].constructor === Function
      ? fns[0]()
      : fns[0]
    : fns.reduce((a, c, i) => {
        if (i === 1 && a && a.constructor === Function) {
          let exec = a();
          if (exec && exec.then) {
            return exec.then(a => c(a));
          } else {
            return c(a);
          }
        } else if (a && a.then) {
          return a.then(c => c(a));
        } else {
          return c(a);
        }
      });

module.exports = pipe;
