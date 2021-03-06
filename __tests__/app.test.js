const request = require('supertest')
const app = require('../app')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data')
const db = require('../db/connection')
const apiJson = require('../endpoints.json')
beforeEach(() => seed(data))
afterAll(() => db.end())

describe('/api/topics', () => {
  test('Get array with topic objects', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        expect(res.body.data).toHaveLength(3)
        res.body.data.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              description: expect.any(String),
              slug: expect.any(String),
            }),
          )
        })
      })
  })
})

describe('/api/articles/:article_id', () => {
  test('responds with an article object of article id 1', () => {
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then((res) => {
        expect(res.body.article).toHaveLength(1)
        res.body.article.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              body: expect.any(String),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(String),
            }),
          )
        })
      })
  })
  test('responds with 400 for bad requests', () => {
    return request(app)
      .get('/api/articles/sam')
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Bad Request')
      })
  })
  test('responds with 404 when id currently does not exist in the database', () => {
    return request(app)
      .get('/api/articles/8000')
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('article id not found')
      })
  })
})

describe('PATCH/api/articles/:article_id', () => {
  test('increase article 5 vote by 3 and responds with an updated article', () => {
    const increaseVote = { votes: 3 }
    const dataOutput = {
      article_id: 5,
      title: 'UNCOVERED: catspiracy to bring down democracy',
      topic: 'cats',
      author: 'rogersop',
      body: 'Bastet walks amongst us, and the cats are taking arms!',
      created_at: '2020-08-03T13:14:00.000Z',
      votes: 3,
    }
    return request(app)
      .patch('/api/articles/5')
      .send(increaseVote)
      .expect(201)
      .then((res) => {
        expect(res.body.article).toEqual(dataOutput)
      })
  })
  test('increase article 4 vote by 10 and responds with an updated article', () => {
    const increaseVote = { votes: 10 }
    const dataOutput = {
      article_id: 4,
      title: 'Student SUES Mitch!',
      topic: 'mitch',
      author: 'rogersop',
      body:
        'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
      created_at: '2020-05-06T01:14:00.000Z',
      votes: 10,
    }
    return request(app)
      .patch('/api/articles/4')
      .send(increaseVote)
      .expect(201)
      .then((res) => {
        expect(res.body.article).toEqual(dataOutput)
      })
  })
  test('Deincrease article 1 by 10 and respond with updated article ', () => {
    deincreaseVote = { votes: -10 }
    const dataOutput = {
      article_id: 1,
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: '2020-07-09T20:11:00.000Z',
      votes: 90,
    }
    return request(app)
      .patch('/api/articles/1')
      .send(deincreaseVote)
      .expect(201)
      .then((res) => {
        expect(res.body.article).toEqual(dataOutput)
      })
  })
  test('check all values are valid and responds with status 400 if invalid', () => {
    const invalidValue = {
      votes: 'not valid',
    }
    return request(app)
      .patch('/api/articles/1')
      .send(invalidValue)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Bad Request')
      })
  })
})
describe('Get users table', () => {
  test('responds with an array of objects for all users in the table', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then((res) => {
        expect(res.body.users).toHaveLength(4)
        res.body.users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            }),
          )
        })
      })
  })
  test('responds with 404 error if path not found', () => {
    return request(app)
      .get('/api/no-valid-path')
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Route not found')
      })
  })
})

describe('/api/:article_id/comments', () => {
  test('responds with status 200 and comments of the article id', () => {
    return request(app)
      .get('/api/articles/3/comments')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body).toHaveLength(2)
      })
  })

  test('responds with 404 if no comment found', () => {
    return request(app)
      .get('/api/articles/60/comments')
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('comments not found')
      })
  })
})
describe('/api/articles', () => {
  test('responds with an array of objects for all articles in the table ', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(12)
      })
  })
  test('GET status 200 & correct articles from multiple client queries', () => {
    return request(app)
      .get('/api/articles?sort_by=title&&order=ASC')
      .expect(200)
      .then((response) => {
        expect(response.body).toBeSortedBy('title')
      })
  })
  test('GET status 200 & correct articles from client topic queries', () => {
    return request(app)
      .get('/api/articles?topic=cats')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body).toHaveLength(1)
        expect(res.body).toBeSortedBy('created_at', {
          descending: true,
        })
      })
  })
  test('responds with 400 if incorect query given', () => {
    return request(app)
      .get('/api/articles?sort_by=number')
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Invalid order query')
      })
  })
  test('responds with 404 if no articles found', () => {
    return request(app)
      .get('/api/articles?topic=number')
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Topic is not found')
      })
  })
})
describe('POST /api/articles/:article_id/comments', () => {
  test('Status 201, created comment object', () => {
    return request(app)
      .post('/api/articles/2/comments')
      .send({ username: 'icellusedkars', body: 'very good article' })
      .expect(201)
      .then((res) => {
        expect(res.body).toMatchObject({
          body: 'very good article',
          votes: 0,
          author: 'icellusedkars',
          article_id: 2,
          comment_id: 19,
        })
      })
  })
})
describe('DELETE /api/comments/:comment_id', () => {
  test('Status 204, deletes comment from database', () => {
    return request(app)
      .delete('/api/comments/1')
      .expect(201)
      .then((res) => {
        expect(res.body).toMatchObject({
          body:
            "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          votes: 16,
          author: 'butter_bridge',
          article_id: 9,
          comment_id: 1,
        })
      })
  })
})
describe('get api ', () => {
  test('responds with status 200 for api', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(apiJson)
      })
  })
})
