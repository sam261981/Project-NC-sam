const request = require('supertest');
const app = require('../app');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data');
const db = require('../db/connection')


beforeEach(() => seed(data));
afterAll(() => db.end());

describe('/api/topics', () => {
test('Get array with topic objects', () => {
    return request(app)
    .get('/api/topics')
    .expect(200)
    .then((res) => {
     expect(res.body.data).toHaveLength(3)
     res.body.data.forEach((topic) => {
         expect(topic).toEqual( expect.objectContaining({ description: expect.any(String), slug: expect.any(String)}))
     })
    })

});
    
});



