class Logger {
  error = (message) => {
    console.error(message);
  };
}

module.export = new Logger();