HTMLCanvasElement.getContext = () => function () {
  console.log('YOYOYOYO')

  return {
    drawImage: jest.fn(),
    setTransform: jest.fn(),
    getImageData: jest.fn(() => true)
  }
}