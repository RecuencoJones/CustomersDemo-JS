var angular = require('angular')

describe('Component: FormInput', function() {
  var $componentController

  beforeEach(angular.mock.module('customers-demo'))

  beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_
  }))

  it('should render the component', function() {
    var $ctrl = $componentController('formInput', null, {
      name: 'someInput',
      placeholder: 'Some Input',
      label: 'Some Input Label',
      model: 'value',
      form: {}
    })

    expect($ctrl.name).to.equal('someInput')
    expect($ctrl.placeholder).to.equal('Some Input')
    expect($ctrl.label).to.equal('Some Input Label')
    expect($ctrl.model).to.equal('value')
  })
})
