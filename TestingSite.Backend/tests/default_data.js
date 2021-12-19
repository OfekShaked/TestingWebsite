class DefaultData{
    get_default_organizations = () =>{
        return [
            {name:'organ1'},
            {name:'organ2'},
            {name:'organ3'}
        ]
    }

    get_default_answers = () =>{
        return [
            { text: "answer 1", is_correct: true },
            { text: "answer 2", is_correct: false },
            { text: "answer 3", is_correct: false },
            { text: "answer 4", is_correct: false },
        ]
    }

    get_default_questions = (topic_id) =>{
        return [{
            type: "SingleChoiceQuestion",
            text: "First question",
            inner_text: "this is inside",
            orientation: "Horizontal",
            optional_answers:this.get_default_answers(),
            tags:["one","two","three"],
            topic_ids:[topic_id],
            },
            {
                type: "MultipleChoiceQuestion",
                text: "Second question",
                inner_text: "this is inside",
                orientation: "Vertical",
                optional_answers:this.get_default_answers(),
                tags:["one","two","four"],
                topic_ids:[topic_id],
            },
            {
                type: "MultipleChoiceQuestion",
                text: "Third question",
                inner_text: "this is inside",
                orientation: "Vertical",
                optional_answers:this.get_default_answers(),
                tags:["one","two","five"],
                topic_ids:[topic_id],
            },
        ]
    }

    get_default_tests = (topic_id,questions) =>{
        return [
        {
            topic_id: topic_id,
            language: 'Hebrew',
            name:'test1',
            instructions:"Fill all",
            is_answer_shown:true,
            diploma_url:'',
            success_text:"Good job",
            failed_text:'bad job',
            questions:questions,
            passing_grade:50,
            tester_email:"asd@gmail.com",
            email_success_content:"Nice!",
            email_failed_conent:'Ouch!'
        },
        {
            topic_id: topic_id,
            language: 'Hebrew',
            name:'test2',
            instructions:"Fill all",
            is_answer_shown:true,
            diploma_url:'',
            success_text:"Good job",
            failed_text:'bad job',
            questions:questions,
            passing_grade:50,
            tester_email:"absd@gmail.com",
            email_success_content:"Nice!",
            email_failed_conent:'Ouch!'
        },
        ]
    }

    get_default_users = () =>{
        return [
            {
                email:"absss@gmail.com",
                name:{
                    first:"ac",
                    last:"bd"
                }
            },
            {
                email:"asdaaa@gmail.com",
                name:{
                    first:"bc",
                    last:"baad"
                }
            },
            {
                email:"asdaaa@gmail.com",
                name:{
                    first:"bc",
                    last:"baad"
                }
            },
        ]
    }
}
module.exports = new DefaultData();