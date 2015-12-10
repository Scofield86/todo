$(function () {
    function ToDoElement(text, bool, id) {
        var self = this;
        self.toDoText = ko.observable(text);
        self.id = id;
        if (typeof bool === "string") {
            bool = bool === "true";
        }
        self.done = ko.observable(bool);
        self.shouldShowToDo = ko.computed(function () {
            if (vm != null && vm.showdone()) {
                return true;
            }
            return !self.done();
        }, self);

        //ko.computed(function () {
        //    if (self.done()) { }
        //}, self);
    }

    var ViewModel = function () {
        var self = this;
        self.ToDotextInput = ko.observable();
        self.ToDoItems = ko.observableArray();
        self.showdone = ko.observable();

        self.Add = function () {
            if (self.ToDotextInput()) {
                var newToDo = new ToDoElement(self.ToDotextInput(), false);
                self.ToDoItems.push(newToDo);
                self.ToDotextInput("");
            }
        };

        self.Clear = function () {
            self.ToDoItems.removeAll();
        }
    };

    function AddToDo(data)
    {
        var newToDo = new ToDoElement(data.toDoText, data.done, data.id);
        vm.ToDoItems.push(newToDo);
    }

    function requestJsonToDo() {
        $.ajax({
            url: "http://localhost:8000/data.csv"
        }).done(function (datas) {
            console.log(datas);
            datas.forEach(function (data) {
                AddToDo(data);
            });
        });
    }

    var vm = new ViewModel();
    ko.applyBindings(vm);
    requestJsonToDo();

});
