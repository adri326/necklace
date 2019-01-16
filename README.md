# Necklace

Manage interactive stories and game scenarios, with JSON in Javascript.

More explanations later, it's getting late for me.

## Installation

Grab this lil' bit of code from github:

```sh
git clone https://github.com/adri326/necklace.git
cd necklace
git submodule update --init
```

Then include all that's required in your `.html`:

```html
<html>
  <head>
    <meta charset="utf-8">
    <script src="necklace/dependencies/ulid/dist/index.umd.js"></script>
    <script src="necklace/index.js"></script>
    <script defer>
      let necklace = new Necklace();
    </script>
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
