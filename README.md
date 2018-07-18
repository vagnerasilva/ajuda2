# ajuda2

  for (i in data[place][year]['students']) {
    // se vc usar esse tipo de sintaxe ele vai ser undefined sempre
    // console.log(data[place][year]['students'][i][sprints] )
    // se vc usar esse tipo de sintaxe ele vai ser undefined sempre
    
    // Usando assim vc verifica o valor da rotulo sprints do objeto
    // console.log(data[place][year]['students'][i].sprints )
        // Usando assim vc verifica o valor da rotulo sprints do objeto
       
          if (data[place][year]['students'][i].sprints.length>0){
            console.log(" tenho sprints")
            console.log("################ ###########")
            console.log("################ ###########")
            console.log("################ ###########")
            console.log(data[place][year]['students'][i].name)
            console.log(data[place][year]['students'][i].sprints )
            console.log("################ ###########")
            console.log("################ ###########")
            console.log("################ ###########")
            for (j in data[place][year]['students'][i]['sprints']) {
              if (data[place][year]['students'][i]['sprints'][j]['score']['tech'] >= 1260 && data[place][year]['students'][i]['sprints'][j]['score']['hse'] >= 840) {
                targetSprint[j] += 1;
              }
              if (data[place][year]['students'][i]['sprints'][j]['score']['tech'] >= 1260) {
                targetTech[j] += 1;
              }
              if (data[place][year]['students'][i]['sprints'][j]['score']['hse'] >= 840) {
                targetHSE[j] += 1;
              }
            }
          }else{
            console.log("")
            console.log("################ VAZIO ###########")
            console.log(" Estou vazio")
            console.log(data[place][year]['students'][i].name)
            console.log("################ VAZIO ###########")
            console.log("")
          } 
