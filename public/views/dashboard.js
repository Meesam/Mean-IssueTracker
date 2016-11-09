issueTrackerApp.registerCtrl('dashboardcontroller',
 function dashboardcontroller($scope, $rootScope, $http, $location, appServices, $cookies,validationService) {
     $scope.Name="Meesam";
     (function() {
         var width = 960,
             height = 500

         var svg = d3.select("#canvas").append("svg")
             .attr("width", width)
             .attr("height", height);

         var force = d3.layout.force()
             .gravity(0.05)
             .distance(100)
             .charge(-100)
             .size([width, height]);

         d3.json("graph.json", function (error, json) {
             if (error) throw error;

             force
                 .nodes(json.nodes)
                 .links(json.links)
                 .start();

             var link = svg.selectAll(".link")
                 .data(json.links)
                 .enter().append("line")
                 .attr("class", "link");

             var node = svg.selectAll(".node")
                 .data(json.nodes)
                 .enter().append("g")
                 .attr("class", "node")
                 .call(force.drag);

             node.append("image")
                 .attr("xlink:href", "https://github.com/favicon.ico")
                 .attr("x", -8)
                 .attr("y", -8)
                 .attr("width", 16)
                 .attr("height", 16);

             node.append("text")
                 .attr("dx", 12)
                 .attr("dy", ".35em")
                 .text(function (d) {
                     return d.name
                 });

             force.on("tick", function () {
                 link.attr("x1", function (d) {
                     return d.source.x;
                 })
                     .attr("y1", function (d) {
                         return d.source.y;
                     })
                     .attr("x2", function (d) {
                         return d.target.x;
                     })
                     .attr("y2", function (d) {
                         return d.target.y;
                     });

                 node.attr("transform", function (d) {
                     return "translate(" + d.x + "," + d.y + ")";
                 });
             });
         });
     })();


    /* (function() {
         var canvas = this.__canvas = new fabric.Canvas('c', { selection: false });
         var context = canvas.getContext('2d');
         context.font='14px FontAwesome';
         function makeCircle(left ,top) {
             var c = new fabric.Circle({
                 left: left,
                 top: top,
                 strokeWidth: 1,
                 radius: 12,
                 fill: '#fff',
                 stroke: '#666',
                 fillText:'\uf000',
                 selectable:false
             });
             c.hasControls = c.hasBorders = false;
             return c;
         }
         canvas.add(
             makeCircle(10,20),
             makeCircle(10,240),
             makeCircle(170,80),
             makeCircle(170,190),
             makeCircle(330,140)
         );

         context.fillText("\uf000", 10, 20);

         var line, isDown;

         canvas.on('mouse:down', function(o){
             if (o.target) {
                 isDown = true;
                 var pointer = canvas.getPointer(o.e);
                 var points = [pointer.x, pointer.y, pointer.x, pointer.y];
                 line = new fabric.Line(points, {
                     strokeWidth: 5,
                     fill: 'red',
                     stroke: 'red',
                     originX: 'center',
                     originY: 'center'
                 });
                 canvas.add(line);
             }
         });

         canvas.on('mouse:move', function(o){
             if (!isDown) return;
             var pointer = canvas.getPointer(o.e);
             line.set({ x2: pointer.x, y2: pointer.y });
             canvas.renderAll();
         });

         canvas.on('mouse:up', function(o){
             if(o.target) {
                 isDown = false;
             }
             else{
                 canvas.remove(line);
             }
         });
     })(); */
 });