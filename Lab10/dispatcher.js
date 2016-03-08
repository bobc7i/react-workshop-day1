export default class Dispatcher {
  constructor() {
    this.registeredCallbacks = {};
  }

  on(channel, callback) {
    this.registeredCallbacks[channel] = callback;
  }

  trigger(channel, data) {
    if (!this.registeredCallbacks[channel]) return;
    this.registeredCallbacks[channel](data);
  }

  removeCallback(channel) {
    delete this.registeredCallbacks[channel];
  }
}
