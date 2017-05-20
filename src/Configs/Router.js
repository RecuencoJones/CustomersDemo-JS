var CustomersView = require('../Views/Customers')
var CustomerOrdersView = require('../Views/CustomerOrders')

function routerConfig($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('customers', CustomersView)
  .state('customer-orders', CustomerOrdersView)

  $urlRouterProvider.otherwise('/')
}

routerConfig.$inject = ['$stateProvider', '$urlRouterProvider']

module.exports = routerConfig
