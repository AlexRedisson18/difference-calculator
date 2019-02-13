install: install-deps

json:
	npx babel-node -- src/bin/gendiff.js /home/user/differenceCalculatorRed18/__tests__/__fixtures__/before.json /home/user/differenceCalculatorRed18/__tests__/__fixtures__/after.json

yaml:
	npx babel-node -- src/bin/gendiff.js /home/user/differenceCalculatorRed18/__tests__/__fixtures__/before.yaml /home/user/differenceCalculatorRed18/__tests__/__fixtures__/after.yaml

ini:
	npx babel-node -- src/bin/gendiff.js /home/user/differenceCalculatorRed18/__tests__/__fixtures__/before.ini /home/user/differenceCalculatorRed18/__tests__/__fixtures__/after.ini

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
