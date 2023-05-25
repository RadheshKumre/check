/// <reference types="Cypress" />

//Golbal Variables
const env     = ""//prompt('Select evnviroment dev./qa./uat.:');
let email     = 'radhesh.kumre@atriina.com';
let mobNumber = '2000000000';
let fname     = 'Radhesh';
let lname     = 'Kumre';
let otp       = '9999'; 
let samQues   = [];
let gentemp   = [];
let getansw   = [];
let ansid     = [];
let scrid     = [];
let emp       = [];
let que       = 10;
let que2      = 20;
let que3      = 25;
let auth      = '';
let temp      = '';
let at        = ''; 
let fillque   = ''; 


//APIs for MoneySign
const questionAns    =`https://${env}ms.onefin.app/api/user/money-sign-quiz`;
const userValidation =`https://${env}ms.onefin.app/api/user/money-sign`;
const genMoneySign   =`https://${env}ms.onefin.app/api/user/money-sign/generate`;
const saveUserQA     =`https://${env}ms.onefin.app/api/user/money-sign/add-response`;
const startass       =`https://${env}ms.onefin.app/api/user/assessment-log`;
const msfeed         =`https://${env}ms.onefin.app/api/user/money-sign/feedback`;

//APIs for CustomerBE
const cupcode        =`https://${env}customer.onefin.app/api/customer/moneysign-coupon-code`
const custgms        =`https://${env}customer.onefin.app/api/customer/money-sign-generated`;
const custaad        =`https://${env}customer.onefin.app/api/customer/assessment-activity-done`;
const reqotp         =`https://${env}customer.onefin.app/api/onboarding/request-for-otp`;
const valotp         =`https://${env}customer.onefin.app/api/onboarding/validate-otp`;
const oncus          =`https://${env}customer.onefin.app/api/onboarding/onboard-customer`;
const custemail      =`https://${env}customer.onefin.app/api/customer/update-customer-email`;
const cuspro         =`https://${env}customer.onefin.app/api/customer/customer-profile`;
const custlog        =`https://${env}customer.onefin.app/api/customer/logout`;
const custauto       =`https://${env}customer.onefin.app/api/customer/auto-login`;
const custdele       =`https://${env}customer.onefin.app/api/customer/delete-customer-data`;
// const foryou         ='http://3.110.139.228/api/v1/post/getPostById';//magine prod

//APIs for Website-magazine
const fycat          ='https://websiteapi.onefin.app/api/v2/post/getForYouByMagazineCategory?category=all';
const fyrec          ='https://websiteapi.onefin.app/api/v2/post/getRecommendedStoriesForUser?category=fwp_orientation_call';
const fybid          =`https://websiteapi.onefin.app/api/v1/post/getPostById?id=789`

//APIs for Communications
const netwa          = `https://${env}netcore.onefin.app/api/netcore/message/whats-app`;
const neteml         = `https://${env}netcore.onefin.app/api/netcore/email`;
const netsms         = `https://${env}netcore.onefin.app/api/netcore/message/sms`;
const msg91          = `https://${env}netcore.onefin.app/api/msg/message/sms`


