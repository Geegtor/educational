function MainBalls() {

    // Предварительные установки

    var context = canvasBalls.getContext("2d");  // на context происходит рисование

    var Pi = 3.1415926;                   // число "пи"
	var fi = Pi / 180

    var m0 = 1;                           // масштаб массы
    var T0 = 1;                           // масштаб времени (период колебаний исходной системы)
    var a0 = 1;                           // масштаб расстояния (диаметр шара)

    var g0 = a0 / T0 / T0;                // масштаб ускорения (ускорение, при котором за T0 будет пройдено расстояние a0)
    var k0 = 2 * Pi / T0;                 // масштаб частоты

    // *** Задание физических параметров ***

    var Ny = 5;                           // число шаров, помещающихся по вертикали в окно (задает размер шара относительно размера окна)
    var m = 1 * m0;                       // масса
    var mg = 0.25 * m * g0;               // сила тяжести
    var r = 0.5 * a0;                     // радиус частицы в расчетных координатах
    // *** Задание вычислительных параметров ***

    var fps = 50;                         // frames per second - число кадров в секунду (качечтво отображения)
    var spf = 100;                        // steps per frame   - число шагов интегрирования между кадрами (скорость расчета)
    var dt  = 0.045 * T0 / fps;           // шаг интегрирования (качество расчета)

    // Выполнение программы

    var scale = canvasBalls.height / Ny / a0;  // масштабный коэффициент для перехода от расчетных к экранным координатам

    var w = canvasBalls.width / scale;           // ширина окна в расчетных координатах
    var h = canvasBalls.height / scale;          // высота окна в расчетных координатах

    // Добавление шара

    var b = [];


    b.x = w / 2;            b.y = h * 0.7;    // расчетные координаты шара
    b.vx = -1.5;               b.vy = -1.5;    // начальная скорость

    // Основной цикл программы

    function control() {
        physics();
        draw();
    }

    // Расчетная часть программы

    function physics() {                    // то, что происходит каждый шаг времени
        for (var s = 1; s <= spf; s++) {
            

            b.vx += b.fx / m * dt;        b.vy += b.fy / m * dt;
            b.x += b.vx * dt;             b.y += b.vy * dt;
        }
    }


    // Рисование

    context.fillStyle = "#3070d0";                          // цвет
    function draw() {
        context.clearRect(0, 0, w * scale, h * scale);      // очистить экран
        context.beginPath();

        context.arc(b.x * scale, b.y * scale, r * scale, 0, 2 * Math.PI, false);
        context.fill();

        context.closePath();
    }

    setInterval(control, 1000 / fps);                       // Запуск системы
}