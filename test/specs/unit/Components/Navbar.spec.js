var angular = require('angular')

describe('Component: Navbar', function() {
  var $componentController

  beforeEach(angular.mock.module('customers-demo'))

  beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_
  }))

  it('should render the component', function() {
    var $ctrl = $componentController('navbar')

    expect($ctrl).to.not.be.undefined
  })
})
