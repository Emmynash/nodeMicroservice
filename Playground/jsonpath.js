const jsonpath = require('json-patch');

mydoc = {
    "baz": "qux",
    "foo": "bar"
};
thepatch = [
    { "op": "replace", "path": "/baz", "value": "boo" }
]
patcheddoc = jsonpath.apply(mydoc, thepatch);


console.log(patcheddoc);