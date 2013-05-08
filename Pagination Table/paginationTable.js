module.directive('paginationTable', function($filter){
	return {
		restrict: 'E',
		replace: false,
		scope: {
			items: '=',
			show: '=',
		},
		template: '<div class="input-append">'
			            +'<input type="text" ng-model="query" ng-change="search()" class="input-large search-query" placeholder="Search">'
			        +'<span class="add-on"><i class="icon-search"></i></span>'
			     +'</div>'
			     +'<table class="table table-striped table-condensed table-hover">'
	                +'<thead>'
	                   +'<tr>'
	                   		+'<th class="{{ s.value }}" ng-repeat="s in show">{{ s.key }}&nbsp;<a ng-click="sort_by(s.value)"><i class="icon-sort"></i></a></th>'
	                    +'</tr>'
	                +'</thead>'
	                +'<tfoot>'
	                    +'<td colspan="6">'
	                        +'<div class="pagination-small pagination pull-right">'
	                            +'<ul>'
	                                +'<li ng-class="{disabled: currentPage == 0}">'
	                                    +'<a href ng-click="prevPage()">« Prev</a>'
	                                +'</li>'
	                                +'<li ng-repeat="n in range(pagedItems.length)"'
	                                    +'ng-class="{active: n == currentPage}"'
	                                +'ng-click="setPage()">'
	                                    +'<a href ng-bind="n + 1">1</a>'
	                                +'</li>'
	                                +'<li ng-class="{disabled: currentPage == pagedItems.length - 1}">'
	                                    +'<a href ng-click="nextPage()">Next »</a>'
	                                +'</li>'
	                            +'</ul>'
	                        +'</div>'
	                    +'</td>'
	                +'</tfoot>'
	                +'<tbody>'
	                    +'<tr ng-repeat="item in pagedItems[currentPage] | orderBy:sortingOrder:reverse">'
	                    	+'<td ng-repeat="s in show">{{ item[s.value]}}</td>'
	                    +'</tr>'
	                +'</tbody>'
	            +'</table>',
		link: function(scope, element, attrs) {
			scope.id = 'id';
		    scope.sortingOrder = 'id';
		    scope.reverse = false;
		    scope.filteredItems = [];
		    scope.groupedItems = [];
		    scope.itemsPerPage = 5;
		    scope.pagedItems = [];
		    scope.currentPage = 0;
		    scope.show;
		    scope.items;
			
			var searchMatch = function (haystack, needle) {
		        if (!needle) {
		            return true;
		        }
		        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
		    };

		    // init the filtered items
		    scope.search = function () {
		        scope.filteredItems = $filter('filter')(scope.items, function (item) {
		            for(var attr in item) {
		                if (searchMatch(item[attr], scope.query))
		                    return true;
		            }
		            return false;
		        });
		        // take care of the sorting order
		        if (scope.sortingOrder !== '') {
		            scope.filteredItems = $filter('orderBy')(scope.filteredItems, scope.sortingOrder, scope.reverse);
		        }
		        scope.currentPage = 0;
		        // now group by pages
		        scope.groupToPages();
		    };
		    
		    // calculate page in place
		   scope.groupToPages = function () {
		        scope.pagedItems = [];
		        
		        for (var i = 0; i < scope.filteredItems.length; i++) {
		            if (i % scope.itemsPerPage === 0) {
		                scope.pagedItems[Math.floor(i / scope.itemsPerPage)] = [ scope.filteredItems[i] ];
		            } else {
		                scope.pagedItems[Math.floor(i / scope.itemsPerPage)].push(scope.filteredItems[i]);
		            }
		        }
		    };
		    
		    scope.range = function (start, end) {
		        var ret = [];
		        if (!end) {
		            end = start;
		            start = 0;
		        }
		        for (var i = start; i < end; i++) {
		            ret.push(i);
		        }
		        return ret;
		    };
		    
		    scope.prevPage = function () {
		        if (scope.currentPage > 0) {
		            scope.currentPage--;
		        }
		    };
		    
		    scope.nextPage = function () {
		        if (scope.currentPage < scope.pagedItems.length - 1) {
		            scope.currentPage++;
		        }
		    };
		    
		    scope.setPage = function () {
		        scope.currentPage = this.n;
		    };

		    // functions have been describe process the data for display
		    //scope.search();

		    // change sorting order
		    scope.sort_by = function(newSortingOrder) {
		        if (scope.sortingOrder == newSortingOrder)
		            scope.reverse = !scope.reverse;

		        scope.sortingOrder = newSortingOrder;

		        // icon setup
		        $('th i').each(function(){
		            // icon reset
		            $(this).removeClass().addClass('icon-sort');
		        });
		        if (scope.reverse)
		            $('th.'+newSortingOrder+' i').removeClass().addClass('icon-chevron-up');
		        else
		            $('th.'+newSortingOrder+' i').removeClass().addClass('icon-chevron-down');
		    };
		    
		    scope.$watch('items', function(){
		    	if(scope.items){
		    		scope.search();
		    	}
		    })
		}, 
	}
})