var angular = require('angular')

describe('View: CustomerOrder', function() {
  var $rootScope
  var $controller
  var $q
  var $state
  var $stateParams
  var customerMock
  var API

  function getController() {
    return $controller($state.get('customer-orders').controller)
  }

  beforeEach(angular.mock.module('customers-demo'))

  beforeEach(function() {
    customerMock = {
      id: 0,
      orders: [
        {
          orderTotal: 10
        }, {
          orderTotal: 10
        }, {
          orderTotal: 20
        }
      ]
    }

    $stateParams = {}

    API = {
      getCustomerWithId: function(id) {
        return id < 5 ? $q.resolve(customerMock) : $q.reject('error')
      }
    }

    angular.mock.module(function($provide) {
      $provide.service('$stateParams', function() {
        return $stateParams
      })
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

  it('should render the view controller with existing customer', function() {
    $stateParams.id = 1

    var $ctrl = getController()

    $rootScope.$apply()

    expect($ctrl.customer).to.be.an('object')
    expect($ctrl.ordersTotal).to.equal(40)
  })

  it('should render error message if customer does not exist', function() {
    $stateParams.id = 6

    var $ctrl = getController()

    $rootScope.$apply()

    expect($ctrl.error).to.be.a('string')
  })
})
