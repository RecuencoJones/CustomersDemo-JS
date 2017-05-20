module.exports = {
  bindings: {
    customer: '<',
    onClick: '&',
    onRemove: '&'
  },
  controllerAs: 'vm',
  template: require('./customer-card.html')
}
