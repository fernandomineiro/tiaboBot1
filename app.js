var request = require('request');
var mysql = require('mysql2');
var json = require('json');

var con = mysql.createConnection({
    host: "mysql-3dd769ea-fernandofitilan-c71c.a.aivencloud.com",
    user: "avnadmin",
    password: "AVNS_bvupgtFQ7Bx1psZyo8k",
    database: "defaultdb",
    port: "27393"
  });


    //  con.connect(function(err) {
    //    if (err) throw err;
    //    console.log("Connected!");
    //    var sql = "CREATE TABLE cnpj (id INT AUTO_INCREMENT PRIMARY KEY, data LONGTEXT, uf VARCHAR(255))";
    //    con.query(sql, function (err, result) {
    //      if (err) throw err;
    //      console.log("Table created");
    //    });
    //  });


//382

var options = {
  'method': 'GET',
  'url': 'https://portaldatransparencia.gov.br/pessoa-juridica/busca/resultado?letraInicial=A&pagina=2&tamanhoPagina=1000&ufPessoaJuridica=SP',
  'headers': {
  }
};



 


request(options, function (error, response) {
  if (error) throw new Error(error);
    let answer = JSON.parse(response.body)
    Object.values(answer.registros).forEach((element, i) => {
    
        setTimeout(() => {
            let a = element.cnpjFormatado.replace(".", "");
        a = a.replace(".", "");
        a = a.replace("/", "");
        a= a.replace("-", "");
 
        // https://publica.cnpj.ws/cnpj

         var options = {
           'method': 'GET',
           'url': `https://publica.cnpj.ws/cnpj/${a}`,
           'headers': {
           }
         };
         request(options, function (error, response) {
         
   
          let answer = JSON.parse(response?.body)

          serializedObject = response.body

          console.log(answer?.estabelecimento?.atividade_principal?.id)

          if(answer?.estabelecimento?.atividade_principal?.id =='4530703'){
              const query = 'INSERT INTO cnpj (data) VALUES (?)';
              con.query(query, [serializedObject], (err, results) => {
                if (err) {
                  console.error('Error inserting object:', err);
                  return;
                }
                console.log('Object saved successfully');
              });
          }else{
            if(answer?.estabelecimento?.atividades_secundarias){
              Object.values(answer?.estabelecimento?.atividades_secundarias).forEach((values)=>{
                console.log(values.id)
                if(values.id =='4530703'){
                  const query = 'INSERT INTO cnpj (data) VALUES (?)';
                  con.query(query, [serializedObject], (err, results) => {
                    if (err) {
                      console.error('Error inserting object:', err);
                      return;
                    }
                    console.log('Object saved successfully');
                  });
                }
              })
            }
          }

            //  const query = 'INSERT INTO cnpjs (data) VALUES (?)';
            //  con.query(query, [serializedObject], (err, results) => {
            //    if (err) {
            //      console.error('Error inserting object:', err);
            //      return;
            //    }
            //    console.log('Object saved successfully');
            //  });

         
               
        
   

              


        
         });
        

        
        // var options = {
        //     'method': 'GET',
        //     'url': `https://publica.cnpj.ws/cnpj/${a}`,
        //     'headers': {
        //       'Cookie': '__cf_bm=G3Xwr36JGTBXdaN4dppcFjilM8Y_sDonEFxi8Iaisno-1707770986-1-ATxcXN8jvOZNoFhM1bYC/IgJtP86rk4Ot2GpFEYHqyRmAtFhkIIvc46W+F6sptsGpiI0h50lXRxt1sK8r/dxihY='
        //     }
        //   };

        //   request(options, function (error, response) {
        //     if (error) throw new Error(error);

        //     let verify = JSON.parse(response.body)
        //     console.log(verify)
        //      if(verify.STATUS == 'ATIVA'){

        //         con.query(`SELECT * FROM cnpj WHERE cnpj = ${verify.CNPJ}`, function (err, result, fields) {
        //             if (err) throw err;
        //             console.log(result);
        //           });
                

                  // con.connect(function(err) {
                  //     if (err) throw err;
                  //     console.log("Connected!");
                  //     var sql = `INSERT INTO cnpj (cnpj, razao, fantasia, endereco, telefone, email, uf, ddd) VALUES (${verify.CNPJ}, ${verify['RAZAO SOCIAL']},${verify.BAIRRO}-${verify.MUNICIPIO}, ${verify.TELEFONE}, ${verify.EMAIL}, ${verify.UF},${verify.DDD} )`;
                  //     con.query(sql, function (err, result) {
                  //       if (err) throw err;
                  //       console.log("1 record inserted");
                  //     });
                  //   });
                
  
          //    }
     
          console.log(i) 
           
          }, i * 22000);

        
        
    });
    
});
