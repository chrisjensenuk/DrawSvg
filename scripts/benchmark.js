define(function(){
	var Benchmark = {
	benchmark: function(b){
            
            if(this.benchmarks == null){
                this.benchmarks = {};
            }
            
            if(this.benchmarks[b] == null){
                this.benchmarks[b] = [];
            }
            
            if(typeof(b) == "string"){
                return {name: b, start: +new Date};
            }
            else{
                var time = +new Date - b.start;
                this.benchmarks[b.name].push(time);
            }
            
        },
        
        displayBenchmarks: function(){
            var msg = "";
            for(var benchmarkName in this.benchmarks){
                var benchmark = this.benchmarks[benchmarkName];
                if(benchmark instanceof Array == false) continue
                var total=0;
                var max = null;
                var min = null;
                var sample = 0;
                for(var i in benchmark){ 
                    sample++;
                    var val = benchmark[i];
                    total += val; 
                    if(max == null || max < val) { max = val};
                    if(min == null || min > val) { min = val};
                }
                if(sample > 0){msg += benchmarkName + ": Sample:" + sample + " AVG:" + Math.round(total/benchmark.length, 0) + " MIN:" + min + " MAX:" + max + "\r";}
            }
            console.log(msg);
        }
	};
	
	return Benchmark
});