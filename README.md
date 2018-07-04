# express-router-group

Create route groups in express.js

## Quick start

1. `npm i express-router-group`
2. Add `require('express-router-group`) in the first line of your route files.
3. Use `router.group('/path', () => {})` to start grouping routes.

## How to use

For prefixing all routes with a certain path, you use the group method added to the express router, as the following example:

```
require('express-router-group');
const router = express.Router();
router.group("/api/v1", router => {
    router.get("/login", loginController.store); // /api/v1/login 
});
```

In case you don't want to add a prefix but still need to group certain routes you can leave the first parameter and go straight for the function:

```
require('express-router-group');
const router = express.Router();
 
router.group(router => {
    router.use(middleware);
});
```

### Adding middlewares

You can also add middlewares to route groups:

```
require('express-router-group');
const router = express.Router();
const myMiddleware = function(req, res, next){
    console.log("Applying middleware");
    return next();
}
router.group("/api/v1", myMiddleware, router => {
    router.get("/login", loginController.store); // /api/v1/login 
});
```

Then everytime you go to a route in the `/api/v1` group, it will console log "Applying middleware".