import { app, sequelize } from "../express";
import request from 'supertest'

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close()
  })

  it('Should create a customer', async () => {
    const response = await request(app)
    .post('/customer')
    .send({
        name: 'marcos',
        address: {
            street: 'street',
            city: 'city',
            number: 123,
            zip: 'zip'
        }
    })

    expect(response.status).toBe(200)
  })

  it('Should not create a customer', async () => {
    const response = await request(app)
    .post('/customer')
    .send({
        name: 'marcos'
    })

    expect(response.status).toBe(500)
  })

  it('Should list customers', async () => {
    const response = await request(app)
    .post('/customer')
    .send({
        name: 'marcos',
        address: {
            street: 'street',
            city: 'city',
            number: 123,
            zip: 'zip'
        }
    })

    expect(response.status).toBe(200)

    const response2 = await request(app)
    .post('/customer')
    .send({
        name: 'hianca',
        address: {
            street: 'street 2',
            city: 'city 2',
            number: 1234,
            zip: 'zip 2'
        }
    })
    expect(response2.status).toBe(200)

    const listResponse = await request(app).get('/customer').send()

    expect(listResponse.status).toBe(200)
    expect(listResponse.body.customers.length).toBe(2)

    const customer1 = listResponse.body.customers[0]
    expect(customer1.name).toBe('marcos')
    const customer2 = listResponse.body.customers[1]
    expect(customer2.name).toBe('hianca')

    const listResponseXML = await request(app)
                          .get('/customer')
                          .set('Accept', 'application/xml')
                          .send()
    
    expect(listResponseXML.status).toBe(200)
    expect(listResponseXML.text).toContain('<?xml version="1.0" encoding="UTF-8"?>')
  
  })
});
