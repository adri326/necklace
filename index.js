class Necklace {
  constructor(tree) {
    if (tree) {
      // not implemented yet
    }
    else {
      this.pages = [];
      this.strings = [];
      this.users = [];
      this.beads = [];
      this.firstPage = null;
    }
  }

  setFirstPage(page) {
    this.firstPage = typeof page === "object" ? page.id : page;
  }

  createPage(content, metadata = {}) {
    let page = new Necklace.Page(this, content, metadata);

    this.pages.push(page);

    return page;
  }

  createString(anchor, target, name, content) {
    if (typeof anchor === "string") {
      let anchor_ = this.pages.find(({id}) => id === anchor);
      if (!anchor_) throw new Error(`Page '${anchor}' not found!`);
      anchor = anchor_;
    }
    if (typeof target === "string") {
      let target_ = this.pages.find(({id}) => id === target);
      if (!target_) throw new Error(`Page '${target}' not found!`);
      target = target_;
    }

    let string = new Necklace.String(this, anchor, target, name, content, ULID.ulid());

    this.strings.push(string);

    return string;
  }

  createUser(metadata, active = this.firstPage, state = {}) {
    let user = new Necklace.User(this, ULID.ulid(), metadata, active, state);

    this.users.push(user);

    return user;
  }

  createBead(string, condition, action) {
    if (typeof string === "object") {
      string = string.id;
    }
    let bead = new Necklace.Bead(this, string, condition, action, ULID.ulid());

    this.beads.push(bead);

    return bead;
  }
}

Necklace.Page = class Page {
  constructor(parent, content, metadata, id = ULID.ulid()) {
    this.parent = parent;
    this.id = id;
    this.metadata = metadata;
    this.content = content;
  }

  getAvailableStrings() {
    let probableStrings = this.parent.strings.filter(({anchor}) => anchor === this || anchor.id === this.id);

    return probableStrings.filter((string) => string.test());
  }
}

Necklace.String = class String {
  constructor(parent, anchor, target, name, content, id = ULID.ulid()) {
    this.parent = parent;
    this.anchor = anchor;
    this.target = target;
    this.name = name;
    this.content = content;
    this.id = id;
  }

  test() {
    let beads = this.parent.beads.filter(({string}) => string === this.id);

    return beads.reduce((acc, bead) => acc && bead.test(), true);
  }

  execute() {
    let beads = this.parent.beads.filter(({string}) => string === this.id);

    beads.forEach((bead) => bead.execute());
  }
}

Necklace.Bead = class Bead {
  constructor(parent, string, condition, action, id = ULID.ulid()) {
    this.parent = parent;
    this.string = this.string;
    this.condition = condition;
    this.action = action;
    this.id = id;
  }

  test() {
    if (typeof this.condition === "function") {
      return !!this.condition();
    }
    else if (typeof this.condition === "string") {
      // not done
    }
  }

  execute() {
    if (typeof this.action === "function") {
      return this.action();
    }
    else if (typeof this.action === "string") {
      // not done
    }
  }
}

Necklace.User = class User {
  constructor(parent, id, metadata, active, state = {}) {
    this.parent = parent;
    this.id = id;
    this.metadata = metadata;
    this.active = active;
    this.state = state;
  }

  getCurrentPage() {
    return this.parent.pages.find((page) => page.id === this.active);
  }

  select(string, execute = true) {
    let newPage = string.target;
    if (execute) string.execute();
    this.active = newPage.id;
  }
}
