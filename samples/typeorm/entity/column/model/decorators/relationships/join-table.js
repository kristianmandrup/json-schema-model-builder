class JoinTableDecorator extends Relationship {
  constructor(props) {
    super(props);
  }

  get use() {
    return this.isJoinTable;
  }

  get name() {
    return "JoinTable";
  }

  get args() {
    return [
      {
        key: "name",
        value: "Vote"
      }
    ];
  }

  get isJoinTable() {
    return this.isManyToMany;
  }
}

module.exports = {
  JoinTableDecorator
};
