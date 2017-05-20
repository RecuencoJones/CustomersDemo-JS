var angular = require('angular')

describe('View: Customers', function() {
  var $rootScope
  var $controller
  var $q
  var $state
  var sandbox
  var customersMock
  var customerMock
  var API
  var form

  function getController() {
    return $controller($state.get('customers').controller)
  }

  beforeEach(angular.mock.module('customers-demo'))

  beforeEach(function() {
    sandbox = sinon.sandbox.create()

    customersMock = []
    customerMock = {}

    API = {
      getCustomers: function() {
        return $q.resolve(customersMock)
      },

      addCustomer: function(customer) {
        return $q.resolve()
      },

      removeCustomerWithId: function(id) {
        return $q.resolve()
      }
    }

    form = {
      $valid: false,
      $setPristine: sandbox.spy(),
      $setUntouched: sandbox.spy(),
      $error: {}
    }

    angular.mock.module(function($provide) {
      $provide.service('API', function() {
        return API
      })
    })
  })

  beforeEach(inject(function(_$rootScope_, _$controller_, _$state_, _$q_) {
    $rootScope = _$rootScope_
    $controller = _$controller_
    $q = _$q_
    $state = _$state_
  }))

  afterEach(function() {
    sandbox.restore()
  })

  describe('Init', function() {
    it('should populate with customers data', function() {
      customersMock = [customerMock, customerMock]

      var $ctrl = getController()

      $rootScope.$apply()

      expect($ctrl.customers).to.deep.equal(customersMock)
    })
  })

  describe('Submit customer', function() {
    it('should trigger submit of new customer with valid form', function() {
      var $ctrl = getController()
      var addCustomerSpy = sandbox.spy(API, 'addCustomer')

      customerMock = {
        firstName: 'Some Name',
        lastName: 'Some Surname',
        address: 'Some Address',
        city: 'Some City'
      }

      form.$valid = true
      $ctrl.newCustomer = customerMock

      $rootScope.$apply()
      $ctrl.handleSubmit(form)
      $rootScope.$apply()

      expect(addCustomerSpy).to.have.been.calledWith(customerMock)
      expect($ctrl.newCustomer).to.be.empty
      expect(form.$setPristine).to.have.been.called
      expect(form.$setUntouched).to.have.been.called
    })

    it('should prevent submit of new customer with invalid form', function() {
      var $ctrl = getController()
      var errorSetTouchedSpy = sandbox.spy()

      sandbox.spy(API, 'addCustomer')

      customerMock = {
        firstName: '',
        lastName: 'Some Surname',
        address: 'Some Address',
        city: 'Some City'
      }

      form.$valid = false
      form.$error.required = [
        {
          $setTouched: errorSetTouchedSpy
        }
      ]
      $ctrl.newCustomer = customerMock

      $rootScope.$apply()
      $ctrl.handleSubmit(form)
      $rootScope.$apply()

      expect(API.addCustomer).to.not.have.been.called
      expect($ctrl.newCustomer).to.not.be.empty
      expect(errorSetTouchedSpy).to.have.been.called
    })
  })

  describe('Remove customer', function() {
    it('should trigger removal of customer', function() {
      var $ctrl = getController()

      sandbox.spy(API, 'removeCustomerWithId')

      $ctrl.onRemove(1)
      $rootScope.$apply()

      expect(API.removeCustomerWithId).to.have.been.calledWith(1)
    })
  })

  describe('Navigate to customer details', function() {
    it('should trigger navigation to customer details', function() {
      var $ctrl = getController()

      sandbox.stub($state, 'go')

      $ctrl.onNavigate(1)

      expect($state.go).to.have.been.calledWith('customer-orders', {
        id: 1
      })
    })
  })
})
