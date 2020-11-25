function main()
{
	var step = 0;
	var stats = initStats();

	//определяем сцену

	var material = new THREE.LineBasicMaterial({color: 0x000000});
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 10000);
	var render = new THREE.WebGLRenderer();
	render.setClearColor(0xEEEEEE);
	render.setSize(window.innerWidth ,window.innerHeight-80);
	
	//ставим оси
	var axes = new THREE.AxisHelper(1);
	scene.add(axes);
	var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
	var planeMaterial = new THREE.MeshLambertMaterial({color:0xcccccc});
	var plane = new THREE.Mesh(planeGeometry,planeMaterial);
	plane.rotation.x = -0.5*Math.PI;
	plane.position.x = 15;
	plane.position.y = 0;
	plane.position.z = 0;
	
	//создаем ШАРИК
	var cubeGeometry = new THREE.SphereGeometry(1,20,20);
	var cubeMaterial = new THREE.MeshLambertMaterial({color:0xff0000, wireframe:false});
	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.position.x = 0;
	cube.position.y = -20;
	cube.position.z = 0;
	scene.add(cube);
	
	// создаем нитку
	var cubeGeometry = new THREE.CubeGeometry(0.1,20,0.1);
	var cubeMaterial = new THREE.MeshLambertMaterial({color:0x000000, wireframe:false});
	var cube3 = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube3.position.x = 5;
	cube3.position.y = -10;
	cube3.position.z = 0;
	cube3.rotation.x = 0;
	cube3.rotation.y = 0;
	cube3.rotation.z = 0;
	scene.add(cube3);
	

	//создаем цилиндр
	
	var cylinderGeometry = new THREE.CylinderGeometry(5,5,2,32);
	var cylinderMaterial = new THREE.MeshLambertMaterial({color:0x5555f1, wireframe:false});
	var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
	cylinder.position.x = 0;
	cylinder.position.y = 0;
	cylinder.position.z = 0;
	cylinder.rotation.x = 0.5*Math.PI;
	scene.add(cylinder);
	
	// устанавливаем источник света
	
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(-40,60,40);
	scene.add(spotLight);
	
	
	
	
	//задаем тени
	render.shadowMapEnabled = true;
	plane.receiveShadow = true;
	cube.castShadow = true;
	spotLight.castShadow = true;
	
	//задаем положение камеры
	camera.position.x =0;
	camera.position.y = 0;
	camera.position.z = 60;
	camera.lookAt(scene.position);
	$("#webGL").append(render.domElement);
	
	//добавляем ползунки для настройки скорости вращения и радиуса цилиндра
		var controls = new function()
		{
			this.rotationSpeed = -0.02;
			this.bouncingSpeed = 0.03;
			this.radius = 1;	
		}
	
	var gui = new dat.GUI();
	gui.add(controls,'rotationSpeed',0,0.25);
	gui.add(controls,'radius',0,2);
	
	
	
	
	ccontrols = new THREE.OrbitControls(camera);
// rope 
	
var lineGeometry1 = new THREE.Geometry();
var lineMaterial1 = new THREE.LineBasicMaterial({color:0x000000, linewidth:5000}); 
var line1 = new THREE.Line(lineGeometry1, lineMaterial1);
	


	
	
	renderer();	
	
	
	
	
	// функция, в уоторой задаются законы, по которым происходит качение
function renderer()
{
	stats.update();
	// Связываем бегунок и частоту колебаний
	cylinder.rotation.y -=controls.rotationSpeed;
	
	// Вводим расчётные данные 
	step += controls.rotationSpeed;
	fi = Math.PI * Math.sin(step) / 3;
	co  = Math.cos(fi);
	si = Math.sin(fi);
	a = 5 * controls.radius;
	
	// Задаём траекторию движения щарика
	cube.position.y =  ( a * (si) - (20 + a * fi ) * (co) );
	cube.position.x =  ( a * (co) + (20 + a * fi ) * (si) ) ;
	
	// Задаём движение нити	
	cube3.position.y = ( a * (si) - (20 + a * fi ) / 2 * (co) );
	cube3.rotation.z = fi;
	cube3.position.x = ( a * (co) + (20 + a * fi ) / 2 * (si) );
	cube3.scale.set(1, (1 + a * fi / 20),1);
	
	// Связь данных настраеваемых ползунками с общей программой
	cylinder.scale.set(controls.radius,1,controls.radius);	
	
	// Рисуем след после шарика
	var lineGeometry = new THREE.Geometry();
	lineGeometry.vertices.push(new THREE.Vector3(cube.position.x, cube.position.y, 0));
	lineGeometry.vertices.push(new THREE.Vector3(cube.position.x + 0.1, cube.position.y + 0.1, 0));
	var lineMaterial = new THREE.LineBasicMaterial({color:0x000000, linewidth:5000}); 
	var line = new THREE.Line(lineGeometry, lineMaterial);
	scene.add(line);
	
	
	requestAnimationFrame(renderer);
	ccontrols.update();
	document.getElementById("td1").innerHTML = cube3.rotation.z ;	//даные, который будут выведены в таблицу
	document.getElementById("td2").innerHTML = cube.position.y ;
	render.render(scene, camera);
	
}
}

function initStats()
{
	var stats = new Stats();
	stats.setMode(0);
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	$("#stats").append(stats.domElement);
	return stats;
}


