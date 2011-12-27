
var docs = {};

exports.get = function(path, cb) {
	process.nextTick(function() {
		
		cb(docs[path]);
	});
};

exports.list = function(path, cb) {
	process.nextTick(function() {
		var list = [], paths = {}, folder = path + '/', len = folder.length;
		
		// get all files and folders, allow docs in folders to "overwrite" themselves to weed out duplicates
		for (var i in docs) {
			if (docs.hasOwnProperty(i) && i.substr(0, len) === folder) {
				var file = i.replace(folder, '').replace(/\/.+/, '/'); // folder without the file specifics
				paths[file] = true;
			}
		}
		
		// put all the paths into an array and sort it
		for (i in paths) list.push(i);
		
		// case insensitive sort
		list.sort(function(a, b) {
			a = a.toLowerCase();
			b = b.toLowerCase();
			if (a < b) return -1;
			else return 1;
		});
		
		cb(list);
	});
};

exports.put = function(path, doc, cb) {
	process.nextTick(function() {
		docs[path] = doc;
		cb(doc);
	});
};

exports.del = function(path, cb) {
	process.nextTick(function() {
		var success = delete docs[path];
		cb(success);
	});
};

exports.move = function(oldPath, newPath) {
	process.nextTick(function() {
		var folder = oldPath + '/', len = folder.length, j;
		for (var i in docs) {
			if (!docs.hasOwnProperty(i)) return;
			if (i === oldPath) j = newPath;
			else if (i.substr(0, len) === folder) j = i.replace(oldPath, newPath);
			else continue;
			docs[j] = docs[i];
			delete docs[i];
		}
	});
};

