
module.directive('price', function(){
	return {
		restrict: 'E',
		replace: false,
		scope: {
			label: '@priceLabel',
			value: '=value',
		},
		template: '<div class="control-group required">'
						+'<label for="price" class="control-label">{{ label }}<sup>*</sup></label>'
						+'<div class="controls">'
							+'<div class="input-prepend input-append">'
								+'<span class="add-on">€</span>'
								+'<input class="span1" required="true" ng-change="changeValue()" ng-model="euro" value="" name="price" id="price" type="text">'
							+'</div>'
							+'<span class="help-inline" style="padding-top: 20px; padding-left: 3px; padding-right: 3px; font-size: 20px;">,</span>'
							+'<div class="input-prepend">'
								+'<input class="span1"  name="cents" ng-change="changeValue()" ng-model="cents" value="" id="cents" type="text">'
							+'</div>'
							+'<span class="text-error"></span>'
						+'</div>'
					+'</div>',
					
		link: function(scope, element, attrs) {
			scope.euro = '0';
			scope.cents = '0';
			scope.value = '0';
			scope.init = false;
			
			scope.changeValue = function() {
				scope.value = scope.getValue();	
				
			}
			
			scope.getValue = function() {
				euro = scope.euro.replace(',','');
				return euro + '.' + scope.cents;
			}
			
			scope.$watch("value", function(){
				if(!scope.init && scope.value > 0){
					scope.init = true;
					var array = scope.value.split(".");
					scope.euro = array[0];
					scope.cents = array[1];
				}
			}, true)
			
			
		}, 
	}
})