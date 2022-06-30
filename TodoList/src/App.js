//创建 ’外壳式组件‘
import React,{Component} from "react";

import Header from "./components/Header";
import List from "./components/List"
import './App.css'
import Footer from "./components/Footer";
export default class App extends Component{
    state = {todos:[{id:'001',name:'eat',done:true},
            {id:'002',name:'sleep',done:true},
            {id:'003',name:'game',done:false},
            {id:'004',name:'muse',done:false}]}
    //状态在哪里，操作状态的方法就在哪里
    //addTodo用于添加一个todo 接收的todo对象
    addTodo = (todoObj)=>{
        //获取原todos
        const {todos} = this.state
        const newTodos = [...todos,todoObj]
        //更新状态
        this.setState({todos:newTodos})
    }
    //updateTodo用于更新一个todo对象
    updateTodo = (id,done)=>{
        const {todos} = this.state
        const newTodos =  todos.map(todoObj=>{
            if(todoObj.id===id) return{...todoObj,done}
            else return todoObj
        })
        this.setState({todos: newTodos})
    }

    selectedChange=(checked)=>{
        const {todos} = this.state
        const newTodos = todos.map(todoObj=>{
            if(checked){
                return {...todoObj,done:true}
            }else{
                return {...todoObj,done:false}
            }
        })
        this.setState({todos: newTodos})
    }
    //deleteTo用于删除一个todo对象
    deleteTodo=(id)=>{
        const {todos} = this.state
        const newTodos = todos.filter((todoObj)=>todoObj.id!==id)
        this.setState({todos: newTodos})
    }
    clearAllDone = ()=>{
        const {todos} = this.state
        const newTodos = todos.filter((todoObj)=>!todoObj.done)
        this.setState({todos: newTodos})
    }
    render(){
        const {todos} = this.state
        return(<div className="todo-container">
            <div className="todo-wrap">
                <Header addTodo={this.addTodo}/>
                <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo}/>
                <Footer todos={todos} selectedChange={this.selectedChange} clearAllDone={this.clearAllDone}/>
            </div>
        </div>)
    }
}
