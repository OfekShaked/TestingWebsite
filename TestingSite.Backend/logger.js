class Logger {
  error = (message) => {
    console.log(message);
  };
}

module.exports = new Logger();