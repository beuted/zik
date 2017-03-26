const express = require('express');
const router = express.Router();
const fs = require('fs');
const jsmediatags = require('jsmediatags');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

let musicFolder = 'E:\\Musique\\';

router.get('/music', (req, res) => {
	
	var fileId = req.query.id; 
	var file = musicFolder + fileId;
	fs.exists(file, (exists) => {
		if (exists)
		{
			var rstream = fs.createReadStream(file);
			rstream.pipe(res);
		}
		else
		{
			res.send('Its a 404');
			res.end();
		}
	
	});
});

router.get('/download', (req, res) => {
	var fileId = req.query.id;
	var file = musicFolder + fileId;
	fs.exists(file, (exists) => {
		if (exists)
		{
			res.setHeader('Content-disposition', 'attachment; filename=' + fileId);
			res.setHeader('Content-Type', 'application/audio/mpeg3')
			var rstream = fs.createReadStream(file);
			rstream.pipe(res);
		}
		else
		{
			res.send('Its a 404');
			res.end();
		}
	});
});

const acceptedExtensions = ['.mp3'];

var walkSync = function(dir, filelist) {
    var path = path || require('path');
    var files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach((file) => {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkSync(path.join(dir, file), filelist);
        } else if (acceptedExtensions.indexOf(path.extname(file)) !== -1) {
			var fullPath = path.relative(musicFolder, path.join(dir, file));

			new jsmediatags.Reader(path.join(dir, file))
			.setTagsToRead(["album", "artist"])
			.read({
				onSuccess: function(tag) {
					var music = {
						path: fullPath,
						name: path.basename(file),
						artist: tag.tags.artist,
						album: tag.tags.album
					}
					filelist.push(music);
				},
				onError: function(error) {
					console.log(':(', error.type, error.info, "file:", fullPath);
				}
			});
        }
    });
    return filelist;
};

var fileList = walkSync(musicFolder);

router.get('/list', (req, res) => {
    res.send(JSON.stringify(fileList));
    res.end();
});

module.exports = router;