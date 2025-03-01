# common-helpers

```html
<!doctype html>
<html lang="sk">
  <head>
    <meta charset="utf-8" />
    <script type="importmap">
      {
        "imports": {
          "common-helpers/": "https://warden-sk.github.io/common-helpers/"
        }
      }
    </script>
    <title>common-helpers</title>
  </head>
  <body>
    <script type="module">
      import plural from 'common-helpers/plural.js';

      window.document.body.append(plural(5, ['jablko', 'jablká', 'jabĺk']));
    </script>
  </body>
</html>
```
