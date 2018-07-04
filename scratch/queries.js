'use strict';
const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');

const Note = require('../models/note');

mongoose.connect(MONGODB_URI)
	.then(() => {
		console.log('Find/Search for notes: ');

		const searchTerm = 'Lady Gaga';
		let filter = {};
		let re = {}

		if (searchTerm) {
			re = { $regex: searchTerm };
			filter.$or = [{ title: re }, { content: re }];
		};

		return Note.find({ $or: filter.$or }).sort({ updatedAt: 'desc' });
	})
	.then(result => {
		if (result) {
			console.log(result);
		} else {
			console.log('Not Found');
		}
		console.log('\n\n');
	})
	.then(() => {
		console.log('Find note by id: ');
		return Note.findById('000000000000000000000003');
	})
	.then(result => {
		if (result) {
			console.log(result);
		} else {
			console.log('Not Found');
		}
		console.log('\n\n');
	})
	.then(() => {
		console.log('Create a new note: ');

		const newNote = {
			title: 'this is a new note',
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		};

		return Note.create(newNote);
	})
	.then(result => {
		if (result) {
			console.log(result);
		} else {
			console.log('Not Found');
		}
		console.log('\n\n');
	})
	.then(() => {
		console.log('Update a note by id: ');

		const updateNote = {
			title: 'updated title',
			content: 'Posuere sollicitudin aliquam ultrices sagittis orci a. Feugiat sed adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		};

		return Note.findByIdAndUpdate('000000000000000000000007', updateNote, { new: true });
	})
	.then(result => {
		if (result) {
			console.log(result);
		} else {
			console.log('Not Found');
		}
		console.log('\n\n');
	})
	.then(() => {
		console.log('Delete a note by id: ');

		return Note.findByIdAndRemove('000000000000000000000004');
	})
	.then(result => {
		if (result) {
			console.log(result);
		} else {
			console.log('Not Found');
		}
		console.log('\n\n');
	})
	.then(() => {
		return mongoose.disconnect();
	})
	.catch(err => {
		console.error(`ERROR: ${err.message}`);
		console.error(err);
	});
