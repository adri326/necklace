let necklace = new Necklace();

let page_1 = necklace.createPage("I am the very first page!");
necklace.setFirstPage(page_1);

let page_2 = necklace.createPage("Look! I'm the second page!");

necklace.createString(page_1, page_2, "default", "Go to the second page");

let user = necklace.createUser({ name: "John" });

{
  let current = user.getCurrentPage();
  console.log(current.content);
  let strings = current.getAvailableStrings();
  for (let string of strings) {
    console.log(` * [${string.name}]: ${string.content}`);
  }
  console.log(` > default`)
  user.select(strings.find((s) => s.name === "default"));
  console.log();
  console.log(user.getCurrentPage().content);
}
