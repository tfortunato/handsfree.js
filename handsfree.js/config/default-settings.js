/**
 * The following are the default settings
 */
module.exports = {
  // Maximum number of poses to track
  maxPoses: 1,

  // PoseNet
  // @see https://github.com/tensorflow/tfjs-models/tree/master/posenet
  posenet: {
    multiplier: 0.75,
    imageScaleFactor: 0.4,
    minPoseConfidence: 0.1,
    minPartConfidence: 0.5,
    outputStride: 16,
    nmsRadius: 20,
    scoreThreshold: 0.5
  },

  sensitivity: {
    // A factor to adjust the cursors move speed by
    xy: 0.7,
    // How much wider (+) or narrower (-) a smile needs to be to click
    click: 0
  },
  
  stabilizer: {
    // How much stabilization to use: 0 = none, 3 = heavy
    factor: 1,
    // Number of frames to stabilizer over
    buffer: 30
  },

  // Sets up the webcam
  webcam: {
    video: {
      width: 640,
      height: 480,
      frameRate: 30
    }
  }
}