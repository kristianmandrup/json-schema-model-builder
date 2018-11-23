const { Base } = require("../../base");

module.exports = class Fingerprinted extends Base {
  constructor(...args) {
    super(...args);
  }

  addFingerprint() {
    this.fingerprint = this.createFingerprint();
    this.cache[this.hash] = this.object;
  }

  get hash() {
    return this.fingerprint.hash;
  }

  addFingerprint() {
    this.fingerprint = this.createFingerprint();
    this.addToCache();
  }

  addToCache() {
    if (this.wasCached) {
      this.warn("addToCache", "object was already cached", {
        object: this.fingerprint
      });
      return;
    }
    this.cache[this.hash] = this.property;
  }

  get wasCached() {
    return Boolean(this.cached);
  }

  get cache() {
    this.config.cache = this.config.cache || {};
    return this.config.cache || {};
  }

  get cached() {
    return this.cache[this.hash];
  }

  get hash() {
    return this.fingerprint.hash;
  }

  createFingerprint() {
    return new Fingerprint({ object: this.object, config: this.config });
  }
};
