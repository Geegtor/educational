window.addEventListener("load", Main_Spring, true);
function Main_Spring() {

    // *** Некие исходные данные ***
	
    var canvas = spring_canvas;
    canvas.onselectstart = function () {return false;};     // запрет выделения canvas
    var ctx = canvas.getContext("2d");                      // на ctx происходит рисование
    var w = canvas.width;                                   // ширина окна в расчетных координатах
    var h = canvas.height;                                  // высота окна в расчетных координатах

    var Pi = 3.1415926;    	      	    // число "пи"
	var g = 9.8;						// гравитационная постоянная 
	
	var T0 = 0.01;    		      	        // масштаб времени (период колебаний исходной системы)
	var k0 = 2 * Pi / T0;           	// масштаб частоты
	

	
    var m0 = 1;    		      	        // масштаб массы маятника
	var l0 = 2;							// масштаб длины маятника
	var fiZero0 = 1;						// масштаб начального угла отклонения
	var d0 = 1;							// масштаб местоположения пружины на маятнике
	var C0 = 1;          	// масштаб жесткости пружины
	
	var count = true;       // проводить ли расчет системы
    var v = 0;				// скорость тела
    var t = 0;
	var f_1 = 0.1; // угл отклонения первого маятника от положения равновесия
	var f_2 = 0.1; // угл отклонения второго маятника от положения равновесия
	var q = 10;     // маштабирующий коэффициент отклонения маятника
	
	// параметры полученные из размеров холста
    var rw = canvas.width / 100;    	var rh = canvas.height / 4;
    //var x0 = (15 * rw - rw / 2);     		var y0 = (rh / 1.33 - rh / 2) * 10;
	var x0 = canvas.width/5;
	var y0 = canvas.height/8;
    var rad0 = 15;
	
    // параметры пружины
    var coil = 10;        // количество витков
    var startX = 500;       // закрепление пружины
	
	
    // *** Задание вычислительных параметров ***

    var fps = 60;		      	        // frames per second - число кадров в секунду (качечтво отображения)
    var spf = 10;		      	        // steps per frame   - число шагов интегрирования между кадрами 
    var dt  = 50 * T0 / fps;    	    // шаг интегрирования (качество расчета)
    var steps = 0;                      // количество шагов интегрирования


    // *** Задание физических параметров ***

    var m = 1 * m0;                 	// масса маятника
    var C = 0.3 * C0;                 	// жесткость пружины
	var l = 8 * l0;						// длина маятников
	var fiZero = 0.3 * fiZero0; 			// начальное отклонение первого маятника
	var d = l/2 * d0;						// местоположение пружины на маятнике
	var hole = canvas.width/2 + 50;						// расстояние между закреплениями маятников по Х
	var bound_x = x0;					// координаты закрепления первого маятника по Х
	var bound_y = 10;					// координаты закрепления первого маятника по У
	
    slider_m.value = (m / m0).toFixed(1); number_m.value = (m / m0).toFixed(1);
    slider_C.value = (C / C0).toFixed(1); number_C.value = (C / C0).toFixed(1);
    slider_l.value = (l / l0).toFixed(1); number_l.value = (l / l0).toFixed(1);
	slider_fiZero.value = (fiZero / fiZero0).toFixed(1); number_fiZero.value = (fiZero / fiZero0).toFixed(1);
	slider_spf.value = (spf).toFixed(1); number_spf.value = (spf).toFixed(1);

	// *** Установка слайдеров для переменных величин ***
	
    function setM(new_m) {m = new_m * m0;}
    function setC(new_C) {C = new_C * C0;}
    function setL(new_l) {l = new_l * l0;}
	function setFiZero(new_fiZero) {fiZero = new_fiZero * fiZero0;}
	function setSpf(new_spf) {spf = new_spf;}

    slider_m.oninput = function() {number_m.value = slider_m.value;       setM(slider_m.value);};
    number_m.oninput = function() {slider_m.value = number_m.value;       setM(number_m.value);};
	
    slider_C.oninput = function() {number_C.value = slider_C.value;       setC(slider_C.value);};
    number_C.oninput = function() {slider_C.value = number_C.value;       setC(number_C.value);};
	
    slider_l.oninput = function() {number_l.value = slider_l.value;       setL(slider_l.value);};
    number_l.oninput = function() {slider_l.value = number_l.value;       setL(number_l.value);};
	
	slider_fiZero.oninput = function() {number_fiZero.value = slider_fiZero.value;       setFiZero(slider_fiZero.value);};
    number_fiZero.oninput = function() {slider_fiZero.value = number_fiZero.value;       setFiZero(number_fiZero.value);};
	
	slider_spf.oninput = function() {number_spf.value = slider_spf.value;       setSpf(slider_spf.value);};
    number_spf.oninput = function() {slider_spf.value = number_spf.value;       setSpf(number_spf.value);};

	
	// Параметры первого круга-грузика
	var circ1 = {
		x: x0,
		y: y0,
		rad: rad0,
		fill: "rgba(0, 0, 255, 1)"
	};
	
	// Параметры второго круга-грузика
	var circ2 = {
		x: x0+hole,
		y: y0,
		rad: rad0,
		fill: "rgba(0, 255, 0, 1)"
	};

	// *** Функция обеспечивающая "жизнь" маятников с пружиной ***
	
    function control() {
        calculate();		
        draw();
        requestAnimationFrame(control);
		
    }
    control();
	
	    // график
    var vGraph1 = new TM_graph(                  // определить график
        "#vGraph1",                              // на html-элементе #vGraph
        250,                                    // сколько шагов по оси "x" отображается
        -1, 1, 0.1);                            // мин. значение оси Y, макс. значение оси Y, шаг по оси Y
	
	var vGraph2 = new TM_graph(                  // определить график
        "#vGraph2",                              // на html-элементе #vGraph
        250,                                    // сколько шагов по оси "x" отображается
        -1, 1, 0.1);                            // мин. значение оси Y, макс. значение оси Y, шаг по оси Y
	


	// *** Функция расчетов координат ***
	
    function calculate() {                                 
	
        //if (!count) return;

        for (var s=1; s<=spf; s++) {

			var k1 = Math.sqrt(g/l); // коэффициент первой пружины
			var k2 = Math.sqrt(g/l + (2 * C * Math.pow(d,2))/m/(Math.pow(l,2))); // коэффициент второй пружины
									
			t += dt;
			
		    f_1 = fiZero * Math.cos((k1 + k2)/2 * t) * Math.cos((k1 - k2)/2 * t); // закон изменения угла отклонения первого маятника от положения равновесия
			f_2 = fiZero * Math.sin((k1 + k2)/2 * t) * Math.sin((k2 - k1)/2 * t); // закон изменения угла отклонения второго маятника от положения равновесия

			
			// изменение координат первого грузика
			circ1.x = (x0 + l * Math.sin(f_1) * q);
			circ1.y = 100 + (y0 + l * Math.cos(f_1) * q);
			
			// изменение координат второго грузика
			circ2.x = (x0 + hole + l * Math.sin(f_2) * q);
			circ2.y = 100 + (y0 + l * Math.cos(f_2) * q);

	
            steps++;
            if (steps % 80 == 0) {
			vGraph1.graphIter(steps, (f_1))
			vGraph2.graphIter(steps, (f_2))};   // подать данные на график
        }

    }
	
	// *** Функция рисования объектов ***
	
    function draw() {

        ctx.clearRect(0, 0, w, h);

		
		//!!!		пружина
	/* 	draw_spring(
			100, 					// х-координата начала пружины
			400, 					// х-координата конца пружины
			300, 					// у-координата пружины
			6, 						// количество витков пружины
			100						// высота изгиба пружины (чем меньше, тем больше пружина похожа на линию)
		); */

		// Пружина соединяющая два маятника
		draw_spring((circ1.x - x0)/2 + x0, (circ2.x - x0 - hole)/2 + x0 + hole , (circ1.y + y0/2)/2 , 10, 30);
		

		// Стержень первого маятника
		ctx.lineWidth = 6;
        ctx.strokeStyle = "#e1974d";
		ctx.beginPath();
		ctx.moveTo(circ1.x, circ1.y);
		ctx.lineTo(x0, y0 - bound_y);
		ctx.stroke();
		
		// Стержень второго маятника
		ctx.lineWidth = 6;
        ctx.strokeStyle = "#e1974d";
		ctx.beginPath();
		ctx.moveTo(circ2.x, circ2.y);
		ctx.lineTo(x0 + hole,y0 - bound_y);
		ctx.stroke();
		
		// Круглый грузик первого маятника
		ctx.beginPath();
		ctx.arc(circ1.x, circ1.y, rad0, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'red';
		ctx.fill();
		ctx.lineWidth = 7;
		ctx.strokeStyle = '#003300';
		ctx.stroke();
		
		// Круглый грузик второго маятника
		ctx.beginPath();
		ctx.arc(circ2.x, circ2.y, rad0, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'blue';
		ctx.fill();
		ctx.lineWidth = 7;
		ctx.strokeStyle = '#003300';
		ctx.stroke();
		
		// Рисование закрепления первого маятника
		ctx.lineWidth = 6;
        ctx.strokeStyle = "#7394cb";
		ctx.beginPath();
		ctx.moveTo(x0-20, y0 - bound_y);
		ctx.lineTo(x0+20, y0 - bound_y);
		ctx.stroke();
		
		// Рисование закрепления второго маятника
		ctx.lineWidth = 6;
        ctx.strokeStyle = "#7394cb";
		ctx.beginPath();
		ctx.moveTo(x0-20 + hole, y0 - bound_y);
		ctx.lineTo(x0+20 + hole, y0 - bound_y);
		ctx.stroke();
    }
	
	// *** Функция рисования пружины ***
	
	function draw_spring(x_start, x_end, y, n, h) {
	    ctx.lineWidth = 2;
        ctx.strokeStyle = "#7394cb";
		var L = x_end - x_start;
		for (var i = 0; i < n; i++) {
			var x_st = x_start + L / n * i;
			var x_end = x_start + L / n * (i + 1);
			var l = x_end - x_st;
			ctx.beginPath();
			ctx.bezierCurveTo(x_st, y, x_st + l / 4, y + h, x_st + l / 2, y);
			ctx.bezierCurveTo(x_st + l / 2, y, x_st + 3 * l / 4, y - h, x_st + l, y);
			ctx.stroke();
		}
	}
}