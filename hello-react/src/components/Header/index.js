import React,{Component} from "react";
import './index.css'
import {nanoid} from "nanoid";
// import PropTypes from 'prop-types'
export default class Header extends Component{
    // //对接收的props进行：类型、必要性的限制
    // static propTypes = {
    //     addTodo:PropTypes.func.isRequired
    // }
    handleKeyUp=(event)=>{
        //解构赋值
        const {keyCode,target} = event
        //判断是否为回车按键
        if(keyCode !==13) return
        //添加的todo内容不能为空
        if(target.value.trim()===''){
            alert('输入内容不能为空')
        }
        //准备好一个todo对象
        const todoObj = {id:nanoid(),name:target.value,done:false}
        //将todoObj传给addTodo
        this.props.addTodo(todoObj)
        target.value=''
    }
    render(){
        return(
            <div className="todo-header">
                <input onKeyUp={this.handleKeyUp} type="text" style={{width:'80%'}} placeholder="请输入你的任务名称，按回车键确认" />
            </div>
        )
    }

}