const fileMiddleware = require("../../src/middleware/fileMiddleware");
jest.mock('fileMiddleware')

 const mockRequest = (sessionData, body) => ({
  session: { data: sessionData },
  body
});

// Create a fake response
 const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

test('should be fail throw large file size', () => {
  const file = new MockFile({ name: 'test.png', type: 'image/png', size: 500000 });
  const fileMiddleware.single(file)
  expect(input.files[0]).toBe(file);
  expect(input.files).toHaveLength(1);
});