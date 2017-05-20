function customersCtrl($state, API) {
  var vm = this

  function populateCustomers() {
    API.getCustomers()
    .then(function(data) {
      vm.customers = data
    })
  }

  vm.newCustomer = {}

  /**
   * Handle new customer creation.
   */
  vm.handleSubmit = function(form) {
    if (form.$valid) {
      API.addCustomer(vm.newCustomer)
      .then(function() {
        return populateCustomers()
      })
      .then(function() {
        vm.newCustomer = {}
        form.$setPristine()
        form.$setUntouched()
      })
    } else {
      form.$error.required.forEach(function(error) {
        error.$setTouched()
      })
    }
  }

  /**
   * Handle click on customer orders, navigate to customer orders view.
   *
   * @param id - unique id of customer from which to retrieve orders.
   */
  vm.onNavigate = function(id) {
    $state.go('customer-orders', {
      id: id
    })
  }

  /**
   * Handle removal of customer.
   *
   * @param id - unique id of customer to remove.
   */
  vm.onRemove = function(id) {
    API.removeCustomerWithId(id)
    .then(function() {
      return populateCustomers()
    })
  }

  populateCustomers()
}

customersCtrl.$inject = ['$state', 'API']

module.exports = {
  url: '/',
  template: require('./customers.html'),
  controllerAs: 'vm',
  controller: customersCtrl
}
