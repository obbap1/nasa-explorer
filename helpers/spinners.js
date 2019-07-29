const { Spinner } = require('cli-spinner');

class Spin {
  constructor(reason = 'processing .. %s') {
    this.spinner = new Spinner(reason);
  }

  startSpin() {
    this.spinner.setSpinnerString('|/-\\');
    this.spinner.start();
  }

  stopSpin() {
    this.spinner.stop();
  }
}


module.exports = Spin;
