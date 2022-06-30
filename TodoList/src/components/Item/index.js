import React,{Component} from "react";
import './index.css'
export default class Item extends Component{
    state={mouse:false}
    //鼠标移入移出的回调
    handleMouse=(flag)=>{
        return ()=>{
            this.setState({mouse:flag})
        }
    }

    handleCheck=(id)=>{
        return (event)=>{
            this.props.updateTodo(id,event.target.checked)
        }
    }
    handleDelete=(id)=>{
        if(window.confirm('确定删除吗？')){
            this.props.deleteTodo(id)
        }
    }

    render(){
        const {name,id,done} = this.props
        const {mouse} = this.state
        return(
         <li style={{backgroundColor:mouse?'#ddd':'#fff'}}
             onMouseEnter={this.handleMouse(true)}
             onMouseLeave={this.handleMouse(false)}>
             <label>
                 <input type="checkbox" onChange={this.handleCheck(id)} checked={done}/>
                 <span>{name}</span>
             </label>
             <button className="btn btn-danger" onClick={()=>this.handleDelete(id)} style={{display:mouse?'block':'none'}}>删除</button>
         </li>
        )
    }

}