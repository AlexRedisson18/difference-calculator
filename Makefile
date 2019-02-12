install: install-deps

run:
	npx babel-node -- src/bin/gendiff.js /home/user/differenceCalculatorRed18/src/__tests__/__fixtures__/before.json /home/user/differenceCalculatorRed18/src/__tests__/__fixtures__/after.json


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
