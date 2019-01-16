class Necklace {
  constructor(tree) {
    if (tree) {

    }
    else {

    }
  }
}

class Page {
  constructor(content, metadata, id = Necklace.getID()) {
    this.id = id;
    this.metadata = metadata;
    this.content = content;
  }
}

class String {
  constructor(anchor, target) {
    this.anchor = anchor;
    this.target = target;
  }
}
