const Fs          = require('fs');

module.exports = async (source, target) => {
    let rd = Fs.createReadStream(source);
    let wr = Fs.createWriteStream(target);
    try {
      return await new Promise(function(resolve, reject) {
        rd.on('error', reject);
        wr.on('error', reject);
        wr.on('finish', resolve);
        rd.pipe(wr);
      });
    } catch (error) {
      rd.destroy();
      wr.end();
      throw error;
    }
}