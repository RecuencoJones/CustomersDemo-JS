function API($http, $location) {
  var port = 3000
  var apiUrl = 'http://' + $location.host() + ':' + port

  /**
   * Retrieve all customers.
   *
   * @return promise handler.
   */
  this.getCustomers = function() {
    return $http.get(apiUrl + '/customers')
    .then(function(response) {
      return response.data
    })
    .catch(function() {
      throw new Error('Error retrieving customers data')
    })
  }

  /**
   * Add a new customer.
   *
   * @param customer - customer data to add.
   * @returns promise handler.
   */
  this.addCustomer = function(customer) {
    return $http.post(apiUrl + '/customers', customer)
    .then(function(response) {
      return response.data
    })
    .catch(function() {
      throw new Error('Error creating new customer ' + customer)
    })
  }

  /**
   * Retrieve a customer with given id.
   *
   * @param id - customer unique id.
   * @return promise handler.
   */
  this.getCustomerWithId = function(id) {
    return $http.get(apiUrl + '/customers/' + id)
    .then(function(response) {
      return response.data
    })
    .catch(function() {
      throw new Error('Customer with id ' + id + ' does not exist.')
    })
  }

  /**
   * Remove a customer with given id.
   *
   * @param id - customer unique id.
   * @returns promise handler.
   */
  this.removeCustomerWithId = function(id) {
    return $http.delete(apiUrl + '/customers/' + id)
    .then(function(response) {
      return response.data
    })
    .catch(function() {
      throw new Error('Error removing customer with id ' + id)
    })
  }
}

API.$inject = ['$http', '$location']

module.exports = API
