var angular = require('angular')

describe('Component: CustomerCard', function() {
  var customerMock = {
    firstName: 'Foo',
    lastName: 'Bar',
    orders: [
      {
        priceTotal: 30
      }, {
        priceTotal: 60
      }
    ]
  }

  var $componentController

  beforeEach(angular.mock.module('customers-demo'))

  beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_
  }))

  it('should render props', function() {
    var $ctrl = $componentController('customerCard', null, {
      customer: customerMock,
      onClick: function() {},
      onRemove: function() {}
    })

    expect($ctrl.customer).to.equal(customerMock)
  })
})
