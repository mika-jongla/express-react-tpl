var src = './www';

module.exports = {

  browserify: {
    // A separate bundle will be generated for each
    // bundle config object in the array
    bundleConfigs: [{
      entries: src + '/javascript/app.js',
      dest: src,
      outputName: 'bundle.js'
    }]
  }
};