describe('Checklist for backend',()=>{

    //New User 1 new customer
    describe('1 new customer',()=>{

        //check if the user Exsist if yes then delete the customer
        it('Customer-POST Request for otp',()=>{
            cy.request({
                method: 'POST',
                url: reqotp,
                body: {
                    mobile_number: `${mobNumber}`
                }
            }).then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body).to.have.property('message')
            })
        });
    
        it('Customer-POST Validate OTP',()=>{
            //prompt('Enter Your OTP')
            cy.request({
        
                method:'POST',
                url:valotp,
                body:{
                    mobile_number:`${mobNumber}`,
                    otp:`${otp}`,
                    customer_app_instance_id: `String`
                }
            }).then((res)=>{
                // debugger;
                expect(res.status).to.eq(201)
                expect(res.body).to.have.property('otp_valid' , true)
                expect(res.body).to.have.property('temp_code').to.be.a('string')
                expect(res.body).to.have.property('customer_found').to.be.a('boolean')
                expect(res.body).to.have.property('customer_id').to.be.a('string')
                expect(res.body).to.have.property('access_token').to.be.a('string')
                auth = res.body.access_token;
                temp = res.body.temp_code;
            })
        });

        //Detele the user if he exsist
        it('Customer-Delete delete the user if he exsist',()=>{
            cy.request({
                method: 'DELETE',
                url :  custdele,
                headers :{
                    authorization:`Bearer ${auth}`
                }
            }).then((res)=>{
                expect(res.status).to.be.eq(200)
                expect(res.body).to.have.property('message')
            })
        });

        //lets onboard the user
        it('Customer-POST Request for otp',()=>{
            cy.request({
                method: 'POST',
                url: reqotp,
                body: {
                    mobile_number: `${mobNumber}`
                }
            }).then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body).to.have.property('message')
            })
        });
    
        it('Customer-POST Validate OTP',()=>{
            //prompt('Enter Your OTP')
            cy.request({
        
                method:'POST',
                url:valotp,
                body:{
                    mobile_number:`${mobNumber}`,
                    otp:`${otp}`,
                    customer_app_instance_id: `String`
                }
            }).then((res)=>{
                // debugger;
                expect(res.status).to.eq(201)
                expect(res.body).to.have.property('otp_valid' , true)
                expect(res.body).to.have.property('temp_code').to.be.a('string')
                expect(res.body).to.have.property('customer_found').to.be.a('boolean')
                expect(res.body).to.have.property('customer_id').to.be.a('string')
                expect(res.body).to.have.property('access_token').to.be.a('string')
                auth = res.body.access_token;
                temp = res.body.temp_code;
            })
        });

    
        it('Customer-POST Onboard User',()=>{
            //fname = prompt('Enter Your First Name')
            //lname = prompt('Enter your Last Name')
            cy.request({
                method: 'POST',
                url:oncus,
                body:{
                    first_name:    `${fname}`,
                    last_name:     `${lname}`,
                    mobile_number: `${mobNumber}`,
                    temp_code:     `${temp}`,
                    customer_app_instance_id : `${temp}`
    
                }
            }).then((res)=>{
                // debugger;
                expect(res.status).to.eq(201)
                expect(res.body).to.have.property('id').to.be.a('string')
                expect(res.body).to.have.property('access_token').to.be.a('string')
                auth = res.body.access_token;
                console.log('Customer Registred')
            })
        });

        it('MS-GET Question Answers',()=>{
            cy.request({
                method:'GET',
                url:questionAns,
                headers: {
                    authorization:`Bearer ${auth}`
                }
            }).then((response)=>{
                let res = response.body
                let data = res.data
                expect(res.status).to.eq(200)
                expect(data).to.have.property('money_sign')
                expect(data.money_sign.length).to.equal(25)
                samQues = data.money_sign
                // console.log('this is questionnair',samQues)
                // console.table(samQues)
    
            }).then(()=>{
    
      
        let ansid = [];
        let scrid = [];
        
        let emp = [];
    
            //Generating answers for all questions randomly
    
                function getRandomItem(anslen,ans) { //func to select random answer for single choice questions
    
                    // get random index value
                    const randomIndex = Math.floor(Math.random() * anslen);
                
                    // // get random item
                    // const item = ans[randomIndex];
                
                    return randomIndex;
                }
            
                function myarry(ranlength, length) { //func to select random answers for multiple choice questions
                    let arry = [];
                    let close = true
                    let options = 0;
                    while (close === true) {
                      options = Math.floor(Math.random() * length)
                  
                      if (arry.includes(options) != true) {
                        arry.push(options)
                      }
                      if (arry.length === ranlength) {
                        close = false
                      }
                  
                    }
                    return arry
                };
    
                //lets create a ansbody from set of all questions using above func
                samQues.forEach((e)=>{
                
    
    
    
                        // debugger;
                        //lets store answers for single type questions
                        if(e.question_typeid == 1){
                            ansid = [];
                            scrid = [];
                            let ranansty1 = getRandomItem(e.answers.length,e.answers)
    
                                ansid.push((e.answers[ranansty1].answer_id).toString());
                                scrid.push((e.answers[ranansty1].score).toString());
    
                            // console.table(ansid+scrid)
                        }
    
                        //lets store answers for multiple type questions
                        else if(e.question_typeid == 2){
                            ansid = [];
                            scrid = [];
                            let maxlen = getRandomItem(e.answers.length,e.answers)
                            // let ranlen = 0;
                            if (maxlen == 0){
                               var ranlen = 1
                            }
                            else{
                                ranlen = maxlen
                            }
                            let ranansty2 = myarry(ranlen,e.answers.length)
    
                            
                            ranansty2.forEach((ele)=>{
    
                                ansid.push((e.answers[ele].answer_id).toString());
                                scrid.push((e.answers[ele].score).toString());
                                // console.log('index'+ i)
                                // console.table(ansid)
                                // console.table(scrid)
                                
                            })
                            
                            // console.log('index'+i)
                            // console.log('answerid array')
                            // console.table(ansid)
                            // console.log('score')
                            // console.table(scrid)
                            // console.log('element')
                            // console.table(e)
                        }
                        
                        temp =  {
                            "questionId" : e.question_id.toString(),
                            "scores": scrid,
                            "answerids" : ansid
                        }
                        // console.log('generated ansbody')
                        // console.table(temp)
    
    
    
                            
                    gentemp.push(temp)
                    
                    })
            
                // console.log("The Temp is "+gentemp)
                console.log(gentemp)
            });
        
        
    
        
    
    
        });
    
        it('Customer-POST Invite Cupon Code',()=>{
            cy.request({
                method : 'POST',
                url : cupcode,
                headers : {
                    authorization : `Bearer ${auth}`
                },
                body : {
                    coupon_code : "EARLYBIRD"
                }
            }).then((res)=>{
                expect(res.status).to.eq(201)
            })
        });
    
        it('Start the assesment',()=>{
            cy.request({
                method : 'POST',
                url : startass,
                headers :{
                    authorization : `Bearer ${auth}`
                },
                body : {
    
                }
            }).then((response)=>{
                expect(response.status).to.eq(200)
            })
        })
    
        it('MS-ans random questions - add response',()=>{
            
            let ans =[];
            // debugger;
            for( let k = 0 ; k < 25; k++){
                ans.push(gentemp[k])
                // console.log(`The ${k} ans body is`)
                // console.log(ans)
                // console.table(ans)
                cy.request({
                    method:'POST',
                    url:saveUserQA,
                    headers: {
                      authorization:`Bearer ${auth}`
                    },
                    body: {
                      
        
                      answers:ans
                    }
                        
                    
                  }).then((response)=>{
                    let res = response.body
                    let data = res.data
                    
                    // console.log(data, 'response')
                    expect(res.status).to.eq(200)
                    expect(data).to.have.property('isMoneySignGenerated')
                    expect(data).to.have.property('moneySign', '')
                    expect(data).to.have.property('noOfQuestionsFilled')
                    expect(data.noOfQuestionsFilled).to.be.gt(0)
                    expect(data.noOfQuestionsFilled).to.be.eq(k+1)
                    expect(data).to.have.property('lastAnswerId').to.be.a("array")
                    expect(data).to.have.property('lastAnswerScore').to.be.a("array")
                    
                    
                    
                })
                ans = [];
            }
            gentemp = [];
            temp = [];

        })
    
        it('MS-Check If Money Sign is Genrated',()=>{
            cy.request({
                method:'POST',
                url:genMoneySign,
                headers: {
                    authorization:`Bearer ${auth}`
                },
                  body:{
                }
            }).then((res)=>{
                
                expect(res.body.status).to.eq(200)
                expect(res.body.data).to.have.property("moneysign").to.be.a('string')
                expect(res.body.data).to.have.property('description').to.be.a("string")
                expect(res.body.data).to.have.property('otherlikeyou').to.be.a("array")
                expect(res.body.data).to.have.property("strength")//.to.be.a("array")
                expect(res.body.data).to.have.property("weakness")//.to.be.a("array")
                
            })
        })
    
        // it('Customer-Money Sign Generated',()=>{
        //     cy.request({
        //         method : 'PATCH',
        //         url :custgms,
        //         headers: {
        //             authorization:`Bearer ${auth}`
        //         },
        //           body:{
        //         }
        //     }).then((response)=>{
        //         // {
        //         //     "id": "bbb65ca3-62a7-4ec4-b1f5-9a85275414db",
        //         //     "user_id": "cc25946c-c557-48fa-a3c4-5ae75c081e23",
        //         //     "first_name": "radhesh",
        //         //     "last_name": "Kumre",
        //         //     "email": "9757432264@example.com",
        //         //     "mobile_number": "9757432264",
        //         //     "money_sign_email": "",
        //         //     "is_money_sign_generated": true,
        //         //     "created_at": "2022-11-21T06:06:32.092Z",
        //         //     "updated_at": "2022-11-21T06:06:32.092Z",
        //         //     "money_sign_generated_at": "2022-11-21T10:54:33.729Z",
        //         //     "money_sign_report_sent_on_whatsapp_at": null,
        //         //     "money_sign_report_sent_on_email_at": null,
        //         //     "email_updated_at": null
        //         //   }
        //         let res = response.body
        //         expect(response.status).to.eq(200)
        //         expect(res).to.have.property('id').to.be.a('string')
        //         expect(res).to.have.property('user_id').to.be.a('string')
        //         expect(res).to.have.property('first_name').to.be.a('string')
        //         expect(res).to.have.property('last_name').to.be.a('string')
        //         expect(res).to.have.property('email').to.be.a('string')
        //         expect(res).to.have.property('mobile_number').to.be.a('string')
        //         expect(res).to.have.property('money_sign_email').to.be.a('string')
        //         expect(res).to.have.property('is_money_sign_generated',true)
        //         expect(res).to.have.property('created_at').to.be.a('string')
        //         expect(res).to.have.property('updated_at').to.be.a('string')
        //         expect(res).to.have.property('money_sign_generated_at').to.be.a('string')
        //     })
        // })
    
        it('Custmoer-Assessment activity done',()=>{
            cy.request({
                method :'POST',
                url : custaad,
                headers: {
                    authorization:`Bearer ${auth}`
                },
                body:{}
            }).then((response)=>{
                let res = response.body
                
                expect(response.status).to.eq(201)
                expect(res).to.have.property('message').to.be.a('string')
            })
        })
    
        it('MS-Feedback activity',()=>{
            cy.request({
                method : 'POST',
                url : msfeed,
                headers: {
                    authorization:`Bearer ${auth}`
                },
                body:{
                    
      
                        isuser_satisfied: false,
                        user_recommandaion: "",
                        user_suggestion: "Can be much better"
                      
                }
            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body).to.have.property('message').to.be.a('string')
            })
        });
    
        it('Customer-Update email ID',()=>{
            //prompt("Enter Your EmailID to get Assessment Report:")
            cy.request({
                method : 'PATCH',
                url : custemail,
                headers: {
                    authorization:`Bearer ${auth}`
                },
                body:{
                    
                    email : `${email}`
                      
                }
            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body).to.have.property('message').to.be.a('string')
            })
        });

        it('customer profile with vaild accessToken',()=>{
            cy.request({
                method:'GET',
                url:cuspro,
                headers: {
                    authorization :`Bearer ${auth}`
                }
            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body).to.have.property("first_name").to.be.a("string")
                expect(res.body).to.have.property("last_name").to.be.a("string")
                expect(res.body).to.have.property("mobile_number").to.be.a("string")
                expect(res.body).to.have.property("email").to.be.a("string")
                //expect(res.body).to.have.property("is_join_waitlist").to.be.a('boolean')
            })
        });

        it('Customer - Logout',()=>{
            cy.request({
                method : 'POST',
                url : custlog,
                headers: {
                    authorization :`Bearer ${auth}`
                },
                body: {
                    customer_app_instance_id: "string"
                }
                
            }).then((res)=>{
                expect(res.status).to.eq(201)
                expect(res.body).to.have.property('message').to.be.a('string')
            })
            cy.log('1 new customer flow success')
            
        });
        console.log('1 new customer flow success')
        
    });

    //Existing MS Done 
    describe('Existing MS Done',()=>{

        it('Customer-POST Request for otp',()=>{
            cy.request({
                method: 'POST',
                url: reqotp,
                body: {
                    mobile_number: `${mobNumber}`
                }
            }).then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body).to.have.property('message')
            })
        });
    
        it('Customer-POST Validate OTP',()=>{
            //prompt('Enter Your OTP')

            cy.request({
                method:'POST',
                url:valotp,
                body:{
                    mobile_number:`${mobNumber}`,
                    otp:`${otp}`,
                    customer_app_instance_id: `String`
                }
            }).then((res)=>{
                // debugger;
                expect(res.status).to.eq(201)
                expect(res.body).to.have.property('otp_valid' , true)
                expect(res.body).to.have.property('temp_code').to.be.a('string')
                expect(res.body).to.have.property('customer_found').to.be.a('boolean')
                expect(res.body).to.have.property('customer_id').to.be.a('string')
                expect(res.body).to.have.property('access_token').to.be.a('string')
                at = res.body.access_token;
                temp = res.body.temp_code;
            })
        });

        it('Auto Login',()=>{

            cy.request({
                method : 'POST',
                url : custauto,
                headers: {
                    authorization :`Bearer ${auth}`
                },
                body : {
                    customer_app_instance_id: "string",
                    app_version: "string",
                    device_platform: "string",
                    device_model: "string"
                }

            }).then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body).to.have.property('message')
            })
        });

        it('MS-Check If Money Sign is Genrated',()=>{
            cy.request({
                method:'POST',
                url:genMoneySign,
                headers: {
                    authorization:`Bearer ${auth}`
                },
                  body:{
                }
            }).then((res)=>{
                
                expect(res.body.status).to.eq(200)
                expect(res.body.data).to.have.property("moneysign").to.be.a('string')
                expect(res.body.data).to.have.property('description').to.be.a("string")
                expect(res.body.data).to.have.property('otherlikeyou').to.be.a("array")
                expect(res.body.data).to.have.property("strength")//.to.be.a("array")
                expect(res.body.data).to.have.property("weakness")//.to.be.a("array")
                
            })
        });

        it('customer profile with vaild accessToken',()=>{
            cy.request({
                method:'GET',
                url:cuspro,
                headers: {
                    authorization :`Bearer ${auth}`
                }
            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body).to.have.property("first_name").to.be.a("string")
                expect(res.body).to.have.property("last_name").to.be.a("string")
                expect(res.body).to.have.property("mobile_number").to.be.a("string")
                expect(res.body).to.have.property("email").to.be.a("string")
                //expect(res.body).to.have.property("is_join_waitlist").to.be.a('boolean')
            })
        });

        it('Customer - Logout',()=>{
            cy.request({
                method : 'POST',
                url : custlog,
                headers: {
                    authorization :`Bearer ${auth}`
                },
                body: {
                    customer_app_instance_id: "string"
                }
                
            }).then((res)=>{
                expect(res.status).to.eq(201)
                expect(res.body).to.have.property('message').to.be.a('string')
            })
            cy.log('2 Existing MS Done - Auto Login')
            
        });
    
        console.log('2 Existing MS Done - Auto Login')

    });

    //Senario Three
    describe('Stepped flow for MoneySign Assessment',()=>{

        //check if the user Exsist if yes then delete the customer
        it('Customer-POST Request for otp',()=>{
            cy.request({
                method: 'POST',
                url: reqotp,
                body: {
                    mobile_number: `${mobNumber}`
                }
            }).then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body).to.have.property('message')
            })
        });
    
        it('Customer-POST Validate OTP',()=>{
            //prompt('Enter Your OTP')
            cy.request({
        
                method:'POST',
                url:valotp,
                body:{
                    mobile_number:`${mobNumber}`,
                    otp:`${otp}`,
                    customer_app_instance_id: `String`
                }
            }).then((res)=>{
                // debugger;
                expect(res.status).to.eq(201)
                expect(res.body).to.have.property('otp_valid' , true)
                expect(res.body).to.have.property('temp_code').to.be.a('string')
                expect(res.body).to.have.property('customer_found').to.be.a('boolean')
                expect(res.body).to.have.property('customer_id').to.be.a('string')
                expect(res.body).to.have.property('access_token').to.be.a('string')
                auth = res.body.access_token;
                temp = res.body.temp_code;
            })
        });

        //Detele the user if he exsist
        it('Customer-Delete delete the user if he exsist',()=>{
            cy.request({
                method: 'DELETE',
                url :  custdele,
                headers :{
                    authorization:`Bearer ${auth}`
                }
            }).then((res)=>{
                expect(res.status).to.be.eq(200)
                expect(res.body).to.have.property('message')
            })
        });

        //lets onboard the user
        it('Customer-POST Request for otp',()=>{
            cy.request({
                method: 'POST',
                url: reqotp,
                body: {
                    mobile_number: `${mobNumber}`
                }
            }).then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body).to.have.property('message')
            })
        });
    
        it('Customer-POST Validate OTP',()=>{
            //prompt('Enter Your OTP')
            cy.request({
        
                method:'POST',
                url:valotp,
                body:{
                    mobile_number:`${mobNumber}`,
                    otp:`${otp}`,
                    customer_app_instance_id: `String`
                }
            }).then((res)=>{
                // debugger;
                expect(res.status).to.eq(201)
                expect(res.body).to.have.property('otp_valid' , true)
                expect(res.body).to.have.property('temp_code').to.be.a('string')
                expect(res.body).to.have.property('customer_found').to.be.a('boolean')
                expect(res.body).to.have.property('customer_id').to.be.a('string')
                expect(res.body).to.have.property('access_token').to.be.a('string')
                auth = res.body.access_token;
                temp = res.body.temp_code;
            })
        });

    
        it('Customer-POST Onboard User',()=>{
            //fname = prompt('Enter Your First Name')
            //lname = prompt('Enter your Last Name')
            cy.request({
                method: 'POST',
                url:oncus,
                body:{
                    first_name:    `${fname}`,
                    last_name:     `${lname}`,
                    mobile_number: `${mobNumber}`,
                    temp_code:     `${temp}`,
                    customer_app_instance_id : `${temp}`
    
                }
            }).then((res)=>{
                // debugger;
                expect(res.status).to.eq(201)
                expect(res.body).to.have.property('id').to.be.a('string')
                expect(res.body).to.have.property('access_token').to.be.a('string')
                auth = res.body.access_token;
                console.log('Customer Registred')
            })
        });

        it('MS-POST Method Create and Validate User',()=>{
            cy.request({
                method:"POST",
                url:userValidation,
                headers: {
                  authorization:`Bearer ${auth}`
                },
                body:{
                }
            }).as('responseMethod')
            cy.get('@responseMethod').then((response)=>{
                let res = response.body
                let data = res.data
                expect(res.status).to.eq(200)
                expect(data).to.have.property('isMoneySignGenerated', false)
                expect(data).to.have.property('moneySign', '')
                expect(data).to.have.property('noOfQuestionsFilled')
                fillque = data.noOfQuestionsFilled;
                expect(data).to.have.property('noOfQuestions', 25)
                expect(response.body.data.noOfQuestionsFilled).to.be.lessThan(25)
                expect(response.body.data.noOfQuestionsFilledPer).to.be.lessThan(101)
                expect(data).to.have.property('lastAnswerId')
                expect(data).to.have.property('lastAnswerScore') 
            })
        });

        it('MS-GET Question Answers',()=>{
            cy.request({
                method:'GET',
                url:questionAns,
                headers: {
                    authorization:`Bearer ${auth}`
                }
            }).then((response)=>{
                let res = response.body
                let data = res.data
                expect(res.status).to.eq(200)
                expect(data).to.have.property('money_sign')
                expect(data.money_sign.length).to.equal(25)
                samQues = data.money_sign
                // console.log('this is questionnair',samQues)
                // console.table(samQues)
    
            }).then(()=>{
    
      
        
    
            //Generating answers for all questions randomly
    
                function getRandomItem(anslen,ans) { //func to select random answer for single choice questions
    
                    // get random index value
                    const randomIndex = Math.floor(Math.random() * anslen);
                
                    // // get random item
                    // const item = ans[randomIndex];
                
                    return randomIndex;
                }
            
                function myarry(ranlength, length) { //func to select random answers for multiple choice questions
                    let arry = [];
                    let close = true
                    let options = 0;
                    while (close === true) {
                      options = Math.floor(Math.random() * length)
                  
                      if (arry.includes(options) != true) {
                        arry.push(options)
                      }
                      if (arry.length === ranlength) {
                        close = false
                      }
                  
                    }
                    return arry
                };
    
                // debugger;
                // function getanswes(fillque,que){
                    getansw = samQues.slice(fillque, que);
    
    
                    
                // };
    
                // getansw = getanswes(fillque,que);
                // function genans(){
                    //lets create a ansbody from set of all questions using above func
                    getansw.forEach((e)=>{
                
    
    
    
                        // debugger;
                        //lets store answers for single type questions
                        if(e.question_typeid == 1){
                            ansid = [];
                            scrid = [];
                            let ranansty1 = getRandomItem(e.answers.length,e.answers)
    
                                ansid.push((e.answers[ranansty1].answer_id).toString());
                                scrid.push((e.answers[ranansty1].score).toString());
    
                            // console.table(ansid+scrid)
                        }
    
                        //lets store answers for multiple type questions
                        else if(e.question_typeid == 2){
                            ansid = [];
                            scrid = [];
                            let maxlen = getRandomItem(e.answers.length,e.answers)
                            // let ranlen = 0;
                            if (maxlen == 0){
                               var ranlen = 1
                            }
                            else{
                                ranlen = maxlen
                            }
                            let ranansty2 = myarry(ranlen,e.answers.length)
    
                            
                            ranansty2.forEach((ele)=>{
    
                                ansid.push((e.answers[ele].answer_id).toString());
                                scrid.push((e.answers[ele].score).toString());
                                // console.log('index'+ i)
                                // console.table(ansid)
                                // console.table(scrid)
                                
                            })
                            
                            // console.log('index'+i)
                            // console.log('answerid array')
                            // console.table(ansid)
                            // console.log('score')
                            // console.table(scrid)
                            // console.log('element')
                            // console.table(e)
                        }
                        
                        temp =  {
                            "questionId" : e.question_id.toString(),
                            "scores": scrid,
                            "answerids" : ansid
                        }
                        // console.log('generated ansbody')
                        // console.table(temp)
    
    
    
                            
                        gentemp.push(temp)
                    
                    })
            
                    // console.log("The Temp is "+gentemp)
                    // console.log(gentemp)
    
                // };
    
                
                
            });
                
            //  cy.wrap(()=>{
            //     debugger;
            //     genans();
            // });
            
            
    
        
    
    
        });

        it('MS-ans random questions - add response',()=>{
        
            let ans =[];
            // debugger;
    
            // for( let k = fillque ; k < que; k++){
                // ans.push(gentemp[i])
                //     console.log(ans)
                //     console.table(ans)
            // gentemp.forEach((e,i)=>{
            for( let e of gentemp){
                // debugger;
                // console.log(e)
                ans.push(e)
                // console.log(`The ${i} ans body is ${ans}` + ans)
                
                cy.request({
                    method:'POST',
                    url:saveUserQA,
                    headers: {
                      authorization:`Bearer ${auth}`
                    },
                    body: {
                      answers:ans
                    }
                        
                    
                  }).then((response)=>{
                    let res = response.body
                    let data = res.data
                    // console.log(data, 'response')
                    expect(res.status).to.eq(200)
                    expect(data).to.have.property('isMoneySignGenerated')
                    expect(data).to.have.property('moneySign', '')
                    expect(data).to.have.property('noOfQuestionsFilled')
                    expect(data.noOfQuestionsFilled).to.be.gt(0)
                    // expect(data.noOfQuestionsFilled).to.be.eq(fillque+i)
                    //expect(data).to.have.property('lastAnswerId').to.be.a("array")
                    //expect(data).to.have.property('lastAnswerScore').to.be.a("array")
                    
                    
                    
                })
                ans = [];
                // })
            }
            gentemp = [];
            temp = [];
        })
    
        it(`MS-Check if ${que} number of questions are answered`,()=>{
            cy.request({
                method:"POST",
                url:userValidation,
                headers: {
                  authorization:`Bearer ${auth}`
                },
                body:{
                }
            }).as('responseMethod')
            cy.get('@responseMethod').then((response)=>{
                let res = response.body
                let data = res.data
                expect(res.status).to.eq(200)
                expect(data).to.have.property('isMoneySignGenerated', false)
                expect(data).to.have.property('moneySign', '')
                expect(data).to.have.property('noOfQuestionsFilled')
                // expect(data.noOfQuestionsFilled).to.lessThan()
                expect(data).to.have.property('noOfQuestions', 25)
                expect(response.body.data.noOfQuestionsFilled).to.be.lessThan(parseInt(que)+1)
                expect(response.body.data.noOfQuestionsFilledPer).to.be.lessThan(101)
                expect(data).to.have.property('lastAnswerId')
                expect(data).to.have.property('lastAnswerScore') 
            })
        });

        it('Customer - Logout',()=>{
            cy.request({
                method : 'POST',
                url : custlog,
                headers: {
                    authorization :`Bearer ${auth}`
                },
                body: {
                    customer_app_instance_id: "string"
                }
                
            }).then((res)=>{
                expect(res.status).to.eq(201)
                expect(res.body).to.have.property('message').to.be.a('string')
            })
            // cy.log('2 Existing MS Done - Auto Login')
            
        });

        it('Customer-POST Request for otp',()=>{
            cy.request({
                method: 'POST',
                url: reqotp,
                body: {
                    mobile_number: `${mobNumber}`
                }
            }).then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body).to.have.property('message')
            })
        });
    
        it('Customer-POST Validate OTP',()=>{
            //prompt('Enter Your OTP')

            cy.request({
                method:'POST',
                url:valotp,
                body:{
                    mobile_number:`${mobNumber}`,
                    otp:`${otp}`,
                    customer_app_instance_id: `String`
                }
            }).then((res)=>{
                // debugger;
                expect(res.status).to.eq(201)
                expect(res.body).to.have.property('otp_valid' , true)
                expect(res.body).to.have.property('temp_code').to.be.a('string')
                expect(res.body).to.have.property('customer_found').to.be.a('boolean')
                expect(res.body).to.have.property('customer_id').to.be.a('string')
                expect(res.body).to.have.property('access_token').to.be.a('string')
                at = res.body.access_token;
                temp = res.body.temp_code;
            })
        });

        it('MS-POST Method Create and Validate User',()=>{
            cy.request({
                method:"POST",
                url:userValidation,
                headers: {
                  authorization:`Bearer ${auth}`
                },
                body:{
                }
            }).as('responseMethod')
            cy.get('@responseMethod').then((response)=>{
                let res = response.body
                let data = res.data
                expect(res.status).to.eq(200)
                expect(data).to.have.property('isMoneySignGenerated', false)
                expect(data).to.have.property('moneySign', '')
                expect(data).to.have.property('noOfQuestionsFilled')
                fillque = data.noOfQuestionsFilled;
                expect(data).to.have.property('noOfQuestions', 25)
                expect(response.body.data.noOfQuestionsFilled).to.be.lessThan(25)
                expect(response.body.data.noOfQuestionsFilledPer).to.be.lessThan(101)
                expect(data).to.have.property('lastAnswerId')
                expect(data).to.have.property('lastAnswerScore') 
            })
        });

        it('MS-GET Question Answers',()=>{
            cy.request({
                method:'GET',
                url:questionAns,
                headers: {
                    authorization:`Bearer ${auth}`
                }
            }).then((response)=>{
                let res = response.body
                let data = res.data
                expect(res.status).to.eq(200)
                expect(data).to.have.property('money_sign')
                expect(data.money_sign.length).to.equal(25)
                samQues = data.money_sign
                // console.log('this is questionnair',samQues)
                // console.table(samQues)
    
            }).then(()=>{
    
      
        
    
            //Generating answers for all questions randomly
    
                function getRandomItem(anslen,ans) { //func to select random answer for single choice questions
    
                    // get random index value
                    const randomIndex = Math.floor(Math.random() * anslen);
                
                    // // get random item
                    // const item = ans[randomIndex];
                
                    return randomIndex;
                }
            
                function myarry(ranlength, length) { //func to select random answers for multiple choice questions
                    let arry = [];
                    let close = true
                    let options = 0;
                    while (close === true) {
                      options = Math.floor(Math.random() * length)
                  
                      if (arry.includes(options) != true) {
                        arry.push(options)
                      }
                      if (arry.length === ranlength) {
                        close = false
                      }
                  
                    }
                    return arry
                };
    
                // debugger;
                // function getanswes(fillque,que){
                    getansw = samQues.slice(fillque, que2);
    
    
                    
                // };
    
                // getansw = getanswes(fillque,que);
                // function genans(){
                    //lets create a ansbody from set of all questions using above func
                    getansw.forEach((e)=>{
                
    
    
    
                        // debugger;
                        //lets store answers for single type questions
                        if(e.question_typeid == 1){
                            ansid = [];
                            scrid = [];
                            let ranansty1 = getRandomItem(e.answers.length,e.answers)
    
                                ansid.push((e.answers[ranansty1].answer_id).toString());
                                scrid.push((e.answers[ranansty1].score).toString());
    
                            // console.table(ansid+scrid)
                        }
    
                        //lets store answers for multiple type questions
                        else if(e.question_typeid == 2){
                            ansid = [];
                            scrid = [];
                            let maxlen = getRandomItem(e.answers.length,e.answers)
                            // let ranlen = 0;
                            if (maxlen == 0){
                               var ranlen = 1
                            }
                            else{
                                ranlen = maxlen
                            }
                            let ranansty2 = myarry(ranlen,e.answers.length)
    
                            
                            ranansty2.forEach((ele)=>{
    
                                ansid.push((e.answers[ele].answer_id).toString());
                                scrid.push((e.answers[ele].score).toString());
                                // console.log('index'+ i)
                                // console.table(ansid)
                                // console.table(scrid)
                                
                            })
                            
                            // console.log('index'+i)
                            // console.log('answerid array')
                            // console.table(ansid)
                            // console.log('score')
                            // console.table(scrid)
                            // console.log('element')
                            // console.table(e)
                        }
                        
                        temp =  {
                            "questionId" : e.question_id.toString(),
                            "scores": scrid,
                            "answerids" : ansid
                        }
                        // console.log('generated ansbody')
                        // console.table(temp)
    
    
    
                            
                        gentemp.push(temp)
                    
                    })
            
                    // console.log("The Temp is "+gentemp)
                    // console.log(gentemp)
    
                // };
    
                
                
            });
                
            //  cy.wrap(()=>{
            //     debugger;
            //     genans();
            // });
            
            
    
        
    
    
        });

        it('MS-ans random questions - add response',()=>{
        
            let ans =[];
            // debugger;
    
            // for( let k = fillque ; k < que; k++){
                // ans.push(gentemp[i])
                //     console.log(ans)
                //     console.table(ans)
            // gentemp.forEach((e,i)=>{
            for( let e of gentemp){
                // debugger;
                // console.log(e)
                ans.push(e)
                // console.log(`The ${i} ans body is ${ans}` + ans)
                
                cy.request({
                    method:'POST',
                    url:saveUserQA,
                    headers: {
                      authorization:`Bearer ${auth}`
                    },
                    body: {
                      answers:ans
                    }
                        
                    
                  }).then((response)=>{
                    let res = response.body
                    let data = res.data
                    // console.log(data, 'response')
                    expect(res.status).to.eq(200)
                    expect(data).to.have.property('isMoneySignGenerated')
                    expect(data).to.have.property('moneySign', '')
                    expect(data).to.have.property('noOfQuestionsFilled')
                    expect(data.noOfQuestionsFilled).to.be.gt(0)
                    // expect(data.noOfQuestionsFilled).to.be.eq(fillque+i)
                    //expect(data).to.have.property('lastAnswerId').to.be.a("array")
                    //expect(data).to.have.property('lastAnswerScore').to.be.a("array")
                    
                    
                    
                })
                ans = [];
                // })
            }
            gentemp = [];
            temp = [];
        })
    
        it(`MS-Check if ${que2} number of questions are answered`,()=>{
            cy.request({
                method:"POST",
                url:userValidation,
                headers: {
                  authorization:`Bearer ${auth}`
                },
                body:{
                }
            }).as('responseMethod')
            cy.get('@responseMethod').then((response)=>{
                let res = response.body
                let data = res.data
                expect(res.status).to.eq(200)
                expect(data).to.have.property('isMoneySignGenerated', false)
                expect(data).to.have.property('moneySign', '')
                expect(data).to.have.property('noOfQuestionsFilled')
                // expect(data.noOfQuestionsFilled).to.lessThan()
                expect(data).to.have.property('noOfQuestions', 25)
                expect(response.body.data.noOfQuestionsFilled).to.be.lessThan(parseInt(que2)+1)
                expect(response.body.data.noOfQuestionsFilledPer).to.be.lessThan(101)
                expect(data).to.have.property('lastAnswerId')
                expect(data).to.have.property('lastAnswerScore') 
            })
        });


        it('Customer - Logout',()=>{
            cy.request({
                method : 'POST',
                url : custlog,
                headers: {
                    authorization :`Bearer ${auth}`
                },
                body: {
                    customer_app_instance_id: "string"
                }
                
            }).then((res)=>{
                expect(res.status).to.eq(201)
                expect(res.body).to.have.property('message').to.be.a('string')
            })
            // cy.log('2 Existing MS Done - Auto Login')
            
        });

        it('Customer-POST Request for otp',()=>{
            cy.request({
                method: 'POST',
                url: reqotp,
                body: {
                    mobile_number: `${mobNumber}`
                }
            }).then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body).to.have.property('message')
            })
        });
    
        it('Customer-POST Validate OTP',()=>{
            //prompt('Enter Your OTP')

            cy.request({
                method:'POST',
                url:valotp,
                body:{
                    mobile_number:`${mobNumber}`,
                    otp:`${otp}`,
                    customer_app_instance_id: `String`
                }
            }).then((res)=>{
                // debugger;
                expect(res.status).to.eq(201)
                expect(res.body).to.have.property('otp_valid' , true)
                expect(res.body).to.have.property('temp_code').to.be.a('string')
                expect(res.body).to.have.property('customer_found').to.be.a('boolean')
                expect(res.body).to.have.property('customer_id').to.be.a('string')
                expect(res.body).to.have.property('access_token').to.be.a('string')
                at = res.body.access_token;
                temp = res.body.temp_code;
            })
        });

        it('MS-POST Method Create and Validate User',()=>{
            cy.request({
                method:"POST",
                url:userValidation,
                headers: {
                  authorization:`Bearer ${auth}`
                },
                body:{
                }
            }).as('responseMethod')
            cy.get('@responseMethod').then((response)=>{
                let res = response.body
                let data = res.data
                expect(res.status).to.eq(200)
                expect(data).to.have.property('isMoneySignGenerated', false)
                expect(data).to.have.property('moneySign', '')
                expect(data).to.have.property('noOfQuestionsFilled')
                fillque = data.noOfQuestionsFilled;
                expect(data).to.have.property('noOfQuestions', 25)
                expect(response.body.data.noOfQuestionsFilled).to.be.lessThan(25)
                expect(response.body.data.noOfQuestionsFilledPer).to.be.lessThan(101)
                expect(data).to.have.property('lastAnswerId')
                expect(data).to.have.property('lastAnswerScore') 
            })
        });

        it('MS-GET Question Answers',()=>{
            cy.request({
                method:'GET',
                url:questionAns,
                headers: {
                    authorization:`Bearer ${auth}`
                }
            }).then((response)=>{
                let res = response.body
                let data = res.data
                expect(res.status).to.eq(200)
                expect(data).to.have.property('money_sign')
                expect(data.money_sign.length).to.equal(25)
                samQues = data.money_sign
                // console.log('this is questionnair',samQues)
                // console.table(samQues)
    
            }).then(()=>{
    
      
        
    
            //Generating answers for all questions randomly
    
                function getRandomItem(anslen,ans) { //func to select random answer for single choice questions
    
                    // get random index value
                    const randomIndex = Math.floor(Math.random() * anslen);
                
                    // // get random item
                    // const item = ans[randomIndex];
                
                    return randomIndex;
                }
            
                function myarry(ranlength, length) { //func to select random answers for multiple choice questions
                    let arry = [];
                    let close = true
                    let options = 0;
                    while (close === true) {
                      options = Math.floor(Math.random() * length)
                  
                      if (arry.includes(options) != true) {
                        arry.push(options)
                      }
                      if (arry.length === ranlength) {
                        close = false
                      }
                  
                    }
                    return arry
                };
    
                // debugger;
                // function getanswes(fillque,que){
                    getansw = samQues.slice(fillque, que3);
    
    
                    
                // };
    
                // getansw = getanswes(fillque,que);
                // function genans(){
                    //lets create a ansbody from set of all questions using above func
                    getansw.forEach((e)=>{
                
    
    
    
                        // debugger;
                        //lets store answers for single type questions
                        if(e.question_typeid == 1){
                            ansid = [];
                            scrid = [];
                            let ranansty1 = getRandomItem(e.answers.length,e.answers)
    
                                ansid.push((e.answers[ranansty1].answer_id).toString());
                                scrid.push((e.answers[ranansty1].score).toString());
    
                            // console.table(ansid+scrid)
                        }
    
                        //lets store answers for multiple type questions
                        else if(e.question_typeid == 2){
                            ansid = [];
                            scrid = [];
                            let maxlen = getRandomItem(e.answers.length,e.answers)
                            // let ranlen = 0;
                            if (maxlen == 0){
                               var ranlen = 1
                            }
                            else{
                                ranlen = maxlen
                            }
                            let ranansty2 = myarry(ranlen,e.answers.length)
    
                            
                            ranansty2.forEach((ele)=>{
    
                                ansid.push((e.answers[ele].answer_id).toString());
                                scrid.push((e.answers[ele].score).toString());
                                // console.log('index'+ i)
                                // console.table(ansid)
                                // console.table(scrid)
                                
                            })
                            
                            // console.log('index'+i)
                            // console.log('answerid array')
                            // console.table(ansid)
                            // console.log('score')
                            // console.table(scrid)
                            // console.log('element')
                            // console.table(e)
                        }
                        
                        temp =  {
                            "questionId" : e.question_id.toString(),
                            "scores": scrid,
                            "answerids" : ansid
                        }
                        // console.log('generated ansbody')
                        // console.table(temp)
    
    
    
                            
                        gentemp.push(temp)
                    
                    })
            
                    // console.log("The Temp is "+gentemp)
                    // console.log(gentemp)
    
                // };
    
                
                
            });
                
            //  cy.wrap(()=>{
            //     debugger;
            //     genans();
            // });
            
            
    
        
    
    
        });

        it('MS-ans random questions - add response',()=>{
        
            let ans =[];
            // debugger;
    
            // for( let k = fillque ; k < que; k++){
                // ans.push(gentemp[i])
                //     console.log(ans)
                //     console.table(ans)
            // gentemp.forEach((e,i)=>{
            for( let e of gentemp){
                // debugger;
                // console.log(e)
                ans.push(e)
                // console.log(`The ${i} ans body is ${ans}` + ans)
                
                cy.request({
                    method:'POST',
                    url:saveUserQA,
                    headers: {
                      authorization:`Bearer ${auth}`
                    },
                    body: {
                      answers:ans
                    }
                        
                    
                  }).then((response)=>{
                    let res = response.body
                    let data = res.data
                    // console.log(data, 'response')
                    expect(res.status).to.eq(200)
                    expect(data).to.have.property('isMoneySignGenerated')
                    expect(data).to.have.property('moneySign', '')
                    expect(data).to.have.property('noOfQuestionsFilled')
                    expect(data.noOfQuestionsFilled).to.be.gt(0)
                    // expect(data.noOfQuestionsFilled).to.be.eq(fillque+i)
                    //expect(data).to.have.property('lastAnswerId').to.be.a("array")
                    //expect(data).to.have.property('lastAnswerScore').to.be.a("array")
                    
                    
                    
                })
                ans = [];
                // })
            }
            gentemp = [];
            temp = [];
        })
    
        it(`MS-Check if ${que3} number of questions are answered`,()=>{
            cy.request({
                method:"POST",
                url:userValidation,
                headers: {
                  authorization:`Bearer ${auth}`
                },
                body:{
                }
            }).as('responseMethod')
            cy.get('@responseMethod').then((response)=>{
                let res = response.body
                let data = res.data
                expect(res.status).to.eq(200)
                expect(data).to.have.property('isMoneySignGenerated', false)
                expect(data).to.have.property('moneySign', '')
                expect(data).to.have.property('noOfQuestionsFilled')
                // expect(data.noOfQuestionsFilled).to.lessThan()
                expect(data).to.have.property('noOfQuestions', 25)
                expect(response.body.data.noOfQuestionsFilled).to.be.lessThan(parseInt(que3)+1)
                expect(response.body.data.noOfQuestionsFilledPer).to.be.lessThan(101)
                expect(data).to.have.property('lastAnswerId')
                expect(data).to.have.property('lastAnswerScore') 
            })
        });

        it('MS-Check If Money Sign is Genrated',()=>{
            cy.request({
                method:'POST',
                url:genMoneySign,
                headers: {
                    authorization:`Bearer ${auth}`
                },
                  body:{
                }
            }).then((res)=>{
                
                expect(res.body.status).to.eq(200)
                expect(res.body.data).to.have.property("moneysign").to.be.a('string')
                expect(res.body.data).to.have.property('description').to.be.a("string")
                expect(res.body.data).to.have.property('otherlikeyou').to.be.a("array")
                expect(res.body.data).to.have.property("strength")//.to.be.a("array")
                expect(res.body.data).to.have.property("weakness")//.to.be.a("array")
                
            })
        })
    
        // it('Customer-Money Sign Generated',()=>{
        //     cy.request({
        //         method : 'PATCH',
        //         url :custgms,
        //         headers: {
        //             authorization:`Bearer ${auth}`
        //         },
        //           body:{
        //         }
        //     }).then((response)=>{
        //         // {
        //         //     "id": "bbb65ca3-62a7-4ec4-b1f5-9a85275414db",
        //         //     "user_id": "cc25946c-c557-48fa-a3c4-5ae75c081e23",
        //         //     "first_name": "radhesh",
        //         //     "last_name": "Kumre",
        //         //     "email": "9757432264@example.com",
        //         //     "mobile_number": "9757432264",
        //         //     "money_sign_email": "",
        //         //     "is_money_sign_generated": true,
        //         //     "created_at": "2022-11-21T06:06:32.092Z",
        //         //     "updated_at": "2022-11-21T06:06:32.092Z",
        //         //     "money_sign_generated_at": "2022-11-21T10:54:33.729Z",
        //         //     "money_sign_report_sent_on_whatsapp_at": null,
        //         //     "money_sign_report_sent_on_email_at": null,
        //         //     "email_updated_at": null
        //         //   }
        //         let res = response.body
        //         expect(response.status).to.eq(200)
        //         expect(res).to.have.property('id').to.be.a('string')
        //         expect(res).to.have.property('user_id').to.be.a('string')
        //         expect(res).to.have.property('first_name').to.be.a('string')
        //         expect(res).to.have.property('last_name').to.be.a('string')
        //         expect(res).to.have.property('email').to.be.a('string')
        //         expect(res).to.have.property('mobile_number').to.be.a('string')
        //         expect(res).to.have.property('money_sign_email').to.be.a('string')
        //         expect(res).to.have.property('is_money_sign_generated',true)
        //         expect(res).to.have.property('created_at').to.be.a('string')
        //         expect(res).to.have.property('updated_at').to.be.a('string')
        //         expect(res).to.have.property('money_sign_generated_at').to.be.a('string')
        //     })
        // })
    
        it('Custmoer-Assessment activity done',()=>{
            cy.request({
                method :'POST',
                url : custaad,
                headers: {
                    authorization:`Bearer ${auth}`
                },
                body:{}
            }).then((response)=>{
                let res = response.body
                
                expect(response.status).to.eq(201)
                expect(res).to.have.property('message').to.be.a('string')
            })
        })
    
        it('MS-Feedback activity',()=>{
            cy.request({
                method : 'POST',
                url : msfeed,
                headers: {
                    authorization:`Bearer ${auth}`
                },
                body:{
                    
      
                        isuser_satisfied: false,
                        user_recommandaion: "",
                        user_suggestion: "Can be much better"
                      
                }
            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body).to.have.property('message').to.be.a('string')
            })
        });
    
        it('Customer-Update email ID',()=>{
            // let email = prompt("Enter Your EmailID to get Assessment Report:")
            cy.request({
                method : 'PATCH',
                url : custemail,
                headers: {
                    authorization:`Bearer ${auth}`
                },
                body:{
                    
                    email : `${email}`
                      
                }
            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body).to.have.property('message').to.be.a('string')
            })
        })

        it('Customer - Logout',()=>{
            cy.request({
                method : 'POST',
                url : custlog,
                headers: {
                    authorization :`Bearer ${auth}`
                },
                body: {
                    customer_app_instance_id: "string"
                }
                
            }).then((res)=>{
                expect(res.status).to.eq(201)
                expect(res.body).to.have.property('message').to.be.a('string')
            })
            cy.log('3 Stepped flow for MoneySign Assessment')
            
        });
        console.log('3 Stepped flow for MoneySign Assessment')
    });

    //ForYou Magazine's
    describe('Website-ForYou-Magazine',()=>{

        it('Magazine by catagory',()=>{
            cy.request({
                method : 'GET',
                url    :  `${fycat}`,
                headers: {
                    authorization:`F9B3C732768CDA5E1E9A89349C4E6`
                }
            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body.meta).to.haveOwnProperty('message')
                cy.log('For You Working')
            })
        });

        it('Magazine by Recomendation',()=>{
            cy.request({
                method : 'GET',
                url    :  `${fyrec}`,
                headers: {
                    authorization:`F9B3C732768CDA5E1E9A89349C4E6`
                }
            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body.meta).to.haveOwnProperty('message')
                cy.log('For You Working')
            })
        });

        it('Magazine by ID',()=>{
            cy.request({
                method : 'GET',
                url    :  `${fybid}`,
                headers: {
                    authorization:`F9B3C732768CDA5E1E9A89349C4E6`
                }
            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body.meta).to.haveOwnProperty('message')
                cy.log('For You Working')
            })
        });

    });

    //NetCore & MSG91
    describe('NetCore & MSG91 APIs',()=>{

            it('NetCore - Email',()=>{
                cy.request({
                    method:'POST',
                    url:neteml,
                    body:{
                        variables:["Radhesh", "https://www.africau.edu/images/default/sample.pdf"],
                        templateId:2,
                        to:[{
                            email:"radhesh.kumre@atriina.com",
                            name:"Radhesh Kumre"
                        }],
                        attachments:[
                            {
                                fileName:"sample.pdf",
                                fileURL:"https://www.africau.edu/images/default/sample.pdf"
                            }
                        ]
                    }
                }).then((res)=>{
                    expect(res.status).to.eq(200)
                })
            });

            it('NetCore - SMS',()=>{
                cy.request({
                    method:'POST',
                    url:netsms,
                    body:{
                        mobileNumber:"9757432264",
                        templateId:1,
                        variables:["iUIGhThyiGHu \n\n 1703","15 mins"]
                    }
                }).then((res)=>{
                    expect(res.status).to.eq(200)
                })
            });

            it('NetCore - WhatsAPP',()=>{
                cy.request({
                    method:"POST",
                    url:netwa,
                    body:{
                        mobileNumber:"9757432264",
                        templateId:9,
                        media:{
                            "type":"document",
                            "url":"https://www.africau.edu/images/default/sample.pdf",
                            "fileName":"sample.pdf"
                        },
                    
                        "variables":["Dumbooo"]
                    }
                }).then((res)=>{
                    expect(res.status).to.eq(200)
                })
            });
            

            it('MSG91 - SMS',()=>{
                cy.request({
                    method:"POST",
                    url:msg91,
                    body:{
                        template_id: 28,
                        mobile: "9757432264",
                        authkey: "<string>",
                        otp: "1001",
                        request_id: "<string>",
                        variables: [
                          "radheshh",
                          "1F"
                        ]
                      }
                }).then((res)=>{
                    expect(res.status).to.eq(200)
                })
            });

            console.log('NetCore & MSG91- Done')
    });
    
});