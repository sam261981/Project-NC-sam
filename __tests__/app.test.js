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

describe('/api/articles/:article_id', () => {
    test('responds with an article object of article id 1', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then((res) => {
        expect(res.body.article).toHaveLength(1)
        res.body.article.forEach((article) => {
            expect(article).toEqual( expect.objectContaining({
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                body: expect.any(String),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number)
              }))
        })
        })
    });
    test('responds with 400 for bad requests', ()=>{
        return request(app)
        .get('/api/articles/adam')
        .expect(400)
        .then(({body: {msg}})=>{
          expect(msg).toBe("Bad Request")
        })
      });
      test('responds with 404 when id currently does not exist in the database', () =>{
        return request(app).get('/api/articles/6000').expect(404).then(({body: {msg}})=> {
          expect(msg).toBe("article id not found")
        })
      })
});


