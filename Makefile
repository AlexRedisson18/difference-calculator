install: install-deps

json_flat:
	npx babel-node -- src/bin/gendiff.js /home/user/differenceCalculatorRed18/__tests__/__fixtures__/before.json /home/user/differenceCalculatorRed18/__tests__/__fixtures__/after.json

json_tree:
	npx babel-node -- src/bin/gendiff.js /home/user/differenceCalculatorRed18/__tests__/__fixtures__/before_tree.json /home/user/differenceCalculatorRed18/__tests__/__fixtures__/after_tree.json

install-deps:
	npm install

build:
	rm -rf dist
	npm run build

test:
	npm test

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test
