import Address from "../value-object/Address"
import CustomerFactory from "./customer-factory"

describe('Customer factory unit test', () => {
    it('Should create a costumer', () => {
        let customer = CustomerFactory.create('Jaime')
        expect(customer.id).toBeDefined()
        expect(customer.name).toBe('Jaime')
        expect(customer.address).toBeUndefined()
    })

    it('Should create a costumer with an address', () => {
        const address = new Address('Street', 1, '000000-000', 'nowhere')
        let customer = CustomerFactory.createWithAddress('Jaime', address)
        
        
        expect(customer.id).toBeDefined()
        expect(customer.name).toBe('Jaime')
        expect(customer.address).toBe(address)
    })
})