const app = require('../app');
const request = require('supertest');

describe('auth', () => {
 /* it('returns bad request if first name is missing', async () => {
    const res = await request(app).post('/api/login').send({  username: 'Jan',email:'aa@gmail.com' });

    expect(res.statusCode).toEqual(201);
  });*/
  it('good test', async () => {
    const res = await request(app).post('/api/login').send({ "username": 'Jan',"email":'aa@gmail.com',"password":'123' });
    expect(res.statusCode).toEqual(201);
  

  });
  it('bad email test', async () => {
    const res = await request(app).post('/api/login').send({ "username": 'Jan',"email":'aagmail.com',"password":'123' });
    expect(res.statusCode).toEqual(422);
  

  });
 /* it('returns bad request if first name is missing', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ somethingElse: 'Jan' });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual('you need to pass a firstName');
    /* expect("saved succesfully", function(err){
      console.log(err);
    });
    /*end((err, res) => {
      if (err) {
        return done(err);
      }
  });*/
});

describe('reg', () => {
  /* it('returns bad request if first name is missing', async () => {
     const res = await request(app).post('/api/login').send({  username: 'Jan',email:'aa@gmail.com' });
 
     expect(res.statusCode).toEqual(201);
   });*/
   it('good test', async () => {
     const res = await request(app).post('/api/login').send({ "username": 'Jan',"email":'aa@gmail.com',"password":'123' });
     expect(res.statusCode).toEqual(201);
   
 
   });
   it('bad email test', async () => {
     const res = await request(app).post('/api/login').send({ "username": 'Jan',"email":'aagmail.com',"password":'123' });
     expect(res.statusCode).toEqual(422);
   
 
   });
  
 });