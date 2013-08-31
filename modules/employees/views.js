var mongoose = require('mongoose'),
    Employee = mongoose.model('Employee'),
    _ = require('underscore');

/**
 * List of employees
 */
exports.all = function(req, res) {
    Employee.find({}, function(err, employees) {
        if (err) {
            res.json(200, {
                err: "Не получилось достать всех сотрудников из БД!"
            });
        } else {
            res.json(200, {
                "employees": employees
            });
        }
    });
};

/**
 * Delete an employee
 */
exports.delete = function(req, res) {
    var employee = req.employee;

    employee.remove(function(err) {
        if (err) {
            res.json(200, {
                err: "Не получилось удалить сотрудника из БД!"
            });
        } else {
            res.json(200, {
                "employee": employee
            });
        }
    });
};

/**
 * Create a employee
 */
exports.create = function(req, res) {
    var employee = new Employee(req.body);

    employee.save(function(err) {
        res.json(200, {
            "employee": employee
        });
    });
};

/**
 * Update a employee
 */
exports.update = function(req, res) {
    var employee = req.employee;

    employee = _.extend(employee, req.body);

    employee.save(function(err) {
        res.json(200, {
            "employee": employee
        });
    });
};

/**
 * Show an employee
 */
exports.read = function(req, res) {
    res.json(200, {
        "employee": req.employee
    });
};

/**
 * Find employee by id
 */
exports.load = function(req, res, next, id) {
    Employee.findOne({
        "_id": id
    }, function(err, employee) {
        if (err) return next(err);
        if (!employee) return next(new Error('Failed to load employee ' + id));
        req.employee = employee;
        next();
    });
};