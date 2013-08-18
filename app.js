var express = require('express'),
    mongoose = require('mongoose');

// Подключаемся к БД
mongoose.connect("mongodb://localhost/insider");

// Загружаем модели
require('./modules/pages/models');

// Создаем приложение изпользуя express
var app = express();

// Настраиваем express
require('./express')(app);

// Настраиваем маршрутизатор запросов
require('./urls')(app);

// Приложение будет слушать порт
app.listen(3000);
console.log('Сheck 127.0.0.1:3000 out');