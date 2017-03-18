var storage = require('node-persist');
storage.initSync();

storage.setItemSync('foo', { feed: 'aaa' });

var foo = storage.getItemSync('foo') || [];
//if (!foo.history) foo.history = ['a'];
//foo.bla = 'aa';
console.log(foo.length);
foo.push[{ 'a': 'a' }];
storage.setItemSync('foo', foo);

storage.setItemSync('name', 'foo');
console.log(storage.getItemSync('name')); // yourname