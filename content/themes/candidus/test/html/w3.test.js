const validator = require('html-validator');
const fs = require('fs/promises');
const path = require('path');

async function validateIndex() {
	const options = {
		url: 'http://localhost:2368/',
		format: 'html',
		isLocal: true,
	};

	try {
		const result = await validator(options);
		await fs.writeFile(path.join(__dirname, 'index.w3.html'), result);
	} catch (error) {
		console.error(error);
	}
}

async function validatePost() {
	const options = {
		url: 'http://localhost:2368/coming-soon/',
		format: 'html',
		isLocal: true,
	};

	try {
		const result = await validator(options);
		await fs.writeFile(path.join(__dirname, 'post.w3.html'), result);
	} catch (error) {
		console.error(error);
	}
}

async function validatePage() {
	const options = {
		url: 'http://localhost:2368/about/',
		format: 'html',
		isLocal: true,
	};

	try {
		const result = await validator(options);
		await fs.writeFile(path.join(__dirname, 'page.w3.html'), result);
	} catch (error) {
		console.error(error);
	}
}

async function validateAuthor() {
	const options = {
		url: 'http://localhost:2368/author/carrots/',
		format: 'html',
		isLocal: true,
	};

	try {
		const result = await validator(options);
		await fs.writeFile(path.join(__dirname, 'author.w3.html'), result);
	} catch (error) {
		console.error(error);
	}
}

async function validateTags() {}

async function test() {
	await validateIndex();
	await validatePost();
	await validatePage();
	await validateAuthor();
}

(async () => await test())();
