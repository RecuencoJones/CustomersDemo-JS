var _ = require('lodash')

function customerOrdersCtrl($stateParams, API) {
  var vm = this

  function populateCustomer() {
    API.getCustomerWithId(+$stateParams.id)
    .then(function(data) {
      vm.customer = data
      vm.ordersTotal = _.chain(vm.customer.orders)
      .map(function(order) {
        return order.orderTotal
      })
      .reduce(function(accum, value) {
        return accum + value
      }, 0)
      .value()
    })
    .catch(function(error) {
      vm.error = error
    })
  }

  populateCustomer()
}

customerOrdersCtrl.$inject = ['$stateParams', 'API']

module.exports = {
  url: '/customerorders/:id',
  template: require('./customer-orders.html'),
  controllerAs: 'vm',
  controller: customerOrdersCtrl
}
