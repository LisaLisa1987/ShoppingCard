//Im Controller werden Daten via itemStorage geladen und bearbeitet; Event handlers werden definiert 
shopper.controller( 'ShoppingCartCtrl' ,function ShoppingCartCtrl($scope, itemStorage, filterFilter, $filter)  {
    var items = $scope.items = itemStorage.get();

    $scope.$watch('items', function() {
        $scope.remaining = filterFilter(items, {completed: false}).length;
        $scope.finished = items.length - $scope.remaining;
        $scope.allChecked = !$scope.remaining;
        $scope.alltogether = $scope.items.length;
        itemStorage.put(items);
    }, true);

    $scope.addItem = function(item) {
        $scope.item.completed = false;
        $scope.items.push(item);
        $scope.item = {};
    }

    $scope.totalPrice = function(){
        var total = 0;
        for(count=0; count<$scope.items.length; count++){
            total += $scope.items[count].price*$scope.items[count].quantity;
        }
        return total;
    }

    $scope.totalPriceMarked = function(){
        var total = 0;
        for(count=0; count<$scope.items.length; count++){
            if($scope.items[count].completed == true)
            total += $scope.items[count].price*$scope.items[count].quantity;
        }
        return total;
    }

    $scope.removeItem = function(item){
        $scope.items.splice($scope.items.indexOf(item),1);
    }

    $scope.removeAllItems = function(){
        $scope.items.splice(0, $scope.items.length);
    }

    $scope.clearDoneItems = function() {
        $scope.items = items = items.filter(function(val) {
            return !val.completed;
        });
    };

    $scope.countRemainings = function() {
        var remaining = 0;
        for(count=0; count<$scope.items.length; count++){
            if($scope.items[count].completed == false){
                remaining++;
            }
        }
        return remaining;
    }

    $scope.markAllAsDone = function(completed) {
    items.forEach(function(item) {
        item.completed = completed;
        });
    };
});