HTMLCanvasElement.getContext = () => function () {
  return {
    drawImage: jest.fn(),
    setTransform: jest.fn(),
    getImageData: jest.fn(() => true)
  }
}