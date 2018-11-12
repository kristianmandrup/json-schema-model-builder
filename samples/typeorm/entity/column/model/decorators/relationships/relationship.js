class RelationshipDecorator {
  constructor(props) {
    super(props);
    this.edges = this.model.edges;
  }

  // if own foreign key of other node primary key
  get referencesOther() {
    return this.ownRefs.length > 0;
  }

  // if foreign key of other node points to own primary key
  get isReferenced() {
    return this.foreignRefs.length > 1;
  }
}
module.exports = {
  RelationshipDecorator
};
