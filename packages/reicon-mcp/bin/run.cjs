#!/usr/bin/env node

const args = process.argv.slice(2);

if (args.length === 0) {
  import('../dist/server/index.js');
} else {
  import('../dist/cli/index.js').then((mod) => {
    mod.run(args).catch((err) => {
      console.error(err);
      process.exit(1);
    });
  });
}
