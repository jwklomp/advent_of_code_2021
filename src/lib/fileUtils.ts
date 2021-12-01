import fs from 'fs';
import https from 'https';

export const writeUrlDataToFile = (url: string, fileName: string) => {

  const request = https.request(url, function(res) {
    let data = '';
    res.on('data', function(chunk) {
      data += chunk;
    });
    res.on('end', function() {
      fs.writeFile(fileName, data, function(err) {
        if (err) throw err;
        console.log('Saved!');
      });
    });
  });

  request.on('error', function(e) {
    console.log(e.message);
  });

  request.end();
};
