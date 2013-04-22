//Im Controller werden Daten via itemStorage geladen und bearbeitet; Event handlers werden definiert 


shopper.controller( 'ShoppingCartCtrl' ,function ShoppingCartCtrl($scope, itemStorage, filterFilter, $filter)  {
    var items = $scope.items = itemStorage.get();

    $scope.$watch('items', function() {
        $scope.Remaining = filterFilter(items, {Completed: false}).length;
        $scope.Finished = items.length - $scope.Remaining;
        $scope.allChecked = !$scope.Remaining;
        $scope.Alltogether = $scope.items.length;
        itemStorage.put(items);
    }, true);

    $scope.addItem = function(item) {
        $scope.item.Completed = false;
        $scope.items.push(item);
        $scope.item = {};
    }

    $scope.totalPrice = function(){
        var total = 0;
        for(count=0; count<$scope.items.length; count++){
            total += $scope.items[count].Price*$scope.items[count].Quantity;
        }
        return total;
    }

    $scope.totalPriceMarked = function(){
        var total = 0;
        for(count=0; count<$scope.items.length; count++){
            if($scope.items[count].Completed == true)
            total += $scope.items[count].Price*$scope.items[count].Quantity;
        }
        return total;
    }

    $scope.totalPriceItem = function(){
        var total = $scope.items[1].Price * $scope.items[1].Quantity;
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
            return !val.Completed;
        });
    };

    $scope.countRemainings = function() {
        var remaining = 0;
        for(count=0; count<$scope.items.length; count++){
            if($scope.items[count].Completed == false){
                remaining++;
            }
        }
        return remaining;
    }

    $scope.markAllAsDone = function(done) {
    items.forEach(function(item) {
        item.Completed = done;
        });
    };
});