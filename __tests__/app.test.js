const request = require('supertest')
const app = require('../app')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data')
const db = require('../db/connection')
const { patch } = require('../app')

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
            }),
          )
          //   console.log(article,'<=======')
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
