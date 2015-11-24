var fs = require('fs');
var exec = require('child_process').exec;
var N3 = require('n3');
var async = require('async');

var cmdPrefix = 'eye ontologie/object-knowledge.n3 ontologie/MyObject.n3 ontologie/rule.n3 --query ';
var cmdPostfix = ' --nope'; 
var pathFile = './query/query';
var format = '.n3';
	

//ricevo la query tramite POST. La scrivo sul file
//col metodo writeFile al quale passo la query, e che al termine chiamerà
//la callback.
//Tale callback lancia il comando eye, al termine chiama la funzione di formattazione
//la quale quando termina restituisce il risultato al mittente.
exports.reason = function(query, res){
	writeFile(query, function(file){
		
		var cmd = cmdPrefix + file + cmdPostfix;
		
		exec(cmd, function(error, stdout, stderr) {
			if(error){
				console.log(error);
				return;
			}else console.log(stdout);
			formattingEyeResponse(stdout, function(responseClean){
				res.send(responseClean);
			});
		});
	});
}

//Scrivo file sul disco col formato:  query/query2015-10-28T08-51-05.n3
var writeFile = function(query, callback){
	
	var time = new Date().toISOString().replace(/\..+/, '').replace(/:/, '-').replace(/:/, '-'); 
	var file = pathFile + time + format;    
	var index = 0;

	try{
		while(fs.lstatSync(file)){
			time = time + "-" + index ;
			file = pathFile + time + format;  
		}
	}catch(e){
		fs.writeFile(file, query, function (err) {
			if (err) return console.log(err);
			console.log('File ' + file + ' scritto con successo');
			callback(file);
		});
	}
};



//Funzione richiamata come parametro lo stdout ottenuto dal comando eye.
//questo viene formattato tramite il modulo N3.
//Questo restituisce un oggetto a forma di tripla.
//Ogni tripla viene salvato sul vettore, il quale alla fine viene
//convertito in stringa e restituito al task coordinator.
var formattingEyeResponse = function(stdout, callback){
	
	var triples = [];
	
	var parser = N3.Parser();
	
	parser.parse(stdout, function(error, triple, prefixes){
		if (triple) triples.push(triple);
		else callback(JSON.stringify(triples));
	});
}


