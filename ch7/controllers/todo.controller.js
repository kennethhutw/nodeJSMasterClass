const mongoose = require('mongoose');


exports.getData = async (req, res) => {

    const todoModel = mongoose.model("Todos");
  
    const todosData = await todoModel.find({});
     
      res.status(200).send(todosData);
    };
  
    exports.getDataById =  async (req, res) => {
    const todoModel = mongoose.model("Todos");
      var id = req.params.id;
    
       try{
        const todosData = await todoModel.findOne({_id:id});
  
        res.status(200).send(todosData);
       }catch(e){
        res.status(400).json({
          status:"failed",
          message:e
        });
       }
     
      
    };
  
  
    exports.addTodo =  async (req, res) => {
  
  
     const todoModel = mongoose.model("Todos");
  
  
        //  if(!req.body.title ||req.body.title==""){
        //   throw "title must be provided";
        //  }
        try{
      
       
         const createdTodo = await  todoModel.create( {"userId":1,
           
                "title":req.body.title,
                "completed":req.body.completed,
              "description":req.body.description})
              
          console.log(createdTodo);
  
                res.status(200).json({
                  status:"success",
                  message:"todo creation successfully"
                });
  
          
        }catch(e){
          console.log(e);
          res.status(400).json({
            status:"failed",
            message:e
          });
        }
      
    };
  
  
    exports.updateTodo =  async (req, res) => {
      const todoModel = mongoose.model("Todos");
        var id = req.params.id;
        const { title, completed, description} = req.body;
      
         try{
           await todoModel.updateOne(
            {_id:id},
            {
              title:title,
              completed:completed,
              description:description
            },{
              runValidators:true
            });
    
          res.status(200).json({
            status:"success",
            message:"updated successfully"
          });
         }catch(e){
          res.status(400).json({
            status:"failed",
            message:e
          });
         }
       
        
      };
  
  
  
      exports.deleteTodo = async (req, res) =>{
    
      const todoModel = mongoose.model("Todos");
      var id = req.params.id;
  
  
      const found = await todoModel.findOne({_id:id});
  
      if(!found){
        res.status(400).json({
          status:"failed",
          message:"data does not exist "
        });
        return;
      }
  
      try{
  
       const deletedResult= await todoModel.deleteOne({_id:id})
  
       console.log(deletedResult);
       if(deletedResult.deletedCount>0){
        res.status(200).json({
          status:"success",
          message:"deleted successfully"
        });
  
        }else{
          res.status(400).json({
            status:"failed",
            message:"deleted failed"
          });
        }
      }catch(e){
        res.status(400).json({
          status:"failed",
          message:e
        });
      }
    };
  