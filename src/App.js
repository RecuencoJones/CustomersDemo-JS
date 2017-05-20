var angular = require('angular')
var routerConfig = require('./Configs/Router')
var Navbar = require('./Components/Navbar')
var CustomerCard = require('./Components/CustomerCard')
var FormInput = require('./Components/FormInput')
var API = require('./Services/API')

require('./Styles/styles.scss')

angular.module('customers-demo', ['ui.router'])
.service('API', API)
.component('customerCard', CustomerCard)
.component('navbar', Navbar)
.component('formInput', FormInput)
.config(routerConfig)

angular.bootstrap(document, ['customers-demo'])
