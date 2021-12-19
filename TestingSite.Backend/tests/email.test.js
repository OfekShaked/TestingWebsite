const emailController = require('../BLL/controllers/email_controller');


it("should send email without throwing error",async()=>{
    expect(()=>{
        emailController.send_email("abc@gmail.com","aaa@gmail.com","Test","Good test")
    }).not.toThrow();
})
