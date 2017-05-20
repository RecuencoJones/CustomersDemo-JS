var angular = require('angular')

describe('Service: API', function() {
  var $httpBackend
  var api

  beforeEach(angular.mock.module('customers-demo'))

  beforeEach(inject(function(_$httpBackend_, _API_) {
    $httpBackend = _$httpBackend_
    api = _API_
  }))

  describe('getCustomers()', function() {
    it('should retrieve all customers successfully', function() {
      var customerMocks = [{}, {}]
      var response

      api.getCustomers()
      .then(function(rawResponse) {
        response = rawResponse.data
      })

      $httpBackend.whenGET(/\/customers$/).respond(200, {
        data: customerMocks
      })

      $httpBackend.flush()

      expect(response).to.have.length(2)
    })

    it('should return error on request fail', function() {
      var response

      api.getCustomers()
      .catch(function(error) {
        response = error
      })

      $httpBackend.whenGET(/\/customers$/).respond(400)

      $httpBackend.flush()

      expect(response).to.be.an('error')
    })
  })

  describe('addCustomer()', function() {
    it('should save a new customer successfully', function() {
      var customerMock = {}
      var response

      api.addCustomer(customerMock)
      .then(function(rawResponse) {
        response = rawResponse.data
      })

      $httpBackend.whenPOST(/\/customers$/).respond(201, {
        data: 1
      })

      $httpBackend.flush()

      expect(response).to.equal(1)
    })

    it('should return error on request fail', function() {
      var customerMock = {}
      var response

      api.addCustomer(customerMock)
      .catch(function(error) {
        response = error
      })

      $httpBackend.whenPOST(/\/customers$/).respond(400)

      $httpBackend.flush()

      expect(response).to.be.an('error')
    })
  })

  describe('getCustomerWithId()', function() {
    it('should retrieve all customers successfully', function() {
      var customerMock = {}
      var response

      api.getCustomerWithId(1)
      .then(function(rawResponse) {
        response = rawResponse.data
      })

      $httpBackend.whenGET(/\/customers\/[0-9]+$/).respond(200, {
        data: customerMock
      })

      $httpBackend.flush()

      expect(response).to.deep.equal(customerMock)
    })

    it('should return error on request fail', function() {
      var response

      api.getCustomerWithId(1)
      .catch(function(error) {
        response = error
      })

      $httpBackend.whenGET(/\/customers\/[0-9]+$/).respond(400)

      $httpBackend.flush()

      expect(response).to.be.an('error')
    })
  })

  describe('removeCustomerWithId()', function() {
    it('should retrieve all customers successfully', function() {
      var response

      api.removeCustomerWithId(1)
      .then(function(rawResponse) {
        response = rawResponse.data
      })

      $httpBackend.whenDELETE(/\/customers\/[0-9]+$/).respond(200, {
        data: {}
      })

      $httpBackend.flush()

      expect(response).to.be.empty
    })

    it('should return error on request fail', function() {
      var response

      api.removeCustomerWithId(1)
      .catch(function(error) {
        response = error
      })

      $httpBackend.whenDELETE(/\/customers\/[0-9]+$/).respond(400)

      $httpBackend.flush()

      expect(response).to.be.an('error')
    })
  })
})
