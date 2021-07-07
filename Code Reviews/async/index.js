import { get } from 'request-promise';
import { writeFile } from 'fs-extra';
// example-1
async function getCleanCodeArticle() {
	try {
		const body = await get('https://en.wikipedia.org/wiki/Robert_Cecil_Martin');
		await writeFile('article.html', body);
		console.log('File written');
	} catch (err) {
		console.error(err);
	}
}

getCleanCodeArticle();

// Example -2

const control = async (_) => {
	console.log('Start');

	const numApples = await getNumFruit('apple');
	console.log(numApples);

	const numGrapes = await getNumFruit('grape');
	console.log(numGrapes);

	const numPears = await getNumFruit('pear');
	console.log(numPears);

	console.log('End');
};

// example-3

function loadData() {
	return getJSON().then(function(response) {
		if (response.needsAnotherRequest) {
			return makeAnotherRequest(response).then(function(anotherResponse) {
				console.log(anotherResponse);
				return anotherResponse;
			});
		} else {
			console.log(response);
			return response;
		}
	});
}

async function loadData() {
	var response = await getJSON();
	if (response.needsAnotherRequest) {
		var anotherResponse = await makeAnotherRequest(response);
		console.log(anotherResponse);
		return anotherResponse;
	} else {
		console.log(response);
		return response;
	}
}

//example-4
function loadData() {
	return callAPromise().then(callback1).then(callback2).then(callback3).then(() => {
		throw new Error('boom');
	});
}
loadData().catch(function(e) {
	console.log(err);
	// Error: boom at callAPromise.then.then.then.then (index.js:8:13)
});

async function loadData() {
	await callAPromise1();
	await callAPromise2();
	await callAPromise3();
	await callAPromise4();
	await callAPromise5();
	throw new Error('boom');
}
loadData().catch(function(e) {
	console.log(err);
	// output
	// Error: boom at loadData (index.js:7:9)
});

function getData(callback) {
	getEmployees().then(function(res) {
		callback(res);
	});
}

getData(function(res) {
	console.log(res.employees);
});

function getEmployees() {
	return new Promise(function(resolve, reject) {
		resolve(doSomething());
	});
}

function getData() {
	return getEmployees();
}

getData().then(function(res) {
	console.log(res.employees);
});
