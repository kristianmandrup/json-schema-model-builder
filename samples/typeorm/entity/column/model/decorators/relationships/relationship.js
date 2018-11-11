class RelationshipDecorator {
  constructor({ model, config }) {
    this.model = model;
    this.config = config;
    const { targets } = model;
    this.targets = targets || [];
    this.reverseTargets = targets.flatMap(model => model.targets || []);
  }

  get targetCount() {
    return this.targets.length;
  }

  get reverseTargetCount() {
    return this.reverseTargets.length;
  }

  get hasManyOut() {
    return this.targetCount > 1;
  }

  get hasManyIn() {
    if (!this.reverseTargetCount > 1) {
      return false;
    }
    return reverseTargets.find(model => model.name === this.name);
  }

  get isManyToMany() {
    return this.hasManyOut && this.hasManyIn;
  }
}
module.exports = {
  RelationshipDecorator
};
