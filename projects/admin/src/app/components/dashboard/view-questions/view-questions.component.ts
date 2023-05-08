import { Component, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { QuestionsService } from './questions.service';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.scss']
})
export class ViewQuestionsComponent {
  totalRecords = 0;
  questions:any;
  selectedTopic:any=0;
  topicSetFilter:any;
  faculty_id:any;
  openedQuestion:any = 0;
  addedTopics:any = [];
  existingTopics:any = [];
  searchValue = ''
  updateModal = false;
  form!:FormGroup;
  difficulty = [
    {
      label:'Easy',
      value: 'easy'
    },
    {
      label: 'Medium',
      value: 'medium'
    },
    {
      label: 'Hard',
      value: 'hard'
    }
  ]
  @ViewChild('table', {static: false}) paginator!: Paginator;

  constructor(private questionsService:QuestionsService,private messageService:MessageService, private confirmationService:ConfirmationService){}

  ngOnInit(){
    this.faculty_id = JSON.parse(localStorage.getItem('userInfo')||'{}').id
    this.getTopics()
    this.form = new FormGroup({
      question_title:new FormControl(null,[Validators.required]),
      option_set: new FormArray([],Validators.required),
      correct_answer: new FormControl(null,[Validators.required]),
      points: new FormControl(0,[Validators.required]),
      difficulty_level: new FormControl('easy',[Validators.required]),
      time_limit: new FormControl(0,[Validators.required]),
      topics: new FormArray([],[Validators.required])
    })
  }
  getQuestions(first:number,rows:number){
    this.questionsService.getQuestions(first,rows,this.selectedTopic,this.searchValue).subscribe(response=>{
      this.questions = response
      this.totalRecords = (response && response.length>0)?response[0]['total_records']:0;
    },(err)=>{
      if(err.status === 404){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not found' })
      }else if(err.status === 400){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bad Request' })
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' })
      }
    })
  }

  get optionSet() {
    return this.form.get('option_set') as FormArray;
  }
  
  get topicSet() {
    return this.form.get('topics') as FormArray;
  }

  addOption() {
    this.optionSet.push(new FormControl(null,[Validators.required]));
  }
  
  addTopic(){
    this.topicSet.push(new FormControl(null,[Validators.required]));
  }
  
  deleteOption(index:number){
      this.optionSet.removeAt(index)
    }
    
  deleteTopic(index:number){
  this.topicSet.removeAt(index)
  }

  modalClose(){
    this.getQuestions(0,5)
    this.paginator.first = 0
  }

  getTopics(){
    this.questionsService.getTopics().subscribe((response:any)=>{
      this.topicSetFilter = [
        {
          topic_id:0,
          topic_name:'All'
        },
        ...response
      ]
    })
  }

  paginationHandler(event:any){
    this.getQuestions(event.first,event.rows)
  }

  searchQuestion(event:any){
    this.searchValue = event.target.value
    this.getQuestions(0,5)
    this.paginator.first = 0
  }

  changeFilter(event:any){
    this.selectedTopic = event.value
    this.getQuestions(0,5)
    this.paginator.first = 0
  }

  openQuestion(id:number){
    this.questionsService.getQuestionById(id).subscribe(questionInfo=>{
      let question = questionInfo[0]
      let optionset =(question.option_set.split(','))
      this.openedQuestion = question.question_id;
      this.form.patchValue({
        question_title:question.question_title,
        correct_answer: question.correct_answer,
        points: question.points,
        difficulty_level: question.difficulty_level,
        time_limit: question.time_limit,
      })

      this.optionSet.clear()
      this.topicSet.clear()
      optionset.forEach((option:any,index:number) => {
        this.addOption()
        this.optionSet.at(index).setValue(option)
      });
      
      questionInfo.topics.forEach((topic:any,index:number) => {
        this.addTopic()
        this.existingTopics.push(topic.topic_id)
        this.topicSet.at(index).setValue(topic.topic_id)
      });
       
      this.form.updateValueAndValidity()
    })
    this.updateModal = true;
  }

  deleteQuestion(event:any, question_id:any){
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to delete this question?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.questionsService.deleteQuestion(question_id).subscribe(result=>{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Question deleted sucessfully' })
          let idx = this.questions.findIndex((q:any)=> q.question_id == question_id)
          this.questions.splice(idx,1)
        },(err)=>{
          if(err.status === 404){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not found' })
          }else if(err.status === 400){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete question' })
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' })
          }
        })
      },
      reject: () => {}
    });

  }


  submitForm(){
    let addedTopics:any = []
    let removedTopics:any = []
    let currentTopics = this.form.controls['topics'].value
    this.form.controls['topics'].value.forEach((topic:any) => {
      if(this.existingTopics.indexOf(topic)===-1){
        addedTopics.push(topic)
      }
    });

    this.existingTopics.forEach((topic:any) => {
      if(currentTopics.indexOf(topic)===-1){
         removedTopics.push(topic);
      }
    });

    const body = {
      ...this.form.value,
      addedTopics,
      removedTopics,
      q_id: this.openedQuestion
    }

    this.questionsService.updateQuestion(body).subscribe(result=>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Question updated successfully!' })
      this.updateModal = false
    },err=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bad Request' })
    })
  }
}
