const request = require('supertest');
const app = require('./app');

describe('POST /api/negeri', () => {
    it('should create a new state', async () => {
        const newStateName = 'Johor Lama';
        const response = await request(app)
            .post('/api/negeri')
            .send({ name: newStateName })
            .expect(200);

        const getResponse = await request(app).get('/api/negeri');
        if (getResponse.status === 200) {
            const createdState = getResponse.body.find(state => state.name === newStateName);
            expect(createdState).toBeDefined();
        }
    });
});

describe('Parsing JSON data', () => {
    it('should parse the JSON data correctly', () => {
        const data = '{"id": 1, "name": "Johor"}';
        const negeri = JSON.parse(data);
        expect(negeri.id).toEqual(1);
        expect(negeri.name).toEqual('Johor');
    });
});
